import { Navigation } from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "./src/styles/colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WorkoutProvider } from "./src/context/WorkoutContext";
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
        <WorkoutProvider>
          <Navigation />
        </WorkoutProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
