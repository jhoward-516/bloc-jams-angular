(function() {
	function SongPlayer() {
		
		var SongPlayer = {}

		var currentSong = null;

// Private Attributes //		

/**
* @desc Buzz object audio file
* @type {Object}
*/		
		var currentBuzzObject = null;

// Private Functions //
		
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/		
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentSong = song;
		};
		
/**
* @function playSong
* @desc Play a song
* @param {Object} song
*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		

//Public Methods //
		
/**
* @function Play
* @desc Play current or new song
* @param {Object} song
*/		
		
		SongPlayer.play = function(song) {
			
			if (currentSong !== song) {
				setSong(song);			
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};

/**
* @function Pause
* @desc Pause current song
* @param {Object} song
*/	

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();