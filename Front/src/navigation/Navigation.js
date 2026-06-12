import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserRegister from "../screens/UserRegister";
import Login from "../screens/Login";
import Defenitions from "../screens/Definitions";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import MainTabs from "./MainTabs";
import DefenitionsStack from "./DefenitionsStack";

import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export function Navigation() {
  const { signed, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Defenitions"
              component={DefenitionsStack}
              options={{ animation: "slide_from_right" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Register"
              component={UserRegister}
              options={{ animation: "slide_from_right" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
