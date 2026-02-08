import ActivityComponent from "@/components/ui/ActivityComponent";
import CustomText from "@/components/ui/CustomText";
import { MaterialIconName } from "@/constants/activities";
import {
  createNote,
  getActivitiesByNoteDate,
  getNoteByDate,
  updateActivity,
  updateNote,
} from "@/src/db/notes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const Createday = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [ratingStep, setRatingStep] = useState(false);
  const router = useRouter();

  const [activities, setActivities] = useState<
    { id: number; label: string; done: boolean; icon?: MaterialIconName }[]
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
      if (!res) {
        setActivities([]);
        return;
      }

      const mapped = res.map((a) => ({
        id: a.id,
        label: a.label,
        done: a.done,
        icon: a.icon as MaterialIconName | undefined,
      }));

      setActivities(mapped);
    });
  });

  const toggleActivity = async (activityId: number) => {
    const previous = activities;

    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, done: !a.done } : a)),
    );

    const updated = activities.find((a) => a.id === activityId);
    if (!updated) return;

    try {
      await updateActivity(activityId, updated.label, !updated.done);
    } catch (e) {
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

  const updateTask = (date: string, content: string) => {
    updateNote(date, content).then(() => {
      navigation.goBack();
      toast.success("Not güncellendi");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          style={{ flex: 1, backgroundColor: "transprent" }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
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
                    fontFamily: "Inter-Regular",
                    fontSize: 16,
                    maxWidth: "100%",
                    color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                  }}
                />
              ) : (
                <CustomText
                  style={{
                    paddingTop: 10,
                    paddingLeft: 4,
                    fontSize: 16,
                    maxWidth: "100%",
                    color: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                  }}
                >
                  {input}
                </CustomText>
              )}
            </Animated.View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText
                style={{
                  fontWeight: 700,
                  fontSize: 24,
                  color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                }}
              >
                Aktiviteler
              </CustomText>
              {!ratingStep ? (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/activities");
                  }}
                >
                  <CustomText style={{ color: "#ff6e00" }}>Düzenle</CustomText>
                </TouchableOpacity>
              ) : null}
            </View>
            {activities.length === 0 ? (
              <CustomText
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  color: colorScheme === "dark" ? "#777" : "#A5A5A5",
                  textAlign: "center",
                }}
              >
                Henüz eklenmiş bir aktivite yok. Sağ üst kısımda bulunan butona
                tıklayarak aktivitelerini ekleyebilirsin.
              </CustomText>
            ) : null}
            {!ratingStep ? (
              <Animated.View
                layout={Layout}
                style={{
                  marginVertical: 20,
                  borderRadius: 12,
                  gap: 12,
                }}
              >
                {activities.map((item) => (
                  <ActivityComponent
                    key={item.id}
                    item={item}
                    toggleActivity={() => toggleActivity(item.id)}
                    hasCheck
                  />
                ))}
              </Animated.View>
            ) : null}
            {ratingStep ? (
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
                    <CustomText
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
                    </CustomText>
                  </View>
                ))}
              </View>
            ) : null}
          </ScrollView>
          {!ratingStep ? (
            <View style={{ marginBottom: 10 }}>
              <LinearGradient colors={["white", "black"]} style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() =>
                  score ? updateTask(today, input) : setRatingStep(true)
                }
                style={{
                  backgroundColor: score ? "red" : "#ff6e00",
                  paddingVertical: 12,
                  borderRadius: 12,
                }}
              >
                {score ? (
                  <CustomText
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#FFFFFF",
                    }}
                  >
                    Düzenle
                  </CustomText>
                ) : (
                  <CustomText
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#FFFFFF",
                    }}
                  >
                    Güne Puan Ver
                  </CustomText>
                )}
              </TouchableOpacity>
            </View>
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
              <CustomText
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 12,
                  color: colorScheme === "dark" ? "#fff" : "#1A1A1A",
                }}
              >
                Güne puanın nedir?
              </CustomText>
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
                    <CustomText style={{ color: "#fff", fontWeight: "600" }}>
                      {num}
                    </CustomText>
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
