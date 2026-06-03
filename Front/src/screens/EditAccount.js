import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  UsernameInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import { styles } from "../styles/EditAccount.style";

export default function EditAccountScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode } = route.params;

  const { changeUsername, changePassword } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function confirm(action) {
    Alert.alert("Confirmar alteração", "Tens a certeza que queres continuar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: action },
    ]);
  }

  async function handleSubmit() {
    if (mode === "username") {
      if (!username.trim()) {
        Alert.alert("Erro", "O username não pode estar vazio.");
        return;
      }
      confirm(async () => {
        try {
          await changeUsername(username.trim());
          navigation.goBack();
        } catch (e) {
          Alert.alert("Erro", e.message);
        }
      });
    }

    if (mode === "password") {
      if (!password || !password2) {
        Alert.alert("Erro", "Preenche os dois campos.");
        return;
      }
      if (password !== password2) {
        Alert.alert("Erro", "As passwords não coincidem.");
        return;
      }
      confirm(async () => {
        try {
          await changePassword(password);
          navigation.goBack();
        } catch (e) {
          Alert.alert("Erro", e.message);
        }
      });
    }
  }

  const config = {
    username: {
      title: "Mudar nome",
      subtitle: "Introduza o seu novo nome de utilizador.",
    },
    password: {
      title: "Mudar palavra-passe",
      subtitle: "A palavra-passe deve conter letras e numeros.",
    },
  };

  const { title, subtitle } = config[mode] ?? {
    title: "Editar conta",
    subtitle: "",
  };

  function renderInputs() {
    switch (mode) {
      case "username":
        return (
          <UsernameInput
            placeholder="Novo username"
            value={username}
            onChangeText={setUsername}
          />
        );
      case "password":
        return (
          <View>
            <PasswordInput
              placeholder="Nova palavra-passe"
              value={password}
              onChangeText={setPassword}
            />
            <ConfirmPasswordInput
              placeholder="Confirmar palavra-passe"
              value={password2}
              onChangeText={setPassword2}
            />
          </View>
        );
      default:
        return <Text style={styles.errorText}>Modo inválido</Text>;
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          <Text
            style={[
              styles.title,
              mode === "username" ? styles.titleUsername : styles.titlePassword,
            ]}
          >
            {title}
          </Text>

          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {renderInputs()}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Guardar alterações</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
