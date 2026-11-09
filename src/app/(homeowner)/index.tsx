import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Body, H1, Label, Screen } from '../../components/ui';
import { serviceName, SERVICES, useStore } from '../../store';
import { colors, fonts, radius } from '../../theme';

export default function Home() {
  const { requests } = useStore();
  const active = requests.find((r) => r.status === 'Matched');

  return (
    <Screen>
      <View style={st.header}>
        <View style={st.brand}>
          <View style={st.logo}><Icon name="wrench" size={18} color={colors.white} /></View>
          <Text style={st.wordmark}>HandyMatch</Text>
        </View>
        <View style={st.zip}>
          <Icon name="pin" size={16} color={colors.brand} />
          <Text style={st.zipText}>[ZIP]</Text>
        </View>
      </View>

      <View style={{ gap: 6 }}>
        <H1>What do you need done?</H1>
        <Body>One request, one local pro. Free for you.</Body>
      </View>

      <View style={st.grid}>
        {SERVICES.map((sv) => (
          <Pressable
            key={sv.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/request/[service]', params: { service: sv.id } })}
            style={({ pressed }) => [st.tile, pressed && { backgroundColor: colors.surface }]}
          >
            <Icon name={sv.icon} size={28} color={colors.brand} strokeWidth={1.8} />
            <Text style={st.tileText}>{sv.name}</Text>
          </Pressable>
        ))}
      </View>

      {active ? (
        <View style={{ gap: 10 }}>
          <Label style={{ color: colors.ink, fontFamily: fonts.bold, fontSize: 18 }}>Your active request</Label>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/matched/[id]', params: { id: active.id } })}
            style={st.active}
          >
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={[st.activeSmall, { fontFamily: fonts.semibold }]}>Matched</Text>
              <Text style={st.activeTitle}>{serviceName(active.service)}</Text>
              <Text style={st.activeSmall}>{active.proName} will call you soon</Text>
            </View>
            <Icon name="chevron" color={colors.white} size={22} />
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

const st = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  wordmark: { fontFamily: fonts.display, fontSize: 22, letterSpacing: -0.4, color: colors.ink },
  zip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.surface },
  zipText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: { width: '47.5%', flexGrow: 1, minHeight: 96, padding: 16, gap: 10, borderWidth: 1, borderColor: colors.line, borderRadius: radius.lg },
  tileText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.ink },
  active: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: colors.brand },
  activeTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.white },
  activeSmall: { fontFamily: fonts.regular, fontSize: 14, color: colors.brandOnDark },
});
