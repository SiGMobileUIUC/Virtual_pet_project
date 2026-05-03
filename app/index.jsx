import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { useRouter } from 'expo-router';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'Squirrel Pet',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE= {
  height: 76,
  width: 76,
};

const FEED_XP = 5;
const PLAY_XP = 10;

const apiUrl = 'http://localhost:3000';


export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [name, setName] = useState('');
  const [xp, setXp] = useState(0);

  useEffect(() => {
    async function fetchPetData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setName(data.name || 'UIUCSquirrel');
        setXp(data.xp || 0);
      } catch (error) {
        setName("Mariah Carrey");
        setXp(xp + 1);
      }
    }
    fetchPetData();
  }, []);

  async function createPet() {
    try {
      const response = await fetch(`${apiUrl}/add-xp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pet_name: "Squirrel", user_id: 1 }),
      });
    } catch (e) {
      console.log(e); 
    }
  }

  const addXp = async (xp) => {
    try {
      const response = await fetch(`${apiUrl}/add-xp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pet_id: 2, xp }),
      });
      if (!response.ok) {
       setXp(prevXp => (isNaN(prevXp) ? 0 : prevXp + 1));
      }
    } catch (_) {
      setXp(prevXp => (isNaN(prevXp) ? 0 : prevXp + 1));
    }
  };


  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        {/* <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" /> */}
        <Text>🐿️</Text>
        <View className="gap-2 p-4">
          <Text className="font-mono text-sm text-muted-foreground">
            Welcome to Squirrel Pet! 🐿️
          </Text>
        </View>
        <View className="flex-row gap-2">
            <Button onPress={() => {
              addXp(FEED_XP);
              setXp(xp + FEED_XP);
            }}>
              <Text>Feed ({FEED_XP} XP)</Text>
            </Button>

            <Button onPress={() => {
              addXp(PLAY_XP);
              setXp(xp + PLAY_XP);
            }}>
              <Text>Play ({PLAY_XP} XP)</Text>
            </Button>
        
            <Button onPress={() => {
                  createPet();
                }}>
              <Text>Create Pet</Text>
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

export function ThemeToggle() {
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
