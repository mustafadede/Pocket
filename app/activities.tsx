import ActivityRow from "@/components/activities/ActivityRow";
import {
  deleteActivity as deleteActivityDB,
  getActivitiesByNoteDate,
  updateAllActivities,
} from "@/src/db/notes";
import { Activities } from "@/src/models/Note";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

const activities = () => {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState<Activities[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const noteDate = new Date().toISOString().split("T")[0];
  const navigation = useNavigation();

  const addActivity = async () => {
    if (clicked) return;

    const tempId = 0;
    setActivities((prev) => [
      ...prev,
      { id: tempId, note_date: noteDate, label: "", done: false },
    ]);
    setClicked(true);
  };

  const removeActivity = async (id: number) => {
    const previous = activities;

    setActivities((prev) => prev.filter((a) => a.id !== id));

    try {
      await deleteActivityDB(id);
    } catch (e) {
      setActivities(previous);
    } finally {
      setClicked(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={addActivity}
          disabled={clicked}
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
            color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
          />
        </Pressable>
      ),
    });
  }, [navigation, addActivity, clicked, colorScheme]);

  useEffect(() => {
    getActivitiesByNoteDate(noteDate).then((res) => {
      setActivities(res ?? []);
    });
  }, [noteDate]);

  const updateActivity = useCallback(
    (activity: Activities, newLabel: string) => {
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, label: newLabel } : a))
      );
    },
    []
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
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          alignSelf: "center",
          fontWeight: "600",
          marginBottom: 16,
          color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        }}
      >
        Burada aktivitelerini güncelleyebilir, ekleyebilir veya silebilirsin
      </Text>
      {activities.map((activity) => (
        <ActivityRow
          key={activity.id}
          activity={activity}
          colorScheme={colorScheme}
          onChangeText={updateActivity}
          onDelete={removeActivity}
        />
      ))}
      <Pressable
        style={{
          marginTop: 8,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "#ff6e00",
          alignItems: "center",
        }}
        onPress={updateActivities}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            "Aktiviteleri güncelle"
          )}
        </Text>
      </Pressable>
    </View>
  );
};

export default activities;
