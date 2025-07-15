document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const sublineEl = document.getElementById('dynamic-subline');
  if (sublineEl) {
    const lines = [
      'Want a site or app that\'s actually awesome? "Let\'s chat," I\'ll build it better than you imagined.',
      'Want a site or app that doesn\'t suck? "I\'ll build it" and make it awesome.',
      'Need a killer site or app? "Hit me up," I build cool stuff for cool people.',
      'Tired of mediocre apps and boring sites? "Let\'s fix that," I\'ll create something badass.',
      'Want your site or app to actually stand out? "Let\'s talk," I\'ll handle the rest.',
      'Sick of boring, half-baked websites and apps? "I\'ll build one" that\'s actually legit.',
      'Ready for a site or app that slaps? "Reach out" and I\'ll make it happen.',
      'Need a site or app with personality? "I\'ve got you covered."',
      'Your idea deserves more than a basic app. "Let\'s make it epic."',
      'Done with dull, lifeless apps? "I\'ll build something" you\'ll brag about.',
      'Stop settling for average, "I\'ll craft a site or app" you\'ll actually love.',
      'Want to finally be proud of your website or app? "Let\'s chat" and get it built right.',
      'Your app idea plus my skills equals something seriously cool. "Let\'s talk."',
      'Forget cookie cutter. "I\'ll make your website or app" genuinely awesome.',
      'Want a website or app worth sharing? "Say the word" and I\'ll build it.',
      'No more yawning at your own website. "I\'ll give you something" fresh and exciting.',
      'Tired of stale apps and boring websites? "Hit me up" for something worth your time.',
      'Ready to level up your site or app? "Let me build you something" you won\'t hate.',
      'Want a website or app people will actually notice? "Let\'s get started."'
    ];
    const line = lines[Math.floor(Math.random() * lines.length)];
    sublineEl.innerHTML = line.replace(/"([^"]+)"/, '<a href="contact.html">$1</a>');
  }
});
    
const taglineElement = document.getElementById('typed-tagline');
const text = 'App & Website Development';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    taglineElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
    i++;
    setTimeout(typeWriter, 100);
  } else {
    taglineElement.innerHTML = text + '<span class="cursor">|</span>';
  }
}

if (taglineElement) {
  setTimeout(typeWriter, 1000);
}

const root  = document.documentElement;
const logo  = document.getElementById('logo');
let winW, winH;
const measure = () => { winW = window.innerWidth; winH = window.innerHeight; };
measure(); window.addEventListener('resize', measure);

window.addEventListener('pointermove', e => {
  root.style.setProperty('--x', e.clientX + 'px');
  root.style.setProperty('--y', e.clientY + 'px');
});

const projectData = {
  azbuddy: {
    images: [
      'public/azbuddycash/site1.png',
      'public/azbuddycash/site2.png',
      'public/azbuddycash/site3.png'
    ],
    descriptions: [
      "The complete homepage showcasing the artist's brand with a modern, clean design and seamless navigation.",
      'Custom-designed animated buttons that match website theme and seamlessly link to sections on same page.',
      'Buttons and scrollbar match custom theme design for visual consistency. Carefully crafted cohesive branding.'
    ]
  },
  gardener: {
    images: [
      'public/gardenerplus/gard1.PNG',
      'public/gardenerplus/gard2.PNG',
      'public/gardenerplus/gard3.jpeg'
    ],
    descriptions: [
      'The main dashboard displays all your plants with quick health status and watering schedules.',
      'Detailed plant profiles with care instructions, watering history, and personalized growth tracking.',
      'AI-powered plant health analysis that diagnoses issues and provides treatment recommendations.'
    ]
  }
};

function updateScreenshot(project, index) {
  const mainImage = document.getElementById(`${project}-main`);
  const descElement = document.getElementById(`${project}-desc`);
  const thumbs = document.querySelectorAll(`#${project}-main`).item(0).closest('.project-card').querySelectorAll('.thumb-item');

  mainImage.src = projectData[project].images[index];
  descElement.textContent = projectData[project].descriptions[index];

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

    

    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    const STAR_COUNT = 120;
    const stars = [];
    const shootingStars = [];
    
    function resizeCanvas(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for(let i=0;i<STAR_COUNT;i++){
      stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        z: Math.random()*0.5 + 0.2,
        r: Math.random()*1.2 + 0.4,
        opacity: Math.random()*0.5 + 0.5
      });
    }
    
    function createShootingStar(){
      if(Math.random() < 0.02 && shootingStars.length < 3){
        shootingStars.push({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height*0.5,
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * 5 + 2,
          length: Math.random() * 80 + 40,
          opacity: 1
        });
      }
    }
    
    function updateStars(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      stars.forEach(s=>{
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        s.opacity += (Math.random() - 0.5) * 0.05;
        s.opacity = Math.max(0.3, Math.min(1, s.opacity));
        s.y += s.z;
        if(s.y > canvas.height) s.y = -10;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      });
      
      createShootingStar();
      shootingStars.forEach((s, i)=>{
        if(s.opacity <= 0){
          shootingStars.splice(i, 1);
          return;
        }
        
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x-s.vx*10, s.y-s.vy*10);
        gradient.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.length/10, s.y - s.vy * s.length/10);
        ctx.stroke();
        
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.02;
      });
      
      requestAnimationFrame(updateStars);
    }
    updateStars();

    
    const auroraCanvas = document.getElementById('aurora');
    const auroraCtx = auroraCanvas.getContext('2d');

    function resizeAuroraCanvas(){
      auroraCanvas.width = window.innerWidth;
      auroraCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeAuroraCanvas);
    resizeAuroraCanvas();

    let time = 0;
    function drawAurora() {
      auroraCtx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);
      time += 0.005;

      const gradient = auroraCtx.createLinearGradient(0, 0, auroraCanvas.width, 0);
      gradient.addColorStop(0, 'rgba(128, 0, 128, 1.0)');
      gradient.addColorStop(0.5, 'rgba(78, 139, 201, 1.0)');
      gradient.addColorStop(1, 'rgba(128, 0, 128, 1.0)');

      auroraCtx.fillStyle = gradient;

      auroraCtx.beginPath();
      const segmentWidth = auroraCanvas.width / 500;
      auroraCtx.moveTo(0, auroraCanvas.height / 2 + Math.sin(time) * 50);

      for (let i = 0; i <= 500; i++) {
        const x = i * segmentWidth;
        const y = auroraCanvas.height / 2 + Math.sin(x * 0.005 + time) * 30 + Math.sin(x * 0.02 + time * 2) * 15;
        auroraCtx.lineTo(x, y);
      }
      auroraCtx.lineTo(auroraCanvas.width, auroraCanvas.height);
      auroraCtx.lineTo(0, auroraCanvas.height);
      auroraCtx.closePath();
      auroraCtx.fill();

      requestAnimationFrame(drawAurora);
    }
    drawAurora();
