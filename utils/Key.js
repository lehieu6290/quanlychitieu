const createKey = (cards) => {
    let id = "";
    const d = new Date();
    const day = d.getDay();
    const date = d.getDate()
    const month = d.getMonth();
    const year = d.getFullYear();

    if(cards.length <= 0){
        id = "0001";
    }else{
        // const lastCardKey = cards[cards.length - 1].key;
        // const keySplited = lastCardKey.split("_");

        // if(day == keySplited[1] && date == keySplited[2] && month == keySplited[3] && year == keySplited[4]){
        //     id = keySplited[0];
        // }else{
        //     const newId = parseInt(keySplited[0]) + 1;
        //     if(newId < 10){
        //         id = "000" + newId;
        //     }else if(newId < 100){
        //         id = "00" + newId;
        //     }else if(newId < 1000){
        //         id = "0" + newId;
        //     }
        // }

        const itemFinded = cards.find(item => {
            const keySplited = item.key.split("_");
            if(day == keySplited[1] && date == keySplited[2] && month == keySplited[3] && year == keySplited[4]){
                return item;
            }
        });

        if(itemFinded != undefined){
            id = itemFinded.key.split("_")[0];
        }else{
            const newId = parseInt(itemFinded.key.split("_")[0]) + 1;
            if(newId < 10){
                id = "000" + newId;
            }else if(newId < 100){
                id = "00" + newId;
            }else if(newId < 1000){
                id = "0" + newId;
            }
        }
    }
    
    return id + "_" + day + "_" + date + "_" + month + "_" + year;
}

// const createKey = (cards) => {
//     const lastId = lastKey.split("_")[0];
//     const newId = parseInt(lastId) + 1;

    

//     const day = new Date();
//     return day.getDay() + "_" + day.getDate() + "_" + day.getMonth() + "_" + day.getFullYear();
// }

// const convertToString = (key) => {
//     const keySplited = key.split("_");
//     const day = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ 7"];
//     return day[parseInt(keySplited[0])] + ", " + keySplited[1] + "/" + (parseInt(keySplited[2]) + 1) + "/" + keySplited[3];
// }

const convertToString = (key) => {
    const keySplited = key.split("_");
    const year = keySplited[0];
    const month = keySplited[1];
    const date = keySplited[2];
    const dayIndex = new Date(year, month, date).getDay();
    const dayString = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ 7"];
    return dayString[dayIndex] + ", " + date + "/" + (parseInt(month) + 1) + "/" + year;
}

export { createKey, convertToString };