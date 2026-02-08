import StatCard from "@/components/home/StatCard";
import CustomText from "@/components/ui/CustomText";
import { getAllNotes } from "@/src/db/notes";
import { dateFormatter } from "@/utils/dateFormatter";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { toast } from "sonner-native";

LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  dayNames: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"],
};

LocaleConfig.defaultLocale = "tr";

export default function HomeScreen() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [notes, setNotes] = useState<{ [key: string]: boolean }>({});
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    getAllNotes().then((notes) => {
      notes.forEach((note) => {
        setNotes((prev) => ({ ...prev, [note.date]: true }));
      });
    });

    const configureNotificationsAsync = async () => {
      const response = await Notifications.requestPermissionsAsync();
      if (response.granted) {
        toast("Bildirimlerini ayarlar sekmesinden değiştirebilirsin");
      }
    };

    configureNotificationsAsync();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingTop: 14,
      }}
    >
      <StatCard
        title="Aktif Gün Sayısı"
        value={Object.keys(notes).length ? Object.keys(notes).length + 1 : 0}
      />
      {/* Calendar */}
      <Animated.View
        entering={FadeIn.duration(500)}
        style={{
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
          borderRadius: 16,
          paddingHorizontal: 10,
          paddingBottom: 10,
          paddingTop: 0,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Calendar
          key={colorScheme}
          style={{
            borderRadius: 16,
          }}
          maxDate={today}
          markedDates={{
            ...Object.fromEntries(
              Object.entries(notes).map(([date, exists]) => [
                date,
                {
                  marked: exists,
                  dotColor: "#ff6e00",
                },
              ]),
            ),
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#ff6e00",
              marked: notes[selectedDate],
              dotColor: "#ff6e00",
            },
          }}
          enableSwipeMonths
          theme={{
            arrowColor: "#ff6e00",
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            textSectionTitleColor: colorScheme === "dark" ? "white" : "white",
            monthTextColor: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
            todayTextColor: "orange",
            dayTextColor: colorScheme === "dark" ? "white" : "#1A1A1A",
            selectedDayBackgroundColor: "#ff6e00",
            agendaDayTextColor: "white",
            selectedDayTextColor: "#FFFFFF",
          }}
          renderArrow={(direction) => (
            <View>
              {direction === "left" ? (
                <SimpleLineIcons
                  name="arrow-left"
                  size={14}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              ) : (
                <SimpleLineIcons
                  name="arrow-right"
                  size={14}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              )}
            </View>
          )}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />
      </Animated.View>

      {/* Selected Date Display */}
      {selectedDate && (
        <Animated.View
          key={selectedDate}
          entering={FadeIn.duration(900)}
          exiting={FadeOut.duration(300)}
          layout={Layout}
          style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <CustomText
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Seçilen Gün
          </CustomText>
          <CustomText
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#ff6e00",
            }}
          >
            {dateFormatter(selectedDate)}
          </CustomText>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#ff6e00",
              paddingVertical: 12,
              borderRadius: 12,
            }}
            onPress={() => {
              if (today === selectedDate) {
                router.push("/createday");
              } else {
                router.push(`/viewday?id=${selectedDate}`);
              }
            }}
          >
            <CustomText
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {today === selectedDate ? `Yazı gir` : "Görüntüle"}
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ScrollView>
  );
}
