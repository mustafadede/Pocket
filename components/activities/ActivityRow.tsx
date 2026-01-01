import { Activities } from "@/src/models/Note";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { memo } from "react";
import { ColorSchemeName, Pressable, TextInput, View } from "react-native";

interface Props {
  activity: Activities;
  onChangeText: (activity: Activities, newLabel: string) => void;
  onDelete: (id: number) => void;
  colorScheme: ColorSchemeName;
}

const ActivityRow = memo(
  ({ activity, onChangeText, onDelete, colorScheme }: Props) => {
    return (
      <View
        style={{
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextInput
          value={activity.label}
          onChangeText={(text) => onChangeText(activity, text)}
          placeholder="Buraya bir aktivite gir"
          placeholderTextColor="gray"
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
          onPress={() => onDelete(activity.id)}
          style={{
            paddingHorizontal: 12,
            borderRadius: 8,
            height: 48,
            justifyContent: "center",
            backgroundColor: "#FF3B30",
          }}
        >
          <FontAwesome5 name="trash" size={18} color="white" />
        </Pressable>
      </View>
    );
  }
);

export default ActivityRow;
