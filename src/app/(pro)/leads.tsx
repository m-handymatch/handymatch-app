import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Label, Pill, Row, type PillTone } from '../../components/ui';
import { serviceName, useStore, type Lead } from '../../store';
import { colors, fonts, radius } from '../../theme';

const status = (l: Lead): [string, PillTone] =>
  l.credited ? ['Credited', 'info'] : l.outcome === 'Booked' ? ['Booked', 'brand'] : l.outcome ? [l.outcome, 'neutral'] : ['Call now', 'warn'];

export default function Leads() {
  const insets = useSafeAreaInsets();
  const { leads, receiving, setReceiving, txns } = useStore();
  const balance = txns.reduce((a, t) => a + t.amount, 0);
  const [fresh, ...earlier] = leads;
  const open = (id: string) => router.push({ pathname: '/lead/[id]', params: { id } });

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar style="light" />
      <View style={[st.header, { paddingTop: insets.top + 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={st.wordmark}>HandyMatch</Text>
            <Pill text="Pro" tone="dark" style={{ borderRadius: 6, paddingHorizontal: 8 }} />
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Balance $${balance}`} onPress={() => router.navigate('/balance')} style={{ alignItems: 'flex-end' }}>
            <Text style={st.dim}>Balance</Text>
            <Text style={st.balance}>${balance}</Text>
          </Pressable>
        </View>
        <View style={st.toggle}>
          <View style={{ flex: 1 }}>
            <Text style={st.toggleTitle}>Receiving leads</Text>
            <Text style={[st.dim, { fontSize: 13 }]}>Handyman, Mounting · [ZIP CODES]</Text>
          </View>
          <Switch
            accessibilityLabel="Receiving leads"
            value={receiving}
            onValueChange={setReceiving}
            trackColor={{ true: '#34A386', false: '#5B6662' }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
        {fresh ? (
          <>
            <Text accessibilityRole="header" style={st.h}>New lead</Text>
            <Pressable accessibilityRole="button" onPress={() => open(fresh.id)} style={({ pressed }) => [st.fresh, pressed && { backgroundColor: colors.surface }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <Text style={st.freshTitle}>{serviceName(fresh.service)}</Text>
                <Pill text={status(fresh)[0]} tone={status(fresh)[1]} />
              </View>
              <Text style={st.desc}>{fresh.description}</Text>
              <Text style={st.meta}>{fresh.zip} · {fresh.when} · Only sent to you</Text>
            </Pressable>
          </>
        ) : null}

        <Label style={{ marginTop: 10 }}>Earlier</Label>
        {earlier.map((l) => {
          const [text, tone] = status(l);
          return <Row key={l.id} title={serviceName(l.service)} subtitle={`${l.zip} · ${l.received}`} pill={text} tone={tone} onPress={() => open(l.id)} />;
        })}
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  header: { backgroundColor: colors.ink, paddingHorizontal: 20, paddingBottom: 20, gap: 16 },
  wordmark: { fontFamily: fonts.display, fontSize: 22, color: colors.white, letterSpacing: -0.4 },
  dim: { fontFamily: fonts.regular, fontSize: 12, color: colors.onDarkMuted },
  balance: { fontFamily: fonts.bold, fontSize: 18, color: colors.white },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 56, paddingHorizontal: 16, borderRadius: radius.md, backgroundColor: colors.inkPanel },
  toggleTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.white },
  h: { fontFamily: fonts.bold, fontSize: 20, color: colors.ink },
  fresh: { padding: 18, gap: 10, borderWidth: 2, borderColor: colors.cta, borderRadius: radius.xl },
  freshTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, flex: 1 },
  desc: { fontFamily: fonts.regular, fontSize: 15, color: colors.body },
  meta: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
});
