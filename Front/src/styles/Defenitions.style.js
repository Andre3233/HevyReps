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
    alignItems: "center",
    paddingHorizontal: RFValue(20),
    paddingTop: RFValue(20),
    paddingBottom: RFValue(16),
    gap: RFValue(12),
  },

  title: {
    fontSize: RFValue(24),
    fontWeight: "700",
    color: colors.text,
  },

  scrollContent: {
    paddingHorizontal: RFValue(20),
    paddingBottom: RFValue(40),
  },

  // Secção com as rows
  section: {
    backgroundColor: "#171f33",
    borderRadius: RFValue(14),
    overflow: "hidden",
    marginBottom: RFValue(24),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(16),
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(10),
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginRight: RFValue(14),
  },

  rowLabel: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: colors.text,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(67, 71, 79, 0.4)",
    marginHorizontal: RFValue(16),
  },

  // Botões de ação
  actionsSection: {
    gap: RFValue(12),
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(52),
    backgroundColor: "#171f33",
    borderRadius: RFValue(14),
    borderWidth: 1,
    borderColor: "rgba(67, 71, 79, 0.3)",
    gap: RFValue(8),
  },

  logoutText: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: colors.text,
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(52),
    backgroundColor: "rgba(147, 0, 10, 0.15)",
    borderRadius: RFValue(14),
    borderWidth: 1,
    borderColor: "rgba(255, 180, 171, 0.3)",
    gap: RFValue(8),
  },

  deleteText: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#ffb4ab",
  },
});
