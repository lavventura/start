// SEARCHBAR

var box = document.getElementById("search box");

// this should catch most URLs, or at least the ones I would type.
var urlPattern = /^(https?:\/\/)?[^ ]+[.][^ ]+([.][^ ]+)*(\/[^ ]+)?$/i;

// add on here with more handy things
var handy = /^(google|gmail|dropbox)$/i;

// search for text in text box
function search() {
	console.log("Googling \"" + box.value + "\"");
	console.log("Encoded query: \n" + encodeURIComponent(box.value));
	document.location.href = "https://duckduckgo.com/?q=" + encodeURIComponent(box.value);
}

// if not search, nav to somewhere
function nav(address) {
	// if the address starts with "https?|ftp ://"
	if (/^(?:(?:https?|ftp):\/\/).*/i.test(address)) {
		document.location.href = address;
	} else {
		document.location.href = "http://" + address;
	}
}

// Handle enter key press in text box
// also handle the command parsing in the event that the text in the box is a command
// TAB unfocuses the searchbar
function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		parseCom(box.value);
	}
	if (e.keyCode == 9) {		
		document.getElementById("search box").blur();
	}
}

// when you hover a link, show its href
function aTitle(e) {
	e.title = e.href;
}

// focus the search box on load
window.onload = function() {
	document.getElementById("search box").focus();
};

// parse the user's command
function parseCom(com) {
	// handle help command
	if (/^h[ea]lp$/i.test(com) || /^commands$/i.test(com)) {
		document.location.href = "commands.txt";
	}

	
	// handle reddit command
	else if (com.startsWith("reddit")==true) {
		// if any of the custom subreddit commands are matched
		if (/^reddit [A-Za-z]{2,2}$/i.test(com)) {
			var subargs = com.split(" ");
			switch (subargs.pop()) {
				case "df":
					nav("https://www.reddit.com/r/deliciousfails");
					break;
				case "wg":
					nav("https://www.reddit.com/r/weekendgunnit");
					break;
				case "up":
					nav("https://www.reddit.com/r/unixporn");
					break;
				case "sp":
					nav("https://www.reddit.com/r/startpages");
					break;
				default:
					nav("https://www.reddit.com/");
					break;
			}
		}
		// if the subreddit command is matched
		else if (/^reddit -r .*$/i.test(com)) {
			var rargs = com.split(" ");
			nav("https://www.reddit.com/r/" + rargs.pop());
		}		
		// if the user command is matched
		else if (/^reddit -u .*$/i.test(com)) {
			var uargs = com.split(" ");
			nav("https://www.reddit.com/u/" + uargs.pop());
		}
		// if the search command is matched
		else if (/^reddit -s .{1,140}$/i.test(com)) {
			var query = com.replace(/^reddit -s /i, "");
			nav("https://www.reddit.com/search?q=" + encodeURIComponent(query));
		}	
		// if the plain old reddit command is matched
		else if (/^reddit$/i.test(com)) {
			nav("https://www.reddit.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle twt command
	else if (com.startsWith("twt")==true) {
		// if matches the "twt" command
		if (/^twt$/i.test(com)) {
			nav("https://www.twitter.com/");
		}
		// if the twt [@]user_name command
		else if (/^twt @?[A-Za-z0-9_]{1,15}$/i.test(com)) {
			var targs = com.split(" ");
			nav("https://www.twitter.com/" + targs.pop());
		}
		// search twitter for text
		else if (/^twt -s .{1,140}$/i.test(com)) {
			var query = com.replace(/^twt -s /i, "");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(query));
		}
		// search twitter for text from user
		else if (/^twt -su @?[A-Za-z0-9_]{1,15} .{1,140}$/i.test(com)) {
			var qparts = com.split(" ");
			var query = com.replace(/^twt -su @?[A-Za-z0-9_]{1,15} /i, "");
			
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(query + " from:" + qparts[2]));
		}
		// search twitter for tweets with a hashtag
		else if (/^twt -sh " + hashtag + "$/i.test(com)) {
			var tag = com.replace(/^twt -sh #?/i, "");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent("#" + tag));
		}
		// search twitter for hashtags from user
		else if (/^twt -sh @?[A-Za-z0-9_]{1,15} " + hashtag + "$/i.test(com)) {
			var comparts = com.split(" ");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(comparts[3] + " from:" + comparts[2]));
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle twd command
	else if (com.startsWith("twd")==true) {
		if (/^twd$/i.test(com)) {
			nav("https://tweetdeck.twitter.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	
	// SEARCH COMMANDS 
	
	// handle google search command
	else if (com.startsWith("ggl")==true) {		
		if (/^ggl$/i.test(com)) {
			nav("https://www.google.com/");
		}		
		else if (/^ggl .{1,140}$/i.test(com)) {
			var query = com.replace(/^ggl /i, "");
			nav("https://www.google.pl/?gws_rd=ssl#safe=off&q=" + encodeURIComponent(query));
		}
	}		
	// handle ig command
	else if (com.startsWith("ig")==true) {
		// just plain old ig
		if (/^ig$/i.test(com)) {
			nav("https://www.instagram.com/");
		}
		// ig [@]username command
		else if (/^ig @?[A-Za-z0-9_.]{1,30}/i.test(com)) {
			var iargs = com.split(" ");
			nav("https://www.instagram.com/" + iargs.pop());
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}	
	// handle aliexpress command
	else if (com.startsWith("ali")==true) {
		if (/^ali$/i.test(com)) {
			nav("http://www.aliexpress.com/");
		}		
		else if (/^ali .{1,140}$/i.test(com)) {
			var query = com.replace(/^ali /i, "");
			nav("http://www.aliexpress.com/wholesale?SearchText=" + encodeURIComponent(query));
		}
	}	
	// handle allegro command
	else if (com.startsWith("allegro")==true) {
		if (/^allegro$/i.test(com)) {
			nav("http://www.allegro.pl/");
		}		
		else if (/^allegro .{1,140}$/i.test(com)) {
			var query = com.replace(/^allegro /i, "");
			nav("http://www.allegro.pl/listing/listing.php?string=" + encodeURIComponent(query));
		}
	}	
	// handle olx command
	else if (com.startsWith("olx")==true) {
		if (/^olx$/i.test(com)) {
			nav("https://www.olx.pl");
		}		
		else if (/^olx .{1,140}$/i.test(com)) {
			var query = com.replace(/^olx /i, "");
			nav("https://olx.pl/oferty/q-" + encodeURIComponent(query));
		}
	}	
	// handle imdb command
	else if (com.startsWith("imdb")==true) {		
		if (/^imdb$/i.test(com)) {
			nav("https://www.imdb.com/");
		}		
		else if (/^imdb .{1,140}$/i.test(com)) {
			var query = com.replace(/^imdb /i, "");
			nav("http://www.imdb.com/find?q=" + encodeURIComponent(query));
		}
	}	
	// handle metacritic command
	else if (com.startsWith("meta")==true) {
		if (/^meta$/i.test(com)) {
			nav("http://www.metacritic.com/");
		}		
		else if (/^meta .{1,140}$/i.test(com)) {
			var query = com.replace(/^meta /i, "");
			nav("http://www.metacritic.com/search/all/" + encodeURIComponent(query) + "/results");
		}
	}	
	// handle youtube command
	else if (com.startsWith("yt")==true) {
		if (/^yt$/i.test(com)) {
			nav("https://www.youtube.com/");
		}		
		else if (/^yt .{1,140}$/i.test(com)) {
			var query = com.replace(/^yt /i, "");
			nav("https://www.youtube.com/results?search_query=" + encodeURIComponent(query));
		}
	}	
	// handle github command
	else if (com.startsWith("git")==true) {
		if (/^git$/i.test(com)) {
			nav("https://www.github.com");
		}		
		else if (/^git .{1,140}$/i.test(com)) {
			var query = com.replace(/^git /i, "");
			nav("https://www.github.com/search?q=" + encodeURIComponent(query));
		}
	}	
	// handle tpb command
	else if (com.startsWith("tpb")==true) {
		if (/^tpb$/i.test(com)) {
			nav("https://www.thepiratebay.org");
		}		
		else if (/^tpb .{1,140}$/i.test(com)) {
			var query = com.replace(/^tpb /i, "");
			nav("https://thepiratebay.org/search/" + encodeURIComponent(query));
		}
	}	
	// handle wiki command
	else if (com.startsWith("wiki")==true) {
		if (/^wiki$/i.test(com)) {
			nav("https://en.wikipedia.org");
		}		
		else if (/^wiki .{1,140}$/i.test(com)) {
			var query = com.replace(/^wiki /i, "");
			nav("https://en.wikipedia.org/wiki/" + encodeURIComponent(query));
		}
	}
	
	// misc commands	
		
	else if (/^imgur$/i.test(com)) {
		nav("http://www.imgur.com");
	}
	else if (/^inbox$/i.test(com)) {
		nav("http://inbox.google.com");
	}
	else if (/^drive$/i.test(com)) {
		nav("http://drive.google.com");
	}

	// Media commands
	else if (/^(twitch|ttv)$/i.test(com)) {
		nav("http://www.twitch.tv/following");
	}
	else if (/^(twitch|ttv) [^ ]+$/i.test(com)) {
		var parts = com.split(" ");
		nav("http://www.twitch.tv/" + parts.pop());
	}
	else if (/^spotify$/i.test(com) || /^sptfy$/i.test(com)) {
		nav("https://play.spotify.com");
	}
	else if (/^soundcloud$/i.test(com) || /^sc$/i.test(com)) {
		nav("https://soundcloud.com/stream");
	}
	
	// Here are some really handy ones I'll probably have to use
	else if (handy.test(com)) {
		nav("http://www."+com+".com/");
	}
	else if (/^about:[A-Za-z0-9_-]+$/i.test(com)) {
		document.location.href = com;
	}
	// These are some commands that are just for fun, and probably won't be added to the list
	else if (/^cout << .*$/i.test(com)) {
		var message = com.replace(/^cout << /i, "");
		alert(message);
	}	
	// if it doesn't match any of the commands...
	// ... but is a valid URL
	else if (urlPattern.test(com)) {
		nav(com);
	}
	// ... or should be searched
	else {
		search();
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


// Finds current time and date, formats it properly
function startTime() {	
	var now = new Date();
	var hour = ('0' + now.getHours()).slice(-2);
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth()+1)).slice(-2);
	var year = now.getFullYear();
// 24/12 h
//	hour = hour % 24;
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	var timeString = hour + ':' + mins + ':' + secs;
	var dateString = month + '/' + day + '/' + year;
	document.getElementById('time').innerHTML = timeString;
	document.getElementById('date').innerHTML = dateString;
	var t = setTimeout(startTime, 500);
}

// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: 'Warsaw, Poland',
		unit: 'c',
		success: function(weather) {
			$('.weather').html(weather.city + '</br>' + weather.currently + ', ' + weather.temp + '&deg;');
			$('.weatherlink').html('<a href="' + weather.link + '">[W]</a>');
		},
		error: function(error)   {
			$('.weather').html('Sorry, there has been a problem retrieving the weather information.');
		}
	});
}

// Geolocates the user, otherwise defaulting to Pittsburgh (2473224)
function loadStuff() {	
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
	  	}, getWeather(2473224), {timeout: 5000});
	} else { getWeather(2473224); }
}

// Initializes keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href = $(val).parent().attr('href');
				});
			});
			Mousetrap.bind($(val).children('span').text(), function(e) {
				resetMousetraps();
			});
		});
	});
	
	// Resets on ESC or spacebar
	Mousetrap.bind(['esc', 'space'], function(e) {
		resetMousetraps();
	});
	// Binds Weather and GitHub links
	Mousetrap.bind('w', function(e) {
		window.location.href = $('.weatherlink').children().attr('href');
	});
	Mousetrap.bind('g', function(e) {
		window.location.href = $('.github').children().attr('href');
	});	
}

// Closes cells, rebinds keyboard shortcuts
function resetMousetraps() {
	$('.subMenu').slideUp(150);
	$('li a').removeClass('active');
	Mousetrap.reset();
	bindMousetraps();
}

// Initializes everything on page load
$(function() {
	startTime();
	loadStuff();
	bindMousetraps();
	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	$('#background').click(function() {
		resetMousetraps();
	});
});
