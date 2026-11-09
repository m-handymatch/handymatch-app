import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Button, Field, Segmented, Screen, TopBar } from '../../components/ui';
import { SERVICES, WHEN, useStore, type When } from '../../store';
import { colors, fonts, radius } from '../../theme';

export default function NewRequest() {
  const { service = 'general' } = useLocalSearchParams<{ service: string }>();
  const sv = SERVICES.find((x) => x.id === service) ?? SERVICES[0];
  const { addRequest } = useStore();

  const [description, setDescription] = useState('');
  const [zip, setZip] = useState('');
  const [when, setWhen] = useState<When>('ASAP');
  const [phone, setPhone] = useState('');

  const zipOk = /^\d{5}$/.test(zip);
  const phoneOk = phone.replace(/\D/g, '').length >= 10;
  const ready = description.trim().length > 0 && zipOk && phoneOk;

  const submit = () => {
    if (!ready) {
      Alert.alert('A few details missing', 'Add a short job description, a 5-digit ZIP code and your mobile number.');
      return;
    }
    const req = addRequest({ service: sv.id, description: description.trim(), zip, when });
    router.replace({ pathname: '/matched/[id]', params: { id: req.id } });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen
        header={<TopBar title="New request" onPress={() => router.back()} />}
        footer={
          <>
            <Button title="Get matched with a pro" onPress={submit} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 12, lineHeight: 17, color: colors.muted }}>
              By tapping Get matched, you agree that HandyMatch and the one pro we match you with may call or text you about this
              request, including by automated means. Consent isn't required to buy. Reply STOP to opt out.
            </Text>
          </>
        }
      >
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.brandTint }}>
          <Icon name={sv.icon} size={18} color={colors.brand} strokeWidth={1.8} />
          <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.brand }}>{sv.name}</Text>
        </View>

        <Field label="Describe the job" multiline value={description} onChangeText={setDescription}
          placeholder="e.g. Mount a 65-inch TV on drywall above the fireplace" />
        <Button kind="dashed" icon="camera" title="Add photos (optional)" onPress={() => Alert.alert('Photos', 'Connect expo-image-picker here.')} />
        <Field label="ZIP code" value={zip} onChangeText={(t) => setZip(t.replace(/\D/g, '').slice(0, 5))}
          keyboardType="number-pad" autoComplete="postal-code" textContentType="postalCode" maxLength={5} />
        <Segmented label="When" options={WHEN} value={when} onChange={setWhen} />
        <Field label="Mobile phone" value={phone} onChangeText={setPhone}
          keyboardType="phone-pad" autoComplete="tel" textContentType="telephoneNumber" />
      </Screen>
    </KeyboardAvoidingView>
  );
}
