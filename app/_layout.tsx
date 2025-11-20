import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="createday"
            options={{
              title: "Gününü düzenle",
              presentation: "modal",
              animationMatchesGesture: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
