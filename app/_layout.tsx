import { initializeDatabase } from "@/src/db";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    initializeDatabase();
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <StatusBar style="auto" />
      <KeyboardProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {loading ? (
            <SplashScreen />
          ) : (
            <Stack>
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
            </Stack>
          )}
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
