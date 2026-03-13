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
    fontSize: RFValue(20),
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

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(12),
  },

  searchInput: {
    flex: 1,
    height: RFValue(48),
    borderRadius: RFValue(14),
    paddingHorizontal: RFValue(14),
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: RFValue(14),
  },

  clearBtn: {
    marginLeft: RFValue(10),
    height: RFValue(48),
    paddingHorizontal: RFValue(14),
    borderRadius: RFValue(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBackground,
  },

  clearBtnText: {
    fontSize: RFValue(13),
    fontWeight: "700",
    color: colors.text,
  },

  errorText: {
    marginBottom: RFValue(10),
    color: "#ff6b6b",
    fontSize: RFValue(13),
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    paddingBottom: RFValue(24),
  },

  emptyBox: {
    paddingVertical: RFValue(30),
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: RFValue(14),
    textAlign: "center",
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(14),
    padding: RFValue(14),
    marginBottom: RFValue(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardSelected: {
    borderWidth: RFValue(1.5),
    borderColor: colors.text,
  },

  cardLeft: {
    flex: 1,
    paddingRight: RFValue(10),
  },

  cardTitle: {
    fontSize: RFValue(14),
    fontWeight: "800",
    color: colors.text,
  },

  cardSub: {
    marginTop: RFValue(4),
    fontSize: RFValue(12),
    color: colors.textSecondary,
  },

  checkbox: {
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(10),
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: colors.buttonBackground,
  },

  checkboxText: {
    color: colors.text,
    fontSize: RFValue(14),
    fontWeight: "900",
  },

  footerLoading: {
    paddingVertical: RFValue(14),
    alignItems: "center",
  },
});
