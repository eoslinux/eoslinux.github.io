(() => {
  const cnv = document.querySelector(`canvas`);
  const ctx = cnv.getContext(`2d`);

  function init() {
    cnv.width  = innerWidth;
    cnv.height = innerHeight;
  }
  init();

  const numberOfRings     = 23;
  const ringRadiusOffset  = 23;
  const ringRadius        = 10;
  const waveOffset        = 19;
  const velocity          = 1.8;
  // const colors            = [`#771111`, `#bb1111`, `#ff1111`];
  let startAngle          = 0;

  function updateRings() {
    for (let i = 1; i <= numberOfRings; i++) {
      let radius      = i * ringRadiusOffset + ringRadius;
      let offsetAngle = i * waveOffset * Math.PI / 180;
      let alpha       = i / numberOfRings;
      drawRing(radius, alpha, offsetAngle);
    }

    startAngle >= 360? startAngle = 0 : startAngle += velocity;
  }

  let centerX = cnv.width  / 2;
  let centerY = cnv.height / 2;

  const maxWavesAmplitude = 23;
  const numberOfWaves     = 13;

  function drawRing(radius, alpha, offsetAngle) {
    ctx.strokeStyle = `rgb(255, ${(1 - alpha) * 255}, ${(1 - alpha) * 255})`;
    ctx.lineWidth   = 9;

    ctx.beginPath();
    
    for (let j = -180; j < 180; j++) {
      let currentAngle  = (j + startAngle) * Math.PI / 180;
      let displacement  = 0;
      let now = Math.abs(j);

      if (now > 70) {
        displacement = (now - 70) / 70;
      }

      if (displacement >= 1) {
        displacement = 1;
      }

      let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude * alpha;
      let x = centerX + Math.cos(currentAngle) * waveAmplitude;
      let y = centerY + Math.sin(currentAngle) * waveAmplitude;
      j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

    }
    ctx.closePath();
    ctx.stroke();
  }

  function loop() {
    cnv.width |= 0; // ctx.clearRect(0, 0, cnv.width, cnv.height);
    updateRings();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener(`resize`, init);

})();