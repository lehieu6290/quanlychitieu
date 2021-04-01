import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { convertToString } from '../utils/Key';
import CardModel from '../models/Card';
import { convertToMoneyString } from '../utils/Money';

const Card = ({ card, showCardDetails }) => {

    const date = convertToString(card.key);
    const cardList = new CardModel(card.data);
    const totalMoney = cardList.getTotalMoney();

    function onPress(){
        showCardDetails(card);
    }

    return (
        <TouchableOpacity style={ styles.cardContainer } onPress={ onPress }>
            <View style={ styles.cardLeft }>
                <View style={ styles.titleContainer }>
                    <Image style={ styles.titleIcon } source={ require('../images/calendar.png') } />
                    <Text style={ styles.titleText } >{ date }</Text>
                </View>
                <View style={ styles.titleContainer }>
                    <Image style={ styles.moneyIcon } source={ require('../images/dollar.png') } />
                    <Text style={ styles.moneyText } >{ convertToMoneyString(totalMoney) + " đ" }</Text>
                </View>
            </View>
            <View>
                <Image style={ { width: 27, height: 27 } } source={ require('../images/next.png') } />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
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

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
    },

    titleIcon: {
        width: 19,
        height: 19,
        marginLeft: 5,
        marginRight: 9,
    },

    titleText: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        color: '#B0ADB0',
    },

    moneyIcon: {
        width: 23,
        height: 23,
        marginLeft: 3,
        marginRight: 7,
    },

    moneyText: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: '#6F696E',
    },

    cardLeft: {

    },
});

export default Card;