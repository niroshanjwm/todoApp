import { MaterialIcons } from "@expo/vector-icons"; // ✅ Expo built-in icons
import React, { useContext, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TodoContext } from "../contexts/todo";
import { Todo as TodoType } from "../types";

const Todo = ({ id, todo, completed }: TodoType) => {
  const { toggleTodoComplete, loadingTodo, deleteTodo } =
    useContext(TodoContext);

  const [showDelete, setShowDelete] = useState(false);

  const toggleHandler = () => {
    if (id != null) toggleTodoComplete?.(id, !completed);
  };

  const onToggleDeleteHandler = () => {
    setShowDelete((previousShowDelete) => !previousShowDelete);
  };

  const onDeletePress = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (confirmed) {
        id && deleteTodo?.(id);
      }
    } else {
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            id && deleteTodo?.(id);
          },
        },
      ]);
    }
  };

  const isLoading = loadingTodo === id;

  return (
    <View style={[styles.container, completed && styles.completedContainer]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.todoContent}
        onPress={toggleHandler}
        onLongPress={onToggleDeleteHandler}
        disabled={isLoading}
      >
        <View style={styles.indicatorContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#28a745" />
          ) : (
            <View
              style={[
                styles.statusIndicator,
                completed && styles.completedIndicator,
              ]}
            />
          )}
        </View>
        <Text style={[styles.text, completed && styles.completedText]}>
          {todo}
        </Text>
      </TouchableOpacity>
      {showDelete && (
        <TouchableOpacity onPress={onDeletePress} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={22} color="#d9534f" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  completedContainer: {
    backgroundColor: "#e6f4ea",
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  indicatorContainer: {
    width: 20,
    height: 20,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  completedIndicator: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 6,
  },
});

export default Todo;
