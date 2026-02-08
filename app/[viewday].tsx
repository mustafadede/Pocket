import ActivityComponent from "@/components/ui/ActivityComponent";
import CustomText from "@/components/ui/CustomText";
import { getNoteByDate } from "@/src/db/notes";
import { Activities } from "@/src/models/Note";
import { dateFormatter } from "@/utils/dateFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, useColorScheme, View } from "react-native";

const viewday = () => {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<{
    content: string;
    activities?: Activities[];
    score?: number;
  } | null>(null);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    const formattedDate = dateFormatter(id as string);
    navigation.setOptions({
      title: formattedDate || "Not görüntüle",
    });

    getNoteByDate(id as string).then((note) => {
      setNote(
        note
          ? {
              content: note.content,
              activities: note.activities ? JSON.parse(note.activities) : [],
              score: note.score,
            }
          : null,
      );
    });
  }, []);

  const EmojiMoodScore = ({ score }: { score: number }) => {
    const fade = React.useRef(new Animated.Value(0)).current;
    const mood =
      score >= 4 ? "🔥" : score >= 3 ? "🙂" : score >= 2 ? "😐" : "😞";

    React.useEffect(() => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: fade,
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 20,
          backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
          width: "100%",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <CustomText style={{ fontSize: 50, marginBottom: 4 }}>
          {mood}
        </CustomText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText
            style={{
              fontSize: 28,
              fontWeight: "700",
              color:
                score >= 4 ? "#22c55e" : score >= 3 ? "#f59e0b" : "#ef4444",
            }}
          >
            {score}
          </CustomText>
          <CustomText
            style={{
              fontWeight: "400",
              color: "gray",
              fontSize: 18,
            }}
          >
            /5
          </CustomText>
        </View>
      </Animated.View>
    );
  };

  const ProgressSummary = () => {
    if (!note?.activities || note.activities.length === 0) return null;

    const total = note.activities.length;
    const done = note.activities.filter((a) => a.done).length;
    const missed = total - done;
    const ratio = total === 0 ? 0 : Math.round((done / total) * 100);

    return (
      <View
        style={{
          padding: 20,
          borderRadius: 12,
          backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
          position: "relative",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="pie-chart" size={21} color="#ff6e00" />
          <CustomText
            style={{
              fontSize: 21,
              fontWeight: "600",
              marginLeft: 6,
              color: colorScheme === "dark" ? "gray" : "black",
            }}
          >
            İlerleme
          </CustomText>
        </View>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              paddingTop: 20,
            }}
          >
            <CustomText
              style={{
                color: colorScheme === "dark" ? "white" : "black",
                marginRight: 10,
                backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
              }}
            >
              Tamamlanan
            </CustomText>
            <CustomText
              style={{
                fontWeight: 600,
                fontSize: 24,
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              {done}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              paddingTop: 20,
            }}
          >
            <CustomText
              style={{
                color: colorScheme === "dark" ? "white" : "black",
                marginRight: 10,
                backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#c4c4c4",
              }}
            >
              YAPILMADI
            </CustomText>
            <CustomText
              style={{
                fontWeight: 600,
                fontSize: 24,
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              {missed}
            </CustomText>
          </View>
          <CustomText
            style={{
              position: "absolute",
              right: 0,
              top: -24,
              fontWeight: 700,
              fontSize: 24,
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            %{ratio}
          </CustomText>
        </View>

        <View
          style={{
            width: "100%",
            height: 10,
            backgroundColor: colorScheme === "dark" ? "#444" : "#ddd",
            borderRadius: 10,
            marginTop: 8,
          }}
        >
          <View
            style={{
              width: `${ratio}%`,
              height: "100%",
              backgroundColor: "#22c55e",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
      {note && note.content.length > 0 ? (
        <View>
          {note.score !== undefined && note.score !== null && (
            <EmojiMoodScore score={note.score} />
          )}
          <CustomText
            style={{
              color: colorScheme === "dark" ? "white" : "black",
              fontSize: 16,
              marginBottom: 20,
              lineHeight: 24,
            }}
          >
            {note.content}
          </CustomText>
          <ProgressSummary />
          <CustomText
            style={{
              color: colorScheme === "dark" ? "white" : "black",
              fontWeight: "700",
              fontSize: 24,
              marginVertical: 20,
            }}
          >
            Aktiviteler
          </CustomText>
          {note.activities && note.activities.length > 0 && (
            <View style={{ flexDirection: "column", gap: 10 }}>
              {note.activities.map((item, index) => (
                <ActivityComponent key={item.id} item={item} hasCheck={false} />
              ))}
            </View>
          )}
        </View>
      ) : (
        <CustomText
          style={{
            color: "gray",
            width: "100%",
            fontSize: 16,
            textAlign: "center",
            marginTop: 10,
            fontStyle: "italic",
          }}
        >
          Bu gün için bir not eklenmemiş.
        </CustomText>
      )}
    </View>
  );
};

export default viewday;
