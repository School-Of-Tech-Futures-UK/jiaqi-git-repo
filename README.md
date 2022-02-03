# Connect 4 Game

This is a connect4 game created using Javascript, HTML and CSS

## Key Files
* **connect-4.js** : Code for game logic
* **index.js** : code for DOM manipulation
* **client.js**: code for making front end api calls to post and retrieve highscores
* **app.js**: back end server created using express framework
* **index.html** : html file for game board
* **main.css** : styling of html file
* **connect-4.test.js** :code for testing of game logic
* **discSound.mp3** : Sound effect obtained from https://www.zapsplat.com
*  **click.mp3** : Sound effect obtained from https://www.zapsplat.com
*  **winner.mp3** : Sound effect obtained from https://www.zapsplat.com

## Cloning Repository

Clone the repository by running the following code in a terminal
```
git clone https://github.com/School-Of-Tech-Futures-UK/jiaqi-git-repo.git
```
# Running the files

To start the server run:
```
node app.js
```
Open the html file in your browser or type http://localhost:5500/index.html into your browser to start playing

# Game Rules 
* Enter player name to start playing. By default player 1 is red and player 2 is yellow and red will go first
* click on a column to place a disc 
* Turns alternate
* The game ends when a player places a winning combination of four consecutive discs either in a row, column or diagnoal
* The winner score is calculated by subtracting the number of moves made from 42
* The winner name will be added to a highscore board
* press reset to reset the board and play again or reset all to start afresh a new game with new players

