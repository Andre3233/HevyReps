import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(10),
    margin: RFValue(4),
    borderRadius: RFValue(8),
    alignItems: "center",
    marginTop: RFValue(22),
  },
  buttunText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
});
