// Package for terminal colors
var chalk = require("chalk");

// Constructor for cloze flashcards.
var ClozeCard = function(textArg, clozeArg){
	if (this instanceof ClozeCard) {
		this.textArg = textArg;
		this.clozeArg = clozeArg;
	}else {
        return new ClozeCard(textArg, clozeArg);
    }
};

/* ***** Extended methods for constructor ClozeCard. ***** */

// Entire sentence.
ClozeCard.prototype.fullText = function(){
	return (this.textArg);
};

// Cloze deleted portion of the text.
ClozeCard.prototype.clozeText = function(){
	return (this.clozeArg);
};

// Text we get after removal of cloze deletion from the full text.
ClozeCard.prototype.partialText = function(){
	var replaceText = RegExp(this.clozeArg, "gi");
	var found = this.textArg.search(replaceText);

	// If cloze text found, replace that text in full text else throw an error.
	if(found >= 0){
		var partialText = this.textArg.replace(replaceText, "..........");
		return (partialText);
	}else{
		var message = chalk.red("Error! ") + chalk.magenta.underline("Cloze text not found in the full text");
		return (message);
	}
};

module.exports = ClozeCard;