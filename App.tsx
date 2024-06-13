import * as React from "react";
import { Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/pages/Home";
import Details from "./src/pages/Details";
import News from "./src/pages/News";
import Settings from "./src/pages/Settings";

// import Settings from "./src/pages/Settings";
import {RoutesParams} from "./src/routers/routerParams";
import {Routes} from "./src/routers/bottomRouter";

const Stack = createNativeStackNavigator<RoutesParams>();
const Tab = createBottomTabNavigator<Routes>();
const Drawer = createDrawerNavigator<Routes>();

export default function App(){
  return(
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen
    //         name="Details"
    //         component={Details}
    //         options={({ route }) => ({
    //           headerRight: () => {
    //               return (
    //                   <Button
    //                       title="Buy"
    //                       onPress={() => {}}
    //                       disabled={route.params.stock === 0}
    //                   />
    //               );
    //           },
    //         })}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
        {Platform.OS === "ios" && (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="News" component={News} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        )}

        {Platform.OS == "android" && (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="News" component={News} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
        )}
    </NavigationContainer>
  );
}