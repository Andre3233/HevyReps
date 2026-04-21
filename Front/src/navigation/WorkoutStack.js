import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workouts from "../screens/Workouts";
import WorkoutEditor from "../screens/WorkoutEditor";
import ExercisePicker from "../screens/ExercisePicker";
import ExerciseInfo from "../screens/ExerciseInfo";

const Stack = createNativeStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="WorkoutEditor" component={WorkoutEditor} />
      <Stack.Screen name="ExercisePicker" component={ExercisePicker} />
      <Stack.Screen name="ExerciseInfo" component={ExerciseInfo} />
    </Stack.Navigator>
  );
}
