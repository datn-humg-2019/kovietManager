import { StyleSheet } from "react-native";
import { values, color } from "../../../config";

const styles = StyleSheet.create({
  fogotPass: {
    fontSize: values.fontSizeNormal,
    color: "black",
    paddingHorizontal: 20,
    textAlign: "center"
  },
  containStyle: { width: "80%", paddingVertical: 15 },
  styleTextGradient: { color: color.mainColor },
  buttonClearPass: {
    width: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputPass: {
    color: color.mainColor,
    height: 40,
    fontSize: values.fontSizeTitle,
    flex: 1,
    textAlign: "center"
  },
  containPass: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5
  },
  imageClear: { width: 15 },
  buttonClear: {
    width: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    color: color.mainColor,
    height: 40,
    fontSize: values.fontSizeTitle,
    flex: 1,
    textAlign: "center"
  },
  main3: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5
  },
  main2: {
    width: "100%",
    overflow: "hidden"
  },
  main: { width: "100%", alignItems: "center" }
});

export default styles;
