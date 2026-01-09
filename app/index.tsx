import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon, TypeOutline } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'Pet Widget',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

const API_BASE = 'http://localhost:3000';


export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [count, setCount] = useState(0);

  const[petName, setPetName] = useState("...");
  const [xp, setXp] = useState(0);

  useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`${API_BASE}/pet`);
      const data = await res.json();
      setPetName(data.name);
      setXp(data.xp);
    } catch (e) {
      console.log("Failed to load pet:", e);
    }})();
  }, []);

  const progress = xp % 100;
  const level = Math.floor(xp / 100) + 1;

  useEffect(() => {
    if (count == 20) {
      setCount(count * 2);
    }
  }, [count]);
  
  const handleFeed = async () => {
    try {
      const res = await fetch(`${API_BASE}/feed`, { method: "POST" });
      const data = await res.json();
      setPetName(data.squirrel.name);
      setXp(data.squirrel.xp);
    } catch (e) {
      console.log("Feed failed:", e);
    }
  };

  const handlePlay = async () => {
    try {
      const res = await fetch(`${API_BASE}/play`, { method: 'POST' });
      const data = await res.json();
      setPetName(data.squirrel.name);
      setXp(data.squirrel.xp);
    } catch (e) {
      console.log('Play failed:', e);
    }
  };

  return (
    <>
    <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center p-10">
        <View className="items-center pb-10">
          <Text className="text-3xl font-bold">Your Pet:</Text>
          <Text className="text-3xl font-bold">{petName}</Text>
        </View>

        <View className="flex-row items-center gap-4 mb-10 w-full px-40">
          <Text className="text-x1 font-bold">XP</Text> 
          <Progress value={progress} className="flex-1 h-4"/>
          <Text className="text-x1 font-bold">Lvl {level}</Text>
        </View>
 
        <View className="w-80 h-80 border-4 border" />

        <View className="flex-1" /> 
          <View className="flex-row gap-4 mb-10">
            <Button 
              variant="outline" 
              className="px-6 py-4" 
              onPress={handleFeed}>
              <Text className="text-xl">Feed</Text>
            </Button>
            <Button 
              variant="outline" 
              className="px-6 py-4"
              onPress={handlePlay}>
              <Text className="text-xl">Play</Text>
            </Button>
          </View>
          {count}
          <Button onPress={() => setCount(count + 5)}/>
      </View>

    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
