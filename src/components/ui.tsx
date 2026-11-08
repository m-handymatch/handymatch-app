import type { ReactNode } from 'react';
import {
  Pressable, ScrollView, StyleSheet, Text, TextInput, View,
  type StyleProp, type TextInputProps, type TextStyle, type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../theme';
import { Icon, type IconName } from './Icon';

/** Scrollable screen body with safe-area top padding and an optional fixed footer. */
export function Screen({ children, footer, header, padTop = true }: {
  children: ReactNode; footer?: ReactNode; header?: ReactNode; padTop?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {header}
      <ScrollView
        contentContainerStyle={[s.body, padTop && !header && { paddingTop: insets.top + 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {footer ? <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>{footer}</View> : null}
    </View>
  );
}

/** Top bar with a back or close button. */
export function TopBar({ title, icon = 'back', onPress, dark }: {
  title?: string; icon?: IconName; onPress: () => void; dark?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.topBar, { paddingTop: insets.top + 4 }, dark && { backgroundColor: colors.ink }]}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={icon === 'close' ? 'Close' : 'Back'} hitSlop={8} style={s.iconBtn}>
        <Icon name={icon} color={dark ? colors.white : colors.ink} />
      </Pressable>
      {title ? <Text accessibilityRole="header" style={[s.topTitle, dark && { color: colors.white }]}>{title}</Text> : null}
    </View>
  );
}

export function H1({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text accessibilityRole="header" style={[s.h1, style]}>{children}</Text>;
}

export function Label({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.label, style]}>{children}</Text>;
}

export function Body({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.text, style]}>{children}</Text>;
}

type ButtonKind = 'cta' | 'brand' | 'outline' | 'dashed';
export function Button({ title, onPress, kind = 'cta', icon, style, disabled }: {
  title: string; onPress?: () => void; kind?: ButtonKind; icon?: IconName; style?: StyleProp<ViewStyle>; disabled?: boolean;
}) {
  const fg = kind === 'outline' ? colors.brand : kind === 'dashed' ? colors.ink : colors.white;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [s.btn, btnKinds[kind], (pressed || disabled) && { opacity: disabled ? 0.5 : 0.85 }, style]}
    >
      {icon ? <Icon name={icon} size={20} color={kind === 'dashed' ? colors.brand : fg} /> : null}
      <Text style={[s.btnText, { color: fg }]}>{title}</Text>
    </Pressable>
  );
}

export type PillTone = 'brand' | 'warn' | 'info' | 'neutral' | 'dark';
const tones: Record<PillTone, [string, string]> = {
  brand: [colors.brandTint, colors.brand],
  warn: [colors.warnBg, colors.warnInk],
  info: [colors.infoBg, colors.infoInk],
  neutral: [colors.surface, colors.body],
  dark: [colors.white, colors.ink],
};
export function Pill({ text, tone = 'neutral', style }: { text: string; tone?: PillTone; style?: StyleProp<ViewStyle> }) {
  const [bg, fg] = tones[tone];
  return (
    <View style={[s.pill, { backgroundColor: bg }, style]}>
      <Text style={[s.pillText, { color: fg }]}>{text}</Text>
    </View>
  );
}

export function Field({ label, hint, ...input }: TextInputProps & { label: string; hint?: string }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#6B7672"
        {...input}
        style={[s.input, input.multiline && { minHeight: 110, paddingTop: 12, textAlignVertical: 'top' }, input.style]}
      />
      {hint ? <Text style={[s.text, { fontSize: 14, color: colors.muted }]}>{hint}</Text> : null}
    </View>
  );
}

/** Row of equal-width choice chips (radio group). */
export function Segmented<T extends string>({ label, options, value, onChange }: {
  label: string; options: readonly T[]; value: T | null; onChange: (v: T) => void;
}) {
  return (
    <View style={{ gap: 8 }} accessibilityRole="radiogroup" accessibilityLabel={label}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {options.map((o) => {
          const on = o === value;
          return (
            <Pressable
              key={o}
              onPress={() => onChange(o)}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              style={[s.seg, on && { borderColor: colors.brand, backgroundColor: colors.brandTint }]}
            >
              <Text style={[s.segText, on && { color: colors.brand }]}>{o}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** Tappable list row with title, subtitle and a status pill. */
export function Row({ title, subtitle, pill, tone, onPress }: {
  title: string; subtitle: string; pill?: string; tone?: PillTone; onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [s.row, pressed && { backgroundColor: colors.surface }]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={s.rowTitle}>{title}</Text>
        <Text style={s.rowSub}>{subtitle}</Text>
      </View>
      {pill ? <Pill text={pill} tone={tone} /> : null}
    </Pressable>
  );
}

const btnKinds: Record<ButtonKind, ViewStyle> = {
  cta: { backgroundColor: colors.cta },
  brand: { backgroundColor: colors.brand },
  outline: { borderWidth: 1.5, borderColor: colors.brand },
  dashed: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.field, backgroundColor: colors.surface },
};

export const s = StyleSheet.create({
  body: { padding: 20, paddingBottom: 32, gap: 20 },
  footer: { paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.white, gap: 10 },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingBottom: 4, backgroundColor: colors.white },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink },
  h1: { fontFamily: fonts.display, fontSize: 32, lineHeight: 36, letterSpacing: -0.8, color: colors.ink },
  label: { fontFamily: fonts.semibold, fontSize: 15, color: colors.muted },
  text: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.body },
  btn: { minHeight: 54, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 16 },
  btnText: { fontFamily: fonts.bold, fontSize: 17 },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill },
  pillText: { fontFamily: fonts.bold, fontSize: 13 },
  fieldLabel: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  input: { minHeight: 52, borderWidth: 1.5, borderColor: colors.field, borderRadius: radius.sm, paddingHorizontal: 12, fontFamily: fonts.regular, fontSize: 16, color: colors.ink },
  seg: { flex: 1, minHeight: 48, borderWidth: 1.5, borderColor: colors.field, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  segText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderWidth: 1, borderColor: colors.line, borderRadius: radius.lg },
  rowTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  rowSub: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
});
