import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Defenitions from "../screens/Definitions";
import EditAccount from "../screens/EditAccount";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={Defenitions} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
    </Stack.Navigator>
  );
}