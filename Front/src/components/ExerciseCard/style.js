import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  exerciseSets: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFValue(8),
  },

  column: {
    flex: 1,
    alignItems: "center",
    gap: RFValue(4),
  },

  columnLabel: {
    fontSize: RFValue(11),
    color: colors.textSecondary,
    fontWeight: "600",
  },

  setNumber: {
    fontSize: RFValue(14),
    color: colors.text,
    fontWeight: "700",
    height: RFValue(36),
    textAlignVertical: "center",
  },

  textInput: {
    width: "90%",
    height: RFValue(36),
    backgroundColor: colors.inputBackground,
    borderRadius: RFValue(8),
    color: colors.text,
    fontSize: RFValue(14),
    textAlign: "center",
    selectionColor: colors.text,
  },

  addBtn: {
    width: "100%",
    height: RFValue(44),
    backgroundColor: colors.buttonBackground,
    borderRadius: RFValue(12),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(10),
  },

  addBtnText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: RFValue(14),
  },

  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "flex-end",
},

modalSheet: {
  backgroundColor: colors.cardBackground,
  borderTopLeftRadius: RFValue(20),
  borderTopRightRadius: RFValue(20),
  padding: RFValue(20),
  gap: RFValue(12),
},

modalTitle: {
  fontSize: RFValue(14),
  fontWeight: "700",
  color: colors.textSecondary,
  textAlign: "center",
  marginBottom: RFValue(4),
},

modalDeleteBtn: {
  paddingVertical: RFValue(14),
  alignItems: "center",
},

modalDeleteText: {
  fontSize: RFValue(15),
  fontWeight: "700",
  color: "#ff4d4f",
},

modalCancelBtn: {
  paddingVertical: RFValue(14),
  alignItems: "center",
},

modalCancelText: {
  fontSize: RFValue(15),
  fontWeight: "600",
  color: colors.text,
},
});
