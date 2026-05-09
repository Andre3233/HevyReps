import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(12),
  },
  backButton: {
    padding: RFValue(4),
  },
  workoutName: {
    fontSize: RFValue(20),
    fontWeight: "700",
    color: colors.text,
  },
  concludeButton: {
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(10),
    backgroundColor: colors.buttonBackground,
  },
  concludeButtonText: {
    fontSize: RFValue(14),
    fontWeight: "700",
    color: colors.text,
  },
  exerciseList: {
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(16),
    paddingBottom: RFValue(100),
  },
  exerciseContainer: {
    marginBottom: RFValue(20),
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RFValue(12),
  },

  exerciseName: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: colors.text,
    flex: 1,
    marginRight: RFValue(8),
  },
  removeExercise: {
    fontSize: RFValue(20),
    color: "#ff4d4f",
    fontWeight: "600",
  },
  addExerciseButton: {
    marginTop: RFValue(24),
    marginBottom: RFValue(16),
    marginHorizontal: RFValue(16),
    height: RFValue(48),
    borderRadius: RFValue(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonBackground,
  },
  addExerciseText: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyExercises: {
    paddingVertical: RFValue(40),
    alignItems: "center",
  },
  emptyText: {
    fontSize: RFValue(16),
    color: colors.textSecondary,
    marginBottom: RFValue(16),
  },
  button: {
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: RFValue(24),
    paddingVertical: RFValue(12),
    borderRadius: RFValue(8),
  },
  buttonText: {
    color: colors.text,
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  exerciseCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(12),
    padding: RFValue(16),
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(16),
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    fontSize: RFValue(10),
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: RFValue(4),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statValue: {
    fontSize: RFValue(14),
    fontWeight: "700",
    color: "#fff",
  },

  statDivider: {
    width: 1,
    height: RFValue(32),
    backgroundColor: colors.border,
  },
});
