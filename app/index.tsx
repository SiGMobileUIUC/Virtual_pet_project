import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon, TypeOutline } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
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

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <>
    <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center p-10">
        <View className="items-center pb-10">
          <Text className="text-3xl font-bold">Your Pet:</Text>
          <Text className="text-3xl font-bold">Pet Name</Text>
        </View>

        <View className="w-80 h-80 border-4 border" />

        <View className="flex-1" /> {/* This pushes buttons down */}
          <View className="flex-row gap-4 mb-10">
            <Button variant="outline" className="px-6 py-4">
              <Text className="text-xl">Feed</Text>
            </Button>
            <Button variant="outline" className="px-6 py-4">
              <Text className="text-xl">Play</Text>
            </Button>
          </View>
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
