import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserRegister from "../screens/UserRegister";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Defenitions from "../screens/Definitions";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export function Navigation() {
  const { signed, loading } = useContext(AuthContext);
  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Defenitions"
              component={Defenitions}
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
