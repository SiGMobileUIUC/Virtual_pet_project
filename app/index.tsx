import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'Squirrel Pet',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

const apiUrl = 'https://10.193.24.21:3000/pet';


export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [name, setName] = React.useState('');
  const [xp, setXp] = React.useState(0);

  //Fetching info from backend
  React.useEffect(() => {
    async function fetchPetData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setName(data.name || 'UIUCSquirrel');
        setXp(data.xp || 0);
      } catch (error) {
        // console.error('Error fetching pet data:', error);
        setName("Mariah Carrey");
        setXp(xp + 1);
      }
    }
    fetchPetData();
  }, []);


  //put request to update name
  const updateName = async (newName: string) => {
    try {
      const response = await fetch(`${apiUrl}/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        setName(newName);
      } else {
        // console.error('Failed to update name');
        setName("Maple");
      }
    } catch (error) {
      // console.error('Error updating name:', error);
      setName("UIUC");
    }
  };

  //put request to add 1 xp
  const addXp = async (amount: number) => {
    try {
      const response = await fetch(`${apiUrl}/xp`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp: 1 }),
      });
      if (response.ok) {
        const data = await response.json();
        setXp(data.xp);
      } else {
        // console.error('Failed to add XP');
       setXp(prevXp => (isNaN(prevXp) ? 0 : prevXp + 1));
      }
    } catch (error) {
      // console.error('Error adding XP:', error);
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
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            Welcome to Squirrel Pet! 🐿️
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            Above is your first squirrel.
          </Text>
        </View>
        <View className="flex-row gap-2">
            <Button onPress={() => updateName('New Name')}>
              <Text>Name Pet: {name}</Text>
            </Button>

            <Button onPress={() => addXp(10)}>
              <Text>Add XP:</Text>
              <Text>{xp}</Text>
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
