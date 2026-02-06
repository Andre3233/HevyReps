import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: RFValue(12),
    padding: RFValue(16),
    borderRadius: RFValue(8),
    marginTop: RFValue(18),
  },
  inputError: {
    borderWidth: 2,
    borderColor: "#ef4444",
  },

  errorText: {
    color: "#ef4444",
    marginTop: RFValue(6),
    fontSize: RFValue(14),
  },
});
