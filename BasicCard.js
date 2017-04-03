
// Constructor for basic flashcards.
var BasicCard = function(frontArg, backArg){
	this.frontArg = frontArg;
	this.backArg = backArg;

	this.showFront = function(){
		return (this.frontArg);
	};

	this.showBack = function(){
		return (this.backArg);
	};
};

module.exports = BasicCard;