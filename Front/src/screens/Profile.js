import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useState, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { ImgDefault } from "../components/ImgProfile";
import { styles } from "../styles/Profile.style";
import { colors } from "../styles/colors";
import { getUserStats, listWorkoutHistory } from "../api/profile";

export default function Profile() {
  const navigation = useNavigation();
  const { fetchWithAuth } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastTimestamp, setLastTimestamp] = useState(null);

  function openSettings() {
    navigation.navigate("Defenitions");
  }

  const loadStats = useCallback(async () => {
    try {
      const data = await getUserStats(fetchWithAuth);
      setStats(data);
    } catch (error) {
      console.log("Erro ao carregar estatísticas:", error);
    }
  }, [fetchWithAuth]);

  const loadHistory = useCallback(
    async (isLoadingMore = false) => {
      if (isLoadingMore && !hasMore) return;

      try {
        if (isLoadingMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const data = await listWorkoutHistory(
          fetchWithAuth,
          30,
          isLoadingMore ? lastTimestamp : null,
        );

        if (isLoadingMore && data) {
          setWorkoutHistory((prev) => [...prev, ...data]);
        } else {
          setWorkoutHistory(data || []);
        }

        if (data && data.length > 0) {
          const lastWorkout = data[data.length - 1];
          setLastTimestamp(lastWorkout.created_at);
          setHasMore(data.length >= 30);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Erro ao carregar histórico:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetchWithAuth, hasMore, lastTimestamp],
  );

  async function handleRefresh() {
    setRefreshing(true);
    setLastTimestamp(null);
    setHasMore(true);
    await Promise.all([loadStats(), loadHistory(false)]);
    setRefreshing(false);
  }

  function handleLoadMore() {
    loadHistory(true);
  }

  useFocusEffect(
    useCallback(() => {
      loadStats();
      loadHistory(false);
    }, [loadStats, loadHistory]),
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
        <MaterialIcons name="settings" size={24} color={colors.text} />
      </TouchableOpacity>

      {loading && !stats ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      ) : (
        <FlatList
          data={workoutHistory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.text}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <>
              <View style={styles.headerCenter}>
                <View style={styles.profileImageWrapper}>
                  <ImgDefault imageUrl={stats?.profile_image_url} size={100} />
                </View>

                <Text style={styles.username}>
                  {stats?.username || "Utilizador"}
                </Text>

                <Text style={styles.statsText}>
                  <Text style={styles.statsNumber}>
                    {stats?.total_workouts || 0}
                  </Text>{" "}
                  Treinos Realizados
                </Text>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Histórico de Treinos</Text>
              </View>
            </>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum treino realizado ainda</Text>
          }
          ListFooterComponent={
            loadingMore && (
              <ActivityIndicator
                size="small"
                color={colors.text}
                style={styles.footerLoader}
              />
            )
          }
          renderItem={({ item }) => (
            <View>
              <View style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutName}>{item.name}</Text>
                  <Text style={styles.workoutDate}>
                    {new Date(item.startTime).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Text>
                </View>

                <View style={styles.workoutStats}>
                  <View style={styles.statItem}>
                    <MaterialIcons
                      name="fitness-center"
                      size={18}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.statText}>{item.totalSets} séries</Text>
                  </View>

                  <View style={styles.statItem}>
                    <MaterialIcons
                      name="schedule"
                      size={18}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.statText}>
                      {Math.floor(item.duration / 60)} min
                    </Text>
                  </View>

                  <View style={styles.statItem}>
                    <MaterialIcons
                      name="trending-up"
                      size={18}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.statText}>
                      {item.totalVolume.toFixed(0)} kg
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
