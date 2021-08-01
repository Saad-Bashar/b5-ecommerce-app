import React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import { colors } from "../theme";
import Text from "./text/text";

export default function BannerTitle() {
  return (
    <View style={styles.wrapper}>
      <Image source={require("../assets/images/audiophile.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    }
  
});
