import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import WorkoutEditor from "../../screens/WorkoutEditor";

export function DropdownMenuWorkouts({
  isOpen,
  onToggle,
  onDelete,
  deleteLabel,
  openWorktEditor,
  mode,
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
            style={styles.optionBtn}
            onPress={onDelete}
            activeOpacity={0.85}
          >
            <MaterialIcons name="delete-outline" size={18} color="#ff4d4f" />
            <Text style={styles.deleteText}>{deleteLabel}</Text>
          </TouchableOpacity>

          {mode === "workouts" && (
            <>
              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.optionBtn}
                onPress={openWorktEditor}
                activeOpacity={0.85}
              >
                <MaterialIcons name="edit" size={18} color="white" />
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}
