// Embed the player on demand; no YouTube API request is needed before playback.
(function () {
  function setup() {
    document.querySelectorAll('.ch_ytdefer').forEach(function (container) {
      if (container.dataset.playerReady) return;
      var video = container.getAttribute('data-src');
      var button = container.querySelector('.ch_ytdefer_btn');
      if (!video || !button) return;
      container.dataset.playerReady = 'true';
      container.addEventListener('click', function play() {
        if (container.querySelector('iframe')) return;
        var frame = document.createElement('iframe');
        frame.className = 'embed-responsive-item';
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video) + '?autoplay=1';
        frame.title = (container.getAttribute('data-title') || '').trim() || 'YouTube video';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.style.border = '0';
        container.appendChild(frame);
        button.hidden = true;
        frame.focus();
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, {once: true});
  else setup();
})();
