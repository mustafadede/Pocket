import ActivityRow from "@/components/activities/ActivityRow";
import CustomText from "@/components/ui/CustomText";
import { iconNames } from "@/constants/activities";
import {
  deleteActivity as deleteActivityDB,
  getActivitiesByNoteDate,
  updateAllActivities,
} from "@/src/db/notes";
import { Activities } from "@/src/models/Note";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const activities = () => {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState<Activities[]>([]);
  const [loading, setLoading] = useState(false);
  const [iconPickerFor, setIconPickerFor] = useState<number | null>(null);
  const [tempSelectedIcon, setTempSelectedIcon] =
    useState<keyof typeof MaterialIcons.glyphMap>("star");

  const applySelectedIcon = () => {
    if (iconPickerFor === null) return;

    setActivities((prev) =>
      prev.map((a) =>
        a.id === iconPickerFor
          ? {
              ...a,
              icon: tempSelectedIcon as keyof typeof MaterialIcons.glyphMap,
            }
          : a,
      ),
    );

    setIconPickerFor(null);
  };
  const router = useRouter();
  const noteDate = new Date().toISOString().split("T")[0];
  const navigation = useNavigation();

  const addActivity = async () => {
    const tempId = 0;
    setActivities((prev) => [
      ...prev,
      {
        id: tempId,
        note_date: noteDate,
        label: "",
        done: false,
        icon: "star",
      },
    ]);
  };

  const removeActivity = async (id: number) => {
    const previous = activities;

    setActivities((prev) => prev.filter((a) => a.id !== id));

    try {
      await deleteActivityDB(id);
    } catch (e) {
      setActivities(previous);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={addActivity}
          hitSlop={10}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: Platform.OS === "ios" ? 4 : 8,
          }}
        >
          <Feather
            name="plus"
            size={Platform.OS === "ios" ? 26 : 22}
            color={"#ff6e00"}
          />
        </Pressable>
      ),
    });
  }, [navigation, addActivity, colorScheme]);

  useEffect(() => {
    getActivitiesByNoteDate(noteDate).then((res) => {
      setActivities(res ?? []);
    });
  }, [noteDate]);

  const updateActivity = useCallback(
    (activity: Activities, newLabel: string) => {
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, label: newLabel } : a)),
      );
    },
    [],
  );

  const updateActivities = async () => {
    setLoading(true);

    await updateAllActivities(activities).then((res) => {
      if (res) {
        router.back();
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        flex: 1,
      }}
    >
      <CustomText
        style={{
          fontSize: 10,
          alignSelf: "center",
          fontWeight: 600,
          marginBottom: 16,
          color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        }}
      >
        Burada aktivitelerini güncelleyebilir, ekleyebilir veya silebilirsin
      </CustomText>
      {activities.map((activity) => (
        <View key={activity.id} style={{ marginBottom: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable
              onPress={() => {
                setTempSelectedIcon((activity as any).icon ?? "star");
                setIconPickerFor(activity.id);
              }}
            >
              <MaterialIcons
                name={(activity as any).icon ?? "star"}
                size={26}
                color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
                style={{
                  marginBottom: 10,
                }}
              />
            </Pressable>
            <View style={{ flex: 1 }}>
              <ActivityRow
                activity={activity}
                colorScheme={colorScheme}
                onChangeText={updateActivity}
                onDelete={removeActivity}
              />
            </View>
          </View>
        </View>
      ))}
      <Modal visible={iconPickerFor !== null} transparent animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setIconPickerFor(null)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#ffffff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
                paddingBottom: 40,
              }}
            >
              <CustomText
                style={{
                  fontSize: 21,
                  fontWeight: 600,
                  marginBottom: 16,
                  color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                }}
              >
                Bir ikon seç
              </CustomText>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={iconNames}
                keyExtractor={(item) => item}
                numColumns={6}
                style={{ maxHeight: 260, marginBottom: 10 }}
                contentContainerStyle={{ gap: 16 }}
                initialNumToRender={36}
                windowSize={5}
                removeClippedSubviews
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 4,
                      backgroundColor:
                        tempSelectedIcon === item ? "#ff6e00" : "transparent",
                      borderRadius: 10,
                      height: 60,
                    }}
                    onPress={() => setTempSelectedIcon(item)}
                  >
                    <MaterialIcons
                      name={item}
                      size={36}
                      color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
                    />
                  </Pressable>
                )}
              />
              <Pressable
                onPress={applySelectedIcon}
                style={{
                  marginTop: 24,
                  backgroundColor: "#ff6e00",
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <CustomText
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600 }}
                >
                  Tamam
                </CustomText>
              </Pressable>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      <Pressable
        style={{
          marginTop: 8,
          marginBottom: 20,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "#ff6e00",
          alignItems: "center",
        }}
        onPress={updateActivities}
      >
        <CustomText
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            "Aktiviteleri güncelle"
          )}
        </CustomText>
      </Pressable>
    </ScrollView>
  );
};

export default activities;
