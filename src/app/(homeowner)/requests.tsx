import { router } from 'expo-router';
import { View } from 'react-native';
import { Body, Button, H1, Label, Row, Screen, type PillTone } from '../../components/ui';
import { serviceName, useStore, type RequestStatus } from '../../store';
import { colors, radius } from '../../theme';

const tone: Record<RequestStatus, PillTone> = { Matched: 'brand', Matching: 'warn', Done: 'neutral' };

export default function Requests() {
  const { requests } = useStore();
  const active = requests.filter((r) => r.status !== 'Done');
  const past = requests.filter((r) => r.status === 'Done');

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <H1 style={{ fontSize: 30 }}>My requests</H1>
        <Button title="New" icon="plus" onPress={() => router.navigate('/')} style={{ minHeight: 44, paddingHorizontal: 14 }} />
      </View>

      <View style={{ gap: 10 }}>
        <Label>Active</Label>
        {active.length === 0 ? <Body>No open requests.</Body> : null}
        {active.map((r) => (
          <Row
            key={r.id}
            title={serviceName(r.service)}
            subtitle={r.status === 'Matched' ? `${r.proName} · ${r.created}` : 'Finding the right pro'}
            pill={r.status}
            tone={tone[r.status]}
            onPress={r.status === 'Matched' ? () => router.push({ pathname: '/matched/[id]', params: { id: r.id } }) : undefined}
          />
        ))}
      </View>

      <View style={{ gap: 10 }}>
        <Label>Past</Label>
        {past.map((r) => (
          <Row key={r.id} title={serviceName(r.service)} subtitle={`${r.proName} · ${r.created}`} pill="Done" tone="neutral" />
        ))}
        <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface }}>
          <Body style={{ fontSize: 15 }}>Need someone again? Request the same pro from any past job.</Body>
        </View>
      </View>
    </Screen>
  );
}
