window.onload = initialPage;

function initialPage(){
	startingEffects();
	setSandbox();
	setInputFetcher();
	setNavigation();
	navbarAutoCollapse();
}


function startingEffects(){
	$("#welcome").delay(500).fadeIn(1000);
	slideDownMenu();
	slideUpFooter();
	slideRightFooter();
	slideLeftFooter();
	slideRightFooterText();
}

function slideDownMenu(){
	$("#Navbar").css({"top":"-50px", "width":"100%", "opacity":"0.2", "position":"fixed"});
	$("#Navbar").animate({top:0, opacity:1},2000);
}

function slideUpFooter(){
	$("footer").css({"bottom":"-50px", "width":"100%", "opacity":"0.2", "position":"fixed"});
	$("footer").animate({bottom:0, opacity:1},2000);
}

function slideRightFooter(){
	$("#rightFooter").css({"right":"-50px", "position":"fixed"});
	$("#rightFooter").delay(2000).animate({right:0},2000);
}

function slideLeftFooter(){
	$("#leftFooter").css({"left":"-50px", "position":"fixed"});
	$("#leftFooter").delay(2000).animate({left:0},2000);
}

function slideRightFooterText(){
	$("#rightFooterText").css({"right":"-1000px", "position":"relative"});
	$("#rightFooterText").delay(2000).animate({right:0},2000);
}//Starting Effects

function setNavigation(){
	function changeToPageFadeStyle(buttonClass, pageId){
		$(document).ready(function(){
			$("."+buttonClass).click(function(){
				$(".center").fadeOut(200);
				$("#"+pageId).delay(300).fadeIn(500);
			});
		});
	}
	changeToPageFadeStyle("clickToWelcome", "welcome");
	changeToPageFadeStyle("clickToChooseMode", "chooseMode");
	changeToPageFadeStyle("clickToChooseGame", "chooseGame");
	changeToPageFadeStyle("clickToHowMuch", "howMuch");
	changeToPageFadeStyle("clickToHowMany", "howMany");
	changeToPageFadeStyle("clickToChooseStyle", "chooseStyle");
	changeToPageFadeStyle("clickToSandBox", "sandBox");
	changeToPageFadeStyle("clickToAbout", "about");
	changeToPageFadeStyle("clickToResult", "showResult");
}
//Navigation modules

function navbarAutoCollapse(){
	$(document).ready(function(){
		$("#menuButton").blur(function(){
			setTimeout(function(){ $("#myNavbar").collapse("hide") }, 200);
		});
	});
	$(document).ready(function(){//overwrite bootstrap css --better for phone & desktop
		$("#menuButton").on('mouseenter', function () {
			$("#menuButton").css("background-color", "black");
		});
		$("#menuButton").on('mouseleave', function () {
			$("#menuButton").css("background-color", "#orange");
		});
		$("#myNavbar").on('hidden.bs.collapse', function () {
			$("#menuButton").css("background-color", "#orange");
			$("#menuButton").on('mouseleave', function () {
				$("#menuButton").css("background-color", "#orange");
			});
		});
		$("#myNavbar").on('show.bs.collapse', function () {
			$("#menuButton").css("background-color", "black");
			$("#menuButton").on('mouseleave', function () {
				$("#menuButton").css("background-color", "orange");
			});
		});
	});
}
//Menu button improvement

function setInputFetcher(){
	function fetchInput(buttonClass, valueID, valueDestination){
		$(document).ready(function(){
			$("."+ buttonClass).click(function(){
				var value = $('#' + valueID).val();
				$("#" + valueDestination).attr({"value":value});
			});
		});
	};
	function changeInput(buttonClass, value, valueDestination){
		$(document).ready(function(){
			$("."+ buttonClass).click(function(){
				$("#" + valueDestination).attr({"value":value});
			});
		});
	};
	fetchInput("clickToHowMany", "money", "playerMoneyDefault");
	fetchInput("clickToHowMany", "profit", "profitGoal");
	fetchInput("clickToChooseStyle", "round", "gamesPlayed");
	fetchInput("clickToChooseStyle", "test", "testRound");
	changeInput("Blackjack", "48", "winRate");
	changeInput("Roulette", "47.4", "winRate");
	changeInput("Baccarat", "49.32", "winRate");
	changeInput("Martingale", "2", "mulMoneyLose");
	changeInput("Reverse_Martingale", "2", "mulMoneyWin");
	changeInput("Progressive", "10", "minBet");
	changeInput("Progressive", "20", "maxBet");
	changeInput("Progressive", "2", "mulMoneyWin");
}

function setSandbox(){
	function setHeader(headerText){
		var header = $("<div></div>").attr({"class":"col-sm-11 sandboxHeader"}).text(headerText);
		header = $("<br />").add(header);
		return header;
	}
	function setRow(rowObject, rowId, rowDefaultValue,rowDescription){
		var object = $("<span></span>").text(rowObject + " ");
		var input = $("<input></input>").attr({"type":"text", "id":rowId, "value":rowDefaultValue, "size":"5"});
		var topic = $("<div></div>").attr({"class":"col-sm-3 sandboxRow"}).append(object.add(input));
		var description = $("<div></div>").attr({"class":"col-sm-7 sandboxRow"}).text(rowDescription);
		var entireRow = topic.add(description).add('<div class="col-sm-12"></div>')
		return entireRow;
	}
	$("#sandBoxContent").append(setHeader("Game setup"));
	$("#sandBoxContent").append(setRow("Winning Chance:", "winRate", "47","The winning chance of the game. (ex. Double Zero Roulette = 47)"));
	$("#sandBoxContent").append(setHeader("Player setup"));
	$("#sandBoxContent").append(setRow("Player Money:", "playerMoneyDefault", "200","The amount of money player starts with each simulation."));
	$("#sandBoxContent").append(setRow("Player Profit Goal:", "profitGoal", "100","The amount of profit player wants to make in each simulation."));
	$("#sandBoxContent").append(setHeader("Table setup"));
	$("#sandBoxContent").append(setRow("Minimum bet on table:", "minBet", "10","The table's minimum bet."));
	$("#sandBoxContent").append(setRow("Maximum bet on table:", "maxBet", "250","The table's maximum bet."));
	$("#sandBoxContent").append(setHeader("Betting system setup"))
	$("#sandBoxContent").append(setRow("Money to increase per win:", "addMoneyWin", "0","Money to add on the last bet in each win."));
	$("#sandBoxContent").append(setRow("Money to increase per loss:", "addMoneyLose", "0","Money to add on the last bet in each loss."));
	$("#sandBoxContent").append(setRow("Rate to mutiply per win:", "mulMoneyWin", "1","Rate to mutiply on the last bet in each win."));
	$("#sandBoxContent").append(setRow("Rate to mutiply per loss:", "mulMoneyLose", "1","Amount to mutiply on the last bet in each loss."));
	$("#sandBoxContent").append(setRow("Rounds of loosing streak to wait:", "martBegin", "0","Amount of losses before player enters the game."));
	$("#sandBoxContent").append(setHeader("Simulation setup"));
	$("#sandBoxContent").append(setRow("Max rounds plays per simulation:", "gamesPlayed", "50","Maximum games the player will play upon entering a table."));
	$("#sandBoxContent").append(setRow("Simulations to run:", "testRound", "10","The amount of simulations to test for this betting system."));
	$("#sandBoxContent").append('<div class="col-sm-12"> <button onclick="myFunction();return false;" class="btn btn-warning clickToResult">Calculate</button></div>');
}