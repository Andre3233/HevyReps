import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "../styles/ExerciseInfo.style";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExercise } from "../api/exercises";

export default function ExerciseInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, name } = route.params || {};

  const { fetchWithAuth } = useContext(AuthContext);
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!id || !name) return;
    async function fetchExerciseData() {
      try {
        const data = await getExercise(fetchWithAuth, id);
        setExerciseData(data);
      } catch (error) {
        console.log("Erro ao buscar exercício: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchExerciseData();
  }, [id, fetchWithAuth]);

  function handleGoBack() {
    navigation.goBack();
  }

  if (!id || !name) {
    return (
      <View style={styles.container}>
        <Text style={styles.errortext}>Erro: exercício não encontrado</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnError}
        >
          <Text style={styles.btnTextError}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.backButton}
          hitSlop={{
            top: RFValue(22),
            bottom: RFValue(22),
            left: RFValue(22),
            right: RFValue(22),
          }}
        >
          <MaterialIcons name="arrow-back" size={RFValue(20)} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: "relative" }}>
          <ScrollView
            horizontal
            snapToInterval={RFValue(320)}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              const scrollX = event.nativeEvent.contentOffset.x;
              const index = Math.round(scrollX / RFValue(320));
              setImageIndex(index);
            }}
          >
            {exerciseData?.frames.map((imageURL, Index) => (
              <Image
                key={Index}
                source={{ uri: imageURL }}
                style={styles.ResizeImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
          <View style={{ position: "absolute", top: 210, right: 15 }}>
            <Text style={styles.text}>
              {imageIndex + 1}/{exerciseData?.frames.length}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          <Text style={styles.infoText}>
            Músculos primário: {exerciseData?.primary_muscle}
          </Text>
          {exerciseData?.secondary_muscles.length > 0 && (
            <Text style={styles.infoText}>
              Músculos Secundário: {exerciseData?.secondary_muscles?.join(", ")}
            </Text>
          )}
          <Text style={styles.infoText}>
            Equipamento: {exerciseData?.equipment}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Instruções</Text>
          {exerciseData?.instructions.map((Instructions, Index) => (
            <Text key={Index} style={styles.infoText}>
              {Index + 1}- {Instructions}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
