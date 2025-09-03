import React from "react";
import {
    GestureResponderEvent,
    Modal as RNModal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type ModalProps = {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  onApply?: (event?: GestureResponderEvent) => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  onApply,
  title,
  children,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Top-right Close button */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          {title && <Text style={styles.title}>{title}</Text>}

          {/* Content */}
          <View style={styles.content}>{children}</View>

          {/* Apply button */}
          {onApply && (
            <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 10,
  },
  closeIconText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#888",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 18,
    textAlign: "center",
  },
  content: {
    marginBottom: 24,
  },
  applyBtn: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  applyBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Modal;
