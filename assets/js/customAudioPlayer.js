document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const seekBar = document.getElementById('seekBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.setAttribute('aria-label', 'Pause');
            playPauseIcon.src = '/assets/icons/pause.svg';
            playPauseBtn.classList.add('playing');
        } else {
            audioPlayer.pause();
            playPauseBtn.setAttribute('aria-label', 'Play');
            playPauseIcon.src = '/assets/icons/play.svg';
            playPauseBtn.classList.remove('playing');
        }
    });

    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = progress;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    seekBar.addEventListener('input', function() {
        const seekTime = (seekBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audioPlayer.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });
});
