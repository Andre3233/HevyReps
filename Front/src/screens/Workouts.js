import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/Workouts.style";
import { AuthContext } from "../context/AuthContext";
import { listWorkouts, deleteWorkout } from "../api/workouts";
import DropdownMenu from "../components/DropdownMenu";

function formatRelativeTime(dateString) {
  if (!dateString) return "Sem data";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Sem data";
  }

  const now = new Date();
  const diffMs = now - date;

  if (diffMs < 0) return "Sem data";

  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffMs < hour) {
    return "-1h";
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return hours === 1 ? "1h" : `${hours}h`;
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);
    return days === 1 ? "1dia" : `${days}dias`;
  }

  if (diffMs < month) {
    const weeks = Math.floor(diffMs / week);
    return weeks === 1 ? "1semana" : `${weeks}semanas`;
  }

  if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return months === 1 ? "1mês" : `${months}meses`;
  }

  const years = Math.floor(diffMs / year);
  return years === 1 ? "1ano" : `${years}anos`;
}

export default function Workouts() {
  const navigation = useNavigation();
  const { fetchWithAuth } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [openMenuWorkoutId, setOpenMenuWorkoutId] = useState(null);
  const [deletingWorkoutId, setDeletingWorkoutId] = useState(null);

  function openCreate() {
    navigation.navigate("WorkoutEditor", { mode: "create" });
  }

  function openEdit(workout) {
    navigation.navigate("WorkoutEditor", {
      mode: "edit",
      workout,
    });
  }

  const loadWorkouts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await listWorkouts(fetchWithAuth);

      const mapped = data.map((item) => ({
        id: item.id,
        name: item.name,
        exerciseCount: item.exercise_count ?? 0,
        updatedAt: item.updated_at ?? null,
        exerciseIds: item.exercise_ids ?? [],
        createdAt: item.created_at ?? null,
      }));

      setWorkouts(mapped);
    } catch (error) {
      console.log("Erro ao carregar treinos:", error);
      Alert.alert(
        "Erro",
        error?.detail || "Não foi possível carregar os treinos.",
      );
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [loadWorkouts]),
  );

  function toggleWorkoutMenu(workoutId) {
    setOpenMenuWorkoutId((prev) => (prev === workoutId ? null : workoutId));
  }

  function confirmDeleteWorkout(workoutId) {
    Alert.alert(
      "Apagar treino",
      "Tens a certeza de que queres apagar este treino? Esta ação não pode ser anulada.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingWorkoutId(workoutId);
              setOpenMenuWorkoutId(null);

              await deleteWorkout(fetchWithAuth, workoutId);

              setWorkouts((prev) =>
                prev.filter((workout) => workout.id !== workoutId),
              );
            } catch (error) {
              console.log("Erro ao apagar treino:", error);
              Alert.alert(
                "Erro",
                error?.detail || "Não foi possível apagar o treino.",
              );
            } finally {
              setDeletingWorkoutId(null);
            }
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Treinos</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : workouts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Ainda não tens treinos</Text>
          <Text style={styles.emptyText}>
            Cria o teu primeiro treino para começares a organizar.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={openCreate}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Criar treino</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setOpenMenuWorkoutId(null)}
            renderItem={({ item }) => {
              const isMenuOpen = openMenuWorkoutId === item.id;
              const isDeleting = deletingWorkoutId === item.id;

              return (
                <TouchableOpacity
                  style={[styles.card, isMenuOpen && styles.cardActive]}
                  activeOpacity={0.85}
                  onPress={() => {
                    setOpenMenuWorkoutId(null);
                    openEdit(item);
                  }}
                >
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View style={styles.menuWrapper}>
                      <DropdownMenu
                        isOpen={isMenuOpen}
                        onToggle={() => toggleWorkoutMenu(item.id)}
                        onDelete={() => confirmDeleteWorkout(item.id)}
                        deleteLabel="Apagar treino"
                      />
                    </View>
                  </View>

                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardSub}>
                      {item.exerciseCount}{" "}
                      {item.exerciseCount === 1 ? "exercício" : "exercícios"}
                    </Text>

                    <Text style={styles.cardSub}>
                      {formatRelativeTime(item.updatedAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={openCreate}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
