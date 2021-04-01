import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

import CardItem from '../components/CardItem';
import ItemForm from '../components/ItemForm';
import DB from '../database/Database';
import { deleteItem } from '../controllers/CardController';
import AddButton from '../components/AddButton';
import { convertToString } from '../utils/Key';
import CardModel from '../models/Card';
import { convertToMoneyString } from '../utils/Money';

const CardDetails = ({ navigation, route }) => {

    const { key, data } = route.params.card;
    const { type } = route.params;
    const [ editFormVisible, setEditFormVisible ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ isUpdateItem, setIsUpdateItem ] = useState(true);
    const [ listItem, setListItem ] = useState([]);
    const [ totalMoney, setTotalMoney ] = useState(0);

    async function getData(){
        const card = await DB.getCard(key, type);
        setListItem(card);
        setIsUpdateItem(false);
        const cardModel = new CardModel(card);
        setTotalMoney(cardModel.getTotalMoney());
    }

    useEffect(() => {
        if(isUpdateItem) getData();
    }, [isUpdateItem, listItem]);

    // function handleUpdateItem(id, item){
    //     if(id){
    //         updateItem(id, item, key);
    //     }else{
    //         insertItem(key, item);
    //     }

    //     setIsUpdateItem(true);
    // }

    function handleDeleteItem(id){
        deleteItem(id, key, type);
        setIsUpdateItem(true);
    }
    
    useEffect(() => {
        setSelectedItem(null);
    }, [selectedItem]);

    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <View style={ { justifyContent: 'center' } }>
                    <TouchableOpacity onPress={ () => { navigation.goBack() } }>
                        <Image style={ styles.icon } source={ require('../images/previous.png') } />
                    </TouchableOpacity>
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text style={{ ...styles.text, fontFamily: 'Roboto-Regular', fontSize: 20 }}>{ convertToString(key) }</Text>
                    <Text style={{ ...styles.text, fontFamily: 'Roboto-Bold', fontSize: 30 }}>{ "-" + convertToMoneyString(totalMoney) + " đ" }</Text>
                </View>
            </View>
            <View style={ styles.listContainer }>
                <FlatList
                    data={ listItem }
                    renderItem={({ item }) => <CardItem setEditFormVisible={ setEditFormVisible } item={ item } setSelectedItem={ setSelectedItem } deleteItem={ handleDeleteItem } />}
                    keyExtractor={ item => item.id + "" }
                />
            </View>
            <AddButton onPress={ () => setEditFormVisible(true) } />
            { editFormVisible && <ItemForm setEditFormVisible={ setEditFormVisible } setIsUpdated={ setIsUpdateItem } selectedItem={ selectedItem } keyDate={ key } type={ type } /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    listContainer: {
      flex: 1,
      flexGrow: 8,
      backgroundColor: '#fff'
    },

    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#CF86E9',
        padding: 5
    },

    icon: {
        width: 27,
        height: 27,
    },

    text: {
        color: '#fff', 
        textAlign:'center',
        padding: 3,
    }
});

export default CardDetails;