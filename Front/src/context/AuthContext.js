import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../api/loginUser";
import * as SecureStore from "expo-secure-store";
import { jsx } from "react/jsx-runtime";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //Guarda info do user
  const [token, setToken] = useState(null); //Guarda o token JWT
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        const storedUser = await AsyncStorage.getItem("@user");

        if (storedToken) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.log("Erro ao carregar sesão", e);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(token, user) {
    await SecureStore.setItemAsync("userToken", token);
    await AsyncStorage.setItem("@user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("userToken");
    await AsyncStorage.removeItem("@user");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signed: !!token && !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
