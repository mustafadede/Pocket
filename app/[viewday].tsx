import { getNoteByDate } from "@/src/db/notes";
import { dateFormatter } from "@/utils/dateFormatter";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

const viewday = () => {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<{
    content: string;
    activities?: string[];
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
            }
          : null
      );
    });
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {note && note.content.length > 0 ? (
        <View>
          <Text
            style={{
              color: colorScheme === "dark" ? "white" : "black",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            {note.content}
          </Text>

          {note.activities && note.activities.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 10,
              }}
            >
              {note.activities.map((item, index) => (
                <View
                  key={index}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    backgroundColor: "#ff6e00",
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <Text
          style={{
            color: "gray",
            width: "100%",
            fontSize: 16,
            textAlign: "center",
            marginTop: 10,
            fontStyle: "italic",
          }}
        >
          Bu gün için henüz bir not eklenmemiş.
        </Text>
      )}
    </View>
  );
};

export default viewday;
