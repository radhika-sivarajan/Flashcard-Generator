// Constructor for basic flashcards.  (scope-safe)
var BasicCard = function(frontArg, backArg){
	if (this instanceof BasicCard) {
        this.frontArg = frontArg;
		this.backArg = backArg;

		this.showFront = function(){
			return (this.frontArg);
		};

		this.showBack = function(){
			return (this.backArg);
		};
    }else {
        return new BasicCard(frontArg, backArg);
    }
};

module.exports = BasicCard;