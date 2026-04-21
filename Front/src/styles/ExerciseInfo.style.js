import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(30),
  },

  header: {
    height: RFValue(40),
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    left: 0,
    padding: RFValue(6),
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(8),
  },

  headerTitle: {
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "800",
    color: colors.text,
  },

  errortext: {
    fontSize: RFValue(20),
    color: colors.textSecondary,
    textAlign: "center",
  },

  btnError: {
    marginTop: RFValue(10),
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10),
    alignSelf: "center",
    backgroundColor: colors.cardBackground,
  },

  btnTextError: {
    color: colors.textSecondary,
    fontSize: RFValue(12),
  },

  ResizeImage: {
    width: RFValue(320),
    height: RFValue(240),
  },

  text: {
    color: colors.text,
    fontSize: RFValue(14),
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    marginVertical: RFValue(12),
  },

  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: colors.text,
    marginBottom: RFValue(8),
  },

  infoText: {
    fontSize: RFValue(14),
    color: colors.textSecondary,
    marginVertical: RFValue(4),
  },

  instructionText: {
    fontSize: RFValue(13),
    color: colors.textSecondary,
    marginVertical: RFValue(6),
    lineHeight: RFValue(20),
  },

  imageCounter: {
    position: "absolute",
    top: RFValue(10),
    right: RFValue(10),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(4),
    borderRadius: RFValue(12),
  },
});
