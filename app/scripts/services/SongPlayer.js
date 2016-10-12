(function() {
	function SongPlayer($rootScope, Fixtures) {
		
		var SongPlayer = {};
		
// Private Attributes //		

/**
* @desc Current album information
* @type {Object}
*/

		var currentAlbum = Fixtures.getAlbum();
		
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
			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
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

/**
* @function stopSong
* @desc Stop a song
* @param {Object} song
*/		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
		};
		
		
/**
* @function getSongIndex
* @desc Get index of song in the song array
* @type {object} song
* @returns {number}
*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		
// Public Attributes //

/**
* @desc Active song object from list of songs
* @type {object}
*/
		
		SongPlayer.currentSong = null;
		
/**
* @desc Current playback time (in seconds) of currently playing song
* @type {number}
*/
		SongPlayer.currentTime = null;
		
/**
* @desc Volume used for songs
* @type {number}
*/
		SongPlayer.volume = 80;

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
* @function Previous
* @desc Change song to previous song in album
*/		
		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

/**
* @function Next
* @desc Change song to next song in album
*/		
		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			var lastSongOfIndex = currentAlbum.songs.length - 1;
			
			if (currentSongIndex > lastSongOfIndex) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
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
		
 /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
			
 /**
 * @function setVolume
 * @desc Set volume for song
 * @param {Number} volume
 */		
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
			SongPlayer.volume = volume;
		};
				
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();