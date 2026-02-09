import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../api/loginUser";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //Guarda info do user
  const [token, setToken] = useState(null); //Guarda o token JWT
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Quando a app abre tenta carregar sessão
    async function loadStorageData() {
      const storageToken = await AsyncStorage.getItem("@token");
      const storageUser = await AsyncStorage.getItem("@user");

      if (storageToken && storageUser) {
        setToken(storageToken);
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(identifier, password) {
    try {
      const data = await loginUser(identifier, password);
      setToken(data.access_token);
      setUser(data.user);

      await AsyncStorage.setItem("@token", data.access_token);
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));

      return { success: true };
    } catch (err) {
      console.log("Erro no login: ", err);
      return { success: false, message: err.detail || "Erro desconhecido" };
    }
  }

  async function singOut() {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
}
