import { useNavigation } from '@react-navigation/core';
import { View, Button, Text, ScrollView, Toast, Checkbox } from 'native-base';
import React from 'react';
import { useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import ReservaAPI from '../../api/reservas';
const ModificarReservaScreen = ({
  route: {
    params,
  },
}) => {
  const navigation = useNavigation();
  const [body, setBody] = useState({...params});

  const updateBody = (field, value) => setBody(prev => ({...prev, [field]:value}));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={{ flex: 1, padding: 16 }}
      >
        <TextInput
          multiline
          value={body.observacion}
          onChangeText={(v) => updateBody('observacion', v)}
          placeholder={'Observacion'}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            padding: 16,
            borderColor: 'lightgrey',
          }}
          numberOfLines={2}
        />
        <View style={{flex:1, flexDirection:'row', marginTop: 16}}>
            <Text style={{ marginRight: 20 }}>Asistió?</Text>
            <Checkbox
                value="asistio"
                isChecked={body.flagAsistio === 'S'}
                onChange={(isSelected) =>  updateBody('flagAsistio', isSelected ? 'S' : null)}
            />
        </View>
      </ScrollView>
      <View style={{ padding: 8 }}>
        <Button onPress={async () => await ReservaAPI.putReserva(body)} borderRadius={30} padding={4}>
          <Text>Modificar</Text>
        </Button>
      </View>
      <View style={{ padding: 8 }}>
        <Button
        backgroundColor="red.500"
        onPress={async () => await ReservaAPI.cancelarReserva(body.idReserva)} borderRadius={30} padding={4}>
          <Text color="white">Cancelar</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ModificarReservaScreen;
