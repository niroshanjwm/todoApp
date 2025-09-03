import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TodoProvider } from "./src/contexts/todo";
import ToDoListScreen from "./src/pages/todoList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen
            name="List"
            component={ToDoListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={ToDoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
