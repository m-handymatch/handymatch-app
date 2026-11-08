import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Body, Button, H1, Label, Pill, Screen, Segmented, TopBar } from '../../components/ui';
import { OUTCOMES, serviceName, useStore } from '../../store';
import { colors, fonts, radius } from '../../theme';

// Replace with the homeowner's masked/tracked number from your backend.
const HOMEOWNER_PHONE = '0000000000';

export default function LeadDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { leads, setOutcome, creditLead } = useStore();
  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return (
      <Screen header={<TopBar title="Lead" onPress={() => router.back()} />}>
        <Body>This lead is no longer available.</Body>
      </Screen>
    );
  }

  const facts: [string, string][] = [
    ['Homeowner', lead.firstName], ['ZIP', lead.zip], ['When', lead.when], ['Lead price', `$${lead.price}`],
  ];

  const askCredit = () =>
    Alert.alert('Request a credit?', 'Wrong number, out of your area, or a duplicate lead is credited to your balance.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Credit it', onPress: () => creditLead(lead.id) },
    ]);

  return (
    <Screen
      header={<TopBar title="Lead" onPress={() => router.back()} />}
      footer={
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button icon="phone" title="Call homeowner" style={{ flex: 2 }} onPress={() => Linking.openURL(`tel:${HOMEOWNER_PHONE}`)} />
          <Button kind="outline" title="Text" style={{ flex: 1 }} onPress={() => Linking.openURL(`sms:${HOMEOWNER_PHONE}`)} />
        </View>
      }
    >
      <View style={{ gap: 6 }}>
        <Pill text="Exclusive · only sent to you" tone="warn" />
        <H1 style={{ fontSize: 30, lineHeight: 34 }}>{serviceName(lead.service)}</H1>
        <Text style={st.meta}>Received {lead.received} · Phone verified</Text>
      </View>

      <View style={st.facts}>
        {facts.map(([k, v]) => (
          <View key={k} style={{ width: '50%', paddingVertical: 6 }}>
            <Text style={st.k}>{k}</Text>
            <Text style={st.v}>{v}</Text>
          </View>
        ))}
      </View>

      <View style={{ gap: 6 }}>
        <Label>Job details</Label>
        <Body style={{ color: colors.ink }}>{lead.description}</Body>
      </View>

      <Segmented label="How did it go?" options={OUTCOMES} value={lead.outcome} onChange={(o) => setOutcome(lead.id, o)} />

      {lead.credited ? (
        <Pill text="Credited to your balance" tone="info" />
      ) : (
        <Pressable accessibilityRole="button" onPress={askCredit} style={st.credit}>
          <Icon name="info" size={18} color={colors.brand} />
          <Text style={st.creditText}>Wrong number or out of area? Get it credited</Text>
        </Pressable>
      )}
    </Screen>
  );
}

const st = StyleSheet.create({
  meta: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted },
  facts: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface },
  k: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  v: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  credit: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44 },
  creditText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.brand, flex: 1 },
});
