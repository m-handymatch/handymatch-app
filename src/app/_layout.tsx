import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque';
import { Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold, useFonts } from '@expo-google-fonts/figtree';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from '../store';
import { colors } from '../theme';

export default function RootLayout() {
  const [loaded] = useFonts({
    BricolageGrotesque_700Bold, Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold,
  });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }}>
          <Stack.Screen name="(homeowner)" />
          <Stack.Screen name="(pro)" />
          <Stack.Screen name="request/[service]" />
          <Stack.Screen name="matched/[id]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="lead/[id]" />
        </Stack>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
