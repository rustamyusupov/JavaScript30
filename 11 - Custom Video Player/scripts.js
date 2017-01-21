const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function toggleVideo() {
  const state = video.paused ? 'play' : 'pause';

  video[state]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';

  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function hadleProgress() {
  const value = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${value}%`;
}

function changeProgress(evt) {
  const value = (evt.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = value;
}

video.addEventListener('click', toggleVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', hadleProgress);

toggle.addEventListener('click', toggleVideo);
skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', changeProgress);
progress.addEventListener('mousemove', (evt) => 
  mousedown && changeProgress(evt)
);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);






