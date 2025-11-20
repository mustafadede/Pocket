import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

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
  const colorScheme = useColorScheme();
  const date = new Date().toLocaleDateString();
  const router = useRouter();
  console.log(date, selectedDate?.replaceAll("-", "/"));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        {/* Calendar */}
        <Animated.View
          entering={FadeIn.duration(500)}
          style={{
            backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 16,
            padding: 10,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Calendar
            style={{
              borderRadius: 16,
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#FF8A00",
              },
            }}
            enableSwipeMonths
            theme={{
              arrowColor: "#FF8A00",
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: colorScheme === "dark" ? "white" : "white",
              monthTextColor: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
              todayTextColor: "orange",
              dayTextColor: colorScheme === "dark" ? "white" : "#1A1A1A",
              selectedDayBackgroundColor: "#FF8A00",
              agendaDayTextColor: "white",
              selectedDayTextColor: "#FFFFFF",
            }}
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
              marginTop: 25,
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Seçilen Gün
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: colorScheme === "dark" ? "#FFB65E" : "#FF8A00",
              }}
            >
              {(() => {
                const dateObj = new Date(selectedDate);
                const options: Intl.DateTimeFormatOptions = {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                };
                return dateObj.toLocaleDateString("tr-TR", options);
              })()}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: colorScheme === "dark" ? "#FF9A1A" : "#FF8A00",
                paddingVertical: 12,
                borderRadius: 12,
              }}
              onPress={() => {
                if (today === selectedDate) {
                  router.push("/createday");
                }
                router.push("/viewday");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {today === selectedDate ? `Düzenle` : "Görüntüle"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
