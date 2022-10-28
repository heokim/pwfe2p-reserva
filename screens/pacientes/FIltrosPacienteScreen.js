import React from 'react';
import { Button, View, Text, ScrollView } from 'native-base';
import { TextInput } from '../../components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const FiltrosPacienteScreen = ({
  route: {
    params: { filtros, updateFiltro },
  },
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, padding: 16 }}>
      <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }}>
        <TextInput
          title={'Nombre'}
          value={filtros.ejemplo.nombre}
          setValue={(value) => updateFiltro('nombre', value)}
        />
        <TextInput
          title={'Apellido'}
          value={filtros.ejemplo.apellido}
          setValue={(value) => updateFiltro('apellido', value)}
        />
      </ScrollView>
      <Button borderRadius={30} padding={4} onPress={() => navigation.goBack()}>
        <Text>Buscar</Text>
      </Button>
    </SafeAreaView>
  );
};

export default FiltrosPacienteScreen;
