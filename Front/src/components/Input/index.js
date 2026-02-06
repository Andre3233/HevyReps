import { View, Text, TextInput } from "react-native";
import { styles } from "./style";

export function UsernameInput({ value, onChangeText, error }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Nome de utilizador"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function EmailInput({ value, onChangeText, error }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function PasswordInput({ value, onChangeText, error }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Defina a palavra-pass"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function ConfirmPasswordInput({ value, onChangeText, error }) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Comfirmar a palavra-pass"
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
