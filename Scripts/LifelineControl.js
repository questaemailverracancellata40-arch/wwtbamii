/****************************************************************************************************************/
/* Phone a Friend Life Line Functions */
/****************************************************************************************************************/

function pafPulseLifeLine(){
	$('.pafLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.pafLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.pafLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.pafStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.pafStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function pafLifeLineDisable(){
	$('.pafLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.pafLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.pafStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.pafStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function pafRevealClock(){
	$('.pafClockDiv').transition({perspective:0, right:'300px'}, 750, 'linear', function(){
		setTimeout(function(){
			pafCountDownClock(0);
			startLifelinePassiveSound("paf_countdown.mp3");
			setTimeout(stopLifelineActiveSound, 200);
		}, 250);
	});
}

function pafCountDownClock(timeConsumed){
	if(timeConsumed == 30){
		$('.pafClockTimeDiv').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(0));
	}
	else{
		$('.pafClockTimeDiv').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(30 - timeConsumed));
	}

	if(timeConsumed == 0){
		$('#pafRightRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear', function(){
			setTimeout(function(){
				$('#pafRightRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear');
			}, 500);
		});
	}
	else if(timeConsumed < 15){
		$('#pafRightRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear', function(){
			setTimeout(function(){
				$('#pafRightRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear');
			}, 500);
		});
	}
	else if(timeConsumed < 30){
		$('#pafLeftRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear', function(){
			setTimeout(function(){
				$('#pafLeftRingImg').transition({perspective:0, rotate:"+=6"}, 1, 'linear');
			}, 500);
		})
	}
	
	if(timeConsumed == 30){
		window.GameVariables.PAFClockTimeout = setTimeout(pafHideClock, 500);
	}
	else{
		window.GameVariables.PAFClockTimeout = setTimeout(function(){
			pafCountDownClock(timeConsumed + 1);
		}, 995);
	}
}

function pafEndClockEarly(){
	clearTimeout(window.GameVariables.PAFClockTimeout);
	pafHideClock();
	startLifelineActiveSound("paf_end_call_early.mp3");
}

function pafHideClock(){
	$('.pafClockDiv').transition({perspective:0, right:'-400px'}, 750, 'linear', function(){
		$('.pafClockTimeDiv').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(30));
		$('#pafRightRingImg').transition({perspective:0, rotate:"0"}, 1, 'linear');
		$('#pafLeftRingImg').transition({perspective:0, rotate:"0"}, 1, 'linear');
		window.GameVariables.pafLifeLineSequenceCounter = 0;
		window.GameVariables.CannotLockInFinalAnswer = false;
		pafLifeLineDisable();
	});
	
	setTimeout(playBackgroundSound, 500);
}

/****************************************************************************************************************/
/* Fifty-Fifty Life Line Functions */
/****************************************************************************************************************/

function ffPulseLifeLine(){
	$('.ffLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ffLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ffStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ffStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function ffLifeLineDisable(){
	$('.ffLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.ffLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.ffStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.ffStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function ffRemoveTwoWrongAnswers(){
	var canRemoveTwo = true;
	var counter = 0;
		
	if(window.GameVariables.AnswerAIsOut == true || window.GameVariables.AnswerBIsOut == true || window.GameVariables.AnswerCIsOut == true || window.GameVariables.AnswerDIsOut == true){
		canRemoveTwo = false;
	}
	
	if(canRemoveTwo == true){
		ffLifeLineDisable();
	
		while(counter < 2){
			var randomAnswerValue = Math.ceil(Math.random() * 4);
			
			if(randomAnswerValue == 1 && window.GameVariables.AnswerAIsOut == false && window.GameVariables.CurrentCorrectAnswer != "a"){
				$('#answerA .letterP').css('opacity', 0);
				$('#answerA .answerP').css('opacity', 0);
				$('#answerA .diagonalImg').css('opacity', 0);
				window.GameVariables.AnswerAIsOut = true;
				counter++;
			}
			
			if(randomAnswerValue == 2 && window.GameVariables.AnswerBIsOut == false && window.GameVariables.CurrentCorrectAnswer != "b"){
				$('#answerB .letterP').css('opacity', 0);
				$('#answerB .answerP').css('opacity', 0);
				$('#answerB .diagonalImg').css('opacity', 0);
				window.GameVariables.AnswerBIsOut = true;
				counter++;
			}
			
			if(randomAnswerValue == 3 && window.GameVariables.AnswerCIsOut == false && window.GameVariables.CurrentCorrectAnswer != "c"){
				$('#answerC .letterP').css('opacity', 0);
				$('#answerC .answerP').css('opacity', 0);
				$('#answerC .diagonalImg').css('opacity', 0);
				window.GameVariables.AnswerCIsOut = true;
				counter++;
			}
			
			if(randomAnswerValue == 4 && window.GameVariables.AnswerDIsOut == false && window.GameVariables.CurrentCorrectAnswer != "d"){
				$('#answerD .letterP').css('opacity', 0);
				$('#answerD .answerP').css('opacity', 0);
				$('#answerD .diagonalImg').css('opacity', 0);
				window.GameVariables.AnswerDIsOut = true;
				counter++;
			}
		}
	}
}

/****************************************************************************************************************/
/* Ask the Audience Life Line Functions */
/****************************************************************************************************************/

function ataPulseLifeLine(){
	$('.ataLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ataLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ataLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ataStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ataStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function ataLifeLineDisable(){
	$('.ataLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.ataLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.ataStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.ataStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function slideInATAGraph(){
	$('.ataGraphDiv').transition({perspective:0, right:"300px"}, 750, 'linear');
}

function generateGraphPercentanges(){
	var percentageOfDifficulty = (window.GameVariables.QuestionLevel - 1) * 5;
	var beDevious = (Math.random() * 100) > 90 ? true : false;

	if(window.GameVariables.AnswerAIsOut == true){
		window.GameVariables.AnswerAPercent = 0;
	}
	
	if(window.GameVariables.AnswerBIsOut == true){
		window.GameVariables.AnswerBPercent = 0;
	}
	
	if(window.GameVariables.AnswerCIsOut == true){
		window.GameVariables.AnswerCPercent = 0;
	}
	
	if(window.GameVariables.AnswerDIsOut == true){
		window.GameVariables.AnswerDPercent = 0;
	}
	
	if(beDevious != true){
		if(window.GameVariables.CurrentCorrectAnswer == "a" && window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : 100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent  - window.GameVariables.AnswerCPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "b" && window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : 100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent  - window.GameVariables.AnswerDPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "c" && window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : 100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent  - window.GameVariables.AnswerAPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "d" && window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : 100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent  - window.GameVariables.AnswerBPercent;
		}
	}
	else{
		if(window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : 100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent  - window.GameVariables.AnswerCPercent;
		}
		
		if(window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : 100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent  - window.GameVariables.AnswerDPercent;
		}
		
		if(window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : 100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent  - window.GameVariables.AnswerAPercent;
		}
		
		if(window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : 100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent  - window.GameVariables.AnswerBPercent;
		}
	}
	
	var sumOfAllPercents = window.GameVariables.AnswerAPercent + window.GameVariables.AnswerBPercent + window.GameVariables.AnswerCPercent + window.GameVariables.AnswerDPercent;
		
	if(sumOfAllPercents < 100){
		if(window.GameVariables.CurrentCorrectAnswer == "a" && window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "b" && window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "c" && window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "d" && window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent += 100 - sumOfAllPercents;
		}
	}
}

function revealGraphPercentages(){
	var barAHeight = (396 * (window.GameVariables.AnswerAPercent) / 100) + "px";
	var barBHeight = (396 * (window.GameVariables.AnswerBPercent) / 100) + "px";
	var barCHeight = (396 * (window.GameVariables.AnswerCPercent) / 100) + "px";
	var barDHeight = (396 * (window.GameVariables.AnswerDPercent) / 100) + "px";
	
	$('#graphBarA').css('height', barAHeight);
	$('#graphPercentA').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerAPercent / 100));
	$('#ataPercentStrapA').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerAPercent / 100));
	
	setTimeout(function(){
		$('#graphBarB').css('height', barBHeight);
		$('#graphPercentB').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerBPercent / 100));
		$('#ataPercentStrapB').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerBPercent / 100));
	}, 50);
	
	setTimeout(function(){
		$('#graphBarC').css('height', barCHeight);
		$('#graphPercentC').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerCPercent / 100));
		$('#ataPercentStrapC').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerCPercent / 100));
	}, 100);
	
	setTimeout(function(){
		$('#graphBarD').css('height', barDHeight);
		$('#graphPercentD').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerDPercent / 100));
		$('#ataPercentStrapD').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerDPercent / 100));
	}, 150);
}

function slideOutATAGraph(){
	$('.ataGraphDiv').transition({perspective:0, right:"-330px"}, 750, 'linear', function(){
		$('#graphBarA').css('height', "0px");
		$('#graphBarB').css('height', "0px");
		$('#graphBarC').css('height', "0px");
		$('#graphBarD').css('height', "0px");
		$('#graphPercentA').html("");
		$('#graphPercentB').html("");
		$('#graphPercentC').html("");
		$('#graphPercentD').html("");
		ataLifeLineDisable();
	});
	
	$('#ataPercentStrapA').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapB').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapC').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapD').parent().transition({perspective:0, opacity:1}, 250, 'linear');
}

/****************************************************************************************************************/
/* Switch the Question Life Line Functions */
/****************************************************************************************************************/

function stqLifeLineSlideIn(){
	$('.pafLifeLine').transition({perspective:0, 'left':'-70px'}, 1000);
	$('.ffLifeLine').transition({perspective:0, 'left':'195px'}, 1000);
	$('.ataLifeLine').transition({perspective:0, 'left':'351px'}, 1000);
	$('.stqLifeLine').transition({perspective:0, opacity: 1, 'left':'507px'}, 1000);
	
	$('.ffStrapLifeLine').transition({perspective:0, 'left':'625px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'850px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1075px'}, 500);
}

function stqLifeLineSlideOut(){
	window.GameVariables.LifeLineAnimationCounter = 0;
	$('.pafLifeLine').transition({perspective:0, 'left':'-50px'}, 1000);
	$('.ffLifeLine').transition({perspective:0, 'left':'220px'}, 1000);
	$('.ataLifeLine').transition({perspective:0, 'left':'390px'}, 1000);
	$('.stqLifeLine').transition({perspective:0, opacity: 0, 'left':'760px'}, 1000);
	
	$('.ffStrapLifeLine').transition({perspective:0, 'left':'745px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'1090px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1870px'}, 500);
}

function stqPulseLifeLine(){
	$('.stqLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.stqLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.stqLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.stqStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.stqStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function stqLifeLineDisable(){
	$('.stqLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.stqLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.stqStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.stqStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function switchOutToNewQuestion(){
	clearTimeout(window.GameVariables.ShowAnswerTimeout);
	resetAnswerStraps();
	stqLifeLineDisable();
	setQuestion(true);
	$('.questionStrapDiv').transition({perspective:0, 'bottom':'225px', scale:[1,1]}, 350, 'ease-out', function(){
		setTimeout(function(){
			$('.answerGroupADiv').transition({perspective:0, 'bottom':'0px', scale:[1,1]}, 350, 'ease-out');
		}, 0);
		setTimeout(function(){
			$('.answerGroupBDiv').transition({perspective:0, 'bottom':'0px', scale:[1,1]}, 350, 'ease-out');
		}, 150);
	});
}

function switchAnimation(){
	$('.answerGroupBDiv').transition({perspective:0, 'bottom':'-450px', scale:[2,2]}, 350, 'ease-in');
	setTimeout(function(){
		$('.answerGroupADiv').transition({perspective:0, 'bottom':'-450px', scale:[2,2]}, 350, 'ease-in');
	}, 150);
	setTimeout(function(){
		$('.questionStrapDiv').transition({perspective:0, 'bottom':'-285px', scale:[2,2]}, 350, 'ease-in');
	}, 500);
}

/****************************************************************************************************************/
/* Other Life Line Functions */
/****************************************************************************************************************/

function showLifeLineCentered(target){
	window.GameVariables.ShowLifeLineCenteredAnimation = true;
	
	$(target).css('opacity', 1);
		
	$('.answerStrapLifeLineCenterContainerDiv').transition({perspective:0, scale:[1,1], opacity:1}, 200, 'linear');
}

function hideLifeLineCentered(){
	window.GameVariables.ContinuePulsingLifeLineCenter = false;
	window.GameVariables.ShowLifeLineCenteredAnimation = false;
	$('.answerStrapLifeLineCenterContainerDiv').transition({perspective:0, scale:[0.2,0.2], opacity:0}, 200, 'linear', function(){
		$('.lifelineCenterImg').css('opacity', 0);
	});
}

function hideJustLifeLineCenteredContainer(){
	$('.answerStrapLifeLineCenterDiv').css('opacity', 0);
}

function showJustLifeLineCenteredContainer(){
	$('.answerStrapLifeLineCenterDiv').css('opacity', 1);
}

function slideLifeLineStrapIn(){
	$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'112px'}, 500);
}

function slideLifeLineStrapOut(){
	$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'-1696px'}, 500, function(){
		$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'1920px'}, 1, 'linear');
	});
}