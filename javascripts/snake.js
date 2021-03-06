var borderColors =['#40E0D0', '#808080', '#D2691E', '#FF4500', '#66CDAA', '#8A2BE2', 
'#B22222', '#0BD9F7'];

var currentSong = '';

var globalScore = 0;
function generateAdversary()
{
	$('#snakeInterface').append('<div id=\'adversary\'> </div>');
	var snakeLeft = parseString($('#snake').css('left'));
	var snakeTop = parseString($('#snake').css('top'));
	var adversaryLeft = Math.floor(Math.random() * 20) * 10;
	while(adversaryLeft == snakeLeft + 10 ||  adversaryLeft == snakeLeft || 
		adversaryLeft == snakeLeft -10)
	{
		adversaryLeft = Math.floor(Math.random() * 20) * 10
	}
	adversaryTop = Math.floor(Math.random() * 20) * 10;
	while(adversaryTop == snakeTop + 10 ||  adversaryTop == snakeTop || 
		adversaryTop == snakeTop -10)
	{
		adversaryTop = Math.floor(Math.random() * 20) * 10
	}
	$('#adversary').css('left', adversaryLeft.toString() + 'px') ;
	$('#adversary').css('top', adversaryTop.toString() + 'px') ;
}

function toggleMusic()
{
	if($('#musicDisable').is(':checked'))
	{
		$('#music').remove();
	}
}

function getSoundcloudLink()
{
	var selectedSong =  $('#musicStyle option:selected').val();
	currentSong = selectedSong;
	console.log(selectedSong)
	if(selectedSong === 'Fighting Gold')
	{


		return '<iframe width="0px" height="0px" scrolling="no" frameborder="no" allow="autoplay" \
		src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/533849454&color=\
		%23ff5500&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=fals \
		&show_teaser=false&visual=false" id=\'music\'></iframe>'
		// return '<iframe width="0px" height="0px" scrolling="no"\
		// frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//\
		// api.soundcloud.com/tracks/533849454&amp;color=%23ff5500&amp;auto_play=true\
		// &amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false\
		// &amp;visual=false id=\'music\'></iframe>';	
	}
	else if(selectedSong === 'Kpop')
	{
		return '<iframe width="0px" height="0px" scrolling="no" \
		frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A\
		//api.soundcloud.com/tracks/209600639&amp;color=%23ff5500&amp;auto_play=\
		true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;\
		show_reposts=false&amp;visual=false" id=\'music\'></iframe>'
	}
	else if(selectedSong === 'Stardust Crusaders')
	{
		return '<iframe width="0px" height="0px" scrolling="no" frameborder="no" \
		src="https://w.soundcloud.com/player/?url=https%3A\
		//api.soundcloud.com/tracks/197186143&amp;color=%23ff5500&amp;auto_play=true&amp;\
		hide_related=false&amp;show_comments=true&amp;show_user=true&amp;\
		show_reposts=false&amp;visual=false" id=\'music\'></iframe>'
	}
}


function generateSoundcloudPlayer()
{
	if(!($('#musicDisable').is(':checked')))
	{
		if( !($('#music').length > 0))
		{
			$('#mainBody').append(getSoundcloudLink());
		}
		else if(!(currentSong === $('#musicStyle option:selected').val()))
		{
			$('#music').remove();
			$('#mainBody').append(getSoundcloudLink());
		}
	}
}

function endGame()
{
	$('#mainBody').empty();
	$('#mainBody').append('<iframe width="560" height="315" id="video" src="https://www.youtube.com/\
		embed/ZeOeU50YpJQ?autoplay=1" frameborder="0" encrypted-media" \
		allowfullscreen></iframe>')
	$('#mainBody').append("<p> Press play to see how the fight ends! </p>")
}

function processStart()
{
	if(	$('#timer').val() == 0)
	{
		generateSoundcloudPlayer();
		$('#dio').attr('src', 'images/DioSource.png');
		$('#snake').css('left', '200px');
		$('#snake').css('top', '200px');
		resetBorders();
		$('#adversary').remove();
		generateAdversary();
		$('#timer').val(40);
		var timer = setInterval(function(){ 
		$('#timer').val($('#timer').val() - 1); }, 
		1000);
		setTimeout(function(){

			clearInterval(timer); 
			if($('#score').val() > $('#hiscore').val())
			{
				$('#hiscore').val($('#score').val());
			}
			console.log($('#score').val())
			if($('#score').val() < 15)
			{
				if($('#music').length > 0)
				{
					var widget1 = SC.Widget('music');
					widget1.pause();
				}
				$('#gameText').text('Mabye next time you\'ll actually damage me');
				$('#sfx').attr('src', 'sounds/GenjiMadaMada.ogg');
				$('#sfx')[0].play();
				if($('#music').length > 0)
				{
					setTimeout(function(){
						widget1.play();
					}, 2000);
				}
			}
			else
			{
				if($('#music').length > 0)
				{
					var widget1 = SC.Widget('music');
					widget1.pause();
				}
				$('#gameText').text('How could I, Dio, have been damaged?');
				$('#sfx').attr('src', 'sounds/GenjiINeedHealing.ogg');
				$('#sfx')[0].play();
				globalScore += 1
				if(globalScore > 2)
				{
					endGame();
				}
				if($('#music').length > 0)
				{
					setTimeout(function(){
						widget1.play();
					}, 2000);
				}
			}
			$('#score').val(0);
		}, $('#timer').val() * 1000);
	}
	else
	{
		generateSoundcloudPlayer();
	}
}

function parseString(stringName)
{
	return parseInt(stringName.replace('px', ''));
}

function MoveLeft(stringName, direction)
{
  	var intValue = parseString(stringName);
  	if(intValue > 0)
  	{
  		intValue -=10;
  	}
  	return intValue
}

function MoveUp(stringName, direction)
{
  	var intValue = parseString(stringName);
  	if(intValue >  0)
  	{
  		intValue -=10;
  	}
  	return intValue
}

function MoveRight(stringName)
{
  	var intValue = parseString(stringName);
	if(intValue < 390 - parseString($('#snake').css('width')))
	{
		return intValue += 10;
	}
 	return intValue
}

function MoveDown(stringName)
{
  	var intValue = parseString(stringName);
	if(intValue < 390 - parseString($('#snake').css('height')))
	{
		return intValue += 10;
	}
 	return intValue
}

function resetBorders()
{
	$('#snake').css('border-left-color', '#008000');
	$('#snake').css('border-top-color', '#008000');
	$('#snake').css('border-right-color', '#008000');
	$('#snake').css('border-bottom-color', '#008000');

}

function setInterfaceBorderColor(borderColor)
{
	$('#snakeInterface').css('border-left-color', borderColor);
	$('#snakeInterface').css('border-top-color', borderColor);
	$('#snakeInterface').css('border-right-color', borderColor);
	$('#snakeInterface').css('border-bottom-color', borderColor);
}

//Taken from - http://jsfiddle.net/Mottie/xcqpF/1/light/
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? '#' +
  ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}


function collisionDetect()
{
	var snakeLeft = parseString($('#snake').css('left'));
	var snakeTop = parseString($('#snake').css('top'));
	var adversaryLeft = parseString($('#adversary').css('left'));
	var adversaryTop = parseString($('#adversary').css('top'));
	if( (snakeLeft == adversaryLeft + 10 || snakeLeft == adversaryLeft - 10 || 
		snakeLeft == adversaryLeft) &&  (snakeTop == adversaryTop + 10 || 
		snakeTop == adversaryTop - 10 || snakeTop == adversaryTop))
	{
		$('#adversary').remove();
		$('#score').val(parseInt($('#score').val()) + 1);
		generateAdversary();
		var currentBorderColor = rgb2hex($('#snakeInterface').css('border-top-color'))
		.toUpperCase();
		var borderColor = borderColors[Math.floor(Math.random() * borderColors.length)];
		while(borderColor === currentBorderColor)
		{
			borderColor = borderColors[Math.floor(Math.random() * borderColors.length)];
		}
		setInterfaceBorderColor(borderColor);
	}

}

function keyLeft(e)
{
	e.preventDefault();
	if($('#timer').val() == 0)
	{
		return;
	}
	var left = $('#snake').css('left');
	$('#snake').css('left', MoveLeft(left));
	resetBorders();
	$('#snake').css('border-left-color', '#ff0000');
}

function keyRight(e)
{
	e.preventDefault();
	if($('#timer').val() == 0)
	{
		return;
	}
	var right = $('#snake').css('left');
	$('#snake').css('left', MoveRight(right));
	resetBorders();
	$('#snake').css('border-right-color', '#ff0000');
}

function keyUp(e)
{
	e.preventDefault();
	if($('#timer').val() == 0)
	{
		return;
	}
	var up = $('#snake').css('top');
	$('#snake').css('top', MoveUp(up));
	resetBorders();
	$('#snake').css('border-top-color', '#ff0000');
}

function keyDown(e)
{
	e.preventDefault();
	if($('#timer').val() == 0)
	{
		return;
	}
	var down = $('#snake').css('top');
	$('#snake').css('top', MoveDown(down));
	resetBorders();
	$('#snake').css('border-bottom-color', '#ff0000');
}
//Taken from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
document.onkeydown = function(e) {
	switch (e.keyCode)
	{
		case 32:
			e.preventDefault();
			processStart();
			break;
		case 37:
			keyLeft(e);
			break;
		case 65:
			keyLeft(e);
			break;
		case 38:
			keyUp(e);
			break;
		case 87:
			keyUp(e);
			break;
		case 39:
			keyRight(e);
			break;
		case 68:
			keyRight(e);
			break;
		case 40:
			keyDown(e);
			break;
		case 83:
			keyDown(e);
			break;
	}
	collisionDetect();
};
