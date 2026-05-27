// demo.js — Animacion del playhead y efectos del demo interactivo
(function() {

  var playhead  = document.getElementById('demoPlayhead');
  var demoTime  = document.getElementById('demoTime');
  var espStatus = document.getElementById('espStatus');
  var fireAll   = document.getElementById('fireAll');
  var espRows   = document.querySelectorAll('.esp-fire');
  var cues      = document.querySelectorAll('.cue');

  if (!playhead) return;

  var totalDur  = 120;   // segundos del demo
  var t         = 0;
  var playing   = true;
  var lastTs    = null;

  // Tick del playhead
  function tick(ts) {
    if (!lastTs) lastTs = ts;
    var dt = (ts - lastTs) / 1000;
    lastTs = ts;

    if (playing) {
      t += dt;
      if (t > totalDur) t = 0;

      var pct = (t / totalDur) * 100;
      playhead.style.left = pct + '%';

      // Display tiempo MM:SS.cc
      var min  = Math.floor(t / 60);
      var sec  = t % 60;
      var secS = sec.toFixed(2);
      if (sec < 10) secS = '0' + secS;
      if (demoTime) demoTime.textContent = (min < 10 ? '0' : '') + min + ':' + secS;

      // Detectar cues cercanos al playhead y hacer flash
      cues.forEach(function(cue) {
        var cueLeft = parseFloat(cue.style.left) / 100 * totalDur;
        if (Math.abs(t - cueLeft) < 0.3 && !cue.dataset.fired) {
          cue.classList.add('firing');
          cue.dataset.fired = '1';
          setTimeout(function() { cue.classList.remove('firing'); cue.dataset.fired = ''; }, 500);
        }
      });
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Botones de la toolbar del demo
  var tbPlay  = document.querySelector('.tb-play');
  var tbPause = document.querySelector('.tb-pause');
  var tbReset = document.querySelector('.tb-reset');

  if (tbPlay)  tbPlay.addEventListener('click',  function() { playing = true; });
  if (tbPause) tbPause.addEventListener('click', function() { playing = false; });
  if (tbReset) tbReset.addEventListener('click', function() { t = 0; playing = false; });

  // Botones FIRE individuales
  espRows.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var row = btn.closest('.esp-row');
      var led = row.querySelector('.esp-led');
      // Flash del LED
      led.style.background = '#ff4040';
      led.style.boxShadow  = '0 0 8px #ff4040';
      btn.textContent = 'FIRED!';
      setTimeout(function() {
        led.style.background = '';
        led.style.boxShadow  = '';
        btn.textContent = 'FIRE';
      }, 800);
    });
  });

  // FUEGO TOTAL
  if (fireAll) {
    fireAll.addEventListener('click', function() {
      fireAll.classList.add('firing');
      fireAll.textContent = '*** DISPARANDO ***';

      espRows.forEach(function(btn) {
        btn.click();
      });

      // Flash de todos los cues
      cues.forEach(function(cue, i) {
        setTimeout(function() { cue.classList.add('firing'); }, i * 60);
        setTimeout(function() { cue.classList.remove('firing'); }, i * 60 + 500);
      });

      setTimeout(function() {
        fireAll.classList.remove('firing');
        fireAll.textContent = '!! FUEGO TOTAL !!';
      }, 1200);
    });
  }

  // Rutas ticker de ESP status
  var espConnected = 4;
  setInterval(function() {
    if (espStatus) espStatus.textContent = 'ESP32: ' + espConnected + '/4 \u25CF';
  }, 3000);

})();
