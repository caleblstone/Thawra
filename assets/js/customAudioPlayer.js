document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon'); // Get the icon element
    const seekBar = document.getElementById('seekBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.setAttribute('aria-label', 'Pause');
            playPauseIcon.src = '/assets/icons/pause.svg'; // Change to pause icon
            playPauseBtn.classList.add('playing'); // Add class for styling
        } else {
            audioPlayer.pause();
            playPauseBtn.setAttribute('aria-label', 'Play');
            playPauseIcon.src = '/assets/icons/play.svg'; // Change back to play icon
            playPauseBtn.classList.remove('playing'); // Remove class for styling
        }
    });

    // Update seek bar as the audio plays
    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = progress;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    // Seek functionality
    seekBar.addEventListener('input', function() {
        const seekTime = (seekBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    // Volume control
    volumeBar.addEventListener('input', function() {
        audioPlayer.volume = volumeBar.value / 100;
    });

    // Format time in mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set initial duration display
    audioPlayer.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });
});