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

  // Overlay com zIndex BAIXO (1) — fica atrás do listContainer (zIndex 2).
  // Apanha toques nos espaços vazios fora dos cards para fechar o menu.
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  // Contentor do FlatList com zIndex ALTO (2) — garante que todos os cards
  // ficam acima da overlay, logo os toques chegam sempre aos cards normalmente.
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
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // zIndex: 1 coloca este row (e o menu absoluto dentro dele) acima do
  // cardMetaRow que vem depois no JSX e que, sem isso, o sobrepunha visualmente.
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: RFValue(8),
    zIndex: 1,
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

  cardActive: {
    elevation: 10,
    zIndex: 10,
  },
});