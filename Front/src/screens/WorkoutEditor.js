import { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { styles } from "../styles/WorkoutEditor.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { createWorkout, updateWorkout } from "../api/workouts";
import DropdownMenu from "../components/DropdownMenu";
import ExerciseCard from "../components/ExerciseCard";

export default function WorkoutEditor() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fetchWithAuth } = useContext(AuthContext);

  const {
    mode = "create",
    workout = null,
    selectedExercises = null,
    workoutName = "",
  } = route.params || {};

  const [isEditingName, setIsEditingName] = useState(false);
  const [saving, setSaving] = useState(false);
  const nameInputRef = useRef(null);
  const [openMenuExerciseId, setOpenMenuExerciseId] = useState(null);

  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);

  const screenTitle = mode === "edit" ? "Editar treino" : "Novo treino";

  useEffect(() => {
    if (mode === "edit" && workout) setName(workout.name || "");
    if (mode === "edit" && workout && selectedExercises === null) {
      setIsEditingName(false);
      setExercises(workout.exercises || []);
    }
  }, [mode, workout]);

  useEffect(() => {
    if (mode === "create" && workoutName) {
      setName(workoutName);
    }
    if (selectedExercises && Array.isArray(selectedExercises)) {
      setExercises(selectedExercises);
    }
  }, [selectedExercises]);

  function goBack() {
    navigation.goBack();
  }

  function startEditName() {
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 50);
  }

  function finishEditName() {
    setIsEditingName(false);
    Keyboard.dismiss();
  }

  function toggleExerciseMenu(exerciseId, exerciseName) {
    setOpenMenuExerciseId((prev) => (prev === exerciseId ? null : exerciseId));
  }

  function removeExercise(exerciseId) {
    setExercises((prevState) => prevState.filter((e) => e.id !== exerciseId));
    setOpenMenuExerciseId(null);
  }

  function handleAddExercise() {
    navigation.navigate("ExercisePicker", {
      selectedExercises: exercises,
      workoutName: name,
      mode,
      workout, //Exercícios já guardados
    });
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("De um nome ao treino antes de guardares.");
      return;
    }

    const payload = {
      name: name.trim(),
      exercises: exercises.map((e) => ({
        id: e.id,
        name: e.name,
        exercise_sets: e.exercise_sets,
      })),
    };

    try {
      setSaving(true);

      if (mode === "edit" && workout?.id) {
        await updateWorkout(fetchWithAuth, workout.id, payload);
      } else {
        await createWorkout(fetchWithAuth, payload);
      }

      navigation.popToTop();
    } catch (error) {
      console.log("Erro ao guardar treino:", error);
      Alert.alert(
        "Erro",
        error?.detail || "Não foi possível guardar o treino.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handleAddSet(exerciseId) {
    setExercises((ex) =>
      ex.map((e) =>
        e.id === exerciseId
          ? {
              ...e,
              exercise_sets: [
                ...(e.exercise_sets || []),
                { repetitions: 0, weight: 0 },
              ],
            }
          : e,
      ),
    );
  }

  function handleEditSet(exerciseId, setIndex, field, value) {
    setExercises((ex) =>
      ex.map((e) =>
        e.id === exerciseId
          ? {
              ...e,
              exercise_sets: (e.exercise_sets || []).map((set, i) =>
                i === setIndex ? { ...set, [field]: value } : set,
              ),
            }
          : e,
      ),
    );
  }

  function handleRemoveSet(exerciseId, setIndex) {
    setExercises((ex) =>
      ex.map((e) =>
        e.id === exerciseId
          ? {
              ...e,
              exercise_sets: (e.exercise_sets || []).filter(
                (set, i) => i !== setIndex,
              ),
            }
          : e,
      ),
    );
  }

  function handleExerciseInfo(exerciseId, name) {
    navigation.navigate("ExerciseInfo", { id: exerciseId, name});
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.header}>
          <Pressable onPress={goBack} hitSlop={10}>
            <Text style={styles.headerBtnText}>Voltar</Text>
          </Pressable>

          <Text style={styles.headerTitle}>{screenTitle}</Text>

          <TouchableOpacity
            onPress={handleSave}
            hitSlop={10}
            style={styles.headerBtn}
            disabled={saving}
          >
            <Text style={styles.headerBtnText}>
              {saving ? "A guardar..." : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.nameRow}>
            {!isEditingName ? (
              <Pressable onPress={startEditName} style={styles.namePress}>
                <MaterialIcons name="edit" size={18} color={colors.text} />
                <Text style={styles.workoutName}>
                  {name.trim() ? name : "Nome do treino"}
                </Text>
              </Pressable>
            ) : (
              <TextInput
                ref={nameInputRef}
                value={name}
                onChangeText={setName}
                placeholder="Nome do treino"
                placeholderTextColor={colors.textSecondary}
                style={styles.nameInput}
                returnKeyType="done"
                onSubmitEditing={finishEditName}
                onBlur={finishEditName}
                maxLength={40}
              />
            )}
          </View>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Ainda não adicionaste nenhum exercício.
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const isMenuOpen = openMenuExerciseId === item.id;

              return (
                <View
                  style={[
                    styles.exerciseItemWrapper,
                    isMenuOpen && styles.exerciseItemWrapperActive,
                  ]}
                >
                  <View style={styles.exerciseItem}>
                    <View style={styles.exerciseLeft}>
                      <View style={styles.exerciseInfo}>
                        <TouchableOpacity
                          onPress={() => handleExerciseInfo(item.id, item.name)}
                        >
                          <Text style={styles.exerciseName}>{item.name}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.menuWrapper}>
                      <DropdownMenu
                        isOpen={isMenuOpen}
                        onToggle={() => toggleExerciseMenu(item.id)}
                        onDelete={() => removeExercise(item.id)}
                        deleteLabel="Apagar exercício"
                      />
                    </View>
                  </View>
                  <ExerciseCard
                    exercise_sets={item.exercise_sets}
                    onAddSet={() => handleAddSet(item.id)}
                    onEditSet={(setIndex, field, value) =>
                      handleEditSet(item.id, setIndex, field, value)
                    }
                    onDeleteSet={(setIndex) =>
                      handleRemoveSet(item.id, setIndex)
                    }
                  />
                </View>
              );
            }}
          />

          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddExercise}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>Adicionar exercício</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
