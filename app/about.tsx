import CustomText from "@/components/ui/CustomText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const About = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const textColor = isDark ? "#ffffff" : "#1a1a1a";
  const secondaryText = isDark ? "#a0a0a0" : "#666666";
  const accentColor = "#ff6e00";
  const cardBg = isDark ? "#1a1a1a" : "#f8f9fa";

  const features = [
    {
      icon: "shield-check",
      title: "Tam Gizlilik",
      description: "Tüm veriler cihazınızda korunur. Hiçbir veri paylaşılmaz.",
    },
    {
      icon: "database",
      title: "Çevrimdışı Çalışır",
      description: "İnternet olmadan da tam işlevsellik. Veriniz hep sizin.",
    },
    {
      icon: "lightning-bolt",
      title: "Hızlı & Hafif",
      description:
        "Optimize edilmiş performans. Azami hız, minimal alan kullanımı.",
    },
  ];

  const FeatureCard = ({
    icon,
    title,
    description,
    delay,
  }: {
    icon: string;
    title: string;
    description: string;
    delay: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(delay)}
      style={{
        backgroundColor: cardBg,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name={icon as any}
          size={28}
          color={accentColor}
          style={{ marginRight: 16, marginTop: 2 }}
        />
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: textColor,
              marginBottom: 6,
            }}
          >
            {title}
          </CustomText>
          <CustomText
            style={{
              fontSize: 14,
              color: secondaryText,
              lineHeight: 20,
            }}
          >
            {description}
          </CustomText>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <Animated.View
        entering={FadeIn.duration(400)}
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: accentColor,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 16,
          }}
        >
          <Image
            source={require("@/assets/images/pocket-logo.png")}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
          />
        </View>
        <CustomText
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: textColor,
            marginBottom: 8,
          }}
        >
          Pocket
        </CustomText>
        <CustomText
          style={{
            fontSize: 14,
            color: secondaryText,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          v1.0.0
        </CustomText>
        <CustomText
          style={{
            fontSize: 16,
            color: textColor,
            textAlign: "center",
            lineHeight: 24,
            fontWeight: "500",
          }}
        >
          Modern ajanda uygulaması
        </CustomText>
      </Animated.View>

      {/* Main Description */}
      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 20,
          paddingVertical: 20,
          backgroundColor: cardBg,
          marginHorizontal: 20,
          borderRadius: 16,
        }}
      >
        <CustomText
          style={{
            fontSize: 15,
            color: textColor,
            lineHeight: 24,
            textAlign: "center",
          }}
        >
          Pocket, günlük planlarınızı, görevlerinizi ve notlarınızı tamamen
          cihazınızda saklayan gizlilik odaklı modern bir ajandadır. Hiçbir veri
          paylaşılmaz. Tüm kontrol ve sahiplik yalnızca sizdedir.
        </CustomText>
      </View>

      {/* Features Section */}
      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
        <CustomText
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: textColor,
            marginBottom: 16,
          }}
        >
          Özellikleri
        </CustomText>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index * 100}
          />
        ))}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 20,
          paddingTop: 20,
          height: "auto",
          backgroundColor: isDark
            ? "rgba(255, 110, 0, 0.1)"
            : "rgba(255, 110, 0, 0.05)",
          marginHorizontal: 20,
          borderRadius: 16,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color={accentColor}
            style={{ marginRight: 10 }}
          />
          <CustomText
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: textColor,
            }}
          >
            Gizlilik Taahhüdümüz
          </CustomText>
        </View>
        <CustomText
          style={{
            fontSize: 14,
            color: secondaryText,
            lineHeight: 22,
          }}
        >
          • Ajanda içerisindeki oluşturduğunuz not veya aktiviteler uzak
          sunuculara gönderilmez{"\n"}• Tüm bilgileriniz cihazınızda korunur
          {"\n"}
        </CustomText>
      </View>

      {/* Links Section */}
      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
        <CustomText
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: textColor,
            marginBottom: 12,
          }}
        >
          Bağlantılar
        </CustomText>
        <TouchableOpacity
          style={{
            backgroundColor: cardBg,
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            Linking.openURL("https://github.com/mustafadede/Pocket")
          }
        >
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: textColor,
            }}
          >
            GitHub
          </CustomText>
          <Ionicons name="chevron-forward" size={20} color={secondaryText} />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <CustomText
          style={{
            fontSize: 12,
            color: secondaryText,
            textAlign: "center",
          }}
        >
          © 2026 Pocket
        </CustomText>
      </View>
    </ScrollView>
  );
};

export default About;
