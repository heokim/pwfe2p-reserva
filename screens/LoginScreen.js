import React, { useContext, useState } from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Toast,
} from 'native-base';
import LoginApi from '../api/LoginApi';
import { LoginContext } from '../providers/LoginContext';
import { Keyboard } from 'react-native';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const { dispatch } = useContext(LoginContext);

  const getUser = async () => {
    Keyboard.dismiss();
    let data = await LoginApi.getUsers();
    let user = data.lista.find((usuario) => usuario.usuarioLogin === userName);
    if (user == undefined) {
      Toast.show({ description: 'No existe el usuario' });
    } else {
      dispatch({ type: 'LOG_IN', payload: user });
    }
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Inicia sesión para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}
            >
              Usuario
            </FormControl.Label>
            <Input
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}
            >
              Contraseña
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            _text={{ color: 'white' }}
            onPress={getUser}
          >
            Iniciar
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
