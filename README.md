# Building Blackjack Game in JavaScript
This is a simple singleplayer game against the bot.
This is my first game ever made using HTML, CSS and Javascript.


Do you want to play this game?

--->    [LET'S PLAY](https://hephsi.github.io/BlackJack-Game/)


## Game Insights

* Contains a deck of cards containing 2 to 10 value cards and each of Ace,King,Queen and Joker that can be of any suit
* Ace as a special card is evalueted as "1" or "11" depending on score of the player. If the score is below 21 ace value will be "11" otherwise it's value will be "1".
* Card is drawn randomly in player box on clicking "Hit" button while card is generated randomly in Dealer box when player is on stand.
* Player can't get any more cards after he reaches "21" or gets passed it.
* Player has to be on stand after reaching a score less than or equal to "21".
* Also keeps the count of wins,loses and Draws of the player in the game.
* Sounds will be played when the card is showed up and when the result got displayed.

## Dealer Logic
* Logic of the Dealer is very simple . He will be drawing next card if score is less than 17 irrespective of player's score.


## Blacjack Game overview and Rules:

This game I created is slightly different from original game played at casinos. In this game the player who scores close to value "21" will win and other will lost.

# How to play?

* Game will be started by player by clicking on hit button and can hit any number of times before score exceeds "21".
* If the player got close to score "21" or exceeds "21", he will be on stand by clicking "Stand" button.
* When player is on stand dealer cards will be showed up.
* Result will be displayed on the top according to score of player and dealer and automatically starts the next game after 1 sec of displaying result.
* scoreboard on right shows the count of wins,losses and draws of player.
* To start a new game with new score board click on "Restart" button.

## Game Demo vedio

![Demo](https://user-images.githubusercontent.com/50313861/124391086-82477800-dd0c-11eb-8a64-030f78e0d326.gif)


# Assets of the Game

* Different Images of 13 cards (can be found in images folder)
* Different sound tracks while playing to make the game alive (available in sounds folder)

# How can you access game in your system

Its very simple process , simply download code files present in the repo along with the assets of game and keep them all in one folder and use compiler like VS code to run the HTML code.

* Tools : Visual Studio Code

   
