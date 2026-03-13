import { StyleSheet } from "react-native";
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

  card: {
    borderRadius: RFValue(16),
    padding: RFValue(14),
    marginBottom: RFValue(12),
    backgroundColor: colors.cardBackground,
    position: "relative",
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
  },

  workoutMenu: {
    position: "absolute",
    top: RFValue(28),
    right: 0,
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(6),
    minWidth: RFValue(160),
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
    elevation: 8,
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
  },

  fabText: {
    fontSize: RFValue(28),
    fontWeight: "800",
    marginTop: RFValue(-2),
    color: colors.text,
  },

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
  },

  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
});
