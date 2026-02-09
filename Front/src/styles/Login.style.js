import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { RFValue } from "react-native-responsive-fontsize"; //Adapta tamanhos que eram fixos para acrãs diferendes

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: RFValue(10), //marge para de safe area
  },

  scrollview: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  title: {
    fontSize: RFValue(36),
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginTop: RFValue(15),
  },

  content: {
    flex: 1,
    paddingHorizontal: RFValue(24),
    paddingTop: RFValue(37),
    paddingBottom: RFValue(24),
  },

  header: {
    marginBottom: RFValue(25),
  },

  headerTop: {
    justifyContent: "center", // centro horizontal
  },
});
