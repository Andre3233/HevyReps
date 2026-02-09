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
import * as SecureStore from "expo-secure-store";
//import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const navigation = useNavigation();
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
          <View style={styles.headerTop}>
            <Text style={styles.title}>Perfil</Text>
            <ImgDefault />
          </View>
          <Button
            title={"⚙️"}
            onPress={() => navigation.navigate("Defenitions")}
          ></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
