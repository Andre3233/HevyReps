import { View, Text, TextInput, Animated } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect } from "react";

export function UsernameInput({ value, onChangeText, error }) {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);
  return (
    <View>
      <Animated.View>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Nome de utilizador"
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          keyboardType="default"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </Animated.View>
    </View>
  );
}

export function EmailInput({ value, onChangeText, error }) {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);
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
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);
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
  const shakeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);
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
