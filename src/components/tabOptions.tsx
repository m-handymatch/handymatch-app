import type { ColorValue } from 'react-native';
import { colors, fonts } from '../theme';
import { Icon, type IconName } from './Icon';

export const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.brand,
  tabBarInactiveTintColor: colors.muted,
  tabBarStyle: { borderTopColor: colors.line, backgroundColor: colors.white },
  tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 12 },
};

export const tabIcon = (name: IconName) => ({ color, size }: { color: ColorValue; size: number }) => (
  <Icon name={name} color={typeof color === 'string' ? color : colors.muted} size={size} />
);
