# Flashcard Generator

This constitute an API that allows users to create two types of flashcards, view the card details or delete card.  

- Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").
- Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")

## To Install
* Git Clone the repository to your local machine.
* Navigate to the folder where the repository in Terminal.
* Run the command `npm install` to download the required dependencies.

## Dependencies
npm packages
1. `inquirer` (A collection of common interactive command line user interfaces.)
1. `chalk` (Terminal string styling done right. Much color.)
1. `fs`(file reading)

## To Run
Run following command in terminal.

	node app.js
    
 Select option from the terminal to Create, View and delete flash cards.