import { StatusBar } from "expo-status-bar";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  Animated,
} from "react-native";
import { styles } from "../styles/UserRegister.style";
import { useState, useEffect } from "react";
import {
  UsernameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "../components/Input";
import { ImgProfile } from "../components/ImgProfile";
import { Button } from "../components/Button";
import { useIsFocused } from "@react-navigation/native";
import { registerUser } from "../api/registerUser";

export default function UserRegister({ route }) {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  function ValidEmail(email) {
    email = email.trim();

    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Regex.test(email);
  }
  async function handleRegister() {
    //Aqui os inputs passão por uma validação antes de serem enviadados para o Back
    const newErros = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
    if (username.trim() === "") {
      newErros.username = "Preencha o nome de utilizador.";
    }

    if (email.trim() === "") {
      newErros.email = "Prencha o email.";
    } else if (!ValidEmail(email)) {
      newErros.email = "Email invalido.";
    }

    if (password.trim() === "") {
      newErros.password = "Defina uma palavra-pass.";
    } else if (confirmPassword.trim() === "") {
      newErros.confirmPassword = "Confirme a palavra-pass.";
    } else if (password !== confirmPassword) {
      newErros.confirmPassword =
        "As palavras-passe não coincidem. Tente novamente.";
    }
    setErrors(newErros);

    const hasError = Object.values(newErros).some((e) => e !== null);
    if (hasError) return; // Se ouver erro não envia nada para o BAck

    //Envia os dadoa para o Back
    try {
      setLoading(true);
      const data = await registerUser({
        username,
        email,
        password,
        profile_image_url: image || null,
      });
      alert("Conta criada com sucesso! Bem vindo " + data.data.username);
    } catch (err) {
      let message = "Ocorreu um erro inesperado. Tente novamente.";

      if (err?.detail) {
        if (Array.isArray(err.detail)) {
          //Erros da API
          message = err.detail[0].msg;
        } else {
          //Erros manuais(email / user repetidos)
          message = err.detail;
        }
      }
      Alert.alert("Erro", message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.scrollview}>
        <View style={styles.content}>
          <StatusBar style="dark" />
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>Cadastro</Text>
              <ImgProfile image={image} onChangeImage={setImage} />
            </View>

            <UsernameInput
              value={username}
              onChangeText={setUsername}
              error={errors.username}
            />
            <EmailInput
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />
            <ConfirmPasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
            />

            <Button
              title="Criar Conta"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <View>
                  <Text style={styles.title}>A criar conta</Text>
                </View>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
