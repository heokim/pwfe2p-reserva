import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { Button, Text, Spinner, Icon, List, FlatList } from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import { getAll as getAllFichas } from '../../api/fichas';
import { get as getPaciente } from '../../api/pacientes';
import { get as getCategoria } from '../../api/tipoProducto';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import { fichaFilterToParams } from '../../utils';
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

const FichasScreen = () => {
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [filtros, setFiltros] = useState({});

  const updateFiltro = (field, value) =>
    setFiltros((prev) => ({ ...prev, [field]: value }));

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setIsFetching(true);
        setError(undefined);
        const fichas = await getAllFichas(fichaFilterToParams(filtros));
        await Promise.all(
          fichas.map(async (ficha) => {
            ficha.cliente = _.pick(
              await getPaciente(ficha.idCliente.idPersona),
              ['idPersona', 'nombre', 'apellido']
            );
            ficha.empleado = _.pick(
              await getPaciente(ficha.idEmpleado.idPersona),
              ['idPersona', 'nombre', 'apellido']
            );
            ficha.categoria = _.pick(
              await getCategoria(ficha.idTipoProducto.idTipoProducto),
              ['idTipoProducto', 'descripcion']
            );
          })
        );

        setData(fichas);
        setIsFetching(false);
      })();
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
            Fichas Clinicas
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NuevaFichaScreen')}
            style={{ paddingLeft: 10, paddingVertical: 10 }}
          >
            <Icon as={Ionicons} name="add" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 16, flexDirection: 'row' }}
          onPress={() => {
            navigation.navigate('FiltrosFichaScreen', {
              updateFiltro,
              filtros,
              clearFiltros: () => setFiltros({}),
            });
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>
            Filtros
          </Text>
          <Icon as={Ionicons} name="filter" size={5} color={'blue.300'} />
        </TouchableOpacity>
        {isFetching && <Spinner style={{ marginVertical: 32 }} />}
        {!isFetching && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.idFichaClinica}
            renderItem={({ item }) => <ListItem item={item} />}
          />
        )}
      </View>
    </>
  );
};

export default FichasScreen;

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  console.log(item);
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
        <Text style={[styles.itemTitle, { flex: 1 }]}>
          {`${item.cliente?.nombre || ''} ${item.cliente?.apellido || ''}`}
        </Text>
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
              <Text style={styles.itemTitle}>Fisioterapeuta</Text>
              <Text style={styles.itemText}>{`${item.empleado?.nombre || ''} ${
                item.empleado?.apellido || ''
              }`}</Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: 'column', paddingVertical: 4 }}
            >
              <Text style={styles.itemTitle}>Tipo Producto</Text>
              <Text style={styles.itemText}>{item.categoria.descripcion}</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingVertical: 4 }}>
            <Text style={styles.itemTitle}>Motivo de Consulta</Text>
            <Text style={styles.itemText}>{item.motivoConsulta}</Text>
          </View>
          <View style={{ flex: 1, paddingVertical: 4 }}>
            <Text style={styles.itemTitle}>Fecha</Text>
            <Text style={styles.itemText}>
              {item.fechaHora
                ? moment(item.fechaHora).format('DD/MM/YYYY hh:mm')
                : '--'}
            </Text>
          </View>
          <View style={{ flex: 1, paddingVertical: 4 }}>
            <Text style={styles.itemTitle}>Diagnostico</Text>
            <Text style={styles.itemText}>{item.diagnostico}</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Observaciones</Text>
              <Text style={styles.itemText}>{item.observacion}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ModificarObservacionScreen', {
                  fichaId: item.idFichaClinica,
                  obs: item.observacion,
                })
              }
            >
              <Icon as={MaterialCommunityIcons} size={6} name="pencil" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
