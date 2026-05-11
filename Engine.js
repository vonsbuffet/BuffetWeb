const canvas = document.getElementById('compCanvas');
const ctx = canvas.getContext('2d', { alpha: false });

// Dynamically inject a secondary UI Canvas to prevent text smudging
let uiCanvas = document.getElementById('uiCanvas');
let uiCtx;
if (!uiCanvas) {
    uiCanvas = document.createElement('canvas');
    uiCanvas.id = 'uiCanvas';
    uiCanvas.style.position = 'absolute';
    uiCanvas.style.top = '0';
    uiCanvas.style.left = '0';
    uiCanvas.style.pointerEvents = 'none'; 
    uiCanvas.style.zIndex = '5';
    document.body.appendChild(uiCanvas);
}
uiCtx = uiCanvas.getContext('2d');

let width, height, cx, cy;
let pointer = { x: -1000, y: -1000, active: false };

// Load the VB Logo for the macro-particles (State 1)
const vbLogoImg = new Image();
vbLogoImg.src = 'Rez/VBLogo-Dark.png'; 

// Phase System (0: Chaos, 1: Star System, 2: Binary Platform)
let currentPhase = 0; 
let activeNodeIndex = 0;
let puzzles = [];
let globalFlashAlpha = 0; 

// Spacetime Mesh & Deep Field Stars
let particles = [];
let staticStars = [];
const NUM_PARTICLES = window.innerWidth < 768 ? 600 : 1200;
const NUM_STARS = window.innerWidth < 768 ? 150 : 350;

// ==========================================
// STATE VARIABLES
// ==========================================
let planets = [];
let starSystem = {
    state: 'WAITING', 
    timer: 0,
    orbitDuration: 600, 
    sunRadius: 20,
    baseSunRadius: 20,
    explosionRadius: 0,
    explosionAlpha: 0,
    collapseFactor: 1
};

let binarySystem = {
    angle: 0,
    dist: window.innerWidth < 768 ? 80 : 150,
    speed: 0.005, 
    androidUrl: "https://play.google.com/store", 
    iosUrl: "https://www.apple.com/app-store/"   
};

const planetData = [
    { name: "Youtube", url: "https://www.youtube.com/@VonsBuffet", color: '#FF3333' },
    { name: "Github", url: "https://github.com/vonsbuffet?tab=repositories", color: '#FFFFFF' },
    { name: "Email", url: "Von@VonsBuffet.ca", isEmail: true, color: '#33FF77' },
    { name: "Universal Theory", url: "https://www.google.com/search?q=Does+A+Universal+Theory+Exist", color: '#33CCFF' },
    { name: "Encryption", url: "https://www.google.com/search?q=Is+aes+secure+against+quantum+computing", color: '#FF33FF' }
];

function init() {
    width = canvas.width = uiCanvas.width = window.innerWidth;
    height = canvas.height = uiCanvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
    binarySystem.dist = Math.min(width, height) * 0.25;

    const baseDist = Math.min(width, height);
    
    puzzles = [
        { // Phase 0 -> 1 (Inner Triangle)
            dist: baseDist * 0.2,
            nodes: [
                { angle: Math.PI * 1.5, x: 0, y: 0, hit: false },
                { angle: Math.PI * 0.1, x: 0, y: 0, hit: false },
                { angle: Math.PI * 0.9, x: 0, y: 0, hit: false }
            ]
        },
        { // Phase 1 -> 2 (Outer Orbitals)
            dist: baseDist * 0.35,
            nodes: [
                { angle: Math.PI * 0.5, x: 0, y: 0, hit: false },
                { angle: Math.PI * 1.8, x: 0, y: 0, hit: false },
                { angle: Math.PI * 1.2, x: 0, y: 0, hit: false }
            ]
        },
        { // Phase 2 -> 0 (Linear Alignment / Singularity Cut)
            dist: baseDist * 0.25,
            nodes: [
                { angle: Math.PI * 1.0, x: 0, y: 0, hit: false },
                { angle: Math.PI * 0.0, x: 0, y: 0, hit: false },
                { angle: Math.PI * 0.5, x: 0, y: 0, hit: false }
            ]
        }
    ];
    updateNodePositions();

    // Generate Computational Mesh
    particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * Math.max(width, height),
            speed: (Math.random() * 0.015 + 0.002),
            baseSpeed: (Math.random() * 0.015 + 0.002),
            size: Math.random() > 0.85 ? Math.random() * 3 + 1.5 : Math.random() * 1 + 0.5, 
            orbitRing: Math.floor(Math.random() * 8) + 1,
            velocityOut: 0 
        });
    }

    // Generate Deep Field Static Stars
    staticStars = [];
    for (let i = 0; i < NUM_STARS; i++) {
        staticStars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.2 + 0.3,
            alpha: Math.random(),
            twinkleSpeed: (Math.random() * 0.01) + 0.005,
            twinkleDir: Math.random() > 0.5 ? 1 : -1
        });
    }
}

function updateNodePositions() {
    puzzles.forEach(phasePuzzles => {
        phasePuzzles.nodes.forEach(node => {
            node.x = cx + Math.cos(node.angle) * phasePuzzles.dist;
            node.y = cy + Math.sin(node.angle) * phasePuzzles.dist;
        });
    });
}

function resetPlanets() {
    planets = [];
    const minRadius = Math.min(width, height) * 0.15;
    const maxRadius = Math.min(width, height) * 0.4;
    
    planetData.forEach((data) => {
        const randomRadius = minRadius + (Math.random() * (maxRadius - minRadius));
        const pSize = window.innerWidth < 768 ? 6 + Math.random() * 8 : 10 + Math.random() * 12;
        planets.push({
            ...data,
            angle: Math.random() * Math.PI * 2, 
            radius: randomRadius + 100, 
            targetRadius: randomRadius,
            size: pSize,
            baseSize: pSize, 
            speed: 0.002 + Math.random() * 0.003,
            baseSpeed: 0.002 + Math.random() * 0.003,
            labelAlpha: 0,
            alpha: 0 // Planets fade in visually
        });
    });
}

// Input Handling
window.addEventListener('resize', init);
window.addEventListener('mousemove', e => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; });
window.addEventListener('touchmove', e => { pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; pointer.active = true; });
window.addEventListener('touchend', () => pointer.active = false);
window.addEventListener('mouseleave', () => pointer.active = false);

// Interaction (Clicks)
window.addEventListener('click', e => {
    if (currentPhase === 1 && (starSystem.state === 'ORBIT' || starSystem.state === 'EXPLOSION')) {
        planets.forEach(p => {
            const px = cx + Math.cos(p.angle) * p.radius;
            const py = cy + Math.sin(p.angle) * p.radius;
            if (Math.hypot(e.clientX - px, e.clientY - py) < p.size * 3) {
                if (p.isEmail) {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(p.url).then(() => alert(`${p.url} copied to clipboard.`));
                    } else alert('Email: ' + p.url);
                } else window.open(p.url, '_blank');
            }
        });
    }

    if (currentPhase === 2) {
        let ax = cx + Math.cos(binarySystem.angle) * binarySystem.dist;
        let ay = cy + Math.sin(binarySystem.angle) * binarySystem.dist;
        let ix = cx + Math.cos(binarySystem.angle + Math.PI) * binarySystem.dist;
        let iy = cy + Math.sin(binarySystem.angle + Math.PI) * binarySystem.dist;

        if (Math.hypot(e.clientX - ax, e.clientY - ay) < 60) window.open(binarySystem.androidUrl, '_blank');
        if (Math.hypot(e.clientX - ix, e.clientY - iy) < 60) window.open(binarySystem.iosUrl, '_blank');
    }
});

function draw() {
    uiCtx.clearRect(0, 0, width, height);

    // Apply motion blur to the main physics canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, width, height);

    // ==========================================
    // RENDER: DEEP FIELD STATIC STARS
    // ==========================================
    staticStars.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 1) { s.alpha = 1; s.twinkleDir = -1; }
        else if (s.alpha <= 0.15) { s.alpha = 0.15; s.twinkleDir = 1; }

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // ==========================================
    // GLOBAL PUZZLE LOGIC
    // ==========================================
    const activePuzzle = puzzles[currentPhase];
    if (activePuzzle && pointer.active) {
        const targetNode = activePuzzle.nodes[activeNodeIndex];
        if (targetNode && Math.hypot(pointer.x - targetNode.x, pointer.y - targetNode.y) < 60) {
            targetNode.hit = true;
            activeNodeIndex++;
            if (activeNodeIndex >= activePuzzle.nodes.length) triggerPhaseTransition();
        }
    }

    // ==========================================
    // PHASE 1: STAR SYSTEM LOGIC
    // ==========================================
    if (currentPhase === 1) {
        starSystem.timer++;

        if (starSystem.state === 'ORBIT') {
            if (starSystem.timer > starSystem.orbitDuration) {
                starSystem.state = 'COLLAPSE_PLANETS';
                starSystem.collapseFactor = 1.0;
            }
        } 
        else if (starSystem.state === 'COLLAPSE_PLANETS') {
            starSystem.collapseFactor += 0.005;
            let allCollided = true;
            
            planets.forEach(p => {
                const collapseRatio = Math.max(0, 1 - (p.radius / p.targetRadius));
                p.speed = p.baseSpeed + (0.25 * Math.pow(collapseRatio, 2)); 
                p.radius -= starSystem.collapseFactor;
                
                let shrinkThreshold = starSystem.sunRadius * 2.5;
                if (p.radius < shrinkThreshold) {
                    p.size = p.baseSize * Math.max(0, p.radius / shrinkThreshold);
                }
                
                if (p.radius < 0) p.radius = 0; 
                if (p.radius > 2) allCollided = false; 
            });
            
            if (allCollided) {
                starSystem.state = 'COLLAPSE_SUN';
                starSystem.timer = 0;
            }
        } 
        else if (starSystem.state === 'COLLAPSE_SUN') {
            starSystem.sunRadius *= 0.85; 
            if (starSystem.sunRadius < 1) {
                starSystem.state = 'EXPLOSION';
                starSystem.timer = 0;
                starSystem.explosionRadius = 1;
                starSystem.explosionAlpha = 1;
                starSystem.sunRadius = 0; 
                resetPlanets(); 
                
                // Scatter the mesh perfectly across the deep field so it condenses inwards
                particles.forEach(p => {
                    p.radius = Math.max(width, height) * (0.5 + Math.random() * 1.0);
                    p.angle = Math.random() * Math.PI * 2;
                    p.velocityOut = 0; // Disable the outward burst
                });
            }
        } 
        else if (starSystem.state === 'EXPLOSION') {
            starSystem.explosionAlpha -= 0.01;
            // Sun gracefully emerges from the flash
            if (starSystem.sunRadius < starSystem.baseSunRadius) {
                starSystem.sunRadius += (starSystem.baseSunRadius - starSystem.sunRadius) * 0.1 + 0.1;
            }
            if (starSystem.explosionAlpha <= 0) {
                starSystem.state = 'ORBIT';
                starSystem.timer = 0;
                starSystem.sunRadius = starSystem.baseSunRadius;
            }
        }
    }

    // ==========================================
    // PHASE 2: BINARY PLATFORM LOGIC
    // ==========================================
    if (currentPhase === 2) {
        binarySystem.angle += binarySystem.speed;
    }

    let ax = cx + Math.cos(binarySystem.angle) * binarySystem.dist;
    let ay = cy + Math.sin(binarySystem.angle) * binarySystem.dist;
    let ix = cx + Math.cos(binarySystem.angle + Math.PI) * binarySystem.dist;
    let iy = cy + Math.sin(binarySystem.angle + Math.PI) * binarySystem.dist;

    // ==========================================
    // PARTICLE MESH RENDER
    // ==========================================
    ctx.fillStyle = '#fff';
    particles.forEach(p => {
        let px, py;

        if (currentPhase === 0) {
            p.angle += p.speed;
            px = cx + Math.cos(p.angle) * p.radius;
            py = cy + Math.sin(p.angle) * p.radius;
            
            let dx = pointer.x - px;
            let dy = pointer.y - py;
            let warpRadius = window.innerWidth < 768 ? 120 : 180;
            
            if (pointer.active && Math.hypot(dx, dy) < warpRadius) {
                p.radius -= (warpRadius - Math.hypot(dx, dy)) * 0.06;
                p.angle += 0.08;
            } else {
                p.radius -= p.speed * 60;
                if (p.radius < 10) p.radius = Math.max(width, height);
            }
        } 
        else if (currentPhase === 1) {
            p.angle += p.speed;
            if (p.velocityOut > 0) {
                p.radius += p.velocityOut;
                p.velocityOut *= 0.92; 
                if (p.velocityOut < 0.1) p.velocityOut = 0;
            } else {
                // The organic condensation logic pulling scattered matter inwards
                const ringRadius = (Math.min(width, height) * 0.08) * p.orbitRing;
                p.radius += (ringRadius - p.radius) * 0.02;
            }
            px = cx + Math.cos(p.angle) * p.radius;
            py = cy + Math.sin(p.angle) * p.radius;
        } 
        else if (currentPhase === 2) {
            px = cx + Math.cos(p.angle) * p.radius;
            py = cy + Math.sin(p.angle) * p.radius;

            let vx = 0;
            let vy = 0;

            let distC = Math.max(Math.hypot(cx - px, cy - py), 1);
            if (distC > binarySystem.dist * 1.2) {
                vx += ((cx - px) / distC) * 2;
                vy += ((cy - py) / distC) * 2;
            }

            let distA = Math.max(Math.hypot(ax - px, ay - py), 5);
            let nDxA = (ax - px) / distA;
            let nDyA = (ay - py) / distA;
            let pullA = 600 / distA; 
            let orbitA = 2500 / distA; 
            vx += nDxA * pullA - nDyA * orbitA;
            vy += nDyA * pullA + nDxA * orbitA;

            let distI = Math.max(Math.hypot(ix - px, iy - py), 5);
            let nDxI = (ix - px) / distI;
            let nDyI = (iy - py) / distI;
            let pullI = 600 / distI; 
            let orbitI = 2500 / distI; 
            vx += nDxI * pullI - nDyI * orbitI;
            vy += nDyI * pullI + nDxI * orbitI;

            px += vx * (p.speed * 0.8);
            py += vy * (p.speed * 0.8);

            p.radius = Math.hypot(px - cx, py - cy);
            p.angle = Math.atan2(py - cy, px - cx);

            if (distA < 30 || distI < 30) {
                p.radius = Math.max(width, height) + Math.random() * 200;
                p.angle = Math.random() * Math.PI * 2;
            }
        }

        px = cx + Math.cos(p.angle) * p.radius;
        py = cy + Math.sin(p.angle) * p.radius;

        if (currentPhase === 0 && p.size > 1.5 && vbLogoImg.complete && vbLogoImg.naturalWidth !== 0) {
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(p.angle + Math.PI / 2); 
            const logoScale = p.size * 6; 
            ctx.drawImage(vbLogoImg, -logoScale / 2, -logoScale / 2, logoScale, logoScale);
            ctx.restore();
        } else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(px, py, p.size, p.size);
        }
    });

    // ==========================================
    // RENDER: PHASE 1 (PLANETS & TEXT)
    // ==========================================
    if (currentPhase === 1 && (starSystem.state === 'ORBIT' || starSystem.state === 'EXPLOSION' || starSystem.state === 'COLLAPSE_PLANETS')) {
        planets.forEach(p => {
            if (starSystem.state === 'ORBIT') {
                p.labelAlpha += (1 - p.labelAlpha) * 0.05; 
                p.alpha += (1 - p.alpha) * 0.05; 
            } else if (starSystem.state === 'COLLAPSE_PLANETS') {
                p.labelAlpha = Math.max(0, p.labelAlpha - 0.08); 
            } else if (starSystem.state === 'EXPLOSION') {
                p.labelAlpha = 0;
                p.alpha += (1 - p.alpha) * 0.02; 
            }

            if (starSystem.state === 'ORBIT' || starSystem.state === 'EXPLOSION') {
                p.angle += p.speed;
                p.radius += (p.targetRadius - p.radius) * 0.05;
            } else if (starSystem.state === 'COLLAPSE_PLANETS') {
                p.angle += p.speed; 
            }

            const px = cx + Math.cos(p.angle) * p.radius;
            const py = cy + Math.sin(p.angle) * p.radius;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            if (p.labelAlpha > 0.01) {
                uiCtx.fillStyle = `rgba(255, 255, 255, ${p.labelAlpha * 0.8})`;
                uiCtx.font = "12px monospace";
                uiCtx.textAlign = "center";
                uiCtx.fillText(p.name, px, py + p.size + 15);
            }
        });
    }

    // ==========================================
    // RENDER: CENTRAL SINGULARITY / STAR (Phase 0/1)
    // ==========================================
    if (currentPhase < 2) {
        if (currentPhase === 0) {
            let time = Date.now() * 0.005;
            let pulse = Math.sin(time) * 2;
            let voidRadius = 25;
            let haloRadius = voidRadius * 4 + pulse;

            ctx.globalCompositeOperation = 'screen';
            let glowGrad = ctx.createRadialGradient(cx, cy, voidRadius * 0.9, cx, cy, haloRadius);
            glowGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');      
            glowGrad.addColorStop(0.15, 'rgba(150, 200, 255, 0.6)'); 
            glowGrad.addColorStop(0.5, 'rgba(80, 40, 255, 0.2)');    
            glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');            
            
            ctx.beginPath();
            ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; 

            ctx.beginPath();
            ctx.arc(cx, cy, voidRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, voidRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(time*2)*0.2})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
        } else if (currentPhase === 1) {
            if (starSystem.sunRadius > 0.5) {
                ctx.beginPath();
                ctx.arc(cx, cy, starSystem.sunRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#FFD700';
                
                ctx.shadowBlur = 25;
                ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
                ctx.fill();
                ctx.shadowBlur = 0; 
            }
        }
    }

    // ==========================================
    // RENDER: PHASE 2 (BINARY BLACK HOLES & TEXT)
    // ==========================================
    if (currentPhase === 2) {
        const renderBinaryHole = (hx, hy, label, glowColor) => {
            ctx.beginPath();
            ctx.arc(hx, hy, 35, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();
            
            ctx.shadowBlur = 40;
            ctx.shadowColor = glowColor;
            ctx.lineWidth = 3;
            ctx.strokeStyle = glowColor;
            ctx.stroke();
            ctx.shadowBlur = 0; 
            
            uiCtx.fillStyle = glowColor;
            uiCtx.font = "14px monospace";
            uiCtx.textAlign = "center";
            uiCtx.fillText(label, hx, hy + 65);
        };

        renderBinaryHole(ax, ay, "Android OS", "rgba(61, 220, 132, 0.9)"); 
        renderBinaryHole(ix, iy, "iOS Platform", "rgba(0, 122, 255, 0.9)"); 
    }

    // ==========================================
    // RENDER: PUZZLE NODES
    // ==========================================
    if (activePuzzle) {
        activePuzzle.nodes.forEach((node, index) => {
            if (index > activeNodeIndex) return; 
            ctx.beginPath();
            ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
            ctx.strokeStyle = node.hit ? 'rgba(0, 255, 100, 0.8)' : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = node.hit ? 2 : 1;
            ctx.stroke();
            
            if (index === activeNodeIndex && pointer.active) {
                ctx.beginPath();
                ctx.moveTo(pointer.x, pointer.y);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.stroke();
            }
        });
    }

    // ==========================================
    // SEAMLESS EXPLOSION FLASH OVERLAY (Phase 1)
    // ==========================================
    if (currentPhase === 1 && starSystem.state === 'EXPLOSION') {
        starSystem.explosionRadius += (Math.max(width, height) * 1.5 - starSystem.explosionRadius) * 0.1;
        ctx.beginPath();
        ctx.arc(cx, cy, starSystem.explosionRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, starSystem.explosionAlpha)})`;
        ctx.fill();
    }

    // ==========================================
    // GLOBAL PHASE TRANSITION FLASH
    // ==========================================
    if (globalFlashAlpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${globalFlashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        globalFlashAlpha -= 0.02; 
    }

    requestAnimationFrame(draw);
}

function triggerPhaseTransition() {
    globalFlashAlpha = 1.0;
    currentPhase = (currentPhase + 1) % 3;
    activeNodeIndex = 0;
    puzzles.forEach(pz => pz.nodes.forEach(n => n.hit = false));
    
    if (currentPhase === 1) {
        starSystem.state = 'ORBIT';
        starSystem.timer = 0;
        resetPlanets();
    } else if (currentPhase === 2) {
        binarySystem.angle = 0;
    }
}

init();
draw();