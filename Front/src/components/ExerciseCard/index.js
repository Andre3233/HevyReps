import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./style";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

export default function ExerciseCard({
  exercise_sets,
  onAddSet,
  onEditSet,
  onDeleteSet,
}) {
  const [setModal, setSetModal] = useState({ visible: false, setIndex: null });

  function handleCloseModal() {
    setSetModal({ visible: false, setIndex: null });
  }
  return (
    <View>
      <View style={styles.info}>
        {(exercise_sets || []).map((exercise_set, index) => (
          <View key={index} style={styles.exerciseSets}>
            <View style={styles.column}>
              <Text style={styles.columnLabel}>Série</Text>
              <Text
                style={styles.setNumber}
                onPress={() => setSetModal({ visible: true, setIndex: index })}
                hitSlop={{
                  top: RFValue(10),
                  bottom: RFValue(10),
                  left: RFValue(10),
                  right: RFValue(10),
                }}
              >
                {index + 1}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnLabel}>Repetições</Text>
              <TextInput
                style={styles.textInput}
                value={
                  exercise_set.repetitions === 0
                    ? ""
                    : String(exercise_set.repetitions)
                }
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                onChangeText={(value) => onEditSet(index, "repetitions", value)}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.columnLabel}>Kg</Text>
              <TextInput
                style={styles.textInput}
                value={
                  exercise_set.weight === 0 ? "" : String(exercise_set.weight)
                }
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                onChangeText={(value) => onEditSet(index, "weight", value)}
              />
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={onAddSet} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Adicionar série</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={setModal.visible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Pressable
            style={styles.modalSheet}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Opções da série</Text>

            <TouchableOpacity
              style={styles.modalDeleteBtn}
              onPress={() => {
                onDeleteSet(setModal.setIndex);
                handleCloseModal();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="close" size={20} color="#ff4d4f" />
                <Text style={styles.modalDeleteText}>
                  Remover série {setModal.setIndex + 1}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={handleCloseModal}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
