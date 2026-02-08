import { MaterialIconName } from "@/constants/activities";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import CustomText from "./CustomText";

const ActivityComponent = ({
  item,
  toggleActivity,
  hasCheck = false,
}: {
  item: { id: number; label: string; done: boolean; icon?: MaterialIconName };
  toggleActivity?: (activityId: number) => Promise<void>;
  hasCheck: boolean;
}) => {
  const colorScheme = useColorScheme();
  return hasCheck ? (
    <TouchableOpacity
      key={item.id}
      onPress={() => toggleActivity && toggleActivity(item.id)}
      style={{
        flexDirection: "row",
        backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "white",
            width: 54,
            height: 54,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name={item.icon ?? "star"}
            size={24}
            color={colorScheme === "dark" ? "#FFFFFF" : "#ff6e00"}
          />
        </View>
        <CustomText
          style={{
            fontSize: 16,
            color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
            textDecorationStyle: "dashed",
          }}
        >
          {item.label}
        </CustomText>
      </View>
      <Checkbox
        value={!!item.done}
        onValueChange={() => toggleActivity && toggleActivity(item.id)}
        color="#ff6e00"
        style={{ width: 22, height: 22, borderRadius: 6 }}
      />
    </TouchableOpacity>
  ) : (
    <View
      key={item.id}
      style={{
        flexDirection: "row",
        backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "white",
            width: 54,
            height: 54,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name={item.icon ?? "star"}
            size={24}
            color={colorScheme === "dark" ? "#FFFFFF" : "#ff6e00"}
          />
        </View>
        <CustomText
          style={{
            fontSize: 16,
            color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
            textDecorationStyle: "dashed",
          }}
        >
          {item.label}
        </CustomText>
      </View>
      <View>
        {item.done ? (
          <FontAwesome6 name="check" size={24} color="green" />
        ) : (
          <Ionicons name="close" size={24} color="red" />
        )}
      </View>
    </View>
  );
};

export default ActivityComponent;
