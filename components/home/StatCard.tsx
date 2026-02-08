import CustomText from "@/components/ui/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { View } from "react-native";
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        elevation: 4,
        backgroundColor: "#ff6e00",
      }}
    >
      <View
        style={{
          display: "flex",
          rowGap: 5,
        }}
      >
        <CustomText
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 4,
          }}
        >
          {title}
        </CustomText>
        <CustomText
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: "700",
          }}
        >
          {value}
        </CustomText>
      </View>
      <View
        style={{
          width: 72,
          height: 72,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "100%",
          backgroundColor: "#ff8c33",
        }}
      >
        <AntDesign name="fire" size={48} color="white" />
      </View>
    </Animated.View>
  );
}

export default StatCard;
