import {
  Image,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./style";

export function ImgDefault() {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../assets/Logo.png")} // imagem padrão
          style={styles.img}
        />
      </View>
    </View>
  );
}

export function ImgProfile({ image, onChangeImage }) {
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChangeImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={image ? { uri: image } : require("../../../assets/Logo.png")}
          style={styles.img}
        />

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolhe a tua foto</Text>
            <View style={styles.modalOption}>
              <TouchableOpacity onPress={pickImage} style={styles.modalOption} activeOpacity={0.7}>
                <Text>Galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={takePhoto} style={styles.modalOption} activeOpacity={0.7}>
                <Text>Câmara</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
