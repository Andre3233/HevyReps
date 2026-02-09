import { StatusBar } from "expo-status-bar";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/UserRegister.style";
import { useState } from "react";
import {
  UsernameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "../components/Input";
import { ImgProfile } from "../components/ImgProfile";
import { Button, LinkButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../api/registerUser";

export default function UserRegister({ route }) {
  const navigation = useNavigation();

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
    console.log("Erro no registro: ", newErros);

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
      const newErrors = {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      };

      if (err?.detail) {
        if (Array.isArray(err.detail)) {
          //Erros dsa validações do Back
          err.detail.forEach((e) => {
            if (e.loc && e.loc[0] && newErrors.hasOwnProperty(e.loc[0])) {
              newErrors[e.loc[0]] = e.msg;
            }
          });
        } else {
          if (err.detail.toLowerCase().includes("username"))
            newErrors.username = err.detail;
          else if (err.detail.toLowerCase().includes("email"))
            newErrors.email = err.detail;
          else newErrors.username = err.detail; // fallback
        }
      } else {
        newErrors.username = "Ocorreu um erro inesperado. Tente novamente.";
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
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
              editable={!loading}
            />
            <EmailInput
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              editable={!loading}
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              editable={!loading}
            />
            <ConfirmPasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              editable={!loading}
            />

            <Button
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Criar conta"
                )
              }
              onPress={handleRegister}
              disabled={loading}
            ></Button>
            <LinkButton
              text="Login"
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
