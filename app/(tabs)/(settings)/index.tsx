import CustomText from "@/components/ui/CustomText";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Appearance,
  Linking,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import SwitchToggle from "react-native-switch-toggle";

const NOTIFICATION_PREF_KEY = "notifications_enabled";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 20,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
      marginBottom: -5,
      fontFamily: "Inter-Regular",
    },

    card: {
      backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
      borderRadius: 16,
      paddingHorizontal: 18,
      paddingVertical: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
    },

    left: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },

    label: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
      fontWeight: "500",
      fontFamily: "Inter-Regular",
    },

    switchIOS: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
  });

  const enableNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Bildirim İzni gerekli",
        "Hatırlatıcıları açmak için bildirim izmi vermeniz gerekiyor.",
        [
          { text: "İptal", style: "cancel" },
          { text: "Ayarlar", onPress: () => Linking.openSettings() },
        ],
      );
      setNotifications(false);
      await AsyncStorage.setItem(NOTIFICATION_PREF_KEY, "false");
      return;
    }
    setNotifications(true);
    await AsyncStorage.setItem(NOTIFICATION_PREF_KEY, "true");
  };

  const disableNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setNotifications(false);
    await AsyncStorage.setItem(NOTIFICATION_PREF_KEY, "false");
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.sectionTitle}>Genel</CustomText>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="notifications-outline" size={22} color="#ff6e00" />
            <CustomText style={styles.label}>Bildirimler</CustomText>
          </View>
          <SwitchToggle
            switchOn={notifications}
            onPress={() => {
              if (notifications) {
                disableNotifications();
              } else {
                enableNotifications();
              }
            }}
            containerStyle={{
              width: 46,
              height: 26,
              borderRadius: 13,
            }}
            circleStyle={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#ffffff",
            }}
            backgroundColorOn="#34c759"
            backgroundColorOff="#e5e5ea"
            circleColorOn="#ffffff"
            circleColorOff="#ffffff"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="moon-outline" size={22} color="#ff6e00" />
            <CustomText style={styles.label}>Karanlık Mod</CustomText>
          </View>
          <SwitchToggle
            switchOn={colorScheme === "dark"}
            onPress={() => {
              const newTheme = colorScheme === "dark" ? "light" : "dark";
              Appearance.setColorScheme(newTheme);
            }}
            containerStyle={{
              width: 46,
              height: 26,
              borderRadius: 13,
            }}
            circleStyle={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#ffffff",
            }}
            backgroundColorOn="#34c759"
            backgroundColorOff="#e5e5ea"
            circleColorOn="#ffffff"
            circleColorOff="#ffffff"
          />
        </View>
      </View>

      {/* <Text style={styles.sectionTitle}>Hesap</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="person-outline" size={22} color="#ff6e00" />
            <Text style={styles.label}>Profil Bilgileri</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="lock-closed-outline" size={22} color="#ff6e00" />
            <Text style={styles.label}>Şifre Değiştir</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View> */}

      <CustomText style={styles.sectionTitle}>Sayfalar</CustomText>

      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.push("/activities")}
          style={styles.row}
        >
          <View style={styles.left}>
            <FontAwesome5 name="running" size={22} color="#ff6e00" />
            <CustomText style={styles.label}>Aktiviteler</CustomText>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <CustomText style={styles.sectionTitle}>Diğer</CustomText>

      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.push("/about")}
          style={styles.row}
        >
          <View style={styles.left}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#ff6e00"
            />
            <CustomText style={styles.label}>Hakkında</CustomText>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
