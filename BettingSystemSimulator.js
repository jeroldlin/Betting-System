// To add content, use display.innerHTML = div.innerHTML + "Extra stuff";
var display = {}
var simRan = 0;//determine if simulation has been played to clear previous displayed results
function myFunction() {
	display = document.getElementById("result");
	// The caculation starts here
	var winRate = +document.getElementById("winRate").value;//The winning possibility of the player
	var playerMoneyDefault = +document.getElementById("playerMoneyDefault").value;
	var profitGoal = +document.getElementById("profitGoal").value;
	var minBet = +document.getElementById("minBet").value;
	var maxBet = +document.getElementById("maxBet").value;
	var addMoneyWin = +document.getElementById("addMoneyWin").value;
	var addMoneyLose = +document.getElementById("addMoneyLose").value;
	var mulMoneyWin = +document.getElementById("mulMoneyWin").value;
	var mulMoneyLose = +document.getElementById("mulMoneyLose").value;
	var martBegin = +document.getElementById("martBegin").value;
	var gamesPlayed = +document.getElementById("gamesPlayed").value;
	var testRound = +document.getElementById("testRound").value;
	var count = 1;//Counts each sub-simulation session
	var maxMoney = playerMoneyDefault + profitGoal;//Player's goal for each sub-simulation
	var totalInvest = {};
	var endUp = {};
	var GameC = {};
	var playCount = 1;//Counts each win/loss played
	var betOnTable = {};
	var playerMoney = {};//The player's money, each array indicates records each sub-session
	var winStreak = 0;
	var maxWinStreak = 0;
	var loseStreak = 0;
	var maxLoseStreak = 0;
	var gameNumber = 0;//The random number that work with winning number to determine if the player is going to win
	var moneyRecord = {};//Tracker of player's money for each round, used for debugging
	var winCount = {};//Each array counts the winning and losing streaks, for streaks data
	var loseCount = {};//
	
	//This is the main module----------------------------------------------------------------------
	
	if (simRan < 1){//Clears previous displayed results
		simRan = 1;
	}else{
		display.innerHTML = "";
	}
	var winningMultiplier = "off";
	var losingMultiplier = "off";
	if (addMoneyWin != 0 || mulMoneyWin != 1) {winningMultiplier = "on";}
	if (addMoneyLose != 0 || mulMoneyLose != 1) {losingMultiplier = "on";}
	while (count <= testRound) {//Play and show the result of each sub section
		test();
		displayTestResult();
		count = count + 1;
	}
	
	roundUp();//Calculates players money of the whole simulation
	finalResult();//Display players money of the whole simulation
	drawStreak2();
	drawStreak();//Display winning/losing streak data
	
	//This is the main module (end)-----------------------------------------------------------------
	
	function test() {
		playerMoney[count] = playerMoneyDefault;
		GameC[count] = "first";//indicate it's the first game, has no previous betting record
		playCount = 1;
		winCount[1] = 0;
		loseCount[1] = 0;
		winStreak = 0;
		loseStreak = 0;
		while ((playerMoney[count] > 0) && (playCount-1 < gamesPlayed) && (playerMoney[count] < maxMoney)){
			moneyRecord[playCount] = playerMoney[count]
			playerBet();//Player places bet
			Game();//Game playered
			playCount = playCount + 1;
		}
	}
	
	function playerBet() {
		if (loseStreak < martBegin){//Check to see if player wants to bet or watch
			betOnTable[playCount] = 0;
		}else if((playCount > 1) && (GameC[playCount-1] == "win")){//if previous game wins, set bet to this
			if (betOnTable[playCount-1] == 0 || (GameC[playCount-2] == "lose" && losingMultiplier == "on")){//if player didn't bet on previous round or pattern changes, then go back to min bet
				betOnTable[playCount] = minBet;
			}else{
				betOnTable[playCount] = (betOnTable[playCount-1] * mulMoneyWin) + addMoneyWin;
			}
		}else if((playCount > 1) && (GameC[playCount-1] == "lose")){//if previous game loses, set bet to this
			if (betOnTable[playCount-1] == 0 || (GameC[playCount-2] == "win" && winningMultiplier == "on")){//if player didn't bet on previous round or pattern changes, then go back to min bet
				betOnTable[playCount] = minBet;
			}else{
				betOnTable[playCount] = (betOnTable[playCount-1] * mulMoneyLose) + addMoneyLose;
			}
		}else if(GameC[count] == "first"){//if it's the first game, set bet to this
			betOnTable[playCount] = minBet;
		}else{
			alert("logic error");
		}
		if (betOnTable[playCount] > maxBet){//Check if the bet exceeds maximum bet
			betOnTable[playCount] = maxBet;
		}
		if (playerMoney[count] < betOnTable[playCount]){//If not enough money to play as needed, then player bets rest of the chips
			betOnTable[playCount] = playerMoney[count];
			playerMoney[count] = 0;
		}else{
			playerMoney[count] = playerMoney[count] - betOnTable[playCount]//Money gets deducted for the bet
		}
	}
	
	function Game(){
		gameNumber = Math.floor((Math.random() * 100) + 0);
		if (gameNumber <= winRate){
			GameC[playCount] = "win";
			playerMoney[count] = playerMoney[count] + (betOnTable[playCount] * 2);//If player wins, player has more money next round.
			winStreak = winStreak + 1;
			if (winStreak > maxWinStreak){maxWinStreak = winStreak;}
			recordWinStreak();
			loseStreak = 0;
		}else{
			GameC[playCount] = "lose";
			loseStreak = loseStreak + 1;
			if (loseStreak > maxLoseStreak){maxLoseStreak = loseStreak;}
			recordLoseStreak();
			winStreak = 0;
		}
	}
	
	function displayTestResult(){
		display.innerHTML = display.innerHTML + "Player ends up with $"+playerMoney[count]+". Finishes at round "+(playCount-1)+".<br />";
	}
	
	function roundUp(){
		totalInvest = playerMoneyDefault * (count-1);
		var ec = 1;
		endUp = 0;
		while ( ec < count) {
			endUp = endUp + playerMoney[ec];
			ec = ec + 1;
		}
	}
	
	function finalResult(){
		display.innerHTML = display.innerHTML + "<br />";
		display.innerHTML = display.innerHTML + "Player invests a total of $"+totalInvest+", and ends up with $"+endUp+".<br />";
		display.innerHTML = display.innerHTML + "In a total of "+(count-1)+" tests.<br />";
		if (endUp > totalInvest) {
			display.innerHTML = display.innerHTML + "Player made $"+(endUp - totalInvest)+".<br />";
		}else if(endUp == totalInvest){
			display.innerHTML = display.innerHTML + "Player's cash investment didn't change.<br />";
		}else{
			display.innerHTML = display.innerHTML + "Player lost $"+(totalInvest - endUp)+".<br />";
		}
		display.innerHTML = display.innerHTML + "<br />------------------------------------------------------------------------------------<br />";
	}
	
	function recordWinStreak(){
		winCount[winStreak] = winCount[winStreak] + 1
		winCount[maxWinStreak+1] = 0;
	}
	
	function recordLoseStreak(){
		loseCount[loseStreak] = loseCount[loseStreak] + 1
		loseCount[maxLoseStreak+1] = 0;
	}
	
	function drawStreak2(){
		display.innerHTML = display.innerHTML + "<br />";
		var totalStreaks = 0;
		for (var i = maxWinStreak; i > 0; i--){
			totalStreaks = winCount[i] + totalStreaks
		}
		for (var i = 1; i <= maxLoseStreak; i++){
			totalStreaks = loseCount[i] + totalStreaks
		}
		for (var i = maxWinStreak; i > 0; i--){
			var percent = winCount[i]/totalStreaks;
			if (i < 10){i = "0" + i}
			display.innerHTML = display.innerHTML + i + " wins = " + (percent*100).toFixed(2) + "%<br />";
		}
		for (var i = 1; i <= maxLoseStreak; i++){
			var percent = loseCount[i]/totalStreaks;
			if (i < 10){i = "0" + i}
			display.innerHTML = display.innerHTML + i + " Loss = " + (percent*100).toFixed(2) + "%<br />";
		}
	}
	
	function drawStreak(){
		display.innerHTML = display.innerHTML + "<br />";
		var totalStreaks = 0;
		for (var i = maxWinStreak; i > 0; i--){
			totalStreaks = winCount[i] + totalStreaks
		}
		for (var i = 1; i <= maxLoseStreak; i++){
			totalStreaks = loseCount[i] + totalStreaks
		}
		var maxStreak = 0;
		maxStreak = maxWinStreak;
		if(maxWinStreak < maxLoseStreak){maxStreak = maxLoseStreak;};
		for (var i = maxStreak; i > 0; i--){
			if (isNaN(winCount[i])){
				var percent = loseCount[i]/totalStreaks;
				if (i < 10){i = "0" + i}
				display.innerHTML = display.innerHTML + i + " Streaks = " + (percent*100).toFixed(2) + "%<br />";
			}else if(isNaN(loseCount[i])){
				var percent = winCount[i]/totalStreaks;
				if (i < 10){i = "0" + i}
				display.innerHTML = display.innerHTML + i + " Streaks = " + (percent*100).toFixed(2) + "%<br />";
			}else{
				var percent = (winCount[i]+loseCount[i])/totalStreaks;
				if (i < 10){i = "0" + i}
				display.innerHTML = display.innerHTML + i + " Streaks = " + (percent*100).toFixed(2) + "%<br />";
			}
		}
	}
}