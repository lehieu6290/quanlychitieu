function Card(cards) {
    this.list = [ ...cards ];
}

Card.prototype.insert = function(item){
    const id = this.getId();
    const { title, money } = item;
    this.list.push({ id, title, money });
    return this.list;
}

Card.prototype.update = function(id ,item){
    const { title, money } = item;
    
    for(let i = 0; i < this.list.length; i++){
        if(this.list[i].id == id){
            this.list[i] = { id, title, money };        
        }
    }

    return this.list;
}

Card.prototype.delete = function(id){
    const result = this.list.filter(item => {
        return item.id != id;
    });

    this.list = [ ...result ];
    return this.list;
}

Card.prototype.getTotalMoney = function(){
    let total = 0;

    for(let i = 0; i < this.list.length; i++){
        total += parseInt(this.list[i].money);
    }

    return total;
}

Card.prototype.getId = function(){
    if(this.list.length === 0){
        return 1;
    }else{
        const lastId = this.list[this.list.length - 1].id;
        return lastId + 1;
    }
}

export default Card;