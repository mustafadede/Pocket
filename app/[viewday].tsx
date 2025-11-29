import { getNoteByDate } from "@/src/db/notes";
import { Activities } from "@/src/models/Note";
import { dateFormatter } from "@/utils/dateFormatter";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

const viewday = () => {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<{
    content: string;
    activities?: Activities[];
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
    <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
      <StatusBar translucent />
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
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 6,
                    color: colorScheme === "dark" ? "white" : "black",
                    textAlign: "center",
                  }}
                >
                  Bugünün Özeti
                </Text>
                {(() => {
                  const total = note.activities!.length;
                  const done = note.activities!.filter((a) => a.done).length;
                  const missed = total - done;
                  const ratio = Math.round((done / total) * 100);
                  return (
                    <>
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            color: colorScheme === "dark" ? "white" : "black",
                            marginRight: 10,
                          }}
                        >
                          Yapılanlar: {done}
                        </Text>
                        <Text
                          style={{
                            color: colorScheme === "dark" ? "white" : "black",
                            marginRight: 10,
                          }}
                        >
                          Yapılmayanlar: {missed}
                        </Text>
                        <Text
                          style={{
                            color: colorScheme === "dark" ? "white" : "black",
                          }}
                        >
                          Başarı Oranı: %{ratio}
                        </Text>
                      </View>
                      {/* 2️⃣ Progress Bar */}
                      <View
                        style={{
                          width: "100%",
                          height: 10,
                          backgroundColor:
                            colorScheme === "dark" ? "#444" : "#ddd",
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
                    </>
                  );
                })()}
              </View>

              {/* 3️⃣ Aktiviteler Kartları */}
              <View style={{ flexDirection: "column", gap: 10 }}>
                {note.activities.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      padding: 14,
                      backgroundColor:
                        colorScheme === "dark" ? "#1f1f1f" : "#f4f4f5",
                      borderRadius: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: colorScheme === "dark" ? "white" : "black",
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={{
                        color: item.done ? "#22c55e" : "#ef4444",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      {item.done ? (
                        <MaterialIcons
                          name="done"
                          size={24}
                          color={colorScheme === "dark" ? "#22c55e" : "green"}
                        />
                      ) : (
                        <Ionicons
                          name="close"
                          size={24}
                          color={colorScheme === "dark" ? "#ef4444" : "red"}
                        />
                      )}
                    </Text>
                  </View>
                ))}
              </View>
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
