import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  Appearance,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const colorScheme = useColorScheme();
  const navigate = useNavigation();
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
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Genel</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="notifications-outline" size={22} color="#ff6e00" />
            <Text style={styles.label}>Bildirimler</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? "#ff6e00" : "#ccc"}
            trackColor={{ true: "#ffd7b3", false: "#ccc" }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="moon-outline" size={22} color="#ff6e00" />
            <Text style={styles.label}>Karanlık Mod</Text>
          </View>
          <Switch
            value={colorScheme === "dark"}
            onValueChange={() => {
              const newTheme = colorScheme === "dark" ? "light" : "dark";
              Appearance.setColorScheme(newTheme);
            }}
            thumbColor={colorScheme === "dark" ? "#ff6e00" : "#ccc"}
            trackColor={{ true: "#ffd7b3", false: "#ccc" }}
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

      {/* <Text style={styles.sectionTitle}>Sayfalar</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigate("/activites", {})} style={styles.row}>
          <View style={styles.left}>
            <FontAwesome5 name="running" size={22} color="#ff6e00" />
            <Text style={styles.label}>Aktiviteler</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View> */}

      <Text style={styles.sectionTitle}>Diğer</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="help-circle-outline" size={22} color="#ff6e00" />
            <Text style={styles.label}>Yardım & Destek</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.left}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#ff6e00"
            />
            <Text style={styles.label}>Hakkında</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
