import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContext";
import { createWorkoutHistory } from "../api/workout_history";

const STORAGE_KEY = "@activeWorkout";
const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const { fetchWithAuth } = useContext(AuthContext);

  const [activeWorkout, setActiveWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _loadFromAsyncStorage();
  }, []);

  async function _loadFromAsyncStorage() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setActiveWorkout(parsed);
      }
    } catch (error) {
      console.error("Erro ao carregar workout:", error);
    } finally {
      setLoading(false);
    }
  }

  async function _syncToAsyncStorage(workout) {
    try {
      if (workout === null) {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workout));
      }
    } catch (error) {
      console.error("Erro ao guardar workout:", error);
    }
  }

  async function startWorkout(template) {
    if (activeWorkout !== null) {
      throw new Error("Só pode haver um treino ativo. Já tem um no momento.");
    }
    if (!template || !template.id || !template.name) {
      throw new Error("Template inválido");
    }

    const session = {
      sessionId: uuidv4(),
      workoutId: template.id,
      name: template.name,
      startTime: Date.now(),
      exercises: template.exercises.map((exercise) => ({
        instanceId: uuidv4(), // Id unico de instacia do exercicio
        exerciseId: exercise.id, // Id original
        name: exercise.name,
        exercise_sets:
          exercise.exercise_sets?.map((set) => ({
            repetitions: set.repetitions,
            weight: set.weight,
            completed: false,
          })) || [],
      })),
    };
    console.log("SESSION CRIADA:", JSON.stringify(session, null, 2));
    setActiveWorkout(session);
    await _syncToAsyncStorage(session);
  }

  async function finishWorkout() {
    const hasCompletedSets = activeWorkout.exercises.some((ex) =>
      ex.exercise_sets.some((set) => set.completed === true),
    );
    if (!hasCompletedSets) {
      throw new Error("Precisa completar pelo menos uma série");
    }

    const payload = {
      sessionId: activeWorkout.sessionId,
      workoutId: activeWorkout.workoutId,
      name: activeWorkout.name,
      startTime: new Date(activeWorkout.startTime).toISOString(),
      endTime: new Date().toISOString(),
      exercises: activeWorkout.exercises
        .map((ex) => ({
          id: ex.exerciseId,
          name: ex.name,
          exercise_sets: ex.exercise_sets
            .filter((set) => set.completed)
            .filter(
              (set) =>
                set.repetitions !== null &&
                set.repetitions > 0 &&
                set.weight !== null &&
                set.weight >= 0,
            ) // para garantir que sets concluidos vão com dados 
            .map(({ repetitions, weight }) => ({
              repetitions,
              weight,
            })),
        }))
        .filter((ex) => ex.exercise_sets.length > 0),
    };

    console.log("PAYLOAD ENVIADO:", JSON.stringify(payload, null, 2));
    // Guarda no Back
    try {
      await createWorkoutHistory(fetchWithAuth, payload);

      // Só limpa depois de guardar com sucesso
      setActiveWorkout(null);
      await _syncToAsyncStorage(null);
    } catch (error) {
      // Se falhar, mantém o activeWorkout
      throw new Error(
        `Erro ao guardar treino: ${error.detail || error.message}`,
      );
    }
  }

  function addSet(instanceId) {
    if (!activeWorkout) {
      throw new Error("Nenhum treino ativo");
    }

    const newSet = {
      repetitions: null,
      weight: null,
      completed: false,
    };

    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) =>
        ex.instanceId === instanceId // ← era ex.id === exerciseId
          ? { ...ex, exercise_sets: [...ex.exercise_sets, newSet] }
          : ex,
      ),
    };

    setActiveWorkout(updatedWorkout);
    _syncToAsyncStorage(updatedWorkout);
  }

  function updateSet(instanceId, setIndex, changes) {
    if (!activeWorkout) {
      throw new Error("Nenhum treino ativo");
    }

    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) =>
        ex.instanceId === instanceId // ← era ex.id === exerciseId
          ? {
              ...ex,
              exercise_sets: ex.exercise_sets.map((set, index) =>
                index === setIndex ? { ...set, ...changes } : set,
              ),
            }
          : ex,
      ),
    };

    setActiveWorkout(updatedWorkout);
    _syncToAsyncStorage(updatedWorkout);
  }

  function removeSet(instanceId, setIndex) {
    if (!activeWorkout) {
      throw new Error("Nenhum treino ativo");
    }

    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) =>
        ex.instanceId === instanceId
          ? {
              ...ex,
              exercise_sets: ex.exercise_sets.filter(
                (_, index) => index !== setIndex,
              ),
            }
          : ex,
      ),
    };

    setActiveWorkout(updatedWorkout);
    _syncToAsyncStorage(updatedWorkout);
  }

  function addExercises(exercisesArray) {
    if (!activeWorkout) {
      throw new Error("Nenhum treino ativo");
    }

    const newExercises = exercisesArray.map((ex) => ({
      instanceId: uuidv4(),
      exerciseId: ex.id,
      name: ex.name,
      exercise_sets:
        ex.exercise_sets?.map((set) => ({
          repetitions: set.repetitions,
          weight: set.weight,
          completed: false,
        })) || [],
    }));

    const updatedWorkout = {
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, ...newExercises],
    };

    setActiveWorkout(updatedWorkout);
    _syncToAsyncStorage(updatedWorkout);
  }

  function removeExercise(instanceId) {
    if (!activeWorkout) {
      throw new Error("Nenhum treino ativo");
    }

    const updatedWorkout = {
      ...activeWorkout,
      exercises: activeWorkout.exercises.filter(
        (ex) => ex.instanceId !== instanceId,
      ),
    };

    setActiveWorkout(updatedWorkout);
    _syncToAsyncStorage(updatedWorkout);
  }

  async function cancelWorkout() {
    setActiveWorkout(null);
    await _syncToAsyncStorage(null);
  }

  const value = {
    activeWorkout,
    loading,
    startWorkout,
    finishWorkout,
    addSet,
    updateSet,
    removeSet,
    addExercises,
    removeExercise,
    cancelWorkout,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within WorkoutProvider");
  }
  return context;
}
