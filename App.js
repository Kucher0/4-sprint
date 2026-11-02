import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";

export default function App() {
  const [words, setWords] = useState([]);
  const [screen, setScreen] = useState("all");

  return (
    <SafeAreaView style={styles.container}>
      {screen === "all" ? (
        <AllWords
          words={words}
          setWords={setWords}
          switchScreen={() => setScreen("add")}
        />
      ) : (
        <AddWord
          setWords={setWords}
          switchScreen={() => setScreen("all")}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    paddingTop: 40,
  },
});