import { useNavigation } from '@react-navigation/core';
import { Button, Toast } from 'native-base';
import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import { TextInput, SelectInput } from '../../components/Input';
import { getAll as getClientes } from '../../api/pacientes';
import DateTimePicker from '@react-native-community/datetimepicker';
import EmpleadoAPI from '../../api/empleados';
import ReservaAPI from '../../api/reservas';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    itemText: { fontSize: 16 },
    itemTitle: {
        fontWeight: 'bold',
    },
});

const initialReserva = {
    empleado: {
        id: 1,
        label: ""
    },
    cliente: {
        id: 1,
        label: ""
    },
    fecha: new Date(),
    turno: {
        horaInicio: '',
        horaFin: '',
    }
}

const NuevaReservaScreen = () => {
    const navigation = useNavigation();
    const [reserva, setReserva] = useState(initialReserva);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const getFechaCadena = (fecha) => {
        let fechaCadena = fecha.substr(0, 10).split('-').join('');
        console.log(fechaCadena);
        return fechaCadena;
    }

    const getHoraCadena = (hora) => {
        let horaCadena = hora.substr(0, 5).split(':').join('');
        return horaCadena;
    }

    const handleSave = async () => {
        let reservaToSave = {
            fechaCadena: getFechaCadena(reserva.fecha.toISOString()),
            horaInicioCadena: getHoraCadena(reserva.turno.horaInicio),
            horaFinCadena: getHoraCadena(reserva.turno.horaFin),
            idEmpleado: {
                idPersona: reserva.empleado.idPersona
            },
            idCliente: {
                idPersona: reserva.cliente.idPersona
            }
        }
        try {
            await ReservaAPI.postReserva(reservaToSave);
            Toast.show({
                title: "Reserva creada!",
                status: "success",
                description: "La reserva ha sido guardada exitosamente"
            });
            navigation.goBack();
        } catch (error) {
            Toast.show({
                title: "Hubo un error!",
                status: "error",
                description: "La reserva no pudo ser creada"
            });
        }
    }


    const updateField = (field, value) =>
        setReserva((prev) => ({ ...prev, [field]: value }));

    const canSave = Object.keys(reserva).every(field => reserva[field]);
    console.log(canSave);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                keyboardDismissMode="on-drag"
                style={{
                    flex: 1,
                    padding: 16,
                    backgroundColor: 'white',
                }}
            >
                <SelectInput
                    title={'Empleado*'}
                    value={reserva.empleado.nombreCompleto}
                    onPress={() =>
                        navigation.navigate('SelectScreen', {
                            fetchOptions: async () => {
                                const options = await EmpleadoAPI.getEmpleados();
                                return options.map((persona) => ({
                                    id: persona.idPersona,
                                    label: persona.nombreCompleto,
                                    subLabel: `CI: ${persona.cedula}`,
                                    option: persona
                                }));
                            },
                            onSelect: (item) => {
                                updateField('empleado', {
                                    ...item,
                                });
                            }
                        })
                    }
                />
                <SelectInput
                    title={'Cliente*'}
                    value={reserva.cliente.nombreCompleto}
                    onPress={() =>
                        navigation.navigate('SelectScreen', {
                            fetchOptions: async () => {
                                const options = await getClientes();
                                return options.map((persona) => ({
                                    id: persona.idPersona,
                                    label: persona.nombreCompleto,
                                    subLabel: `CI: ${persona.cedula}`,
                                    option: persona
                                }));
                            },
                            onSelect: (item) => {
                                updateField('cliente', {
                                    ...item,
                                })
                            }
                        })
                    }
                />
                <SelectInput
                    title={'Fecha*'}
                    value={reserva.fecha.toISOString().substr(0, 10) || ''}
                    onPress={() => setShowDatePicker(true)}
                />
                <SelectInput
                    title={'Turno*'}
                    value={reserva.turno.horaInicio + ' - ' + reserva.turno.horaFin}
                    onPress={() =>
                        navigation.navigate('SelectScreen', {
                            fetchOptions: async () => {
                                console.log(reserva.empleado);
                                const options = await ReservaAPI.getAgenda(reserva.empleado.idPersona, getFechaCadena(reserva.fecha.toISOString()));
                                
                                return options.map((option) => ({
                                    label: option.horaInicio.length > 8
                                        ? option.horaInicio.substr(11, 8)
                                        : option.horaInicio,
                                    subLabel: option.horaFin.substr(11, 8),
                                    option,
                                }));
                            },
                            onSelect: (item) => {
                                console.log(item)
                                updateField('turno', {
                                    horaInicio: item.horaInicio.length > 8 ?
                                                item.horaInicio.substr(11, 8) :
                                                item.horaInicio,
                                    horaFin: item.horaFin.substr(11, 8)
                                })
                            }
                        })
                    }
                />

                {
                    showDatePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={reserva.fecha}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || reserva.fecha;
                            updateField('fecha', currentDate);
                            setShowDatePicker(false);
                        }}
                    />
                }
            </ScrollView>
            <View style={{ margin: 16 }}>
                <Button
                    borderRadius={30}
                    padding={4}
                    onPress={async () => await handleSave()}
                >
                    <Text style={{ fontWeight: 'bold' }}>Guardar</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default NuevaReservaScreen;
