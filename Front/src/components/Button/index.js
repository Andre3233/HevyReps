import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.buttunText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function LinkButton({ text, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.LinkButton}
      disabled={disabled}
    >
      <Text style={styles.LinkButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}
