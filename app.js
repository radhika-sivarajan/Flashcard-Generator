// Packages and files for flashcard generator
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");

// Choices for selecting an action.
var userOptions = [
	{
		type: "list",
	    name: "userChoice",
	    message: "What is your option for flash card?",
	    choices: ["View", "Create", "Delete"]
  	}
];

// Choices for card type.
var cardOptions = [
	{
		type: "list",
	    name: "cardType",
	    message: "What type of card you want?",
	    choices: ["Basic", "Cloze"]
	}
];

// Questions for basic card.
var basicCardQuiz = [
	{
		type: "input",
		name: "front",
		message: "What should be on the front of the card?",
		validate: function (name){
			if(name.length !== 0)
				return true;
			else
				return "This field cannot be empty!";
		}
	},
	{
		type: "input",
		name: "back",
		message: "What should be on the back of the card?",	
		validate: function (name){
			if(name.length !== 0)
				return true;
			else
				return "This field cannot be empty!";
		}	
	}
];

// Questions for cloze card.
var clozeCardQuiz = [
	{
		type: "input",
		name: "text",
		message: "Enter the full text.",
		validate: function (name){
			if(name.length !== 0)
				return true;
			else
				return "This field cannot be empty!";
		}
	},
	{
		type: "input",
		name: "cloze",
		message: "Which text need to be hidden?",
		validate: function (name){
			if(name.length !== 0)
				return true;
			else
				return "This field cannot be empty!";
		}
	}
]

// Prompt user to view or create card(s).
function runUserOption(){
	inquirer.prompt(userOptions).then(function(user) {
		switch(user.userChoice){
			case ("View"):
				viewCard();
				break;
			case ("Create"):
				createCard();
				break;
			case ("Delete"):
				deleteCard();
				break;				
		}
	});
}

// Prompt user to select a card type.
function createCard(){
	inquirer.prompt(cardOptions).then(function(card){
		switch(card.cardType){
			case ("Basic"):
				createBasicCard();
				break;
			case ("Cloze"):
				createClozeCard();
				break;
		}
	});
}

// Prompt basic card questions and save answer to a file.
function createBasicCard(){
	inquirer.prompt(basicCardQuiz).then(function(basicQuiz){
		var appendText = {
			type: "Basic",
			front: basicQuiz.front,
			back: basicQuiz.back,
		}
		fs.appendFile("cards.txt",JSON.stringify(appendText) + "\r\n");
	});
}

// Prompt cloze card questions and save answer to a file.
function createClozeCard(){
	inquirer.prompt(clozeCardQuiz).then(function(clozeQuiz){

		var appendText = {
			type: "Cloze",
			text: clozeQuiz.text,
			cloze: clozeQuiz.cloze
		}
		fs.appendFile("cards.txt",JSON.stringify(appendText) + "\r\n");
	});
}

// Read cards from file 
// Create object for each of them with the constructors 
// View each card details.
function viewCard(){
	fs.readFile("cards.txt", 'utf8', function(error, data){

		if(!error){
			var cards = data.split("\r\n");
			var count = 0;
			var info = ["Card Front: ", "\nCard back: ", "Full text: ", "\nCloze delete text: ", "\nPartial text: "];
			
			cards.forEach(function (card) {
				if(card.length > 37){
					count++;
					card = JSON.parse(card);
					var title = chalk.red.bold("Flash card " + count ) + " (" + card.type.toLowerCase() + ")";

					switch(card.type){
						case ("basic"):
						case ("Basic"):
							var card = BasicCard(card.front, card.back);
							console.log(title + "\n"
								+ chalk.blue(info[0]) + card.showFront()
								+ chalk.blue(info[1]) + card.showBack());
							break;
						case ("cloze"):
						case ("Cloze"):
							var card = ClozeCard(card.text, card.cloze);
							console.log(title + "\n"
								+ chalk.blue(info[2]) + card.fullText()
								+ chalk.blue(info[3]) + card.clozeText()
								+ chalk.blue(info[4]) + card.partialText());
							break;
					}
				}
			});
		}
	});
}

// Delete card from the text file
function deleteCard(){
	var cardDataArray= [];
	fs.readFile("cards.txt", 'utf8', function(error, data){
		if(!error){
			var cards = data.split("\r\n");			
			cards.forEach(function (card) {
				if(card.length > 37){
					card = JSON.parse(card);				
					if(card.type === "Basic"){
						cardDataArray.push(card.front);
					}else if(card.type === "Cloze"){
						cardDataArray.push(card.text);
					}					
				}
			});

			inquirer.prompt([
				{
					name: 'deleteCardQuiz',
					type: 'list',
					message: 'Which card you want to delete?',
					choices: cardDataArray
				}
			]).then(function(cardDelete){
				var index = null;				
				for (var i = 0; i < cards.length; i++){
					if (cards[i].match(cardDelete.deleteCardQuiz)){
						index = i;
					}
				}
				index !== null ? (
					delete cards[index],
					fs.writeFile("cards.txt",cards.join('\r\n')),
					console.log(chalk.green("Deleted the card"))
				) : console.log(chalk.red("Cannot delete this card"));											
			});
		}
	});
}

// Run first user prompt
runUserOption();