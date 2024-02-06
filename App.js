import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingScreen from "./screens/LandingScreen";
import DetailScreen from "./screens/DetailScreen";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AddRecipeScreen from "./screens/AddRecipeScreen";

library.add(fas);

export default function App() {
  return (
    <View style={styles.container}>
      {/* <DetailScreen /> */}
      <LandingScreen />
      {/* <AddRecipeScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
