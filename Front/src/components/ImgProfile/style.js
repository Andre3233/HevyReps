import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: RFValue(12),
  },
  imageWrapper: {
    position: "relative",
  },
  img: {
    width: RFValue(95),
    height: RFValue(95),
    borderRadius: RFValue(60),
    borderWidth: 2,
    borderColor: "#94a3b8",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(14),
    backgroundColor: "#94a3b8",
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#999999",
    borderRadius: RFValue(12),
    padding: RFValue(20),
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: RFValue(13),
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginLeft: 10,
  },
  cancel: {
    marginTop: RFValue(3),
    textAlign: "center",
    color: "#ef4444",
  },
});
