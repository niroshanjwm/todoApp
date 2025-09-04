import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { AuthProvider } from "./src/contexts/auth";
import { TodoProvider } from "./src/contexts/todo";
import LoginScreen from "./src/pages/login";
import ToDoListScreen from "./src/pages/todoList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="List"
              component={ToDoListScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </AuthProvider>
  );
}
