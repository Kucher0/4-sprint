import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { playSound } from "../services/soundHandler";

function AllWords({ words, switchScreen, setWords }) {
  const handlePlay = (item) => {
    if (item.audio) {
      playSound(item.audio);
    }
  };

  const handleDelete = (item) => {
    setWords((prev) => prev.filter((w) => w !== item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable onPress={() => handlePlay(item)}>
        <Ionicons name="play-outline" size={28} color="navy" />
      </Pressable>
      <View style={styles.textBlock}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>
      <Pressable onPress={() => handleDelete(item)}>
        <Ionicons name="trash-outline" size={24} color="#b00020" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/title-reading-side.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable style={styles.addButton} onPress={switchScreen}>
        <Ionicons name="add-outline" size={40} color="white" />
      </Pressable>
      <FlatList
        data={words}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.word}-${index}`}
        ListEmptyComponent={<Text style={styles.empty}>No words yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  image: { width: "100%", height: 200 },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#000d6b",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    marginRight: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  textBlock: { flex: 1, marginHorizontal: 12 },
  word: { fontSize: 18, fontWeight: "bold" },
  meaning: { fontSize: 15 },
  empty: { textAlign: "center", marginTop: 30, fontSize: 18 },
});

export default AllWords;