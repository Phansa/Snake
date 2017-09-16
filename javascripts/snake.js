var borderColors =['#40E0D0', '#808080', '#D2691E', '#FF4500', '#66CDAA', '#8A2BE2', 
'#B22222', '#0BD9F7'];

var currentSong = '';
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
	console.log(selectedSong);
	currentSong = selectedSong;
	if(selectedSong === 'JoJos')
	{
		return '<iframe width="0px" height="0px" scrolling="no"\
				frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//\
				api.soundcloud.com/tracks/205059337&amp;color=%2300aabb&amp;auto_play=\
				true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;\
				show_reposts=false&amp;visual=true" id=\'music\'></iframe>';
	}
	else if(selectedSong === 'Kpop')
	{
		return '<iframe width="0px" height="0px" scrolling="no" \
		frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A\
		//api.soundcloud.com/tracks/209600639&amp;color=%23ff5500&amp;auto_play=\
		true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;\
		show_reposts=false&amp;visual=true" id=\'music\'></iframe>'
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
		$('#timer').val(30);
		var timer = setInterval(function(){ 
		$('#timer').val($('#timer').val() - 1); }, 
		1000);
		setTimeout(function(){

			clearInterval(timer); 
			if($('#score').val() > $('#hiscore').val())
			{
				$('#hiscore').val($('#score').val());
			}
			if($('#score').val() < 20)
			{
				var widget1 = SC.Widget('music');
				widget1.pause();
				$('#madamada')[0].play();
				setTimeout(function(){
					widget1.play();
				}, 2000);
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


// function generateDio()
// {
// 	console.log("HELLO");
// 	$('#dioSound').attr('src', 'https://www.youtube.com/embed/\
// 		7ePWNmLP0Z0?rel=0&amp;controls=0&amp;showinfo=0%22%20frameborder=%220%22%20\
// 		allowfullscreen;autoplay=1');
// 	setTimeout(function(){
// 		$('#dioSound').attr('src', '');
// 	}, 5000);
// }

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
		// if(Math.floor(Math.random() * 1) == 1)
		// {
		//     generateDio();
		// }
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
//Taken from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
document.onkeydown = function(e) {
	switch (e.keyCode)
	{
		case 32:
			e.preventDefault();
			processStart();
			break;
		case 37:
			e.preventDefault();
			if($('#timer').val() == 0)
			{
				break;
			}
		  	var left = $('#snake').css('left');
  			$('#snake').css('left', MoveLeft(left));
			resetBorders();
  			$('#snake').css('border-left-color', '#ff0000');
  			break;
		case 38:
			e.preventDefault();
			if($('#timer').val() == 0)
			{
				break;
			}
		  	var up = $('#snake').css('top');
  			$('#snake').css('top', MoveUp(up));
			resetBorders();
  			$('#snake').css('border-top-color', '#ff0000');
  			break;
		case 39:
			e.preventDefault();
			if($('#timer').val() == 0)
			{
				break;
			}
		  	var right = $('#snake').css('left');
  			$('#snake').css('left', MoveRight(right));
			resetBorders();
  			$('#snake').css('border-right-color', '#ff0000');
  			break;
		case 40:
			e.preventDefault();
			if($('#timer').val() == 0)
			{
				break;
			}
		  	var down = $('#snake').css('top');
  			$('#snake').css('top', MoveDown(down));
  			resetBorders();
  			$('#snake').css('border-bottom-color', '#ff0000');
  			break;
	}
	collisionDetect();
};
