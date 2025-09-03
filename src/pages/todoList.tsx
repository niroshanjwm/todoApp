import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/input";
import Modal from "../components/modal";
import Todo from "../components/todo";
import { TodoContext } from "../contexts/todo";

const ToDoListScreen = () => {
  const { todos, loading, error, addTodo } = useContext(TodoContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    setShowAddModal(true);
  };

  const onApplyHandler = async () => {
    try {
      if (todoText.trim() === "") {
        return;
      }
      await addTodo?.(todoText);
      setTodoText("");
      setShowAddModal(false);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <Modal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onApply={onApplyHandler}
        title="Add New Todo"
      >
        <Input
          value={todoText}
          onChangeText={setTodoText}
          placeholder="Enter todo..."
        />
      </Modal>

      <View style={styles.container}>
        <Text style={styles.header}>ToDos</Text>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.todo}
          renderItem={({ item }) => <Todo {...item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <TouchableOpacity style={styles.fab} onPress={handleAddTodo}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#212529",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
});

export default ToDoListScreen;
