import { Image } from "expo-image";
import React from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const SplashScreen = () => {
  const colorScheme = useColorScheme();

  const offset = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  React.useEffect(() => {
    offset.value = withTiming(-70, { duration: 800 });
    textOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "black" : "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {/* Logo starts centered, then slides left */}
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 12,
              marginTop: -24,
            },
          ]}
        >
          <Image
            source={require("../assets/images/pocket-logo.png")}
            contentFit="cover"
            style={{ width: 140, height: 140 }}
          />
        </Animated.View>

        {/* Text appears after move */}
        <Animated.Text
          style={[
            {
              fontSize: 64,
              fontWeight: "bold",
              color: "#ff7a00",
              opacity: 0,
              marginBottom: 10,
              fontFamily: "Inter-Regular",
            },
            animatedTextStyle,
          ]}
        >
          Pocket
        </Animated.Text>
      </View>
      <ActivityIndicator size={"large"} color={"#ff7a00"} />
    </View>
  );
};

export default SplashScreen;
