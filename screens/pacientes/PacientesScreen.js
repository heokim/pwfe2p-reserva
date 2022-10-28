import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { Text, Spinner, Icon, List, FlatList } from 'native-base';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAll as getAllPacientes } from '../../api/pacientes';
import { TIPO_PERSONA } from '../../constants/constants';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  itemText: { fontSize: 16 },
  itemTitle: {
    fontWeight: 'bold',
  },
});

const PacientesScreen = () => {
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [filtros, setFiltros] = useState({
    like: 'S',
    ejemplo: { nombre: '', apellido: '' },
  });
  const updateFiltro = (field, value) =>
    setFiltros((prev) => {
      if (field === 'nombre') prev.ejemplo.nombre = value;
      if (field === 'apellido') prev.ejemplo.apellido = value;
      return prev;
    });

  const [error, setError] = useState(undefined);
  useFocusEffect(
    React.useCallback(() => {
      setIsFetching(true);
      setError(undefined);
      getAllPacientes(filtros)
        .then((lista) => {
          setData(lista);
          setIsFetching(false);
        })
        .catch((error) => {
          console.log(error);
          setIsFetching(false);
        });
    }, [filtros])
  );

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            Pacientes
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NuevoPacienteScreen')}
            style={{ paddingLeft: 10, paddingVertical: 10 }}
          >
            <Icon as={Ionicons} name="add" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ paddingVertical: 16, flexDirection: 'row' }}
          onPress={() =>
            navigation.navigate('FiltrosPacienteScreen', {
              filtros,
              updateFiltro,
            })
          }
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>
            Filtros
          </Text>
          <Icon as={Ionicons} name="filter" size={5} color={'blue.300'} />
        </TouchableOpacity>
        {isFetching && <Spinner style={{ marginVertical: 32 }} />}
        {!isFetching && (
          <FlatList
            keyExtractor={(item) => item.idPersona}
            data={data}
            renderItem={({ item }) => <ListItem item={item} />}
          />
        )}
      </View>
    </>
  );
};

export default PacientesScreen;

const ListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey',
        marginVertical: 8,
      }}
    >
      <TouchableOpacity
        onPress={toggle}
        style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}
      >
        <Text
          style={[styles.itemTitle, { flex: 1 }]}
        >{`${item.nombre} ${item.apellido}`}</Text>
        <Icon
          as={Entypo}
          size={5}
          name={isOpen ? 'chevron-up' : 'chevron-down'}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.itemTitle}>Email</Text>
              <Text style={styles.itemText}>{item.email}</Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: 'column', paddingVertical: 4 }}
            >
              <Text style={styles.itemTitle}>Telefono</Text>
              <Text style={styles.itemText}>{item.telefono}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, paddingVertical: 4 }}>
              <Text style={styles.itemTitle}>Tipo Persona</Text>
              <Text style={styles.itemText}>{item.tipoPersona}</Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 4 }}>
              <Text style={styles.itemTitle}>Número de Documento</Text>
              <Text style={styles.itemText}>
                {item.tipoPersona === TIPO_PERSONA.FISICA
                  ? item.cedula
                  : item.ruc}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingVertical: 4 }}>
            <Text style={styles.itemTitle}>Fecha de Nacimiento</Text>
            <Text style={styles.itemText}>
              {item.fechaNacimiento &&
                moment(item.fechaNacimiento).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
