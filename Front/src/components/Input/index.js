import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { styles } from "./style";
import { RFValue } from "react-native-responsive-fontsize";

export function UsernameInput({ value, onChangeText, error, editable }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Nome de utilizador"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function EmailInput({ value, onChangeText, error, editable }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function PasswordInput({ value, onChangeText, error, editable = true }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, { paddingRight: RFValue(48) }]}
        placeholder="Palavra-pass"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeButton}
        activeOpacity={0.6}
      >
        <Image
          source={
            showPassword
              ? require("../../../assets/HidePassword.png")
              : require("../../../assets/ShowPassword.png")
          }
          style={styles.eyeIcon}
        />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function ConfirmPasswordInput({ value, onChangeText, error, editable }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <TextInput
        style={[styles.input, { paddingRight: RFValue(48) }]}
        placeholder="Confirmar a Palavra-pass"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeButton}
        activeOpacity={0.6}
      >
        <Image
          source={
            showPassword
              ? require("../../../assets/HidePassword.png")
              : require("../../../assets/ShowPassword.png")
          }
          style={styles.eyeIcon}
        />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function IdentifierInput({
  value,
  onChangeText,
  error,
  editable = true,
}) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Nome de utilizador ou email"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
