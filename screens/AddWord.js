import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

function AddWord({ switchScreen, setWords }) {
  const [text, setText] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  useEffect(() => {
    const query = text.trim();
    if (!query) {
      setWordInfo(null);
      return;
    }

    let ignore = false;
    const timer = setTimeout(async () => {
      const info = await getWordInfo(query);
      if (!ignore) {
        setWordInfo(info);
      }
    }, 1000);

    // скасування: очищаємо таймер і ігноруємо відповідь старого запиту
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [text]);

  const handleAdd = () => {
    setWords((prev) => [...prev, wordInfo]);
    switchScreen();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={switchScreen} style={styles.back}>
        <Ionicons name="arrow-back-outline" size={32} color="navy" />
      </Pressable>
      <Image
        source={require("../assets/add.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>Your word to search:</Text>
      <TextInput
        style={styles.input}
        placeholder="type here.."
        value={text}
        onChangeText={setText}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {wordInfo && (
        <View>
          <View style={styles.row}>
            <Text style={styles.word}>{wordInfo.word}</Text>
            {wordInfo.audio ? (
              <Pressable onPress={() => playSound(wordInfo.audio)}>
                <Ionicons name="volume-medium-outline" size={28} color="navy" />
              </Pressable>
            ) : null}
            {wordInfo.phonetics ? (
              <Text style={styles.phonetics}>{wordInfo.phonetics}</Text>
            ) : null}
          </View>
          {wordInfo.partOfSpeech ? (
            <Text style={styles.partOfSpeech}>{wordInfo.partOfSpeech}</Text>
          ) : null}
          <Text style={styles.meaning}>{wordInfo.meaning}</Text>
          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
  back: { marginTop: 10 },
  image: { width: "100%", height: 200 },
  label: { fontSize: 12, color: "gray", marginTop: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center" },
  word: { fontSize: 30, marginRight: 25 },
  phonetics: { fontSize: 18, marginLeft: 25 },
  partOfSpeech: { fontSize: 18, marginBottom: 10 },
  meaning: { fontSize: 16, marginVertical: 10 },
  addButton: {
    backgroundColor: "#00007a",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  addText: { color: "white", fontSize: 22 },
});

export default AddWord;