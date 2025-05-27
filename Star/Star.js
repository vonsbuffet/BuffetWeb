function Star(){
	deactivateVonsBuffetVisuals(); // Correctly called at the start of Star scene

	let cpac2 = document.getElementById('Cpac2'); // Use let or const for block-scoped variables
	cpac2.width = window.innerWidth;
	cpac2.height = window.innerHeight;
	let cpac2_Context = cpac2.getContext('2d');
	if (!cpac2_Context) {
		alert("Background Canvas context not supported for Cpac2!"); // More specific alert
		return;
	}
	// Ensure Cpac2 is visible when Star starts
    cpac2.style.display = 'block';


	let cpac = document.getElementById('Cpac'); // Use let or const
	cpac.width = window.innerWidth;
	cpac.height = window.innerHeight;
	let cpac_Context = cpac.getContext('2d');
	if (!cpac_Context) {
		alert("Canvas context not supported for Cpac!"); // More specific alert
		return;
	}
	cpac_Context.clearRect(0, 0, cpac.width, cpac.height);

	// Determine if it's a mobile device (for general scaling adjustments)
    const isMobile = window.innerWidth < 768; // Common breakpoint for mobile
    // Or you could use: /Mobi|Android/i.test(navigator.userAgent);
    // Let's use width for now for consistent visual scaling across small screens

    // Responsive Scaling Factors
    const baseScreenDim = Math.min(window.innerWidth, window.innerHeight); // Use smaller dimension for scaling
    const sizeScaleFactor = isMobile ? (baseScreenDim / 600) : 1; // Scale down for mobile
    const speedScaleFactor = isMobile ? 0.7 : 1; // Adjust speeds for mobile (e.g., slower)

	// Helper function
	function getRandomNumber(min, max) { return Math.random() * (max - min) + min; }

	function drawStaticBackground(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Reduce number of stars and their size for mobile
        const numStars = isMobile ? 100 : 200;
        const minStarRadius = isMobile ? 0.5 : 1;
        const maxStarRadius = isMobile ? 2 : 4;

		for (var i = 0; i < numStars; i++) {
			var x = getRandomNumber(0, ctx.canvas.width);
			var y = getRandomNumber(0, ctx.canvas.height);
			var radius = getRandomNumber(minStarRadius, maxStarRadius);
			var red = Math.floor(Math.random() * 256);
			var green = Math.floor(Math.random() * 256);
			var blue = Math.floor(Math.random() * 256);
			ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
	drawStaticBackground(cpac2_Context); // Draw starfield on Cpac2 immediately

	const centerX = cpac.width / 2;
	const centerY = cpac.height / 2;
	const initialCentralObjectRadius = 50 * sizeScaleFactor; // Scaled
	const collapsedCentralObjectRadius = 10 * sizeScaleFactor; // Scaled
	let centralObjectCurrentRadius = collapsedCentralObjectRadius; // Initial value, will be managed by states
	const centralObjectName = "Von's Buffet";

    // --- NEW: Intro Reveal Animation Variables ---
	const introRevealDuration = 1500; // Duration in ms
	let introRevealStartTime = performance.now();
    // Scale intro reveal radius appropriately
	let introRevealCurrentRadius = Math.sqrt(cpac.width * cpac.width + cpac.height * cpac.height) / (isMobile ? 1.5 : 1.8); // Adjusted for mobile
    // --- END NEW ---

	// Initial animation state changed to INTRO_REVEAL
	let animationState = 'INTRO_REVEAL';
	let nextScene = 0;
	let orbitTimer = 0;
	const normalOrbitDuration = 8000;
	let collapseSpeedFactor = 1.0;
	let collisionSpeedFactor = 1.0;
	let explosionParticles = [];
	const explosionParticleCount = isMobile ? 30 : 50; // Fewer particles for mobile
	let explosionStartTime = 0;
	const explosionDuration = 1000;
	let sunCollapseStartTime = 0;
	const sunCollapseDuration = 1000;
	let sunViB = 1; // Will be explicitly set before EXPLOSION starts
	let explosionSunRadius;
	let explosionSunAlpha;
	let showLabels = false;

	let zoomFactor = 1; // For outro zoom
	let blackHoleVisible = false; // For outro zoom
	let zoomStartTime; // For outro zoom
	const zoomDurationSun = 1000; // For outro zoom
	const zoomDurationBlackHole = 1000; // For outro zoom
	let zoomStage = ''; // For outro zoom
	let fadeAlpha = 1; // For outro zoom black screen fade
	const fadeSpeed = 0.04; // For outro zoom
	const blackHoleRevealZoomFactor = isMobile ? 250 : 500; // Scaled for mobile
	const blackHoleFullZoomFactor = isMobile ? 100 : 200; // Scaled for mobile
	let currentBlackHoleRadius = 0; // For outro zoom
	const initialApparentBlackHolePixelRadius = 0.5 * sizeScaleFactor; // Scaled
	let targetBlackHoleModelRadiusStart; // For outro zoom
	let targetBlackHoleModelRadiusEnd; // For outro zoom

	let starSceneActive = true;

	function handleCanvasClick(event) {
		if (!starSceneActive) return;

		const rect = cpac.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;

		if (animationState === 'NORMAL_ORBIT' && showLabels) {
			const distanceCentral = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
			// Adjust click radius for central object based on its current size and zoom
			if (distanceCentral < (centralObjectCurrentRadius * zoomFactor) * (isMobile ? 1.5 : 1)) { // Make clickable area larger on mobile
				nextScene = 1;
				animationState = 'COLLAPSE_PLANETS';
                return; // Consume click if central object is clicked
			}

            // --- New: Check for planet clicks ---
            for (let planet of planets) {
                const planetX = centerX + (planet.radius * Math.cos(planet.angle)) * zoomFactor;
                const planetY = centerY + (planet.radius * Math.sin(planet.angle)) * zoomFactor;
                const distancePlanet = Math.sqrt((clickX - planetX) ** 2 + (clickY - planetY) ** 2);

                // Make clickable area larger for planets on mobile, and account for zoom
                const clickableRadius = (planet.size * (isMobile ? 1.8 : 1.2)) * zoomFactor;

                if (distancePlanet < clickableRadius) {
					if (planet.name == 'Email'){
						const emailToCopy = "Von@VonsBuffet.ca"; 
						const alertMessage = emailToCopy + " has been copied to your clipboard. Email us ..."; 
						if (navigator.clipboard && navigator.clipboard.writeText) { 
							navigator.clipboard.writeText(emailToCopy) 
								.then(() => { alert(alertMessage); }) 
								.catch(err => { 
									console.error('Failed to copy email to clipboard: ', err); 
									alert('Failed to copy email automatically. Please copy it manually: ' + emailToCopy); 
								}); 
						} else { 
							console.warn('Clipboard API not available. User advised to copy manually.'); 
							alert('To copy the email, please select and copy it manually: ' + emailToCopy); 
						}
					}
                    else if (planet.url) { // Check if the planet has a URL assigned
                        window.open(planet.url, '_blank'); // Open the link in a new tab
                    }
                    return; // Consume click if a planet is clicked
                }
            }
            // --- End New ---
		}
	}
	cpac.addEventListener('click', handleCanvasClick);

	function updateZoom() { // This function is for the OUTRO zoom to VonsBuffet
		if (!starSceneActive) return;
		const elapsedZoomTime = performance.now() - zoomStartTime;
		let zoomProgress = Math.min(1, elapsedZoomTime / (zoomStage === 'SUN' ? zoomDurationSun : zoomDurationBlackHole));

		if (animationState === 'ZOOMING_SUN') {
			zoomFactor = 1 + (blackHoleRevealZoomFactor - 1) * zoomProgress;
			if (zoomProgress === 1) {
				blackHoleVisible = true;
				animationState = 'ZOOMING_BLACKHOLE';
				zoomStartTime = performance.now();
				zoomStage = 'BLACKHOLE';
				targetBlackHoleModelRadiusStart = initialApparentBlackHolePixelRadius / blackHoleRevealZoomFactor;
				currentBlackHoleRadius = targetBlackHoleModelRadiusStart;
				const screenMaxRadiusToCover = Math.max(cpac.width, cpac.height);
				targetBlackHoleModelRadiusEnd = screenMaxRadiusToCover / blackHoleFullZoomFactor;
			}
		} else if (animationState === 'ZOOMING_BLACKHOLE') {
			zoomFactor = blackHoleRevealZoomFactor + (blackHoleFullZoomFactor - blackHoleRevealZoomFactor) * zoomProgress;
			currentBlackHoleRadius = targetBlackHoleModelRadiusStart + (targetBlackHoleModelRadiusEnd - targetBlackHoleModelRadiusStart) * zoomProgress;
			if (zoomProgress === 1) {
				zoomFactor = blackHoleFullZoomFactor;
				currentBlackHoleRadius = targetBlackHoleModelRadiusEnd;
				animationState = 'BLACK_SCREEN';
                fadeAlpha = 1;
			}
		} else if (animationState === 'BLACK_SCREEN') {
			fadeAlpha = Math.max(0, fadeAlpha - fadeSpeed);
			if (fadeAlpha === 0) {
				console.log("Star scene: Black screen fade complete. Preparing to transition to VonsBuffet.");
				starSceneActive = false;
				if (typeof handleCanvasClick === "function" && cpac) {
					cpac.removeEventListener('click', handleCanvasClick);
					console.log("Star scene: Click listener removed.");
				}
				if (cpac2) {
					cpac2.style.display = 'none';
				}
				if (typeof reactivateVonsBuffetVisualsToStartupState === 'function') {
					reactivateVonsBuffetVisualsToStartupState();
				} else {
					console.error("reactivateVonsBuffetVisualsToStartupState function is not defined!");
				}
				if (typeof VonsBuffet === 'function') {
					console.log("Star scene: Setting active_VonsBuffet to true and calling VonsBuffet().");
					active_VonsBuffet = true;
					VonsBuffet();
				} else {
					console.error("VonsBuffet function is not defined!");
				}
			}
		}
	}

	let planets = [];
	let numPlanets; // Fewer planets for mobile
	function resetPlanets() { // As per your provided code
		planets = [];
        // --- New: Add URLs to planet data ---
        const planetData = [
            { name: "Youtube", url: "https://www.youtube.com/@VonsBuffet" },
            { name: "Github", url: "https://github.com/vonsbuffet?tab=repositories" },
            { name: "Email", url: "https://www.google.com/search?q=Earth+planet" },
            { name: "Universal Theory", url: "https://www.google.com/search?q=Does+A+Universal+Theory+Exist" },
            { name: "Symmetric Encryption", url: "https://www.google.com/search?q=Is+aes+secure+against+quantum+computing" }
        ];
        numPlanets = planetData.length;
        // --- End New ---

        // Initial planet radius range and size based on scaling factor
        const minPlanetRadius = 100 * sizeScaleFactor;
        const maxPlanetRadius = Math.min(window.innerWidth, window.innerHeight) / 2 - 30 * sizeScaleFactor;
        const minPlanetSize = 20 * sizeScaleFactor;
        const maxPlanetSize = 30 * sizeScaleFactor;


		for (let i = 0; i < numPlanets; i++) {
			planets.push({
				name: planetData[i].name, // Use name from planetData
                url: planetData[i].url,   // Assign the URL here
				angle: Math.random() * Math.PI * 2,
				radius: getRandomNumber(minPlanetRadius, maxPlanetRadius), // Scaled
				size: getRandomNumber(minPlanetSize, maxPlanetSize), // Scaled
				color: `hsl(${Math.random() * 360}, 80%, 60%)`,
				speed: (Math.random() * 0.001 + 0.001) * speedScaleFactor, // Scaled speed
				collapseSpeed: 0,
				initialRadius: 0
			});
			planets[i].initialRadius = planets[i].radius;
		}
		orbitTimer = 0;
		collapseSpeedFactor = 1.1;
		collisionSpeedFactor = 1.0;
		centralObjectCurrentRadius = initialCentralObjectRadius;
		showLabels = false;
	}

	function normalOrbit(){ // As per your provided code
		orbitTimer += 16;
		const normalOrbitProgress = orbitTimer / normalOrbitDuration;

		if (orbitTimer >= normalOrbitDuration) {
			animationState = 'COLLAPSE_PLANETS';
			showLabels = true;
		}
		for (let planet of planets) {
			planet.angle += planet.speed;
			drawPlanet(planet);
			if (showLabels) {
				drawPlanetLabel(planet, cpac_Context);
			}
		}
		if (showLabels) {
			drawCentralObjectLabel(centralObjectName, cpac_Context);
		}
	}

	function drawCentralObject() { // As per your provided code
		cpac_Context.beginPath();
		cpac_Context.arc(centerX, centerY, centralObjectCurrentRadius, 0, Math.PI * 2);
		cpac_Context.fillStyle = 'pink';
		cpac_Context.fill();
		if (blackHoleVisible) { // For outro
			cpac_Context.beginPath();
			cpac_Context.arc(centerX, centerY, currentBlackHoleRadius, 0, Math.PI * 2);
			cpac_Context.fillStyle = 'black';
			cpac_Context.fill();
		}
	}

	function drawCentralObjectLabel(name, context) { // As per your provided code
        // Responsive font size for labels
        const labelFontSize = isMobile ? '16px Arial' : '24px Arial';
		context.font = labelFontSize;
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.textBaseline = 'bottom';
		const labelYPosition = centerY - (centralObjectCurrentRadius + (5 * sizeScaleFactor) / zoomFactor) ; // Scaled label position
		context.fillText(name, centerX, labelYPosition);
	}

	function drawCentralFadeObject() { // As per your provided code
		cpac_Context.beginPath();
		cpac_Context.arc(centerX, centerY, explosionSunRadius, 0, Math.PI * 2);
		cpac_Context.fillStyle = 'purple';
		cpac_Context.globalAlpha = explosionSunAlpha;
		cpac_Context.fill();
		cpac_Context.globalAlpha = 1;
		if (showLabels) {
			drawCentralObjectLabel(centralObjectName, cpac_Context);
		}
	}

	function drawPlanet(planet) { // As per your provided code
		const x = centerX + planet.radius * Math.cos(planet.angle);
		const y = centerY + planet.radius * Math.sin(planet.angle);
		cpac_Context.beginPath();
		cpac_Context.arc(x, y, planet.size, 0, Math.PI * 2);
		cpac_Context.fillStyle = planet.color;
		cpac_Context.fill();
	}

	function drawPlanetLabel(planet, context) { // As per your provided code
        // Responsive font size for labels
        const planetLabelFontSize = isMobile ? '14px Arial' : '21px Arial';
		context.font = planetLabelFontSize;
		context.fillStyle = 'grey';
		context.textAlign = 'center';
		context.textBaseline = 'bottom';
		const x = centerX + planet.radius * Math.cos(planet.angle);
		const y = centerY + planet.radius * Math.sin(planet.angle);
		const labelYPosition = y - (planet.size + (5 * sizeScaleFactor) / zoomFactor); // Scaled label position
		context.fillText(planet.name, x, labelYPosition);
	}

	function drawExplosion() { // As per your provided code (this is the key function to preserve)
		if (explosionParticles.length === 0) {
			for (let i = 0; i < explosionParticleCount; i++) {
				explosionParticles.push({
					x: centerX, y: centerY,
					vx: ((Math.random() * 4) - 2) * speedScaleFactor, // Scaled velocity
					vy: ((Math.random() * 4) - 2) * speedScaleFactor, // Scaled velocity
					size: getRandomNumber(2, 5) * sizeScaleFactor, // Scaled size
					color: `hsl(${Math.random() * 360}, 100%, 80%)`,
					alpha: 1
				});
			}
			explosionStartTime = performance.now();
		}

		const elapsedExplosionTime = performance.now() - explosionStartTime;
		const explosionProgress = elapsedExplosionTime / explosionDuration;

		const sunExplosionProgress = 2.0 * explosionProgress;
		if (sunViB == 1){
			centralObjectCurrentRadius = collapsedCentralObjectRadius + (initialCentralObjectRadius * 3.5 - collapsedCentralObjectRadius) * sunExplosionProgress;
			if (centralObjectCurrentRadius > initialCentralObjectRadius) {
				centralObjectCurrentRadius = initialCentralObjectRadius;
				explosionSunRadius = initialCentralObjectRadius;
				explosionSunAlpha = 1;
				sunViB = -1;
				resetPlanets();
				showLabels = true;
			}
		} else if (sunViB == -1){
            // This is the line from your specific version for the fading sun's radius
			explosionSunRadius = collapsedCentralObjectRadius + (initialCentralObjectRadius * 3.5 - collapsedCentralObjectRadius) * sunExplosionProgress;
			explosionSunAlpha = 1 - explosionProgress;
			if (explosionSunAlpha < 0) explosionSunAlpha = 0;

			if (explosionProgress > 0.5) {
				const tempAlpha = Math.max(0, (explosionSunAlpha - 0.5) * 2);
				cpac_Context.globalAlpha = tempAlpha;
				normalOrbit();
				cpac_Context.globalAlpha = 1;
				if (showLabels) {
					drawCentralObjectLabel(centralObjectName, cpac_Context);
				}
			}
			drawCentralFadeObject();
		}

		if (explosionProgress >= 1) {
			animationState = 'NORMAL_ORBIT';
			explosionParticles = [];
            centralObjectCurrentRadius = initialCentralObjectRadius;
            sunViB = 1;
			// resetPlanets(); // Your code has resetPlanets() called when sunViB == 1 condition met.
			showLabels = true;
			return;
		}

		for (let particle of explosionParticles) {
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.alpha = 1 - explosionProgress;
			cpac_Context.beginPath();
			cpac_Context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			cpac_Context.fillStyle = particle.color;
			cpac_Context.globalAlpha = particle.alpha;
			cpac_Context.fill();
			cpac_Context.globalAlpha = 1;
		}
	}

	function animate() {
		if (!starSceneActive) {
			console.log("Star.animate: starSceneActive is false. Halting Star animation loop.");
			if (typeof handleCanvasClick === "function" && cpac) {
				cpac.removeEventListener('click', handleCanvasClick);
			}
			return;
		}

		cpac_Context.clearRect(0, 0, cpac.width, cpac.height);

        // --- NEW: INTRO_REVEAL State Handling ---
		if (animationState === 'INTRO_REVEAL') {
			const elapsedIntroTime = performance.now() - introRevealStartTime;
			let introProgress = Math.min(1, elapsedIntroTime / introRevealDuration);

            // Use the scaled max radius for intro
			const maxRadiusForIntro = Math.sqrt(cpac.width * cpac.width + cpac.height * cpac.height) / (isMobile ? 1.5 : 1.8);
			introRevealCurrentRadius = maxRadiusForIntro * (1 - introProgress);

			if (introRevealCurrentRadius > 0) {
				cpac_Context.beginPath();
				cpac_Context.arc(centerX, centerY, introRevealCurrentRadius, 0, Math.PI * 2);
				cpac_Context.fillStyle = 'black';
				cpac_Context.fill();
			} else {
                introRevealCurrentRadius = 0; // Ensure it's exactly 0 if progress is 1
            }

			if (introProgress === 1) {
				resetPlanets(); // Prepare planets and sun for the main scene
				animationState = 'EXPLOSION'; // Transition to the original starting state
				sunViB = 1; // Ensure explosion starts in the correct phase
                // The main sun (centralObjectCurrentRadius) is set by resetPlanets,
                // and drawExplosion will correctly calculate its expansion from collapsed state.
                explosionParticles = []; // Clear particles to trigger re-init in drawExplosion
                explosionStartTime = 0;  // Will be reset in drawExplosion when particles are empty
			}
		} else { // --- Original Animation States ---
			cpac_Context.save();
			cpac_Context.translate(centerX, centerY);
			cpac_Context.scale(zoomFactor, zoomFactor);
			cpac_Context.translate(-centerX, -centerY);

			drawCentralObject(); // Draw pink sun / outro black hole

			// All other states as per your provided code
			if (animationState === 'NORMAL_ORBIT') {
				normalOrbit();
			} else if (animationState === 'COLLAPSE_PLANETS') {
				collapseSpeedFactor += 0.00002;
				collisionSpeedFactor -= 0.0003;
				collisionSpeedFactor = Math.max(0, collisionSpeedFactor);

				let allPlanetsCollided = true;
				for (let planet of planets) {
					planet.speed *= collapseSpeedFactor;
					planet.radius *= collisionSpeedFactor;
					planet.size *= collisionSpeedFactor;
					planet.size = Math.max(1, planet.size);
					planet.angle += planet.speed;

					// Adjusted click condition to use model-space radius
					if (planet.radius >= centralObjectCurrentRadius + planet.size * 0.5) {
						allPlanetsCollided = false;
						drawPlanet(planet);
						if (showLabels) {
							drawPlanetLabel(planet, cpac_Context);
						}
					}
				}
				if (showLabels) {
					drawCentralObjectLabel(centralObjectName, cpac_Context);
				}
				if (allPlanetsCollided) {
					animationState = 'COLLAPSE_SUN';
					sunCollapseStartTime = performance.now();
					showLabels = false;
				}
			} else if (animationState === 'COLLAPSE_SUN') {
				const elapsedSunCollapseTime = performance.now() - sunCollapseStartTime;
				const sunCollapseProgress = Math.min(1, 3.0 * elapsedSunCollapseTime / sunCollapseDuration);

				centralObjectCurrentRadius = initialCentralObjectRadius * (1 - sunCollapseProgress);
				centralObjectCurrentRadius = Math.max(collapsedCentralObjectRadius, centralObjectCurrentRadius);

				if (sunCollapseProgress >= 1) {
					centralObjectCurrentRadius = collapsedCentralObjectRadius;
					if (nextScene == 1) {
						animationState = 'ZOOMING_SUN';
						zoomFactor = 1;
						zoomStartTime = performance.now();
						zoomStage = 'SUN';
					} else {
						animationState = 'EXPLOSION';
						sunViB = 1;
                        explosionParticles = []; // Ensure fresh explosion
                        explosionStartTime = 0;
					}
				}
			} else if (animationState === 'EXPLOSION') {
				drawExplosion();
			} else if (animationState === 'ZOOMING_SUN' || animationState === 'ZOOMING_BLACKHOLE' || animationState === 'BLACK_SCREEN') {
				updateZoom();
			} else if (animationState === 'RESET') {
				resetPlanets();
				animationState = 'EXPLOSION';
                sunViB = 1; // Ensure fresh explosion
                explosionParticles = [];
                explosionStartTime = 0;
			}

			cpac_Context.restore();
		} // End of else block (for non-INTRO_REVEAL states)

		if (animationState === 'BLACK_SCREEN' && fadeAlpha > 0 && starSceneActive) {
			cpac_Context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
			cpac_Context.fillRect(0, 0, cpac.width, cpac.height);
		}

		requestAnimationFrame(animate);
	}

	// Initial call to animate. No resetPlanets() or animationState = 'EXPLOSION' here,
	// as INTRO_REVEAL is the new starting point.
	animate();
}