import { Tabs } from 'expo-router/tabs';
import { tabBarOptions, tabIcon } from '../../components/tabOptions';

export default function ProTabs() {
  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen name="leads" options={{ title: 'Leads', tabBarIcon: tabIcon('inbox') }} />
      <Tabs.Screen name="balance" options={{ title: 'Balance', tabBarIcon: tabIcon('card') }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: tabIcon('sliders') }} />
    </Tabs>
  );
}
