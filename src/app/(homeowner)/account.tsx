import { router } from 'expo-router';
import { View } from 'react-native';
import { Body, Button, H1, Screen } from '../../components/ui';

export default function Account() {
  return (
    <Screen>
      <H1 style={{ fontSize: 30 }}>Account</H1>
      <Body>Sign-in, saved addresses and notification settings go here.</Body>
      <View style={{ gap: 10 }}>
        <Button kind="outline" title="Privacy Policy" onPress={() => {}} />
        <Button kind="outline" title="Do Not Sell or Share My Info" onPress={() => {}} />
        {/* Demo shortcut: in production the pro app is reached by signing in with a pro account. */}
        <Button kind="brand" title="Switch to HandyMatch for Pros" onPress={() => router.replace('/leads')} />
      </View>
    </Screen>
  );
}
