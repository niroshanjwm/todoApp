import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/input"; // reuse your Input component
import Modal from "../components/modal"; // optional modal for messages
import { useAuth } from "../contexts/auth";
import { authentication } from "../services/http";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await authentication(username, password);
      const { accessToken } = data.data;
      // Localstorage as temporary token storage
      localStorage.setItem("accessToken", accessToken);
      login();
    } catch (error) {
      setModalMessage(
        (error as Error).message || "Invalid username or password"
      );
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    navigation.navigate("List" as never);
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Logging in...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Login Error"
      >
        <Text style={{ color: "red", textAlign: "center" }}>
          {modalMessage}
        </Text>
      </Modal>

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.header}>Login</Text>

              <Input
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f4f7" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#212529",
    textAlign: "center",
  },
  input: { marginBottom: 16, marginTop: 16 },
  button: {
    marginTop: 8,
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default LoginScreen;
