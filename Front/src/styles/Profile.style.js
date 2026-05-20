import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  headerCenter: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileImageWrapper: {
    marginBottom: 20,
  },
  username: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 0,
  },

  statsText: {
    fontSize: RFValue(16),
    color: colors.textSecondary,
    marginTop: -2,
  },
  statsNumber: {
    fontWeight: "600",
    color: colors.text,
  },

  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 8,
    zIndex: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: colors.text,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  workoutCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutName: {
    fontSize: RFValue(17),
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  workoutDate: {
    fontSize: RFValue(13),
    color: colors.textSecondary,
    marginLeft: 12,
  },

  workoutStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: RFValue(13),
    color: colors.textSecondary,
    marginLeft: 6,
  },

  emptyText: {
    textAlign: "center",
    color: colors.textSecondary,
    marginTop: 40,
    fontSize: RFValue(14),
  },

  footerLoader: {
    marginVertical: 20,
  },
});
