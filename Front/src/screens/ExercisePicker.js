import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { listExercises } from "../api/exercises";
import { styles } from "../styles/ExercisePicker.style";

const PageSize = 30;

export default function ExercisePicker() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialSelected = route.params?.selectedExercises || []; //pré-carrega os exercícios que já estavam escolhidos
  const workoutName = route.params?.workoutName || "";
  const mode = route.params?.mode || "create";
  const workout = route.params?.workout || null;

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMap, setSelectedMap] = useState(() => {
    const map = {};
    initialSelected.forEach((item) => {
      map[item.id] = item;
    });
    return map;
  });

  const hasMore = items.length < total;

  const selectedExercises = useMemo(
    () => Object.values(selectedMap),
    [selectedMap],
  );

  const loadExercises = useCallback(
    async ({ reset = false, currentSeartch = search } = {}) => {
      const trimmedSearch = currentSeartch.trim();
      const nextOffset = reset ? 0 : items.length;

      if (reset) {
        setLoading(true);
      } else {
        if (loadingMore || loading) return;
        if (!hasMore && items.length > 0) return;
        setLoadingMore(true);
      }

      try {
        if (reset) {
          setErrorMessage("");
        }

        const data = await listExercises({
          search: trimmedSearch,
          limit: PageSize,
          offset: nextOffset,
        });
        const nextItems = Array.isArray(data.items) ? data.items : [];
        const nextTotal = typeof data.total === "number" ? data.total : 0;

        setTotal(nextTotal);

        if (reset) {
          setItems(nextItems);
        } else {
          setItems((prev) => {
            const exerciseIds = new Set(prev.map((item) => item.id));
            const merged = [...prev];

            nextItems.forEach((item) => {
              if (!exerciseIds.has(item.id)) {
                merged.push(item);
              }
            });
            return merged;
          });
        }
      } catch (error) {
        console.log("Erro ao carregar exercícios: ", error);
        setErrorMessage(
          error?.detail ||
            error?.message ||
            "Não foi possivel carregar os exercícios.",
        );

        if (reset) {
          setItems([]);
          setTotal(0);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search, items.length, hasMore, loading, loadingMore],
  );

  useEffect(() => {
    loadExercises({ reset: true, currentSeartch: "" });
  }, []);

  function handleToggleExercise(exercise) {
    setSelectedMap((prev) => {
      const next = { ...prev };

      if (next[exercise.id]) {
        delete next[exercise.id];
      } else {
        next[exercise.id] = exercise;
      }

      return next;
    });
  }

  function handleConirm() {
    navigation.navigate("WorkoutEditor", { selectedExercises, workoutName, mode, workout });
  }

  function searchSubmit() {
    loadExercises({ reset: true, currentSeartch: search });
  }

  function isSelected(exerciseId) {
    return !!selectedMap[exerciseId];
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.headerBtnText}>Voltar</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Exercícios</Text>

          <TouchableOpacity
            onPress={handleConirm}
            hitSlop={10}
            style={styles.headerBtn}
          >
            <Text style={styles.headerBtnText}>
              Confirmar({selectedExercises.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.searchRow}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pesquisar exercícios"
              placeholderTextColor="#888"
              style={styles.searchInput}
              onSubmitEditing={searchSubmit}
            />
          </View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              onEndReached={() => {
                if (!loading && !loadingMore && hasMore) {
                  loadExercises({ reset: false, currentSeartch: search });
                }
              }}
              ListEmptyComponent={
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>
                    Não foram encontrados exercícios
                  </Text>
                </View>
              }
              ListFooterComponent={
                loadingMore ? (
                  <View style={styles.footerLoading}>
                    <ActivityIndicator size="small" />
                  </View>
                ) : null
              }
              renderItem={({ item }) => {
                const selected = isSelected(item.id);

                return (
                  <TouchableOpacity
                    style={[styles.card, selected ? styles.cardSelected : null]}
                    onPress={() => handleToggleExercise(item)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.cardLeft}>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <Text style={styles.cardSub}>
                        {item.primary_muscle || "Sem múscuko principal"}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.checkbox,
                        selected ? styles.checkboxSelected : null,
                      ]}
                    >
                      <Text style={styles.checkboxText}>
                        {selected ? "✓" : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
