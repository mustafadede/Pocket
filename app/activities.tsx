import { getAllActivities } from "@/src/db/notes";
import { Activities, ActivitiesResponse } from "@/src/models/Note";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, useColorScheme, View } from "react-native";

const activities = () => {
  const colorScheme = useColorScheme();
  const [allActivities, setAllActivities] = useState<Activities[]>([]);
  useEffect(() => {
    getAllActivities().then((res) => {
      if (!res) {
        setAllActivities([]);
        return;
      }

      const typedRes = res as ActivitiesResponse;

      if (typeof typedRes.activities === "string") {
        try {
          const parsed = JSON.parse(typedRes.activities);
          setAllActivities(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          console.error("Activities parse edilemedi", e);
          setAllActivities([]);
        }
      } else {
        setAllActivities(typedRes.activities);
      }
    });
  }, []);

  const updateActivity = (index: number, newLabel: string) => {
    setAllActivities((prev) =>
      prev.map((item, i) => (i === index ? { ...item, label: newLabel } : item))
    );
  };

  const addActivity = () => {
    setAllActivities((prev) => [...prev, { label: "", done: false }]);
  };

  const removeActivity = (index: number) => {
    setAllActivities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          alignSelf: "center",
          fontWeight: "600",
          marginBottom: 16,
          color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        }}
      >
        Burada aktivitelerini güncelleyebilir, ekleyebilir veya silebilirsin
      </Text>
      {allActivities.map((activity, index) => (
        <View
          key={index}
          style={{
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TextInput
            value={activity.label}
            onChangeText={(text) => updateActivity(index, text)}
            style={{
              backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
              height: 48,
              color: colorScheme === "dark" ? "white" : "black",
              flex: 1,
              borderRadius: 12,
              paddingHorizontal: 24,
            }}
          />
          <Pressable
            onPress={() => removeActivity(index)}
            style={{
              paddingHorizontal: 12,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              backgroundColor: "#FF3B30",
            }}
          >
            <FontAwesome5 name="trash" size={18} color={"white"} />
          </Pressable>
        </View>
      ))}
      <Pressable
        onPress={addActivity}
        style={{
          marginTop: 8,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "#ff6e00",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
          Yeni aktivite ekle
        </Text>
      </Pressable>
    </View>
  );
};

export default activities;
