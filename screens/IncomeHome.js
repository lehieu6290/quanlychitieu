import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DB from '../database/Database';
import Card from '../components/Card';
import ItemForm from '../components/ItemForm';
import AddButton from '../components/AddButton';

const IncomeHome = ({ navigation }) => {

  const [ cards, setCards ] = useState([]);
  const [ isUpdateCard, setIsUpdateCard ] = useState(true);
  const [ editFormVisible, setEditFormVisible ] = useState(false);

  async function getData(){
    const data = await DB.getAllCard("income");
    setCards(data.reverse());
    setIsUpdateCard(false);
  }

  useEffect(() => {
    if(isUpdateCard) getData();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsUpdateCard(true);
    });
    
    return () => { unsubscribe }
  }, [isUpdateCard, cards]);

  function showCardDetails(card){
    navigation.navigate('CardDetails', { card, type: "income" });
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.listContainer }>
        { cards.length == 0 && <Text style={{ fontSize: 20, fontFamily: 'Roboto-Regular', padding: 20, textAlign: 'center', color: 'gray' }}>Nhấn vào dấu + bên dưới để thêm khoản thu nhập</Text> }
        <FlatList
          data={ cards }
          renderItem={ ({ item }) => <Card card={ item } showCardDetails={ showCardDetails } /> }
          keyExtractor={ item => item.key }
          inverted
        />
      </View>
      <AddButton onPress={ () => setEditFormVisible(true) } />
      { editFormVisible && <ItemForm setEditFormVisible={ setEditFormVisible } setIsUpdated={ setIsUpdateCard } type="income" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    flexGrow: 9,
    backgroundColor: '#fff'
  }
});

export default IncomeHome;