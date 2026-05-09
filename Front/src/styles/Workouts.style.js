import { StyleSheet, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(18),
  },

  title: {
    fontSize: RFValue(26),
    fontWeight: "700",
    marginBottom: RFValue(14),
    color: colors.text,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: RFValue(20),
    fontWeight: "700",
    marginBottom: RFValue(8),
    color: colors.text,
  },

  emptyText: {
    fontSize: RFValue(14),
    opacity: 0.8,
    marginBottom: RFValue(16),
    lineHeight: RFValue(20),
    color: colors.textSecondary,
  },

  primaryBtn: {
    height: RFValue(48),
    borderRadius: RFValue(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonBackground,
  },

  primaryBtnText: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: colors.text,
  },

  list: {
    paddingBottom: RFValue(100),
  },

  listContent: {
    paddingBottom: RFValue(100),
  },

  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  listContainer: {
    flex: 1,
    zIndex: 2,
  },

  card: {
    borderRadius: RFValue(16),
    padding: RFValue(14),
    marginBottom: RFValue(12),
    backgroundColor: colors.cardBackground,
    position: "relative",
    overflow: "visible",
    zIndex: 0,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: RFValue(8),
    zIndex: 9999,
  },

  cardTitle: {
    flex: 1,
    fontSize: RFValue(16),
    fontWeight: "700",
    color: colors.text,
    marginRight: RFValue(12),
  },

  cardMeta: {
    fontSize: RFValue(12),
    opacity: 0.85,
    color: colors.textSecondary,
  },

  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 0,
  },

  cardSub: {
    fontSize: RFValue(13),
    opacity: 0.85,
    color: colors.textSecondary,
  },

  menuWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    zIndex: 9999,
  },

  workoutMenuDeleteBtn: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
  },

  workoutMenuDeleteText: {
    color: "#ff4d4f",
    fontWeight: "700",
    fontSize: RFValue(14),
  },

  fab: {
    position: "absolute",
    right: RFValue(16),
    bottom: RFValue(18),
    width: RFValue(56),
    height: RFValue(56),
    borderRadius: RFValue(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonBackground,
    zIndex: 100,
  },

  fabText: {
    fontSize: RFValue(28),
    fontWeight: "800",
    marginTop: RFValue(-2),
    color: colors.text,
  },

  fabWithActiveWorkout: {
    bottom: RFValue(110),
  },

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
  },

  cardActive: {
    zIndex: 100,
    elevation: 100,
  },

  startBtn: {
    marginTop: RFValue(12),
    backgroundColor: colors.buttonBackground,
    paddingVertical: RFValue(12),
    borderRadius: RFValue(10),
    alignItems: "center",
    justifyContent: "center",
  },

  startText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: RFValue(14),
  },

  activeWorkoutBar: {
    position: "absolute",
    bottom: RFValue(18),
    left: RFValue(16),
    right: RFValue(16),
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(16),
    padding: RFValue(14),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 50,
  },

  activeWorkoutContent: {
    // Container sem estilos específicos
  },

  activeWorkoutHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RFValue(8),
  },

  activeWorkoutLabel: {
    fontSize: RFValue(12),
    fontWeight: "700",
    color: colors.text,
    marginBottom: RFValue(6),
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  activeWorkoutName: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: colors.textSecondary,
    opacity: 0.85,
  },

  // Adicionar dentro do StyleSheet.create, após activeWorkoutLabel
  activeWorkoutTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RFValue(6),
  },

  activeWorkoutTimer: {
    fontSize: RFValue(14),
    fontWeight: "700",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: 1,
  },

  cancelWorkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: RFValue(6),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(8),
    backgroundColor: "rgba(255, 77, 79, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 77, 79, 0.3)",
  },

  cancelWorkoutText: {
    fontSize: RFValue(13),
    fontWeight: "600",
    color: "#ff4d4f",
  },

  activeWorkoutRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: RFValue(12),
  },

  activeWorkoutIcons: {
    alignItems: "center",
    gap: RFValue(8), // ← Espaçamento entre seta e lixo
  },
});
