import { useNavigation } from '@react-navigation/core';
import { View, Button, Text, ScrollView, Toast } from 'native-base';
import React from 'react';
import { useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { put as updateObs } from '../../api/fichas';
const ModificarObservacionScreen = ({
  route: {
    params: { fichaId, obs },
  },
}) => {
  const navigation = useNavigation();
  const [observacion, setObservacion] = useState(obs);
  const onPress = () => {
    updateObs({ idFichaClinica: fichaId, observacion })
      .then(() => {
        navigation.goBack();
        Toast.show({ description: 'Observacion actualizada' });
      })
      .catch((e) => Toast.show({ description: e.toString() }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={{ flex: 1, padding: 16 }}
      >
        <TextInput
          multiline
          value={observacion}
          onChangeText={(v) => setObservacion(v)}
          placeholder={'Observacion'}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            padding: 16,
            borderColor: 'lightgrey',
          }}
          numberOfLines={2}
        />
      </ScrollView>
      <View style={{ padding: 16 }}>
        <Button onPress={onPress} borderRadius={30} padding={4}>
          <Text>Modificar</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ModificarObservacionScreen;
