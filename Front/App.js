import { Navigation } from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "./src/styles/colors";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(colors.tabBar);
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
