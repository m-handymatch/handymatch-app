import { router } from 'expo-router';
import { View } from 'react-native';
import { Body, Button, H1, Screen } from '../../components/ui';

export default function Settings() {
  return (
    <Screen>
      <H1 style={{ fontSize: 30 }}>Settings</H1>
      <Body>Trades, ZIP codes, license and insurance details, and lead alerts go here.</Body>
      <View style={{ gap: 10 }}>
        <Button kind="outline" title="Pro Terms" onPress={() => {}} />
        <Button kind="outline" title="Text or call pro support" onPress={() => {}} />
        {/* Demo shortcut back to the homeowner app. */}
        <Button kind="brand" title="Switch to homeowner app" onPress={() => router.replace('/')} />
      </View>
    </Screen>
  );
}
