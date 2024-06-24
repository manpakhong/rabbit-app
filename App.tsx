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
import UserProfile from "./src/pages/UserProfile";

// import Settings from "./src/pages/Settings";
import {RoutesParams} from "./src/routers/routerParams";
import {Routes} from "./src/routers/bottomRouter";

const Stack = createNativeStackNavigator<RoutesParams>();
const Tab = createBottomTabNavigator<Routes>();
const Drawer = createDrawerNavigator<Routes>();


function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

function IOSNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

function AndroidNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tabs" component={TabNavigator}
                           options={{ drawerLabel: 'Home' }}
            />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="News" component={News} />
            <Drawer.Screen name="UserProfile" component={UserProfile} />
        </Drawer.Navigator>
    );
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Platform.OS === "ios" ? IOSNavigator : AndroidNavigator} />
            <Stack.Screen
                name="Details"
                component={Details}
                options={({ route }) => ({
                    headerRight: () => (
                        <Button
                            title="Buy"
                            onPress={() => {}}
                            disabled={route.params && route.params.stock === 0}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}


export default function App(){
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}