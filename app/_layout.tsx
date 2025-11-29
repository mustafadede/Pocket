import { initializeDatabase } from "@/src/db";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="createday"
            options={{
              title: "Gününü düzenle",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFFFF",
              },
              presentation: "modal",
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
      </ThemeProvider>
    </KeyboardProvider>
  );
}
