import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { styles } from "../styles/Defenitions.style";
import { ImgPicker } from "../components/ImgProfile";

function SettingsRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={22} color="#c3c6d0" />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={22} color="#8d9199" />
    </TouchableOpacity>
  );
}

export default function Defenitions() {
  const { signOut, deleteAccount, changeProfileImage } =
    useContext(AuthContext);
  const navigation = useNavigation();
  const [pickerVisible, setPickerVisible] = useState(false);

  function handleDelete() {
    Alert.alert("Apagar conta", "Esta ação é irreversível", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAccount();
          } catch (e) {
            console.log(e.message);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Definições</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Secção conta */}
        <View style={styles.section}>
          <SettingsRow
            icon="person"
            label="Mudar nome de utilizador"
            onPress={() =>
              navigation.navigate("EditAccount", { mode: "username" })
            }
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="lock"
            label="Mudar palavra-passe"
            onPress={() =>
              navigation.navigate("EditAccount", { mode: "password" })
            }
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="photo-camera"
            label="Alterar foto de perfil"
            onPress={() => setPickerVisible(true)}
          />
        </View>

        {/* Botões de sessão */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={signOut}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={20} color="#ffffff" />
            <Text style={styles.logoutText}>Terminar sessão</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <MaterialIcons name="delete-forever" size={20} color="#ffb4ab" />
            <Text style={styles.deleteText}>Apagar conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ImgPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onImageSelected={changeProfileImage}
      />
    </View>
  );
}
