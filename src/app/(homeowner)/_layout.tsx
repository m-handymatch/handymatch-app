import { Tabs } from 'expo-router/tabs';
import { tabBarOptions, tabIcon } from '../../components/tabOptions';

export default function HomeownerTabs() {
  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen name="requests" options={{ title: 'Requests', tabBarIcon: tabIcon('list') }} />
      <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: tabIcon('user') }} />
    </Tabs>
  );
}
