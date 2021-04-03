import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { convertToString } from '../utils/Key';
import { insertItem, updateItem } from '../controllers/CardController';
import { convertToMoneyString, convertToMoneyNumber } from '../utils/Money';

const ItemForm = ({ setEditFormVisible, setIsUpdated, selectedItem, keyDate, type }) => {

    const [ id, setId ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ money, setMoney ] = useState("");
    const [ buttonTitle, setButtonTitle ] = useState("");
    const [ titleError, setTitleError ] = useState("");
    const [ moneyError, setMoneyError ] = useState("");
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ showButtonDatePicker, setShowButtonDatePicker ] = useState(true);
    const [ showDateField, setShowDateField ] = useState(true);
    const [ date, setDate ] = useState(new Date());
    const [ dateText, setDateText ] = useState("");
    const [ moneyValue, setMoneyValue ] = useState("");

    const textInput = useRef();

    useEffect(() => {
        
        if(selectedItem != null){
            setId(selectedItem.id);
            setTitle(selectedItem.title);
            setMoney(selectedItem.money);
            setButtonTitle("Cập nhật");
            setShowDateField(false);
            
        }else{
            setButtonTitle("Thêm");
        }
        
        if(keyDate != null){
            setShowButtonDatePicker(false);
            const keySplited = keyDate.split("_");
            setDate(new Date(keySplited[0], keySplited[1], keySplited[2]));
        }

        setTimeout(() => {
            textInput.current.focus();
        }, 200);
         
    }, []);

    useEffect(() => {
        const dateConverted = convertToString(convertDatePickerToKey(date));
        setDateText(dateConverted);
    }, [ date ]);

    useEffect(() => {
        setMoneyValue(convertToMoneyString(money));
    }, [money]);

    function handleMoneyTextChange(text){
        if(text){
            const stringSplitted = text.split('.');
            const textNumericValue = stringSplitted.join('');

            if(/\d+/.test(textNumericValue)){
                setMoney(textNumericValue);
                setMoneyError("");
            }
        }else{
            setMoney(0);
        }
    }

    function handleUpdateItem(){
        if(title !== "" && money !== ""){
            if(id){
                updateItem(id, { title, money }, keyDate, type);
            }else{
                insertItem(convertDatePickerToKey(date), { title, money }, type);
            }

            setIsUpdated(true);
            setEditFormVisible(false);
        }else{
            if(title === "")
            {
                setTitleError("Tiêu đề không được để trống");
            }
            
            if(money === ""){
                setMoneyError("Số tiền không được để trống");
            }
        }
    }

    function onChangeDate(event, selectedDate){
        if(selectedDate)
            setDate(selectedDate);
        else
            setDate(date);

        setShowDatePicker(false);
    }

    function convertDatePickerToKey(date){
        return date.getFullYear() + "_" + date.getMonth() + "_" + date.getDate();
    }

    return (
        <View>
            <Modal
                onRequestClose={() => {
                    setEditFormVisible(false);
                }}
                transparent={true}
            >
                <View style={ { backgroundColor: 'rgba(0,0,0,0.7)', flexGrow: 1 } }>
                    <View style={ { margin: 25, backgroundColor: '#fff', borderRadius: 10, padding: 10 } }>
                        <View>
                            <Text style={ styles.title }>Tiêu đề</Text>
                            <TextInput style={ styles.input } value={ title } onChangeText={ (text) => { setTitle(text); setTitleError("") } } ref={ textInput } />
                            <Text style={ styles.error }>{ titleError }</Text>
                        </View>
                        <View>
                            <Text style={ styles.title }>Số tiền</Text>
                            <TextInput style={ styles.input } keyboardType="numeric" value={ convertToMoneyString(money) } onChangeText={ (text) => { handleMoneyTextChange(text) } } />
                            <Text style={ styles.error }>{ moneyError }</Text>
                        </View>
                        { showDateField &&
                            (<View>
                                <Text style={ styles.title }>Ngày</Text>
                                <View style={ styles.dateContainer }>
                                    {/* <Text>{ dateText }</Text> */}
                                    <TextInput editable={ false } style={ { ...styles.input, backgroundColor: '#cfcfcf', borderColor: '#cfcfcf' } } value={ dateText } />
                                    { showButtonDatePicker && 
                                        <TouchableOpacity style={ styles.iconContainer } title="Chọn ngày" onPress={ () => setShowDatePicker(true) }>
                                            <Image style={ styles.icon } source={ require('../images/calendar-white.png') } />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>)
                        }
                        <View style={ styles.buttonContainer }>
                            <TouchableOpacity style={ styles.button } onPress={ handleUpdateItem }>
                                <Text style={ styles.textButton }>{ buttonTitle }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={ styles.button } onPress={ () => setEditFormVisible(false) }>
                                <Text style={ styles.textButton }>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                { showDatePicker && 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={ onChangeDate }
                    />
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },

    input: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 7,
        borderColor: 'gray',
        flexGrow: 1,
        color: '#000',
    },

    error: {
        paddingLeft: 10,
        fontSize: 15,
        color: 'red'
    },

    iconContainer: {
        backgroundColor: '#CF86E9',
        padding: 5,
        borderRadius: 5,
    },

    icon: {
        width: 30,
        height: 30,
    },

    dateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // marginLeft: 10,
        marginRight: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 10,
    },

    button: {
        backgroundColor: '#CF86E9',
        borderRadius: 10,
    },

    textButton: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default ItemForm;