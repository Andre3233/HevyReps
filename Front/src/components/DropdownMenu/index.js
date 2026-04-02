import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function DropdownMenu({
  isOpen,
  onToggle,
  onDelete,
  deleteLabel,
}) {
  return (
    <View style={styles.menuWrapper}>
      <TouchableOpacity
        onPress={onToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons name="more-vert" size={22} color="#ffff" />
      </TouchableOpacity>

      {isOpen && (
        
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={onDelete}
            activeOpacity={0.85}
          >
            <View style={styles.deleteRow}>
              <MaterialIcons name="delete-outline" size={18} color="#ff4d4f" />
              <Text style={styles.deleteText}>{deleteLabel}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
