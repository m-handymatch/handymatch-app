import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Body, Button, H1, Label, Screen, TopBar } from '../../components/ui';
import { serviceName, useStore } from '../../store';
import { colors, fonts, radius } from '../../theme';

// Replace with the matched pro's masked/tracked number from your backend.
const PRO_PHONE = '0000000000';

export default function Matched() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { requests } = useStore();
  const req = requests.find((r) => r.id === id) ?? requests[0];

  return (
    <Screen header={<TopBar icon="close" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />}>
      <View style={{ gap: 12 }}>
        <View style={st.check}><Icon name="check" size={30} color={colors.brand} strokeWidth={2.4} /></View>
        <H1>You're matched with one pro</H1>
        <Body>Only this pro has your number. Expect a call from them shortly.</Body>
      </View>

      <View style={st.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={st.avatar}><Text style={st.avatarText}>[IN]</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={st.name}>{req?.proName ?? '[PRO NAME]'}</Text>
            <Text style={st.biz}>{req?.proBusiness ?? '[BUSINESS NAME]'}</Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <View style={st.fact}><Icon name="shield" size={18} color={colors.brand} /><Text style={st.factText}>License checked where your state requires it</Text></View>
          <View style={st.fact}><Icon name="pin" size={18} color={colors.brand} /><Text style={st.factText}>Serves {req?.zip ?? '[ZIP]'}</Text></View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button kind="brand" icon="phone" title="Call" style={{ flex: 1 }} onPress={() => Linking.openURL(`tel:${PRO_PHONE}`)} />
          <Button kind="outline" icon="message" title="Text" style={{ flex: 1 }} onPress={() => Linking.openURL(`sms:${PRO_PHONE}`)} />
        </View>
      </View>

      {req ? (
        <View style={st.summary}>
          <Label>Your request</Label>
          <Text style={st.name}>{serviceName(req.service)} · {req.when}</Text>
          <Body style={{ fontSize: 15 }}>{req.description}</Body>
        </View>
      ) : null}

      <Pressable accessibilityRole="button" onPress={() => router.push('/requests')} style={{ minHeight: 48, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: colors.brand }}>Not the right fit? Get a different pro</Text>
      </Pressable>
    </Screen>
  );
}

const st = StyleSheet.create({
  check: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' },
  card: { padding: 18, gap: 16, borderWidth: 1, borderColor: colors.line, borderRadius: radius.xl },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.display, fontSize: 18, color: colors.white },
  name: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink },
  biz: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted },
  fact: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  factText: { fontFamily: fonts.regular, fontSize: 15, color: colors.body, flex: 1 },
  summary: { padding: 18, gap: 6, borderRadius: radius.xl, backgroundColor: colors.surface },
});
