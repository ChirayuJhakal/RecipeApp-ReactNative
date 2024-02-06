import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const DetailScreen = ({ recipe, visible, closePress }) => {
  const rating = recipe.rating;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };

  const starsArray = Array.from({ length: rating });
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.mainContainer}>
        <View style={styles.closeContainer}>
          <Pressable onPress={closePress}>
            <View style={styles.close}>
              <Text style={styles.cross}>×</Text>
            </View>
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <View style={styles.featuredRecipe}>
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
              <Image
                style={[styles.featuredImg, isPressed && styles.blurred]}
                resizeMode="contain"
                source={recipe.imgpath}
              />
              <View style={styles.textOnImg}>
                <Text style={styles.featuredText}>{recipe.name}</Text>
              </View>
              {isPressed && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>{recipe.name}</Text>
                </View>
              )}
            </Pressable>
          </View>
          <View style={styles.ingredients}>
            <Text style={styles.ingreText}>Ingredients</Text>
            {/* <View style={styles.ingreList}> */}

            <FlatList
              data={recipe.ingredients}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.ingreItem}>
                  <Text
                    style={styles.ingreItemText}
                  >{`\u2022 ${item.name}`}</Text>
                </View>
              )}
            />
            {/* </View> */}
          </View>
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Instructions</Text>
            <View style={styles.instructionTextCont}>
              <Text style={styles.instructionText}>{recipe.instructions}</Text>
            </View>
          </View>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>Recipe Rating</Text>
            <View style={styles.stars}>
              {starsArray.map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon="star"
                  size={30}
                  color="#FFD700"
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // borderWidth: 1,
    marginTop: 0,
    margin: 4,
  },
  featuredRecipe: {
    // flex: 1.5,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    overflow: "hidden",
    // marginTop:50
    // zIndex:1
  },
  ingredients: {
    // flex: 1,
    // borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",

    // zIndex:2
  },
  ingreText: {
    fontSize: 22,
    color: "red",
    fontWeight: "700",
  },
  instructions: {
    // flex: 1,
    // borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  instructionTitle: {
    fontSize: 22,
    color: "red",
    fontWeight: "700",
  },
  rating: {
    // flex: 0.5,
    // borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 22,
    color: "red",
    fontWeight: "700",
    marginBottom: 15,
  },
  featuredImg: {
    height: 300,
    width: 320,
  },
  textOnImg: {
    position: "absolute",
    bottom: 10,
    left: 30,
  },
  featuredText: {
    color: "white",
    fontSize: 45,
    fontWeight: "900",
  },
  closeContainer: {
    flexDirection: "row-reverse",
    marginTop: 9,
    // marginTop:
    // zIndex:1,
  },
  close: {
    width: 35,
    height: 35,
    // borderWidth: 1,
    borderRadius: 100,
    borderColor: "#DC0101",
    backgroundColor: "#DC0101",
    justifyContent: "center",
    alignItems: "center",
  },
  cross: {
    color: "white",
    fontSize: 25,
  },
  ingreItem: {
    // borderWidth:1,
    marginHorizontal: 20,
    marginVertical: 7,
    height: 35,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  // ingreList:{
  //   justifyContent:"space-evenly",
  // },
  ingreItemText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#696969",
  },
  instructionTextCont: {
    justifyContent: "center",
    alignItems: "center",
  },

  instructionText: {
    padding: 7,
    fontSize: 17,
    textAlign: "center",
    color: "#696969",
  },

  stars: {
    flexDirection: "row",
  },

  blurred: {
    opacity: 0.5,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
    // bottom: 20,
    // left: 20,
    bottom: 10,
    left: 30,
  },
  overlayText: {
    color: "red",
    fontSize: 45,
    fontWeight: "900",
  },
});

export default DetailScreen;
