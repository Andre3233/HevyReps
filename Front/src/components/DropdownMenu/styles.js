import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  menuWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    position: "absolute",
    top: RFValue(23),
    right: 0,
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(6),
    minWidth: RFValue(160),
    borderWidth: 1,
    borderColor: "#2a3a4f",
    zIndex: 9999,
    elevation: 9999,
  },
  deleteBtn: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
  },
  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
  },
  deleteText: {
    color: "#ff4d4f",
    fontWeight: "700",
    fontSize: RFValue(14),
  },
  editText: {
    color: "white",
    fontWeight: "600",
    fontSize: RFValue(14),
  },

  divider: {
    height: 1,
    backgroundColor: "#2a3a4f",
    marginHorizontal: RFValue(10),
  },
});
