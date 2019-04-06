var app = angular.module('masterMindApp', []);

app.controller('MasterMindController', masterMind);

function masterMind() {
    this.home = true;
    this.startGame = function () {
        this.home = false;
        this.Min = 1;
        this.Max = 9;

        this.random = [];
        this.correct = false;
        this.numberOfGuess = 8;
        this.previousGuess = 0;
        this.guessRemaining = this.numberOfGuess;

        this.white = 0;
        this.black = 0;

        this.darkBalls = [];
        this.whiteBalls = [];
        this.noBalls = [];

        this.defaultBalls = [1,2,3,4];

        while(this.random.length<4){
            let value = Math.floor(Math.random() * this.Max) + this.Min;
            this.random.push(value);

            this.random = this.random.filter(function(item, index, random){
                return random.indexOf(item) === index;
            });
        }
    };

    this.endGame= function(){
        this.home = true;
    };

    this.getArray = function(number){

        let guess = [];
        let count = 0;

        while(number){
            let value = number % 10;
            guess[count] = value;
            number = parseInt(number/10);
            count++;
        }

        return guess.reverse();
    };

    this.getString = function (number) {
        return number.toString().replace(/,/g,'');
    };

    this.guessNumber = function () {
        let guessedNumber = parseInt(this.number);
        if(this.number == guessedNumber){
            if(this.getArray(guessedNumber).length==4){
                if(this.previousGuess!= guessedNumber){
                    if(this.guessRemaining != 0){
                        this.resetBalls();
                        this.guessRemaining = this.guessRemaining > 0 ? this.guessRemaining-1:this.guessRemaining;
                        let guessArray = this.getArray(guessedNumber);
                        this.isCorrectGuess(guessArray);
                    }
                    if(this.guessRemaining==0){
                        this.message = "Out of Guess ! !";
                        this.correctNumber = 'Correct Number : '+this.getString(this.random);
                    }
                }else{
                    if(this.guessRemaining==0){
                        this.message = "Out of Guess ! !";
                    }else{
                        this.message = "This is previous guess !";
                    }
                }
                this.previousGuess = guessedNumber;
            }else{
                this.message = 'Please Enter four digit number !';
            }
        }else{
            this.message = 'Please Enter Number !';
        }
    };

    this.isCorrectGuess = function(guessArray){
        for(let i=0;i<4;i++){
            if(this.random[i] == guessArray[i]){
                this.black++;
            }
            for(let j=0; j<4; j++){
                if(i!=j){
                    if(this.random[i] == guessArray[j]){
                        this.white++;
                    }
                }
            }
        }

        if(this.black==4){
            this.correct = true;
        }

        this.displayBalls(this.black, this.white)
    };

    this.displayBalls = function (black, white) {
        for(let i=0; i<black; i++){
            this.darkBalls.push(i+1);
        }

        for(let j=0; j<white; j++){
            this.whiteBalls.push(j+1);
        }

        let noBalls = (4-white-black) > 0 ? (4-white-black):0;

        for(let k=0; k<noBalls; k++){
            this.noBalls.push(k+1);
        }

        if(this.correct){
            this.message = "Correct Guess !";
            this.guessMessage = '';
        }else{
            this.message = '';
        }
        this.resetBlackWhiteCount();
    };

    this.resetBlackWhiteCount = function () {
        this.black = 0;
        this.white = 0;
    };

    this.resetBalls = function(){
        this.noBalls = [];
        this.whiteBalls = [];
        this.darkBalls = [];
    }
}