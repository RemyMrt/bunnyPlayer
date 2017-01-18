// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;
var volumeRange;
var volume;
var playerContent;
var mediaControls;
var volumeControls;

// Init the player when the dom content is loaded
function initialiseMediaPlayer() {
	// Get a handle to the player
	mediaPlayer = document.getElementById('player');

	// Get handles to each of the buttons and required elements

	playPauseBtn = document.getElementById('play-pause');
	muteBtn = document.getElementById('mute-unmute');
	progressBar = document.getElementById('progress-bar');
	volumeRange = document.getElementById('vol-range');
	playerContent = document.getElementById('player-content');
	mediaControls = document.getElementById('media-controls');
	volumeControls = document.getElementById('volume-controls');

	// Hide the browser's default controls
	mediaPlayer.controls = false;
	// Add a listener for the timeupdate event so we can update the progress bar
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	// Add a listener for the play and pause events so the buttons state can be updated
	mediaPlayer.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayer.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
	}, false);
	// need to work on this one more...how to know it's muted?
	mediaPlayer.addEventListener('volumechange', function(e) {
		// Update the button to be mute/unmute
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'mute');
		else changeButtonType(muteBtn, 'unmute');
	}, false);
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);
	volumeRange.value = 50;
	volume = volumeRange.value;
	//volumeControls.addEventListener('mouseover', function() {volumeRange.style.display = 'block';}, false);
	//volumeControls.addEventListener('mouseout', function() {volumeRange.style.display = 'none';}, false);
	playerContent.addEventListener('mouseover', function() {mediaControls.style.display = 'block';}, false);
	playerContent.addEventListener('mouseout', function() {mediaControls.style.display = 'none';}, false);
}

// Manage play and pause states for the media player
function playPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayer.paused || mediaPlayer.ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		mediaPlayer.play();
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		// Pause the media
		mediaPlayer.pause();
	}
}

// Toggles the media player's mute and unmute status
function muteUnmute() {
	if (mediaPlayer.muted) {
		// Change the cutton to be a mute button
		changeButtonType(muteBtn, 'unmute');
		// Unmute the media player
		mediaPlayer.muted = false;
		volumeRange.value = volume;
	}
	else {
		// Change the button to be an unmute button
		changeButtonType(muteBtn, 'mute');
		// Mute the media player
		mediaPlayer.muted = true;
		volume = volumeRange.value;
		volumeRange.value = 0;
	}
}
// Set media player volume
function SetVolume(val) {
	console.log('Before: ' + player.volume);
	mediaPlayer.volume = val / 100;
	console.log('After: ' + player.volume);
}

// Update the progress bar
function updateProgressBar() {
	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	progressBar.innerHTML = percentage + '% played';
}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.src = "png/" + value + ".png";
}
// Checks if the browser can play this particular type of file or not
function canPlayVideo(ext) {
	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
	if (ableToPlay == '') return false;
	else return true;
}
