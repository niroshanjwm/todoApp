// src/components/AuthGuard.tsx
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../contexts/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation();

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You must login to access this screen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login" as never)}
        />
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
