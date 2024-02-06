import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { addRecipe, data } from "../data";

const AddRecipeScreen = ({
  visible,
  maindata,
  setmaindata,
  closeAddRecipe,
}) => {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingreList, setIngreList] = useState([]);
  const [ingre, setIngre] = useState("");
  const [rating, setRating] = useState(3);
  const [imgpath, setImgPath] = useState(
    require("../assets/images/Biryani.jpeg")
  );

  // console.log(maindata);

  const nameChangeHandler = (text) => {
    setName(text);
  };

  const instructionChangeHandler = (instr) => {
    setInstructions(instr);
  };

  const ingreChangeHandler = (ingre) => {
    setIngre(ingre);
  };

  const addIngreHandler = () => {
    setIngreList((currList) => [
      ...currList,
      { key: Math.random() * 100000, name: ingre },
    ]);
    setIngre("");
  };

  const deleteIngreHandler = (ingreid) => {
    // console.log(ingreid);
    setIngreList((currList) => {
      return currList.filter((ele) => ele.key !== ingreid);
    });
  };

  const addToMainData = (newRecipeData) => {
    setmaindata((currMaindata) => [...currMaindata, newRecipeData]);

    closeAddRecipe();
  };

  const saveRecipeHandler = () => {
    const newRecipe = {
      id: Math.max(...data.map((recipe) => recipe.id)) + 1,
      name,
      imgpath,
      rating, 
      ingredients: ingreList.map((item) => ({ id: item.key, name: item.name })),
      instructions,
    };
    // console.log(newRecipe);
    setmaindata((currMaindata) => [...currMaindata, newRecipe]);
    console.log(maindata);
    closeAddRecipe();

    // addToMainData(newRecipe);
    // console.log(maindata)
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.mainCont}>
        <View style={styles.closeMainContainer}>
        <View style={styles.closeContainer}>
          <Pressable onPress={closeAddRecipe}>
            <View style={styles.close}>
              <Text style={styles.cross}>×</Text>
            </View>
          </Pressable>
        </View>

        </View>
        
        <View style={styles.title}>
          <Text style={styles.titleText}>Add Recipe</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.name}>
            <TextInput
              value={name}
              onChangeText={nameChangeHandler}
              style={styles.nameInput}
              placeholder="Name"
            />
          </View>
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>Enter the Instructions</Text>
            <TextInput
              value={instructions}
              onChangeText={instructionChangeHandler}
              style={styles.instructionInput}
            />
          </View>
          <View style={styles.ingredients}>
            <TextInput
              style={styles.ingredientsText}
              placeholder="Enter the Ingredients"
              onChangeText={ingreChangeHandler}
              value={ingre}
            />
            {/* <Text style={styles.ingredientsText}>Enter the Ingredients</Text> */}
            <Pressable onPress={addIngreHandler}>
              <View style={styles.addIngred}>
                <View style={styles.addButton}>
                  <Text style={styles.plus}>+</Text>
                </View>
              </View>
            </Pressable>
          </View>
          <View style={styles.ingreListCont}>
            {ingreList.length > 0 && (
              <FlatList
                data={ingreList}
                numColumns={2}
                renderItem={({ item: { name, key }, index }) => (
                  <Pressable onPress={() => deleteIngreHandler(key)}>
                    <View style={styles.ingreItemCont}>
                      <Text style={styles.ingreItemText}>{name}</Text>
                    </View>
                  </Pressable>
                )}
              />
            )}
          </View>
        </ScrollView>
        <View style={styles.saveCont}>
          <Pressable onPress={saveRecipeHandler}>
            <View style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginTop: 1,
    margin: 5,
  },
  //------------TITLE-----------------------------------------
  title: {
    // borderWidth: 1,
    height: 70,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 9,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "900",
    color: "red",
  },
  //--------------NAME INPUT----------------------------------
  name: {
    flex: 1,
    // borderWidth: 1,
    margin: 10,
    // height:50,
    // width:350,
  },
  nameInput: {
    height: 50,
    width: 350,
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: 7,
    padding: 10,
    fontSize: 20,
  },
  //-------------INSTRUCTION INPUT----------------------------
  instruction: {
    // borderWidth: 1,
    width: 350,
    margin: 10,
    height: 260,
    paddingLeft: 2,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 20,
    fontWeight: "500",
  },
  instructionInput: {
    width: 345,
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: 5,

    padding: 10,
    fontSize: 20,
    marginTop: 7,
    height: 220,
  },
  //------------INGREDIENTS INPUT-----------------------------
  ingredients: {
    // borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    width: 350,
    margin: 10,
    height: "auto",
    paddingLeft: 2,
    flexDirection: "row",
  },

  ingredientsText: {
    fontSize: 20,
    fontWeight: "500",
    width: 200,
    // borderWidth:1,
    marginTop: 9,
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 2,
    marginRight: 10,
    textAlign: "center",
  },

  // ----------------ADD INGREDIENTS BUTTON------------------
  addIngred: {
    // borderWidth: 1,
    marginTop: 9,
    margin: 2,
    // marginHorizontal:12,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    height: 30,
    width: 30,
    // borderWidth:1,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  plus: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  //----------------------INGRE ITEM------------------------------
  ingreListCont: {
    // borderWidth: 1,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    margin: 10,
  },

  ingreItemCont: {
    // borderWidth:1,
    width: "auto",
    height: "auto",
    marginHorizontal: 25,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 22,
    padding: 12,
  },

  ingreItemText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },

  //-------------------------SAVE---------------------------------
  saveCont: {
    // borderWidth: 1,
    width: 350,
    margin: 10,
    height: 50,
    // alignItems:"flex-end",
    flexDirection: "row-reverse",
  },
  saveButton: {
    // borderWidth:1,
    width: 70,
    height: "100%",
    backgroundColor: "red",
    borderRadius: 7,
  },
  saveText: {
    // borderWidth:1,
    fontSize: 24,
    padding: 7,
    fontWeight: "900",
    color: "white",
  },

  //------------------close-------------------------------------
  closeMainContainer:{
    flexDirection:"row-reverse",
    width:"100%"
  },
  closeContainer: {
    // flexDirection: "row-reverse",
    // alignItems:"flex-end",
    flexDirection:"row-reverse",
    justifyContent:"center",
    alignItems:"center",
    margin: 4,
    // borderWidth:1
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
});

export default AddRecipeScreen;