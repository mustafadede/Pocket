import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ImageBackground } from "expo-image";
import { Drawer } from "expo-router/drawer";
import { Image, View } from "react-native";

export default function TabsLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          borderRadius: 40,
          marginVertical: 0,
          borderBottomWidth: 0.5,
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, height: "100%" }}>
            <DrawerContentScrollView {...props}>
              <ImageBackground
                source={require("@/assets/images/agenda-logo.png")}
                style={{
                  alignItems: "flex-start",
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: "transparent",
                }}
                imageStyle={{ opacity: 1, resizeMode: "contain" }}
              />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Ana Sayfa",
          title: "",
          headerTitleAlign: "center",
          headerTintColor: "orange",
          drawerActiveTintColor: "orange",
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
          },
          headerTitle: () => (
            <Image
              source={require("@/assets/images/agenda-logo.png")}
              style={{ width: 120, height: 40, resizeMode: "contain" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Ayarlar",
        }}
      />
    </Drawer>
  );
}
