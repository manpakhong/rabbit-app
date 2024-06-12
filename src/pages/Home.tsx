import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../assets/router";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text>Home Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}