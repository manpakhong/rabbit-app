import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutesParams  } from "../routers/routerParams";


type Props = NativeStackScreenProps<RoutesParams, "Home">;

export default function Home({ navigation }: Props) {
  return (
      <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Button
              title="User Profile"
              onPress={() =>
                  navigation.navigate("UserProfile")
              }
          />
          <Button
              title="First Item"
              onPress={() =>
                  navigation.navigate("Details", {
                      title: "First Item",
                      content: "First Item Content",
                      stock: 1,
                  })
              }
          />
          <Button
              title="Second Item"
              onPress={() =>
                  navigation.navigate("Details", {
                      title: "Second Item",
                      content: "Second Item Content",
                      stock: 0,
                  })
              }
          />
          <Button
              title="Third Item"
              onPress={() =>
                  navigation.navigate("Details", {
                      title: "Third Item",
                      content: "Third Item Content",
                      stock: 200,
                  })
              }
          />
          <Button
              title="Fourth Item"
              onPress={() =>
                  navigation.navigate("Details", {
                      title: "Fourth Item",
                      content: "Fourth Item Content",
                      stock: 1000,
                  })
              }
          />
    </View>
  );
}