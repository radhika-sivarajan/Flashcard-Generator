
// Constructor for cloze flashcards.
var ClozeCard = function(textArg, clozeArg){
	this.textArg = textArg;
	this.clozeArg = clozeArg;
}

/* ***** Extended methods for constructor ClozeCard. ***** */

// Entire sentence.
ClozeCard.prototype.fullText = function(){
	return (this.textArg);
}

// Cloze deleted portion of the text.
ClozeCard.prototype.clozeText = function(){
	return (this.clozeArg);
}

// Text we get after removal of cloze deletion from the full text.
ClozeCard.prototype.partialText = function(){
	var partialText = this.textArg.replace(RegExp(this.clozeArg, "gi"), "..........");
	return (partialText);
}

module.exports = ClozeCard;