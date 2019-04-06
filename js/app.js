var app = angular.module('masterMindApp', []);

app.controller('MasterMindController', masterMind);

/**
 * Master Mind Controller
 */
function masterMind() {

    /**
     * Home Page flag
     *
     * @type {boolean}
     */
    this.home = true;

    /**
     * Help Page Flag
     *
     * @type {boolean}
     */
    this.help = false;

    /**
     * Game Page Flag
     *
     * @type {boolean}
     */
    this.game = false;

    /**
     * Start game and initiate the values
     */
    this.startGame = function () {
        this.home = false;
        this.game = true;
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

        /**
         * Generate four digit random number
         */
        while(this.random.length<4){
            let value = Math.floor(Math.random() * this.Max) + this.Min;
            this.random.push(value);

            this.random = this.random.filter(function(item, index, random){
                return random.indexOf(item) === index;
            });
        }
    };

    /**
     * End the game an return to main menu
     */
    this.endGame = function(){
        this.game = false;
        this.help = false;
        this.home = true;
    };

    /**
     * Go to help page and display rules and game play details
     */
    this.showHelp = function(){
      this.help = true;
      this.game = false;
      this.home = false;
    };

    /**
     * Go to home page
     */
    this.goHome = function(){
        this.home = true;
        this.game = false;
        this.help = false;
    };

    /**
     * Get individual digits of four digit number
     * @param number
     * @returns {*[]}
     */
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

    /**
     * Convert array of numbers into string
     *
     * @param number
     * @returns {string}
     */
    this.getString = function (number) {
        return number.toString().replace(/,/g,'');
    };

    /**
     * Get user guess from input field and process it to know how close is the guess
     */
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

    /**
     * Check if user guess is correct
     *
     * @param guessArray
     */
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
        /**
         * Correct Guess Case
         */
        if(this.black==4){
            this.correct = true;
        }

        this.displayBalls(this.black, this.white)
    };

    /**
     * Display balls based on closeness of result
     *
     * @param black
     * @param white
     */
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

    /**
     * Reset balls count
     */
    this.resetBlackWhiteCount = function () {
        this.black = 0;
        this.white = 0;
    };

    /**
     * Reset the balls array
     */
    this.resetBalls = function(){
        this.noBalls = [];
        this.whiteBalls = [];
        this.darkBalls = [];
    }
}