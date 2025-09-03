import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoListScreen from "./src/pages/todoList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ToDoListScreen} />
        <Stack.Screen name="Details" component={ToDoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
