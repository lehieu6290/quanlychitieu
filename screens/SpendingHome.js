import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useDeepCompareEffect  from 'use-deep-compare-effect';

import DB from '../database/Database';
import Card from '../components/Card';
import ItemForm from '../components/ItemForm';
import AddButton from '../components/AddButton';

const SpendingHome = ({ navigation }) => {

  const [ cards, setCards ] = useState([]);
  const [ isUpdateCard, setIsUpdateCard ] = useState(true);
  const [ editFormVisible, setEditFormVisible ] = useState(false);

  async function getData(){
    const data = await DB.getAllCard();
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

  const showData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log(items);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      
    }
  }

  // function addNewItem(id, item){
  //   const key = createKey(cards);
    
  //   insertItem(key, item);
  //   setIsUpdateCard(true);
  // }

  function showCardDetails(card){
    navigation.navigate('CardDetails', { card, type: "spending" });
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.listContainer }>
      { cards.length == 0 && <Text style={{ fontSize: 20, fontFamily: 'Roboto-Regular', padding: 20, textAlign: 'center', color: 'gray' }}>Nhấn vào dấu + bên dưới để thêm khoản chi tiêu</Text> }
        <FlatList
          data={ cards }
          renderItem={ ({ item }) => <Card card={ item } showCardDetails={ showCardDetails } /> }
          keyExtractor={ item => item.key }
          inverted
        /> 
      </View>
      <AddButton onPress={ () => setEditFormVisible(true) } />
      {/* <Button title="Xem" onPress={ showData } /> */}
      { editFormVisible && <ItemForm setEditFormVisible={ setEditFormVisible } setIsUpdated={ setIsUpdateCard } type="spending" />}
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
  },
});

export default SpendingHome;