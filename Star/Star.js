function Star(){
	deactivateVonsBuffetVisuals();

	let cpac2 = document.getElementById('Cpac2');
	cpac2.width = window.innerWidth;
	cpac2.height = window.innerHeight;
	let cpac2_Context = cpac2.getContext('2d');
	if (!cpac2_Context) {
		alert("Background Canvas context not supported for Cpac2!");
		return;
	}
    	cpac2.style.display = 'block';


	let cpac = document.getElementById('Cpac');
	cpac.width = window.innerWidth;
	cpac.height = window.innerHeight;
	let cpac_Context = cpac.getContext('2d');
	if (!cpac_Context) {
		alert("Canvas context not supported for Cpac!");
		return;
	}
	cpac_Context.clearRect(0, 0, cpac.width, cpac.height);

    	const isMobile = window.innerWidth < 768;

    	const baseScreenDim = Math.min(window.innerWidth, window.innerHeight); // Use smaller dimension for scaling
    	const sizeScaleFactor = isMobile ? (baseScreenDim / 600) : 1; // Scale down for mobile
    	const speedScaleFactor = isMobile ? 0.7 : 1; // Adjust speeds for mobile (e.g., slower)

	function getRandomNumber(min, max) { return Math.random() * (max - min) + min; }

	function drawStaticBackground(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
	drawStaticBackground(cpac2_Context);

	const centerX = cpac.width / 2;
	const centerY = cpac.height / 2;
	const initialCentralObjectRadius = 50 * sizeScaleFactor;
	const collapsedCentralObjectRadius = 10 * sizeScaleFactor;
	let centralObjectCurrentRadius = collapsedCentralObjectRadius;
	const centralObjectName = "Von's Buffet";

	const introRevealDuration = 1500;
	let introRevealStartTime = performance.now();
	let introRevealCurrentRadius = Math.sqrt(cpac.width * cpac.width + cpac.height * cpac.height) / (isMobile ? 1.5 : 1.8);

	let animationState = 'INTRO_REVEAL';
	let nextScene = 0;
	let orbitTimer = 0;
	const normalOrbitDuration = 8000;
	let collapseSpeedFactor = 1.0;
	let collisionSpeedFactor = 1.0;
	let explosionParticles = [];
	const explosionParticleCount = isMobile ? 30 : 50;
	let explosionStartTime = 0;
	const explosionDuration = 1000;
	let sunCollapseStartTime = 0;
	const sunCollapseDuration = 1000;
	let sunViB = 1;
	let explosionSunRadius;
	let explosionSunAlpha;
	let showLabels = false;

	let zoomFactor = 1;
	let blackHoleVisible = false;
	let zoomStartTime;
	const zoomDurationSun = 1000;
	const zoomDurationBlackHole = 1000;
	let zoomStage = '';
	let fadeAlpha = 1;
	const fadeSpeed = 0.04;
	const blackHoleRevealZoomFactor = isMobile ? 250 : 500;
	const blackHoleFullZoomFactor = isMobile ? 100 : 200;
	let currentBlackHoleRadius = 0;
	const initialApparentBlackHolePixelRadius = 0.5 * sizeScaleFactor;
	let targetBlackHoleModelRadiusStart;
	let targetBlackHoleModelRadiusEnd;

	let starSceneActive = true;

	function handleCanvasClick(event) {
		if (!starSceneActive) return;

		const rect = cpac.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;

		if (animationState === 'NORMAL_ORBIT' && showLabels) {
			const distanceCentral = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
			if (distanceCentral < (centralObjectCurrentRadius * zoomFactor) * (isMobile ? 1.5 : 1)) {
				nextScene = 1;
				animationState = 'COLLAPSE_PLANETS';
                		return;
			}

			for (let planet of planets) {
				const planetX = centerX + (planet.radius * Math.cos(planet.angle)) * zoomFactor;
				const planetY = centerY + (planet.radius * Math.sin(planet.angle)) * zoomFactor;
				const distancePlanet = Math.sqrt((clickX - planetX) ** 2 + (clickY - planetY) ** 2);
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
				    else if (planet.url) {
					window.open(planet.url, '_blank');
				    }
				    return;
				}
			}
		}
	}
	cpac.addEventListener('click', handleCanvasClick);

	function updateZoom() {
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
	let numPlanets;
	function resetPlanets() {
		planets = [];
	        const planetData = [
	            { name: "Youtube", url: "https://www.youtube.com/@VonsBuffet" },
	            { name: "Github", url: "https://github.com/vonsbuffet?tab=repositories" },
	            { name: "Email", url: "https://www.google.com/search?q=Earth+planet" },
	            { name: "Universal Theory", url: "https://www.google.com/search?q=Does+A+Universal+Theory+Exist" },
	            { name: "Symmetric Encryption", url: "https://www.google.com/search?q=Is+aes+secure+against+quantum+computing" }
	        ];
	        numPlanets = planetData.length;
	        const minPlanetRadius = 100 * sizeScaleFactor;
	        const maxPlanetRadius = Math.min(window.innerWidth, window.innerHeight) / 2 - 30 * sizeScaleFactor;
	        const minPlanetSize = 20 * sizeScaleFactor;
	        const maxPlanetSize = 30 * sizeScaleFactor;


		for (let i = 0; i < numPlanets; i++) {
			planets.push({
				name: planetData[i].name,
                		url: planetData[i].url,
				angle: Math.random() * Math.PI * 2,
				radius: getRandomNumber(minPlanetRadius, maxPlanetRadius),
				size: getRandomNumber(minPlanetSize, maxPlanetSize),
				color: `hsl(${Math.random() * 360}, 80%, 60%)`,
				speed: (Math.random() * 0.001 + 0.001) * speedScaleFactor,
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

	function normalOrbit(){
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

	function drawCentralObject() {
		cpac_Context.beginPath();
		cpac_Context.arc(centerX, centerY, centralObjectCurrentRadius, 0, Math.PI * 2);
		cpac_Context.fillStyle = 'pink';
		cpac_Context.fill();
		if (blackHoleVisible) {
			cpac_Context.beginPath();
			cpac_Context.arc(centerX, centerY, currentBlackHoleRadius, 0, Math.PI * 2);
			cpac_Context.fillStyle = 'black';
			cpac_Context.fill();
		}
	}

	function drawCentralObjectLabel(name, context) {
		context.fontSize = isMobile ? '16px' : '24px';
		context.fontFamily = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.textBaseline = 'bottom';
		const labelYPosition = centerY - (centralObjectCurrentRadius + (5 * sizeScaleFactor) / zoomFactor) ;
		context.fillText(name, centerX, labelYPosition);
	}

	function drawCentralFadeObject() {
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

	function drawPlanet(planet) {
		const x = centerX + planet.radius * Math.cos(planet.angle);
		const y = centerY + planet.radius * Math.sin(planet.angle);
		cpac_Context.beginPath();
		cpac_Context.arc(x, y, planet.size, 0, Math.PI * 2);
		cpac_Context.fillStyle = planet.color;
		cpac_Context.fill();
	}

	function drawPlanetLabel(planet, context) {
		context.font = isMobile ? '14px Arial' : '21px Arial';
		context.fontFamily = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";
		context.fillStyle = 'grey';
		context.textAlign = 'center';
		context.textBaseline = 'bottom';
		const x = centerX + planet.radius * Math.cos(planet.angle);
		const y = centerY + planet.radius * Math.sin(planet.angle);
		const labelYPosition = y - (planet.size + (5 * sizeScaleFactor) / zoomFactor);
		context.fillText(planet.name, x, labelYPosition);
	}

	function drawExplosion() {
		if (explosionParticles.length === 0) {
			for (let i = 0; i < explosionParticleCount; i++) {
				explosionParticles.push({
					x: centerX, y: centerY,
					vx: ((Math.random() * 4) - 2) * speedScaleFactor,
					vy: ((Math.random() * 4) - 2) * speedScaleFactor,
					size: getRandomNumber(2, 5) * sizeScaleFactor,
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

		if (animationState === 'INTRO_REVEAL') {
			const elapsedIntroTime = performance.now() - introRevealStartTime;
			let introProgress = Math.min(1, elapsedIntroTime / introRevealDuration);

			const maxRadiusForIntro = Math.sqrt(cpac.width * cpac.width + cpac.height * cpac.height) / (isMobile ? 1.5 : 1.8);
			introRevealCurrentRadius = maxRadiusForIntro * (1 - introProgress);

			if (introRevealCurrentRadius > 0) {
				cpac_Context.beginPath();
				cpac_Context.arc(centerX, centerY, introRevealCurrentRadius, 0, Math.PI * 2);
				cpac_Context.fillStyle = 'black';
				cpac_Context.fill();
			} else {
                		introRevealCurrentRadius = 0;
            		}

			if (introProgress === 1) {
				resetPlanets();
				animationState = 'EXPLOSION';
				sunViB = 1;
                		explosionParticles = [];
                		explosionStartTime = 0;
			}
		} else {
			cpac_Context.save();
			cpac_Context.translate(centerX, centerY);
			cpac_Context.scale(zoomFactor, zoomFactor);
			cpac_Context.translate(-centerX, -centerY);

			drawCentralObject();

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
                        			explosionParticles = [];
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
                		sunViB = 1;
                		explosionParticles = [];
                		explosionStartTime = 0;
			}

			cpac_Context.restore();
		}

		if (animationState === 'BLACK_SCREEN' && fadeAlpha > 0 && starSceneActive) {
			cpac_Context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
			cpac_Context.fillRect(0, 0, cpac.width, cpac.height);
		}

		requestAnimationFrame(animate);
	}
	animate();
}
