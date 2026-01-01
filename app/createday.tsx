import {
  createNote,
  getActivitiesByNoteDate,
  getNoteByDate,
  updateActivity,
} from "@/src/db/notes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Createday = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [ratingStep, setRatingStep] = useState(false);
  const router = useRouter();

  const [activities, setActivities] = useState<
    { id: number; label: string; done: boolean }[]
  >([]);

  const today = new Date().toISOString().split("T")[0];

  useFocusEffect(() => {
    getNoteByDate(today).then((data) => {
      if (data) {
        setInput(data.content);
        setScore(data.score);
      }
    });

    getActivitiesByNoteDate(today).then((res) => {
      setActivities(res ?? []);
    });
  });

  const toggleActivity = async (activityId: number) => {
    const previous = activities;

    // optimistic UI
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, done: !a.done } : a))
    );

    const updated = activities.find((a) => a.id === activityId);
    if (!updated) return;

    try {
      await updateActivity(activityId, updated.label, !updated.done);
    } catch (e) {
      // rollback
      setActivities(previous);
    }
  };

  const addTask = (selectedScore: number) => {
    if (input.trim().length === 0) return;
    setTasks([...tasks, input]);

    createNote(today, input, selectedScore).then(() => {
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "android" ? 120 : 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              entering={FadeIn.duration(500)}
              layout={Layout}
              style={{
                backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginTop: 20,
                minHeight: 360,
                marginBottom: 14,
              }}
            >
              {!ratingStep ? (
                <TextInput
                  value={input}
                  multiline
                  numberOfLines={20}
                  onChangeText={setInput}
                  placeholder="Bugün neler yaptın ?"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#777" : "#A5A5A5"
                  }
                  style={{
                    fontSize: 16,
                    maxWidth: "100%",
                    color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                  }}
                />
              ) : (
                <Text
                  style={{
                    paddingTop: 10,
                    paddingLeft: 4,
                    fontSize: 16,
                    maxWidth: "100%",
                    color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                  }}
                >
                  {input}
                </Text>
              )}
            </Animated.View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                }}
              >
                Aktiviteler
              </Text>
              {!ratingStep && (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/activities");
                  }}
                >
                  <Octicons name="pencil" size={18} color="#ff6e00" />
                </TouchableOpacity>
              )}
            </View>
            {!ratingStep && (
              <Animated.View
                layout={Layout}
                style={{
                  marginTop: 20,
                  backgroundColor:
                    colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 12,
                  padding: 14,
                  gap: 12,
                }}
              >
                {activities.length === 0 && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colorScheme === "dark" ? "#777" : "#A5A5A5",
                      textAlign: "center",
                    }}
                  >
                    Henüz eklenmiş bir aktivite yok. Sağ üst kısımda bulunan
                    butona tıklayarak aktivitelerini ekleyebilirsin.
                  </Text>
                )}
                {activities.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleActivity(item.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                        textDecorationStyle: "dashed",
                      }}
                    >
                      {item.label}
                    </Text>

                    <Animated.View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: "#ff6e00",
                        backgroundColor: item.done ? "#ff6e00" : "transparent",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
            {ratingStep && (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                {activities.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      alignSelf: "flex-start",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 4,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 20,
                      backgroundColor: item.done
                        ? colorScheme === "dark"
                          ? "#333"
                          : "#EFEFEF"
                        : colorScheme === "dark"
                          ? "#1A1A1A"
                          : "#FFFFFF",
                      borderWidth: 1,
                      borderColor: item.done
                        ? colorScheme === "dark"
                          ? "#ff6e00"
                          : "#FF8A00"
                        : colorScheme === "dark"
                          ? "#444"
                          : "#DDD",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: item.done
                          ? colorScheme === "dark"
                            ? "#ff6e00"
                            : "#FF8A00"
                          : colorScheme === "dark"
                            ? "#fff"
                            : "#1A1A1A",
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          {!ratingStep ? (
            <TouchableOpacity
              onPress={() => setRatingStep(true)}
              style={{
                backgroundColor: score ? "red" : "#ff6e00",
                paddingVertical: 12,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                {score ? "Düzenle" : "Güne Puan Ver"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Animated.View
              entering={FadeIn.duration(500)}
              style={{
                marginBottom: 40,
                alignItems: "center",
                backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                paddingTop: 30,
                position: "relative",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setRatingStep(!ratingStep);
                }}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                }}
              >
                <Ionicons name="close-outline" size={34} color="#ff6e00" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 12,
                  color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                }}
              >
                Güne puanın nedir?
              </Text>
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => {
                      addTask(num);
                    }}
                    style={{
                      backgroundColor: "#ff6e00",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Createday;
