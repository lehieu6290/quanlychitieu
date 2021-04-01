import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DB from '../database/Database';
import Card from '../models/Card';
import { convertToMoneyString } from '../utils/Money';

const StatisticTab = ({ navigation }) => {

    const [ spending, setSpending ] = useState(0);
    const [ income, setIncome ] = useState(0);

    async function getData(){
        const spendingArray = await DB.getAllCard("spending");
        const incomeArray = await DB.getAllCard("income");

        let spendingTotal = 0;
        let incomeTotal = 0;
        for(let i = 0; i < spendingArray.length; i++){
            const spendingCard = new Card(spendingArray[i].data);
            spendingTotal += spendingCard.getTotalMoney();
        }

        for(let i = 0; i < incomeArray.length; i++){
            const incomeCard = new Card(incomeArray[i].data);
            incomeTotal += incomeCard.getTotalMoney();
        }

        setSpending(spendingTotal);
        setIncome(incomeTotal);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        return () => { unsubscribe }
    }, []);

    function moneySub(){
        const sub = income - spending;
        if(sub >= 0){
            return convertToMoneyString(sub);
        }else{
            return "-" + convertToMoneyString(Math.abs(sub));
        }
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Tổng thu nhập</Text>
            <Text style={ styles.money }>{ convertToMoneyString(income) + " đ" }</Text>
            <Text style={ styles.title }>Tổng chi tiêu</Text>
            <Text style={ styles.money }>{ convertToMoneyString(spending) + " đ" }</Text>
            <Text style={ styles.title }>Cân đối</Text>
            <Text style={ styles.money }>{ moneySub() + " đ" }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center'
    },

    money: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        paddingBottom: 20,
    }
});

export default StatisticTab;