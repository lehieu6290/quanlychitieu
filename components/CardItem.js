import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { convertToMoneyString } from '../utils/Money';

const CardItem = ({ item, setEditFormVisible, setSelectedItem, deleteItem }) => {
    const {id, title, money } = item;

    function handleSetSelectedItem(){
        setSelectedItem(item);
        setEditFormVisible(true);
    }

    function handleDeleteItem(){
        deleteItem(id);
    }

    function showDeleteAlert(){
        Alert.alert(
            "Thông báo",
            "Bạn có chắc muốn xóa?",
            [
                {
                    text: "Hủy"
                },
                {
                    text: "Xóa",
                    onPress: () => {
                        handleDeleteItem();
                    }
                }
            ],
            {
                cancelable: true
            }
        );
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.left }>
                <Text style={ styles.text }>{ title }</Text>
                <Text style={ styles.text }>{ convertToMoneyString(money) + " đ" }</Text>
            </View>
            <View>
                <TouchableOpacity style={ { ...styles.button, marginBottom: 5 } } onPress={ () => handleSetSelectedItem() }>
                    <Image style={ styles.icon } source={ require('../images/edit.png') } />
                </TouchableOpacity>
                <TouchableOpacity style={ { ...styles.button, marginTop: 5 } } onPress={ showDeleteAlert }>
                    <Image style={ styles.icon } source={ require('../images/trash.png') } />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#848484',
        elevation: 7,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    left: {
        flexShrink: 1
    },

    text: {
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
        color: '#666566',
        padding: 3,
    },

    button: {
        backgroundColor: '#CF86E9',
        borderRadius: 7,
        padding: 5,
    },

    icon: {
        width: 27,
        height: 27,
    }
})

export default CardItem;