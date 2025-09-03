import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Todo from "../components/todo";
import { TodoContext } from "../contexts/todo";

const ToDoListScreen = () => {
  const { todos, loading, error } = useContext(TodoContext);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.todo}
        renderItem={({ item }) => <Todo {...item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});

export default ToDoListScreen;
