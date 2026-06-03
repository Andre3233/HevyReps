import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollview: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontWeight: "700",
    color: "#ffffff",
  },
  titleUsername: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 6,
  },
  titlePassword: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
    marginBottom: 20,
  },

  fieldBlock: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#94a3b8",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  eyeButton: {
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
  },
  hintText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 6,
    lineHeight: 16,
    fontStyle: "italic",
  },

  // Info box (password)
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    gap: 8,
    marginTop: 4,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 18,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
    backgroundColor: "#0f172a",
  },
  saveButton: {
    backgroundColor: "#264570",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
