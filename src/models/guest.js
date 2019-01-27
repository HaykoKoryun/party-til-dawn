import drinks from '../data/drinks';
import guests from '../data/guests';
import store  from 'store';

import randomFromArray from '../common/randomFromArray';

const STAGE_SAY_PREFERNCES = 1;
const STAGE_WANT_AGAIN = 2;
const STAGE_REPEAT = 3;

const MOOD_NORMAL = 'normal';
const MOOD_BAD = 'angry';
const MOOD_GOOD = 'happy';

export default class Guest {
    constructor (level) {
        this.isActivated = false;
        this.level = level;
        
        const _guest = randomFromArray(guests);

        this.name = randomFromArray(_guest.names);
        _guest.names.splice(_guest.names.indexOf(this.name), 1);

        if(_guest.names.length == 0)
        { guests.splice(guests.indexOf(_guest));
        }
        
        this.image = _guest.image;
        this.mood = MOOD_NORMAL;

        this.stage = STAGE_SAY_PREFERNCES;

        this.processLevel(this.level);
    
        this.chooseDrinks();

        this.satisfaction = 100;
    }

    useDrink(usedDrink) {
        for(let drink of this.drinks) if(drink === usedDrink) {
            this.mood = MOOD_GOOD;
            return this.noiceBro();
        }
        this.mood = MOOD_BAD;
        return this.damnIt();
    }

    activate() {
        if(this.stage === STAGE_SAY_PREFERNCES) {
            let dialog = `I want a `;
            for(let i = 0; i < this.drinks.length; i++) {
                let drink = this.drinks[i];

                if(i === 0) dialog += drink;
                
                else if(i === (this.drinks.length - 1)) dialog += ` or ${drink}.`;

                else dialog += `, ${drink}`;
            }

            store.commit('dialog', dialog);
            return this.stage++;
        }

        if(this.stage === STAGE_WANT_AGAIN) {
            store.commit('dialog', 'Another one!');
            if(Math.random() > 0.5) this.stage++;
        }

        if(this.stage === STAGE_REPEAT) {
            this.chooseDrinks();
            
            this.level++;
            this.processLevel(this.level);
            this.stage = 1;
            return this.activate();
        }
    }

    chooseDrinks() {
        this.drinks = [];

        for(let i = 0; i < this.drinkCount; i++) {
            let drink = randomFromArray(drinks).name;
            while(this.drinks.indexOf(drink) !== -1) {
                drink = randomFromArray(drinks).name;
            }
            this.drinks.push(drink);
        }
    }

    processLevel(level) {
        switch(level) {
            case 1:
                this.drinkCount = 5;
                this.good = 30;
                this.bad  = 15;
                this.hmm  = 5;
                break;
            case 2:

                break;
            case 3: 
                this.drinkCount = 4;
                this.good = 30;
                this.bad  = 15;
                this.hmm  = 5;
                break;
            case 4:
                this.drinkCount = 2;
                this.good = 15;
                this.bad  = 30;
                this.hmm  = 20;
                break;
            case 5:
                this.drinkCount = 1;
                this.good = 10;
                this.bad  = 40;
                this.hmm  = 30;
                break;
            default:
                this.drinkCount = 1;
                this.good = 10;
                this.bad  = 40;
                this.hmm  = 30;
                break;
        }
    }

    noiceBro() {
        this.satisfaction += this.good;
        if(this.satisfaction > 100) 
            this.satisfaction = 100;
        store.commit('dialog', 'Noice one bro!');
    }

    damnIt() {
        this.satisfaction -= this.bad;
        if(Math.random() > 0.7) this.stage = STAGE_SAY_PREFERNCES;
        
        store.commit('dialog', 'This is not my sandwich!');
    }

    yourNotGonnaGetIt() {
        this.satisfaction -= this.hmm;
        store.commit('dialog', 'I guess I could drink toilet water!');
    }
}