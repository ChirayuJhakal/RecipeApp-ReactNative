import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { data } from "../data";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DetailScreen from "./DetailScreen";
import AddRecipeScreen from "./AddRecipeScreen";
const LandingScreen = () => {
  const [mainData, setMainData] = useState([]);
  const [isPressed, setIsPressed] = useState(null);
  const [isPressedFeatured, setIsPressedFeatured] = useState(null);
  const [addRecipeModal, setAddRecipeModal] = useState(false);

  useEffect(() => {
    setMainData(data);
  }, []);

  const updateMainData = (newMainData) => {
    setMainData(newMainData);
  }

  const goAddRecipeScreen = () => {
    setAddRecipeModal(true);
  };

  const closeAddRecipeScreen = () => {
    setAddRecipeModal(false);
  };

  const [openModalIndex, setOpenModalIndex] = useState(null);

  const showDetailScreen = (index) => {
    setOpenModalIndex(index);
  };

  const closeDetailScreen = () => {
    setOpenModalIndex(null);
  };

  const showFeaturedDetailScreen = () => {
    setOpenModalIndex(0);
  };

  const handlePressIn = (id) => {
    setIsPressed(id);
  };

  const handlePressOut = () => {
    setIsPressed(null);
  };
  const handlePressInFeatured = () => {
    setIsPressedFeatured(0);
  };

  const handlePressOutFeatured = () => {
    setIsPressedFeatured(null);
  };

  const filterData = (mainData) => {
    newData = mainData.filter((ele) => ele.id !== 0);
    return newData;
  };

  const getFeaturedData = () => {
    const featuredData = mainData.find((ele) => ele.id === 0);
    return featuredData || {};
  };
  // console.log(mainData);
  return (
    <View style={styles.mainCont}>
      <View style={styles.mainTitle}>
        <Text style={styles.mainTitleText}>cookaroo</Text>
      </View>
      <View style={styles.subCont}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable accessibilityLabel="fRecipe" onPress={() => showFeaturedDetailScreen()}>
            {/* <TouchableWithoutFeedback
              onPressIn={handlePressInFeatured}
              onPressOut={handlePressOutFeatured}
            > */}
            <View style={styles.featuredRecipe}>
              <Image
                style={[
                  styles.featuredImg,
                  isPressedFeatured == 0 && styles.blurred,
                ]}
                resizeMode="contain"
                source={getFeaturedData().imgpath}
              />
              <View style={styles.textOnImg}>
                <Text style={styles.featuredText}>
                  {getFeaturedData().name}
                </Text>
              </View>

              {isPressedFeatured == 0 && (
                <View style={styles.overlayFeatured}>
                  <Text style={styles.overlayTextFeatured}>
                    {getFeaturedData().name}
                  </Text>
                </View>
              )}

              <View style={styles.featuredStars}>
                {Array.from({ length: getFeaturedData().rating }).map(
                  (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon="star"
                      size={30}
                      color="#FFD700"
                    />
                  )
                )}
              </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
          </Pressable>

          <FlatList
            data={filterData(mainData)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            // renderItem={({ item, index }) => (
            //   // <TouchableWithoutFeedback
            //   //   onPressIn={() => handlePressIn(item.id)}
            //   //   onPressOut={handlePressOut}
            //   // >
            //   <View style={styles.recipeCont}>
            //     <Pressable onPress={() => showDetailScreen(index)}>
            //       <Image
            //         source={item.imgpath}
            //         resizeMode="contain"
            //         style={
            //           styles.recipeImg
            //           // isPressed === item.id && styles.blurred,
            //         }
            //       />
            //       <View style={styles.textOnRecipe}>
            //         <Text style={styles.recipeText}>{item.name}</Text>
            //       </View>
            //       <View style={styles.stars}>
            //         {Array.from({ length: item.rating }).map((_, index) => (
            //           <FontAwesomeIcon
            //             key={index}
            //             icon="star"
            //             size={20}
            //             color="#FFD700"
            //           />
            //         ))}
            //       </View>

            //       {/* {isPressed === item.id && (
            //         <View style={styles.overlay}>
            //           <Text style={styles.overlayText}>{item.name}</Text>
            //         </View>
            //       )} */}
            //     </Pressable>
            //     <DetailScreen
            //       recipe={openModalIndex === 0 ? getFeaturedData() : item}
            //       visible={
            //         openModalIndex === 0 ? true : openModalIndex === index
            //       }
            //       closePress={() => closeDetailScreen()}
            //     />
            //   </View>

            //   // </TouchableWithoutFeedback>
            // )}
            renderItem={({ item, index }) => (
              <View style={styles.otherRecipe}>
                <Pressable onPress={() => showDetailScreen(index)}>
                  {/* <View style={styles.recipeCont}> */}
                  <Image
                    source={item.imgpath}
                    resizeMode="contain"
                    style={styles.recipeImg}
                  />
                  <View style={styles.textStarCont}>
                    <View style={styles.textOnRecipe}>
                      <Text style={styles.recipeText}>{item.name}</Text>
                    </View>
                    <View style={styles.stars}>
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon="star"
                          size={20}
                          color="#FFD700"
                        />
                      ))}
                    </View>
                  </View>
                  <DetailScreen
                    recipe={openModalIndex === 0 ? getFeaturedData() : item}
                    visible={openModalIndex === 0 || openModalIndex === index}
                    closePress={() => closeDetailScreen()}
                  />
                  {/* </View> */}
                </Pressable>
              </View>
            )}
          />
        </ScrollView>
      </View>
      <View style={styles.addRecipe}>
        <Pressable onPress={goAddRecipeScreen}>
          <View style={styles.addButton}>
            <Text style={styles.plus}>+</Text>
          </View>
        </Pressable>
      </View>
      {/* <AddRecipeScreen maindata={mainData} setmaindata={setMainData}/> */}
      <AddRecipeScreen
        visible={addRecipeModal}
        closeAddRecipe={closeAddRecipeScreen}
        maindata={mainData}
        setmaindata={updateMainData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    // borderWidth: 1,
    marginTop: 24,
    marginBottom: 15,
    margin: 3,
  },
  textStarCont: {
    // flexDirection:"row"
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // borderWidth:1
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  mainTitle: {
    // borderWidth: 1,
    flex: 0.9,
    margin: 10,
    justifyContent: "center",
    // alignItems:"center",
    padding: 3,
  },
  mainTitleText: {
    // borderWidth: 1,
    fontSize: 50,
    fontWeight: "900",
    color: "red",
  },
  featuredRecipe: {
    // borderWidth: 1,
    flex: 2.5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical:5
  },
  otherRecipe: {
    // borderWidth: 1,
    flex: 5,
    width: "42.5%",
    height: 170,
    marginLeft: 15.5,
    // marginHorizontal:13.5,
    margin: 10,

    justifyContent: "center",
    // alignItems: "center",
  },
  addRecipe: {
    // borderWidth: 1,
    margin: 10,
    height: 50,
    flexDirection: "row-reverse",
  },
  addButton: {
    height: 50,
    width: 50,
    // borderWidth:1,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
  },
  plus: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    // borderWidth:1,
    height: 40,
  },
  featuredImg: {
    height: 350,
    width: 350,
    // paddingVertical:5,
    // borderWidth: 1,
    // marginVertical:2
    //   shadowColor: '#202020',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 5,
  },
  textOnImg: {
    position: "absolute",
    bottom: 45,
    left: 25,
  },
  featuredText: {
    color: "white",
    fontSize: 40,
    fontWeight: "900",
  },
  recipeCont: {
    // borderWidth: 1,
    width: "45%",
    height: 170,
    margin: 9,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // width: "45%",
    // height: 170,
    // margin: 9,
    // justifyContent: "center",
    // alignItems: "center",
    // position: "relative",
  },
  textOnRecipe: {
    // position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    // left: 30,
    // position: "absolute",
    // bottom: 10,
    // left: 10,
    // right: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  recipeImg: {
    height: 170,
    width: "100%",
  },
  recipeText: {
    color: "white",
    fontSize: 25,
    fontWeight: "900",
  },
  blurred: {
    opacity: 0.2,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // bottom: 20,
    // left: 20,
  },
  overlayText: {
    color: "red",
    fontSize: 25,
    fontWeight: "900",
  },
  overlayFeatured: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    bottom: 45,
    left: 25,
    // alignItems: "center",
    // position: "absolute",
    // bottom: 20,
    // left: 20,
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
  },
  overlayTextFeatured: {
    color: "red",
    fontSize: 40,
    fontWeight: "900",
  },
  subCont: {
    // borderWidth: 1,
    flex: 7.5,
  },
  stars: {
    flexDirection: "row",
    position: "absolute",
    top: 100,
    // bottom:0,
    // left:0

    //   flexDirection: "row",
    // position: "absolute",
    // bottom: 10,
    // left: 10,
  },
  featuredStars: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    left: 20,
  },
});

export default LandingScreen;