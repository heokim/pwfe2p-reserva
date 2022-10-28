import React, { useState } from 'react';
import { HStack, Center, Text } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { menus } from '../constants/menus';
import InfoModal from './InfoModal';

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
    }

});

const FooterMenu = ({ changeTab, active }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <HStack style={styles.footer} bg="indigo.600" alignItems="center" safeAreaBottom shadow={6} >
                {
                    menus.map(item => (
                        <TouchableOpacity key={item.redirect} onPress={() => changeTab(item.redirect)}>
                            <Center px={3}>
                                <Feather name={item.icon} size={22} color={active === item.redirect ? '#00008B' : 'white'} />
                                <Text style={{...styles.label, color: active === item.redirect ? '#00008B' : 'white'}}>{item.title}</Text>
                            </Center>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Center px={3}>
                    <Feather name="more-horizontal" size={22} color="white" />
                    </Center>
                </TouchableOpacity>
            </HStack>
            <InfoModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}

export default FooterMenu;