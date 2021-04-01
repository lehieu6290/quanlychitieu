import Card from '../models/Card';
import DB from '../database/Database';


async function insertItem(key, item, type = "spending"){
    let result = await DB.getCard(key);
    
    if(result == null){
        result = {
            spending: [],
            income: []
        };
    }  
    
    const card = new Card(result[type]);
    const newCard = card.insert(item);
    
    DB.insertCard(key, { ...result, [type]: [ ...newCard ] });
}

async function updateItem(id, item, key, type = "spending"){
    let result = await DB.getCard(key);
    let card = new Card(result[type]);
    const newCard = card.update(id, item);

    DB.insertCard(key, { ...result, [type]: [ ...newCard ] });
}

async function deleteItem(id, key, type = "spending"){
    let result = await DB.getCard(key);
    let card = new Card(result[type]);
    const newCard = card.delete(id);

    DB.insertCard(key, { ...result, [type]: [ ...newCard ] });
}

export { insertItem, updateItem, deleteItem }