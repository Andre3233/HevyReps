import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useWorkoutContext } from "../context/WorkoutContext";
import ExerciseCard from "../components/ExerciseCard";
import { DropdownMenuWorkouts } from "../components/DropdownMenu";
import { styles } from "../styles/WorkoutSession.style";
import { useNavigation } from "@react-navigation/native";

export default function WorkoutSession({ navigation, route }) {
  const {
    activeWorkout,
    finishWorkout,
    addSet,
    updateSet,
    removeSet,
    addExercises,
    removeExercise,
  } = useWorkoutContext();

  const [openMenuExerciseId, setOpenMenuExerciseId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    if (!activeWorkout?.startTime) {
      setElapsedTime("00:00:00");
      return;
    }

    function updateTimer() {
      const elapsed = Date.now() - activeWorkout.startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);

      setElapsedTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    }

    updateTimer(); // atualiza imediatamente
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [activeWorkout?.startTime]);

  // Cálculos de estatísticas
  const completedSets =
    activeWorkout?.exercises.reduce((total, ex) => {
      return total + ex.exercise_sets.filter((set) => set.completed).length;
    }, 0) || 0;

  const totalVolume =
    activeWorkout?.exercises.reduce((total, ex) => {
      return (
        total +
        ex.exercise_sets
          .filter((set) => set.completed)
          .reduce((sum, set) => sum + set.repetitions * set.weight, 0)
      );
    }, 0) || 0;

  useEffect(() => {
    if (route.params?.selectedExercises) {
      addExercises(route.params.selectedExercises);
      navigation.setParams({ selectedExercises: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.selectedExercises]);

  function handleAddExercises() {
    navigation.navigate("ExercisePicker", {
      mode: "session",
      workoutName: activeWorkout?.name || "",
      selectedExercises: [],
    });
  }

  async function handleFinishWorkout() {
    Alert.alert(
      "Concluir treino",
      "Tens a certeza que queres terminar este treino?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Concluir",
          style: "destructive",
          onPress: async () => {
            try {
              await finishWorkout();
              Alert.alert("Sucesso", "Treino concluído!");
              navigation.navigate("Workouts");
            } catch (error) {
              Alert.alert("Erro", error.message);
            }
          },
        },
      ],
    );
  }

  function handleMinimize() {
    navigation.navigate("Workouts");
  }

  function toggleExerciseMenu(exerciseId) {
    setOpenMenuExerciseId((prev) => (prev === exerciseId ? null : exerciseId));
  }

  function handleExerciseInfo(exerciseId, name) {
    navigation.navigate("ExerciseInfo", { id: exerciseId, name });
  }

  if (!activeWorkout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum treino ativo</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Workouts")}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleMinimize} style={styles.backButton}>
            <MaterialIcons name="keyboard-arrow-down" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.workoutName}>{activeWorkout.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.concludeButton}
          onPress={handleFinishWorkout}
        >
          <Text style={styles.concludeButtonText}>Concluir</Text>
        </TouchableOpacity>
      </View>

      {/* BARRA DE ESTATÍSTICAS */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Duração</Text>
          <Text style={styles.statValue}>{elapsedTime}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>{totalVolume.toFixed(0)} kg</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Séries</Text>
          <Text style={styles.statValue}>{completedSets}</Text>
        </View>
      </View>

      <FlatList
        data={activeWorkout.exercises}
        keyExtractor={(item) => item.instanceId}
        contentContainerStyle={styles.exerciseList}
        onScrollBeginDrag={() => setOpenMenuExerciseId(null)}
        renderItem={({ item: exercise }) => {
          const isMenuOpen = openMenuExerciseId === exercise.instanceId;

          return (
            <View style={styles.exerciseContainer}>
              {/* CARD WRAPPER - tudo dentro */}
              <View style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <TouchableOpacity
                    onPress={() =>
                      handleExerciseInfo(exercise.exerciseId, exercise.name)
                    }
                  >
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                  </TouchableOpacity>

                  <DropdownMenuWorkouts
                    isOpen={isMenuOpen}
                    onToggle={() => toggleExerciseMenu(exercise.instanceId)}
                    onDelete={() => {
                      setOpenMenuExerciseId(null);
                      removeExercise(exercise.instanceId);
                    }}
                    deleteLabel="Remover exercício"
                  />
                </View>

                <ExerciseCard
                  mode="session"
                  exercise_sets={exercise.exercise_sets || []}
                  onAddSet={() => addSet(exercise.instanceId)}
                  onUpdateSet={(index, changes) =>
                    updateSet(exercise.instanceId, index, changes)
                  }
                  onDeleteSet={(index) => removeSet(exercise.instanceId, index)}
                  onToggleComplete={(index) => {
                    const set = exercise.exercise_sets[index];
                    updateSet(exercise.instanceId, index, {
                      completed: !set.completed,
                    });
                  }}
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyExercises}>
            <Text style={styles.emptyText}>Nenhum exercício adicionado</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addExerciseButton}
            onPress={handleAddExercises}
          >
            <Text style={styles.addExerciseText}>Adicionar exercício</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}
