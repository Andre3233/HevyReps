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
import { styles } from "../styles/Login.style";
import { useState, useEffect } from "react";
import {
  UsernameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "../components/Input";
import { ImgProfile, ImgDefault } from "../components/ImgProfile";
import { Button } from "../components/Button";
import { useIsFocused } from "@react-navigation/native";

export default function Login() {
  const image = require("../../assets/Logo.png");
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
              <Text style={styles.title}>Login</Text>
              <ImgDefault />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
