import React from "react";
import { Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={{
        borderRadius: 16,
        marginBottom: 20,
        marginTop: 7,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        paddingHorizontal: 24,
        paddingVertical: 14,
        elevation: 4,
        backgroundColor: "#ff6e00",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 26,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </Animated.View>
  );
}

export default StatCard;
