import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/Login.style";
import { useState, useContext } from "react";
import { PasswordInput, IdentifierInput } from "../components/Input";
import { ImgDefault } from "../components/ImgProfile";
import { Button, LinkButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../api/loginUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: null, password: null });
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin() {
    //Validação simples antees de enviar para o Back
    const newErros = {
      identifier: null,
      password: null,
    };
    if (identifier.trim() === "")
      newErros.identifier = "Introduza o nome de utilizador ou email.";

    if (password.trim() === "") newErros.password = "Introduza a palavra-pass.";
    setErrors(newErros);

    if (newErros.identifier || newErros.password) return;

    setLoading(true);
    try {
      const result = await loginUser(identifier, password);
      await signIn(result.access_token, result.user);
    } catch (error) {
      setErrors({
        identifier: error?.detail || "Credenciais inválidas",
        password: null,
      });
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
              <Text style={styles.title}>Login</Text>
              <ImgDefault />
            </View>
            <IdentifierInput
              value={identifier}
              onChangeText={setIdentifier}
              error={errors.identifier}
              editable={!loading}
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              editable={!loading}
            />
            <Button
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Entrar"
                )
              }
              onPress={handleLogin}
              disabled={loading}
            />
            <LinkButton
              text="Criar Conta"
              onPress={() => navigation.navigate("Register")}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
