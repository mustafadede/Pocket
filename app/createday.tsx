import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Createday = () => {
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim().length === 0) return;
    setTasks([...tasks, input]);
    setInput("");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#0D0D0D" : "#F8F9FB",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}
      >
        {/* Görev Ekleme Input */}
        <Animated.View
          entering={FadeIn.duration(500)}
          layout={Layout}
          style={{
            backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOpacity: 0.07,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 4,
            marginBottom: 14,
          }}
        >
          <TextInput
            value={input}
            multiline
            numberOfLines={10}
            onChangeText={setInput}
            placeholder="Görev ekle..."
            placeholderTextColor={colorScheme === "dark" ? "#777" : "#A5A5A5"}
            style={{
              fontSize: 16,
              color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
            }}
          />
        </Animated.View>

        {/* Görev Listesi */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {tasks.map((task, index) => (
            <Animated.View
              key={task + index}
              entering={FadeInUp.duration(300)}
              layout={Layout}
              style={{
                backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
                padding: 16,
                borderRadius: 14,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                }}
              >
                • {task}
              </Text>
            </Animated.View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Görevi Ekle Butonu */}
      <TouchableOpacity
        onPress={addTask}
        style={{
          backgroundColor: colorScheme === "dark" ? "#FF9A1A" : "#FF8A00",
          paddingVertical: 12,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          Görevi Ekle
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Createday;
