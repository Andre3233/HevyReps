import { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "../api/config";
import { refreshAccessToken as refreshAccessTokenApi } from "../api/AuthToken";
import { loginUser } from "../api/loginUser";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //Guarda info do user
  const [token, setToken] = useState(null); //Guarda o token JWT
  const [loading, setLoading] = useState(true);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const refreshTimer = useRef(null); //Guarda o temporizador

  useEffect(() => {
    async function loadStorageData() {
      const storedExpiration =
        await SecureStore.getItemAsync("tokenExpiration");
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        const storedUser = await AsyncStorage.getItem("@user");

        if (storedExpiration && Date.now() >= Number(storedExpiration)) {
          console.log("Token expirado, tentar refresh...");
          await refreshAccessToken();
        } else if (storedToken && storedUser && storedExpiration) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setTokenExpiration(Number(storedExpiration));

          scheduleTokenRefresh(Number(storedExpiration));

          // valida sessão em background (SEM bloquear app)
          fetchWithAuth(`${BACKEND_URL}/protected/`, {}, storedToken).catch(
            (e) => console.log("Erro ao validar sessão:", e.message),
          );
        }
      } catch (e) {
        console.log("Erro ao carregar sessão", e);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
    };
  }, []);

  async function signIn(accessToken, refreshToken, user) {
    await SecureStore.setItemAsync("userToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await AsyncStorage.setItem("@user", JSON.stringify(user));

    setToken(accessToken);
    setUser(user);

    const expiration = getTokenExpiration(accessToken);

    if (expiration !== null) {
      await SecureStore.setItemAsync("tokenExpiration", String(expiration));
      setTokenExpiration(expiration);
      scheduleTokenRefresh(expiration);
    }
  }

  function getTokenExpiration(accessToken) {
    try {
      const payload = jwtDecode(accessToken); //decodifica o payload
      return payload.exp * 1000;
    } catch (e) {
      return null;
    }
  }

  async function refreshAccessToken() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (!refreshToken) throw new Error("Refresh token não encontrado");

    const data = await refreshAccessTokenApi(refreshToken);

    await SecureStore.setItemAsync("userToken", data.access_token);

    const expiration = getTokenExpiration(data.access_token);
    setToken(data.access_token);
    setTokenExpiration(expiration);

    if (expiration !== null) {
      await SecureStore.setItemAsync("tokenExpiration", String(expiration));
      scheduleTokenRefresh(expiration);
    }
    return data.access_token;
  }

  async function fetchWithAuth(url, options = {}, forcedToken = null) {
    let accessToken = forcedToken || token;

    // Se não houver token no state, tenta ler do SecureStore
    if (!accessToken) {
      accessToken = await SecureStore.getItemAsync("userToken");
    }

    if (!accessToken) {
      throw new Error("Sem token");
    }

    const expiration =
      tokenExpiration ||
      Number(await SecureStore.getItemAsync("tokenExpiration"));

    if (expiration && Date.now() >= expiration) {
      accessToken = await refreshAccessToken();
    }

    const response = await fetchWithTimeout(
      url,
      {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
      5000,
    );

    if (response.status === 401) {
      accessToken = await refreshAccessToken();

      return await fetchWithTimeout(
        url,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
        5000,
      );
    }

    return response;
  }

  async function signOut() {
    // Limpa token e refreshToken
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("tokenExpiration");
    await AsyncStorage.removeItem("@user");

    // Limpa estado
    setUser(null);
    setToken(null);

    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
    }
  }

  async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  //Auto Refresh
  function scheduleTokenRefresh(expiration) {
    if (!expiration) return;

    const now = Date.now();

    const refreshTime = expiration - now - 60000;

    if (refreshTime <= 0) return;

    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
    }

    refreshTimer.current = setTimeout(async () => {
      console.log("Auto refresh do token...");
      try {
        await refreshAccessToken();
      } catch (e) {
        console.log("Falha no auto refresh: ", e.message);
      }
    }, refreshTime);
  }

  async function login(identifier, password) {
    try {
      const data = await loginUser(identifier, password);

      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const user = data.user;

      await signIn(accessToken, refreshToken, user);
    } catch (error) {
      console.log("Erro no login:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signed: !!token && !!user,
        login,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
