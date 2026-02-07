import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button({title, onPress, disabled}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttunText}>{title}</Text>
    </TouchableOpacity>
  );
}
