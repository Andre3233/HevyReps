import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: RFValue(18),
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: RFValue(21),
    fontWeight: "800",
    color: colors.text,
  },

  headerBtn: {
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: colors.cardBackground,
  },

  headerBtnText: {
    fontSize: RFValue(13),
    fontWeight: "700",
    color: colors.text,
  },

  content: {
    flex: 1,
    paddingHorizontal: RFValue(16),
  },

  label: {
    fontSize: RFValue(13),
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: RFValue(6),
    marginBottom: RFValue(8),
  },

  input: {
    height: RFValue(48),
    borderRadius: RFValue(14),
    paddingHorizontal: RFValue(14),
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: RFValue(14),
  },

  sectionRow: {
    marginTop: RFValue(18),
    marginBottom: RFValue(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: "800",
    color: colors.text,
  },

  link: {
    fontSize: RFValue(14),
    fontWeight: "800",
    color: colors.text,
    opacity: 0.9,
  },

  list: {
    flexGrow: 1,
    paddingBottom: RFValue(14),
  },

  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: RFValue(16),
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: RFValue(14),
    textAlign: "center",
    lineHeight: RFValue(20),
  },

  exerciseItemWrapper: {
    position: "relative",
    marginBottom: RFValue(10),
    zIndex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(14),
    padding: RFValue(12),
  },

  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  exerciseLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  exerciseIndex: {
    width: RFValue(22),
    fontSize: RFValue(14),
    fontWeight: "900",
    color: colors.textSecondary,
  },

  exerciseInfo: {
    flex: 1,
  },

  exerciseName: {
    fontSize: RFValue(14),
    fontWeight: "800",
    color: colors.text,
  },

  exerciseSub: {
    marginTop: RFValue(2),
    fontSize: RFValue(12),
    color: colors.textSecondary,
    opacity: 0.9,
  },

  menuWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-end",
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

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
  },

  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },

  addBtn: {
    height: RFValue(48),
    borderRadius: RFValue(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonBackground,
    marginTop: RFValue(10),
    marginBottom: RFValue(16),
    zIndex: 20,
    elevation: 20,
  },

  addBtnText: {
    fontSize: RFValue(15),
    fontWeight: "900",
    color: colors.text,
  },

  nameRow: {
    marginTop: RFValue(6),
    marginBottom: RFValue(14),
  },

  namePress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  workoutName: {
    flex: 1,
    fontSize: RFValue(22),
    fontWeight: "900",
    color: colors.text,
    marginLeft: RFValue(13),
  },

  workoutNamePlaceholder: {
    color: colors.textSecondary,
    opacity: 0.9,
  },

  pencilBtn: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBackground,
    marginLeft: RFValue(10),
  },

  nameInput: {
    height: RFValue(48),
    borderRadius: RFValue(14),
    paddingHorizontal: RFValue(14),
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: RFValue(16),
    fontWeight: "800",
  },

  exerciseItemWrapperActive: {
    elevation: 10,
    zIndex: 10,
  },
});
