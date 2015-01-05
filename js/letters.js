$(document).ready(function() {
	
	curLetter = "";
	alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
	known = [];
	unknown = alphabet.slice();
	showedResult = false;
	repeatKnowns = true;
	finished = false;
	
	$("#unknown").html(unknown.join(" , "));
	
	function reset() {
		$("#resultText").html("");
		$("#comments").css("color", "black");
		$("#comments").html("Type the letter!");
		$("#letterImg").attr("src", "img/white.png");
	}
	
	function showLetter(letter) {
		$("#letterImg").attr("src", "img/"+letter+".jpg"); 
	}
	
	function getRandLetter() {
		reset();
		//if repeated letters is okay
		if (repeatKnowns) {
			//get any letter from the alphabet
		    var randNum = Math.floor(Math.random() * alphabet.length);
			curLetter = alphabet[randNum];
		}
		//if repeated letters is not okay
		else {
			//get a letter from the unknown array
			if (unknown.length > 0) {
		    	var randNum = Math.floor(Math.random() * unknown.length);
				curLetter = unknown[randNum];
			}
			else {
				$("#comments").html("Congratulations!");
				finished = true;
			}
		}
		showLetter(curLetter);
	}
	
	
	$("#newLetterButton").click(function() {
		showedResult = false;
		reset();
		getRandLetter();
	});
	
	$(document).keypress(function (e) {
		$("#letterImg").clearQueue();
		var keyPressed = String.fromCharCode(e.which);
		//if user presses enter
		if (e.which == 13 && !finished) {
			if (showedResult) {
				$("#newLetterButton").click(); //get new letter
			}
		}
		//if key pressed is right
		else if (keyPressed == curLetter && !showedResult) {
			$("#resultText, #comments").css("color", "green");
			$("#comments").html("Good job!");
			$("#score").html(parseInt($("#score").html()) + 1);
			//move letter from unknown to known, if not done already
			if ($.inArray(keyPressed, unknown) != -1) {	
				//delete letter from unknown
				unknown.splice($.inArray(keyPressed, unknown), 1);
				//add letter to known
				known.push(keyPressed);
			}
			$("#known").html(known.join(" , "));
			$("#unknown").html(unknown.join(" , "));
			$("#resultText").html(curLetter);
			showedResult = true;
		}
		//if key pressed is wrong
		else if (keyPressed != curLetter && !showedResult && !finished){
		console.log('here');
			$("#resultText, #comments").css("color", "red");
			$("#comments").html("Oops. You guessed " + keyPressed);
			$("#resultText").html(curLetter);
			showedResult = true;
		}
	});
	
	//toggle on/off repeated knowns
	$("#toggleRepButton").click(function() {
		repeatKnowns = !repeatKnowns; //switch value
		if (repeatKnowns) {
			$("#toggleRepButton").html("Turn Off Repeats");
		}
		else {
			$("#toggleRepButton").html("Turn On Repeats");
		}
	});
});