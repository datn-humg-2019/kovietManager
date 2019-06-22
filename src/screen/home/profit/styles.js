import { StyleSheet } from "react-native";

import { images, screenId, values, color, config } from "../../../config";

const heightChar =
  values.deviceHeight > 800
    ? 250
    : values.deviceHeight > 700
    ? 200
    : values.deviceHeight > 600
    ? 170
    : 130;

const styles = StyleSheet.create({
  content11: {
    width: "100%",
    minHeight: heightChar,
    maxHeight: heightChar + 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 10
  },
  contentNav: { position: "absolute", width: "100%" },
  text11: { fontSize: values.fontSizeSmall, color: "#000" },
  content10: {
    width: 14,
    height: 8,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: color.color_decrease.hex
  },
  content9: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textContent8Child2: { fontSize: values.fontSizeSmall, color: "#000" },
  content8child2: {
    width: 14,
    height: 8,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: color.color_increase.hex
  },
  Conten8Child1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  content8: {
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  content7Child: { width: "100%", flex: 1 },
  content7: {
    width: "100%",
    minHeight: 200,
    maxHeight: 250,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "transparent",
    paddingHorizontal: 10
  },
  text6: {
    fontSize: values.fontSizeTitle,
    fontWeight: "500"
  },
  content6: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text5: {
    fontSize: values.fontSizeNormal,
    color: "#000",
    paddingVertical: 3
  },
  textContent4: {
    fontSize: values.fontSizeLarge,
    fontWeight: "bold"
  },
  content4: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  shadowAndroid: { elevation: 4 },
  shadowIOS: {
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  showDetail1: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  textFilter: { fontSize: values.fontSizeNormal, color: "#fff" },
  content3: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 7,
    backgroundColor: "transparent"
  },
  content2: {
    paddingTop: 40 + values.marginTopScreen,
    height: "100%",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 15
  },
  content01: { width: "100%", flex: 1, backgroundColor: "transparent" },
  imgBg: { width: "100%", flex: 1, height: "100%" }
});

export default styles;
