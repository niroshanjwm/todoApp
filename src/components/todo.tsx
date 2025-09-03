import React, { useContext } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TodoContext } from "../contexts/todo";
import { Todo as TodoType } from "../types";

const Todo = ({ id, todo, completed }: TodoType) => {
  const { toggleTodoComplete, loadingTodo } = useContext(TodoContext);

  const toggleHandler = () => {
    if (id != null) toggleTodoComplete?.(id, !completed);
  };

  const isLoading = loadingTodo === id;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, completed && styles.completedContainer]}
      onPress={toggleHandler}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#e6f4ea", // softer green for completed
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
    backgroundColor: "#28a745", // green circle for completed
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
});

export default Todo;
