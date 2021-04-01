import AsyncStorage from '@react-native-async-storage/async-storage';

const DB = {};

DB.getAllCard = async function(type = "spending"){
    try {
        const keys = await AsyncStorage.getAllKeys();
        const cards = await AsyncStorage.multiGet(keys);
        const result = [];
        
        cards.forEach(item => {
            const card = JSON.parse(item[1])[type];
            if(card.length !== 0){
                result.push({ key: item[0], data: card });
            }
        });

        return result;
    } catch (error) {
        return false;
    }
}

DB.insertCard = async function(key, card){
    try {
        card = JSON.stringify(card);
        await AsyncStorage.setItem(key, card);
        return true;
    } catch (error) {
        return false;
    }
}

DB.getCard = async function(key, type){
    try {
        const card = await AsyncStorage.getItem(key);
        
        if(card == null){
            return null;
        }else{
            if(type == null){
                return JSON.parse(card)
            }else{
                return JSON.parse(card)[type];
            }
        }  
    } catch (error) {
        return false;
    }
}

export default DB;