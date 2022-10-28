import { FlatList, ScrollView, Spinner } from 'native-base';
import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  cell: { paddingVertical: 16, paddingHorizontal: 16 },
  selectedCell: { backgroundColor: '#eceff1' },
});

const SelectScreen = ({
  route: {
    params: { fetchOptions, onSelect, selectedId },
  },
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(selectedId);
  const [fetching, setFetching] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchOptions()
        .then((opts) => {
          setOptions(opts);
          setFetching(false);
        })
        .catch((e) => {
          console.log(e);
          setFetching(false);
        });
    }, [])
  );

  const renderItem = ({ item }) => {
    const isSelected = selected === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item.id);
          onSelect && onSelect(item.option);
        }}
        style={[styles.cell, isSelected ? styles.selectedCell : {}]}
      >
        <Text style={{ flex: 1, fontSize: 16 }}>{item.label}</Text>
        <Text
          style={{ flex: 1, fontSize: 12, fontWeight: 'bold', color: 'grey' }}
        >
          {item.subLabel}
        </Text>
      </TouchableOpacity>
    );
  };
  if (fetching) return <Spinner style={{ flex: 1 }} />;
  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      data={options}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: 'lightgrey',
            marginHorizontal: 16,
          }}
        />
      )}
    />
  );
};
export default SelectScreen;
