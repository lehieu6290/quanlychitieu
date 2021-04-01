const convertToMoneyString = (money) => {
    let moneyString = money + "";
    
    let unit = 0;
    let result = "";
    for(let i = moneyString.length - 1; i >= 0; i--){
        if(unit == 3){
            result += ".";
            unit = 0;
        }
        result += moneyString.charAt(i);
        unit++;
    }

    let splitString = result.split("");
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join("");

    return joinArray;
}

const convertToMoneyNumber = (money) => {
    if(money){
        const splitString = money.split(".");
        const joinArray = splitString.join("");

        return parseInt(joinArray);
    }else{
        return 0;
    }
}

export { convertToMoneyString, convertToMoneyNumber }