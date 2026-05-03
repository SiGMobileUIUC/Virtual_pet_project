import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Stack } from 'expo-router';
import { ThemeToggle } from "./index";
import { useState } from "react";
import axios from "axios";

export let SCREEN_OPTIONS = {
  title: "Create an Account",
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Auth() {
    const [authMode, setAuthMode] = useState("register");
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function sendAuthRequest(username, password, authMode) {
        let authToken;
        if (authMode == "register") {
            authToken = await axios.post("/register", {
                username,
                password,
            });
        } else {
            authToken = await axios.get("/login", {
                params: {
                    username,
                    password,
                }
            }); 
        }

        return authToken;
    }

    return <>
        <View className="flex-1 items-center justify-center gap-8 p-4">
            <ThemeToggle />

            <Text className="text-3xl font-black" font-bold>
                {authMode == "register" ?
                "Create an account" : "Login"}
            </Text>

            <Input placeholder="Username" keyboardType="password" onChangeText={setUsername}></Input>

            <Input placeholder="Password" onChangeText={setPassword}
            keyboardType="password" textContentType="password" secureTextEntry></Input>

            <Text onPress={() => setAuthMode(authMode == "register" ? "login" : "register")}>
                {authMode == "register" ?
                "Already have an account? Login" :
                "Don't have an account? Register"}
            </Text>

            <Button onPress={async () => await sendAuthRequest(username, password, authMode)}><Text>
                {authMode == "register" ?
                "Register" : "Login"}
            </Text></Button>
        </View>
    </>
}