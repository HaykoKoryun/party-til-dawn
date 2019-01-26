const faker = require('faker');
import drinks from '../data/drinks';
import guests from '../data/guests';

const randomFromArray = items => items[Math.floor(Math.random()*items.length)];

export default class Guest {
    constructor (level) {
        this.isActivated = false;
        this.level = level;
        
        const _guest = randomFromArray(guests);

        this.name = faker.name.firstName(_guest.gender);
        this.image = _guest.image;

        switch(level) {
            case 1: 
                this.drinkCount = 3;
                this.good = 20;
                this.bad  = 20;
                this.hmm  = 10;
            case 2:
                this.drinkCount = 2;
                this.good = 15;
                this.bad  = 30;
                this.hmm  = 20;
            case 3:
                this.drinkCount = 1;
                this.good = 10;
                this.bad  = 40;
                this.hmm  = 30;
            default:
                this.good = 15;
                this.bad  = 30;
                this.hmm  = 20;
                this.drinkCount = 2;
        }

        this.drinks = [];

        for(let i = 0; i < this.drinkCount; i++) {
            let drink = randomFromArray(drinks).name;
            while(this.drinks.indexOf(drink) !== -1) {
                drink = randomFromArray(drinks);
            }
            this.drinks.push(drink);
        }
    
        this.satisfaction = 100;
    }

    useDrink(usedDrink) {
        for(let drink of this.drinks) if(drink === usedDrink) {
            return this.noiceBro();
        }
        return this.damnIt();
    }

    noiceBro() {
        this.satisfaction += this.good;
    }

    damnIt() {
        this.satisfaction -= this.bad;
    }

    yourNotGonnaGetIt() {
        this.satisfaction -= this.hmm;
    }
}