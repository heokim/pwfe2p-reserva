import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginVertical: 8,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  itemText: { fontSize: 16 },
  itemTitle: {
    fontWeight: 'bold',
    color: 'grey',
  },
});
export const TextInput = ({ title, value, setValue }) => {
  const [valor, setValor] = useState(value);

  useEffect(() => setValue && setValue(valor), [valor]);
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Input
        style={{ fontSize: 20, height: 40 }}
        value={valor}
        onChangeText={(v) => {
          setValor(v);
        }}
      />
    </View>
  );
};

export const SelectInput = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={{ fontSize: 20, height: 40 }}>{value}</Text>
    </TouchableOpacity>
  );
};

export const DateInput = ({ title, value, setValue, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={() => setIsOpen(true)}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={{ fontSize: 20, height: 40 }}>
        {value?.format('DD/MM/YYYY') || ''}
      </Text>
      <DateTimePickerModal
        mode={mode}
        is24Hour={true}
        date={value?.toDate()}
        onCancel={() => setIsOpen(false)}
        isVisible={isOpen}
        isDarkModeEnabled
        onConfirm={(value) => {
          setValue(moment(value));
          setIsOpen(false);
        }}
        headerTextIOS="Fecha de nacimiento"
      />
    </TouchableOpacity>
  );
};

export const OptionsInput = ({ options, value, setValue, title }) => {
  return (
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      {options.map((opt) => (
        <TouchableOpacity
          onPress={() => setValue(opt)}
          style={{
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          key={opt}
        >
          <Icon
            as={Ionicons}
            color="blue.800"
            name={opt === value ? 'radio-button-on' : 'radio-button-off'}
            size={6}
          />
          <Text style={[styles.itemText, { marginLeft: 8 }]}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
