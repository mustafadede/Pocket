import { initializeDatabase } from "@/src/db";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Toaster } from "sonner-native";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    initializeDatabase();
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <StatusBar style="auto" translucent />
      <KeyboardProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {loading ? (
            <SplashScreen />
          ) : (
            <Stack
              screenOptions={{
                headerTintColor: "#ff6e00",
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="createday"
                options={{
                  title: "Gününü düzenle",
                  headerBackTitle: "Geri dön",
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#121212" : "#FFFFFF",
                  },
                  animationMatchesGesture: true,
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="[viewday]"
                options={{
                  title: "Gün",
                  presentation: "modal",
                  animationMatchesGesture: true,
                  animation: "slide_from_right",
                  headerBackTitle: "Geri dön",
                }}
              />
              <Stack.Screen
                name="activities"
                options={{
                  title: "Aktiviteler",
                  animationMatchesGesture: true,
                  animation: "slide_from_right",
                  headerBackTitle: "Geri dön",
                }}
              />
              <Stack.Screen
                name="about"
                options={{
                  title: "Hakkında",
                  animationMatchesGesture: true,
                  animation: "slide_from_right",
                  headerBackTitle: "Geri dön",
                }}
              />
            </Stack>
          )}
        </ThemeProvider>
      </KeyboardProvider>
      <Toaster />
    </GestureHandlerRootView>
  );
}
