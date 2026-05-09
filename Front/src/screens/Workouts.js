import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/Workouts.style";
import { AuthContext } from "../context/AuthContext";
import { listWorkouts, deleteWorkout } from "../api/workouts";
import { DropdownMenuWorkouts } from "../components/DropdownMenu";
import { useWorkoutContext } from "../context/WorkoutContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../styles/colors";

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
  const { startWorkout, activeWorkout, cancelWorkout } = useWorkoutContext();

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [openMenuWorkoutId, setOpenMenuWorkoutId] = useState(null);
  const [deletingWorkoutId, setDeletingWorkoutId] = useState(null);

  const [elapsedTime, setElapsedTime] = useState("00:00:00");

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
        exercises: item.exercises ?? [],
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

  // Timer para o treino ativo
  useEffect(() => {
    if (!activeWorkout) {
      setElapsedTime("00:00:00");
      return;
    }

    // Função que calcula e atualiza o tempo decorrido
    const updateTimer = () => {
      const elapsed = Date.now() - activeWorkout.startTime;
      setElapsedTime(formatElapsedTime(elapsed));
    };

    // Atualizar imediatamente
    updateTimer();

    // Atualizar a cada segundo
    const interval = setInterval(updateTimer, 1000);

    // Cleanup: limpar o interval quando o componente desmonta ou activeWorkout muda
    return () => clearInterval(interval);
  }, [activeWorkout]);

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

  async function handleStartWorkout(workout) {
    console.log("WORKOUT:", JSON.stringify(workout, null, 2));
    try {
      await startWorkout(workout);
      navigation.navigate("WorkoutSession");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }

  function formatElapsedTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
                <View style={[styles.card, isMenuOpen && styles.cardActive]}>
                  <TouchableOpacity
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
                        <DropdownMenuWorkouts
                          isOpen={isMenuOpen}
                          onToggle={() => toggleWorkoutMenu(item.id)}
                          onDelete={() => confirmDeleteWorkout(item.id)}
                          deleteLabel="Apagar treino"
                          openWorktEditor={() => openEdit(item)}
                          mode="workouts"
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
                  <TouchableOpacity
                    style={[styles.startBtn, isMenuOpen && { zIndex: -1 }]}
                    disabled={isMenuOpen}
                    pointerEvents={isMenuOpen ? "none" : "auto"}
                  >
                    <Text
                      style={styles.startText}
                      onPress={() => handleStartWorkout(item)}
                    >
                      Iniar treino
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.fab, activeWorkout && styles.fabWithActiveWorkout]}
        onPress={openCreate}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {activeWorkout && (
        <TouchableOpacity
          style={styles.activeWorkoutBar}
          onPress={() => navigation.navigate("WorkoutSession")}
          activeOpacity={0.85}
        >
          <View style={styles.activeWorkoutContent}>
            <View style={styles.activeWorkoutRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.activeWorkoutLabel} numberOfLines={1}>
                  TREINO ATIVO - {elapsedTime}
                </Text>
                <Text style={styles.activeWorkoutName} numberOfLines={1}>
                  {activeWorkout.name}
                </Text>
              </View>

              {/* Coluna direita: Seta + Lixo (verticalmente) */}
              <View style={styles.activeWorkoutIcons}>
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={24}
                  color={colors.text}
                />

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    Alert.alert(
                      "Cancelar treino",
                      "Tens a certeza que queres cancelar este treino? Todo o progresso será perdido.",
                      [
                        { text: "Não", style: "cancel" },
                        {
                          text: "Sim",
                          style: "destructive",
                          onPress: async () => {
                            await cancelWorkout();
                          },
                        },
                      ],
                    );
                  }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={22}
                    color="#ff4d4f"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
