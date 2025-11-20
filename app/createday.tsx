import Octicons from "@expo/vector-icons/Octicons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Createday = () => {
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const [activities, setActivities] = useState([
    { label: "Yürüyüş", done: false },
    { label: "Dehidrasyon", done: false },
    { label: "Push up", done: false },
  ]);

  const toggleActivity = (index: number) => {
    setActivities((prev) =>
      prev.map((activity, i) =>
        i === index ? { ...activity, done: !activity.done } : activity
      )
    );
  };

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
        paddingHorizontal: 20,
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
            minHeight: 360,
            marginBottom: 14,
          }}
        >
          <TextInput
            value={input}
            multiline
            numberOfLines={20}
            onChangeText={setInput}
            placeholder="Bugün neler yaptın ?"
            placeholderTextColor={colorScheme === "dark" ? "#777" : "#A5A5A5"}
            style={{
              fontSize: 16,
              maxWidth: "100%",
              color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
            }}
          />
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
            }}
          >
            Aktiviteler
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log("aktiviteler");
            }}
          >
            <Octicons name="pencil" size={18} color="orange" />
          </TouchableOpacity>
        </View>
        <Animated.View
          layout={Layout}
          style={{
            marginTop: 20,
            backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 12,
            padding: 14,
            gap: 12,
          }}
        >
          {activities.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleActivity(index)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                  textDecorationStyle: "dashed",
                }}
              >
                {item.label}
              </Text>

              <Animated.View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: colorScheme === "dark" ? "#FF9A1A" : "#FF8A00",
                  backgroundColor: item.done
                    ? colorScheme === "dark"
                      ? "#FF9A1A"
                      : "#FF8A00"
                    : "transparent",
                }}
              />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </KeyboardAvoidingView>
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
          Gününü gir
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Createday;
