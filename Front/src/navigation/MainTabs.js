import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import Workouts from "../screens/Workouts";
import Profile from "../screens/Profile";
import WorkoutStack from "./WorkoutStack";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Treinos") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={RFValue(22)} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#888",

        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopWidth: RFValue(0),
          height: RFValue(67),
        },
      })}
    >
      <Tab.Screen name="Treinos" component={WorkoutStack} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
