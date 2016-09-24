(function() {
	function SongPlayer() {
		
		var SongPlayer = {};

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
				SongPlayer.currentSong.playing = null;
			}
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			SongPlayer.currentSong = song;
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

		
// Public Attributes //
		
/**
* @desc Active song object from list of songs
* @type {object}
*/
		
		SongPlayer.currentSong = null;

//Public Methods //
		
/**
* @function Play
* @desc Play current or new song
* @param {Object} song
*/		
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);			
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

/**
* @function Pause
* @desc Pause current song
* @param {Object} song
*/	

		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();