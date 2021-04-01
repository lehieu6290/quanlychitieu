import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const AddButton = ({ onPress }) => {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.button } onPress={ () => { onPress() } }>
                <Image style={ styles.icon } source={ require('../images/add.png') } />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 0.8,
        padding: 7,
        backgroundColor: '#fff',
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CF86E9',
        width: 145,
        height: 30,
        borderRadius: 22.5,
    },

    icon: {
        width: 20,
        height: 20,
    }
});

export default AddButton;