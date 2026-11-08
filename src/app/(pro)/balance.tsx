import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Field, H1, Label, Screen } from '../../components/ui';
import { money, useStore } from '../../store';
import { colors, fonts, radius } from '../../theme';

export default function Balance() {
  const { txns, addFunds, weeklyBudget, setWeeklyBudget } = useStore();
  const balance = txns.reduce((a, t) => a + t.amount, 0);

  // Hook this up to your payment provider's native checkout sheet.
  const onAddFunds = () =>
    Alert.alert('Add funds', 'Demo: add $100 to your balance?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Add $100', onPress: () => addFunds(100) },
    ]);

  return (
    <Screen>
      <H1 style={{ fontSize: 30 }}>Balance</H1>

      <View style={st.card}>
        <View>
          <Text style={st.dim}>Available for leads</Text>
          <Text style={st.big}>${balance}</Text>
          <Text style={st.dim}>Free leads left: [N] of 3</Text>
        </View>
        <Button title="Add funds" onPress={onAddFunds} />
      </View>

      <Field
        label="Weekly budget"
        value={weeklyBudget}
        onChangeText={(t) => setWeeklyBudget(t.replace(/[^\d]/g, ''))}
        keyboardType="number-pad"
        placeholder="e.g. 200"
        hint="Leads pause when you hit it. Change anytime."
      />

      <View style={{ gap: 4 }}>
        <Label>Activity</Label>
        {txns.map((t) => (
          <View key={t.id} style={st.txn}>
            <View style={{ flex: 1 }}>
              <Text style={st.txnTitle}>{t.label}</Text>
              <Text style={st.txnDate}>{t.date}</Text>
            </View>
            <Text style={[st.txnTitle, t.amount > 0 && { color: colors.brand }]}>{money(t.amount)}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const st = StyleSheet.create({
  card: { padding: 20, gap: 14, borderRadius: radius.xl, backgroundColor: colors.ink },
  dim: { fontFamily: fonts.regular, fontSize: 14, color: colors.onDarkMuted },
  big: { fontFamily: fonts.display, fontSize: 40, color: colors.white, letterSpacing: -0.8 },
  txn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line },
  txnTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink },
  txnDate: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
});
