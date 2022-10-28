import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import NuevaFichaScreen from './fichas/NuevaFichaScreen';
import NuevaReservaScreen from './reservas/NuevaReservaScreen';
import NuevoPacienteScreen from './pacientes/NuevoPacienteScreen';
import SelectScreen from './SelectScreen';
import FiltrosPacienteScreen from './pacientes/FIltrosPacienteScreen';
import FiltrosFichaScreen from './fichas/FiltrosFichaScreen';
import ModificarObservacionScreen from './fichas/ModificarObservacionScreen';
import { LoginContext } from '../providers/LoginContext';
import LoginScreen from './LoginScreen';
import FiltrosReservaScreen from './reservas/FiltrosReservaScreen';
import ModificarReservaScreen from './reservas/ModificarReservaScreen';

const AppStackNavigator = createNativeStackNavigator();

const AppNavigator = () => {
  const { state } = useContext(LoginContext);
  if (!state.loggedIn) {
    return <LoginScreen />;
  }
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator initialRouteName="HomeScreen">
        <AppStackNavigator.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <AppStackNavigator.Screen
          name="NuevaFichaScreen"
          component={NuevaFichaScreen}
          options={{
            title: 'Nueva ficha',
          }}
        />
        <AppStackNavigator.Screen
          name="NuevaReservaScreen"
          component={NuevaReservaScreen}
          options={{
            title: 'Nueva reserva',
          }}
        />
        <AppStackNavigator.Screen
          name="NuevoPacienteScreen"
          component={NuevoPacienteScreen}
          options={{
            title: 'Nuevo paciente',
          }}
        />
        <AppStackNavigator.Screen
          name="FiltrosPacienteScreen"
          component={FiltrosPacienteScreen}
          options={{
            title: 'Filtros',
          }}
        />
        <AppStackNavigator.Screen
          name="FiltrosFichaScreen"
          component={FiltrosFichaScreen}
          options={{
            title: 'Filtros',
          }}
        />
        <AppStackNavigator.Screen
          name="ModificarObservacionScreen"
          component={ModificarObservacionScreen}
          options={{
            title: 'Modificar Observación',
          }}
        />
        <AppStackNavigator.Screen
          name="SelectScreen"
          component={SelectScreen}
        />
        <AppStackNavigator.Screen
          name="FiltrosReservaScreen"
          component={FiltrosReservaScreen}
          options={{
            title: 'Filtros',
          }}
        />
        <AppStackNavigator.Screen
          name="ModificarReservaScreen"
          component={ModificarReservaScreen}
          options={{
            title: 'Modificar Reserva',
          }}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
