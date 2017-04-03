var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");

var userOptions = [
	{
		type: "list",
	    name: "userChoice",
	    message: "What is your option for flash card?",
	    choices: ["View", "Create"]
  	}
];

var cardOptions = [
	{
		type: "list",
	    name: "cardType",
	    message: "What type of card you want?",
	    choices: ["Basic", "Cloze"]
	}
];

var basicCardQuiz = [
	{
		type: "input",
		name: "front",
		message: "What should be on the front of the card?",		
	},
	{
		type: "input",
		name: "back",
		message: "What should be on the back of the card?",		
	}
];

var clozeCardQuiz = [
	{
		type: "input",
		name: "text",
		message: "Enter the full text."
	},
	{
		type: "input",
		name: "cloze",
		message: "Which text need to be hidden?"
	}
]

function runUserOption(){
	inquirer.prompt(userOptions).then(function(user) {
		switch(user.userChoice){
			case ("View"):
				viewCard();
				break;
			case ("Create"):
				createCard();
				break;				
		}
	});
}

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

function createBasicCard(){
	inquirer.prompt(basicCardQuiz).then(function(basicQuiz){
		var appendText = {
			type: "Basic",
			front: basicQuiz.front,
			back: basicQuiz.back,
		}
		fs.appendFile("cards.txt",JSON.stringify(appendText) + "\n");
	});
}

function createClozeCard(){
	inquirer.prompt(clozeCardQuiz).then(function(clozeQuiz){

		var appendText = {
			type: "Cloze",
			text: clozeQuiz.text,
			cloze: clozeQuiz.cloze
		}
		fs.appendFile("cards.txt",JSON.stringify(appendText) + "\n");
	});
}


function viewCard(){
	fs.readFile("cards.txt", 'utf8', function(error, data){
		var cards = data.split("\n");
		var count = 0;
		var info = ["Card Front : ", "\nCard back: ", "Full text : ", "\nPartial text : ", "\nCloze text : "];

		cards.forEach(function (card) {
			if(card.length > 0){
				count++;
				console.log(chalk.red.bold("Card " + count));
				card = JSON.parse(card);
				switch(card.type){
					case ("Basic"):
						var card = new BasicCard(card.front, card.back);
						console.log(chalk.blue(info[0]) + card.showFront() 
							+ chalk.blue(info[1]) + card.showBack());
						break;
					case ("Cloze"):
						var card = new ClozeCard(card.text, card.cloze);
						console.log(chalk.blue(info[2]) + card.fullText() 
							+ chalk.blue(info[3]) + card.partialText()
							+ chalk.blue(info[4]) + card.clozeText());
						break;
				}
			}
		});
	});
}

runUserOption();