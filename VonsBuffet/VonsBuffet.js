function deactivateVonsBuffetVisuals() {
    const scrollableContainerVB = document.getElementById('scrollable-container'); 
    if (scrollableContainerVB) scrollableContainerVB.style.display = 'none'; 
    const darkMatterVB = document.getElementById('DarkMatter'); 
    if (darkMatterVB) darkMatterVB.style.display = 'none'; 
    const blackHoleCanvasVB = document.getElementById('blackHoleEffectCanvas'); 
    if (blackHoleCanvasVB) blackHoleCanvasVB.style.display = 'none'; 
    const vbcButton = document.getElementById('vbc-action-button-vb'); 
    if (vbcButton) vbcButton.style.display = 'none'; 
    const vpsButton = document.getElementById('vps-action-button-vb'); 
    if (vpsButton) vpsButton.style.display = 'none'; 
    const vbcLearnMoreButton = document.getElementById('vbc-learn-more-button'); 
    if (vbcLearnMoreButton) vbcLearnMoreButton.style.display = 'none'; 
    const vpsLearnMoreButton = document.getElementById('vps-learn-more-button'); 
    if (vpsLearnMoreButton) vpsLearnMoreButton.style.display = 'none'; 
    const vbcActionsContainer = document.querySelector('.vbc-service .action-buttons-container'); 
    if (vbcActionsContainer) vbcActionsContainer.style.display = 'none'; 
    const vpsActionsContainer = document.querySelector('.vps-service .action-buttons-container'); 
    if (vpsActionsContainer) vpsActionsContainer.style.display = 'none'; 
} 

function reactivateVonsBuffetVisualsToStartupState() { 
    const scrollableContainerVB = document.getElementById('scrollable-container'); 
    if (scrollableContainerVB) scrollableContainerVB.style.display = 'block'; 
    const darkMatterVB = document.getElementById('DarkMatter'); 
    if (darkMatterVB) darkMatterVB.style.display = 'block'; 
    const logoVB = document.getElementById('VBLogo'); 
    if (logoVB) logoVB.style.opacity = '0'; 
    const aboveLogoText = document.getElementById('above-logo-text'); 
    if (aboveLogoText) aboveLogoText.style.opacity = '0'; 
    const belowLogoText1 = document.getElementById('below-logo-text-1'); 
    if (belowLogoText1) belowLogoText1.style.opacity = '0'; 
    const arrowVbcGroupVB = document.getElementById('indicator-vbc-arrow'); 
    if (arrowVbcGroupVB) arrowVbcGroupVB.style.opacity = '0'; 
    const arrowVpsGroupVB = document.getElementById('indicator-vps-arrow'); 
    if (arrowVpsGroupVB) arrowVpsGroupVB.style.opacity = '0'; 
    const vbcButton = document.getElementById('vbc-action-button-vb'); 
    if (vbcButton) { vbcButton.style.opacity = '0'; vbcButton.style.display = ''; } 
    const vpsButton = document.getElementById('vps-action-button-vb'); 
    if (vpsButton) { vpsButton.style.opacity = '0'; vpsButton.style.display = ''; } 
    const vbcLearnMoreButton = document.getElementById('vbc-learn-more-button'); 
    if (vbcLearnMoreButton) { vbcLearnMoreButton.style.opacity = '0'; vbcLearnMoreButton.style.display = ''; } 
    const vpsLearnMoreButton = document.getElementById('vps-learn-more-button'); 
    if (vpsLearnMoreButton) { vpsLearnMoreButton.style.opacity = '0'; vpsLearnMoreButton.style.display = ''; } 
    const vbcActionsContainer = document.querySelector('.vbc-service .action-buttons-container'); 
    if (vbcActionsContainer) vbcActionsContainer.style.display = ''; 
    const vpsActionsContainer = document.querySelector('.vps-service .action-buttons-container'); 
    if (vpsActionsContainer) vpsActionsContainer.style.display = ''; 
    const cpac2Element = document.getElementById('Cpac2'); 
    if (cpac2Element) cpac2Element.style.display = 'none'; 
} 

function VonsBuffet() { 
    let blackHoleCanvas = null; 
    let blackHoleCtx = null; 
    const blackHoleAnimation = { 
        startTime: 0, duration: 2000, startDiameter: 1, 
        endDiameter: 0, currentDiameter: 0, centerX: 0, 
        centerY: 0, isActive: false 
    }; 

    let cpac = document.getElementById('Cpac'); 
    let cpac_Context = cpac ? cpac.getContext('2d') : null; 
    if (!cpac_Context && cpac) { console.warn("Background Canvas context (Cpac) not supported."); } 
    else if (!cpac) { console.warn("Cpac canvas element not found."); } 

    let darkMatter = document.getElementById('DarkMatter'); 
    if (darkMatter) darkMatter.style.pointerEvents = 'none'; 
    let darkMatter_Context = darkMatter ? darkMatter.getContext('2d') : null; 
    if (!darkMatter_Context && darkMatter) { console.warn("DarkMatter Canvas context not supported."); } 
    else if (!darkMatter) { console.warn("DarkMatter canvas element not found."); } 

    const scrollableContainer = document.getElementById('scrollable-container'); 
    if (!scrollableContainer) { 
        console.error("CRITICAL: scrollable-container element not found. VonsBuffet cannot run."); 
        return; 
    } 
    if (window.getComputedStyle(scrollableContainer).position === 'static') { 
        scrollableContainer.style.position = 'relative'; 
    } 

    const logo = document.getElementById('VBLogo'); 
    const aboveLogoTextDiv = document.getElementById('above-logo-text'); 
    const belowLogoTextDiv1 = document.getElementById('below-logo-text-1'); 
    let allTextDivs = [aboveLogoTextDiv, belowLogoTextDiv1].filter(el => el != null); 

    if (aboveLogoTextDiv) aboveLogoTextDiv.classList.add('main-text-block', 'service-content', 'vbc-service'); 
    if (belowLogoTextDiv1) belowLogoTextDiv1.classList.add('main-text-block', 'service-content', 'vps-service'); 

    const arrowVbcGroup = document.getElementById('indicator-vbc-arrow'); 
    const arrowVpsGroup = document.getElementById('indicator-vps-arrow'); 
    let arrowVbcIcon = arrowVbcGroup ? arrowVbcGroup.querySelector('.arrow-shape.up') : null; 
    let arrowVbcLabel = arrowVbcGroup ? arrowVbcGroup.querySelector('.indicator-label') : null; 
    let arrowVpsIcon = arrowVpsGroup ? arrowVpsGroup.querySelector('.arrow-shape.down') : null; 
    let arrowVpsLabel = arrowVpsGroup ? arrowVpsGroup.querySelector('.indicator-label') : null; 

    const arrowVbcToLogoGroup = document.createElement('div');
    arrowVbcToLogoGroup.id = 'indicator-vbc-to-logo-arrow';
    arrowVbcToLogoGroup.classList.add('indicator-arrow-group');
    arrowVbcToLogoGroup.innerHTML = `
        <div class="arrow-shape down"></div>
        <div class="indicator-label">?</div>
    `;
    scrollableContainer.appendChild(arrowVbcToLogoGroup);

    const arrowVpsToLogoGroup = document.createElement('div');
    arrowVpsToLogoGroup.id = 'indicator-vps-to-logo-arrow';
    arrowVpsToLogoGroup.classList.add('indicator-arrow-group');
    arrowVpsToLogoGroup.innerHTML = `
        <div class="arrow-shape up"></div>
        <div class="indicator-label">?</div>
    `;
    scrollableContainer.appendChild(arrowVpsToLogoGroup);


    let slideshowDataStore = {}; 
    let uniqueSlideshowIdCounter = 0; 

    const NOISE_CYCLE_INTERVAL_T = 2000; 
    const MIN_NOISY_CHARS_PER_BLOCK = 1; 
    const NOISE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(''); 
    let noisyTextBlocksData = []; 

    function getRandomNoiseChar() { return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]; } 

    function initializeNoiseForBlock(mainElement) { 
        if (!mainElement) return; 
        const blockData = { element: mainElement, textNodeInfos: [], currentNoisySlots: [], lastNoiseCycleTime: 0 }; 
        function findTextNodesRecursive(node) { 
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') { 
                blockData.textNodeInfos.push({ nodeRef: node, originalText: node.nodeValue }); 
            } else if (node.nodeType === Node.ELEMENT_NODE) { 
                for (let i = 0; i < node.childNodes.length; i++) { 
                    findTextNodesRecursive(node.childNodes[i]); 
                } 
            } 
        } 
        findTextNodesRecursive(mainElement); 
        if (blockData.textNodeInfos.length > 0 || 
            (mainElement.childNodes.length === 0 && (mainElement === aboveLogoTextDiv || mainElement === belowLogoTextDiv1))) { 
            noisyTextBlocksData.push(blockData); 
        } 
    } 

    function updateSimplifiedNoiseEffect() { 
        if ((typeof active_VonsBuffet !== 'undefined' && !active_VonsBuffet) && !blackHoleAnimation.isActive)
		return; 
        const currentTime = Date.now(); 
        noisyTextBlocksData.forEach(blockData => { 
            if (currentTime - blockData.lastNoiseCycleTime > NOISE_CYCLE_INTERVAL_T) { 
                blockData.lastNoiseCycleTime = currentTime; 
                blockData.currentNoisySlots = []; 
                let allCharSlotsInBlock = []; 
                blockData.textNodeInfos.forEach(tnInfo => { 
                    for (let i = 0; i < tnInfo.originalText.length; i++) { 
                        allCharSlotsInBlock.push({ textNode: tnInfo.nodeRef, indexInNode: i }); 
                    } 
                }); 
                const totalTextLengthInBlock = allCharSlotsInBlock.length; 
                let R_val = 0; 
                if (totalTextLengthInBlock >= MIN_NOISY_CHARS_PER_BLOCK) { 
                    const maxAdditionalChars = 1; 
                    let calculatedMaxR = MIN_NOISY_CHARS_PER_BLOCK + maxAdditionalChars; 
                    R_val = Math.floor(Math.random() * (calculatedMaxR - MIN_NOISY_CHARS_PER_BLOCK + 1)) + MIN_NOISY_CHARS_PER_BLOCK; 
                    R_val = Math.min(R_val, totalTextLengthInBlock); 
                } 
                if (R_val > 0) { 
                    for (let i = allCharSlotsInBlock.length - 1; i > 0; i--) { 
                        const j = Math.floor(Math.random() * (i + 1)); 
                        [allCharSlotsInBlock[i], allCharSlotsInBlock[j]] = [allCharSlotsInBlock[j], allCharSlotsInBlock[i]]; 
                    } 
                    blockData.currentNoisySlots = allCharSlotsInBlock.slice(0, R_val); 
                } 
            } 
            blockData.textNodeInfos.forEach(tnInfo => { 
                let nodeNeedsUpdate = false; 
                const slotsAffectingThisNode = blockData.currentNoisySlots.filter(slot => slot.textNode === tnInfo.nodeRef); 
                if (slotsAffectingThisNode.length > 0) { 
                    let charArray = tnInfo.originalText.split(''); 
                    slotsAffectingThisNode.forEach(slot => { 
                        if (slot.indexInNode < charArray.length) { 
                            charArray[slot.indexInNode] = getRandomNoiseChar(); 
                        } 
                    }); 
                    if (tnInfo.nodeRef.nodeValue !== charArray.join('')) { 
                        tnInfo.nodeRef.nodeValue = charArray.join(''); 
                    } 
                    nodeNeedsUpdate = true; 
                } 
                if (!nodeNeedsUpdate && tnInfo.nodeRef.nodeValue !== tnInfo.originalText) { 
                    tnInfo.nodeRef.nodeValue = tnInfo.originalText; 
                } 
            }); 
        }); 
    } 

    function parseSlides(htmlStringWithMarkers) { 
        const slides = []; 
        const slideRegex = /\*-(.*?)-\*/gs; 
        let match; 

        if (!htmlStringWithMarkers.includes('*-') && !htmlStringWithMarkers.includes('-*')) { 
            const trimmedHtml = htmlStringWithMarkers.trim(); 
            if (trimmedHtml) { 
                if (!trimmedHtml.match(/^<(ul|ol|p|div|h[1-6])/i)) { 
                    return [`<p>${trimmedHtml}</p>`]; 
                } 
                return [trimmedHtml]; 
            } 
            return []; 
        } 

        while ((match = slideRegex.exec(htmlStringWithMarkers)) !== null) { 
            let slideContent = match[1].trim(); 
            if (slideContent) { 
                if (!slideContent.match(/^<(ul|ol|p|div|h[1-6])/i)) { 
                    slideContent = `<p>${slideContent}</p>`; 
                } 
                slides.push(slideContent); 
            } 
        } 
        if (slides.length === 0 && htmlStringWithMarkers.trim()) { 
            let fallbackContent = htmlStringWithMarkers.replace(/\*-(.*?)-\*/g, "$1").replace(/\*-|-\*/g,"").trim(); 
            if (fallbackContent) { 
                if (!fallbackContent.match(/^<(ul|ol|p|div|h[1-6])/i)) { 
                    slides.push(`<p>${fallbackContent}</p>`); 
                } else { 
                    slides.push(fallbackContent); 
                } 
            } 
        } 
        return slides; 
    } 

    function generateServiceHTML(title, punchline, fullDetailsHTML, buttonId, buttonText, buttonSpecificClass) { 
        const learnMoreButtonIdGenerated = buttonId.replace('-action-button-vb', '-learn-more-button'); 
        const slides = parseSlides(fullDetailsHTML); 

        uniqueSlideshowIdCounter++; 
        const currentSlideshowId = `slideshow-${buttonId}-${uniqueSlideshowIdCounter}`;
        slideshowDataStore[currentSlideshowId] = slides; 

        return ` 
            <div class="service-content-wrapper"> 
                <div class="service-title-container"> 
                    <span class="service-title-text">${title}</span> 
                </div> 
                <div class="service-punchline">${punchline}</div> 
                <div class="action-buttons-container"> 
                    <div id="${buttonId}" class="vons-buffet-action-button ${buttonSpecificClass}" role="button" tabindex="0" style="opacity:0;">${buttonText}</div> 
                    <div id="${learnMoreButtonIdGenerated}" class="learn-more-button" role="button" tabindex="0" style="opacity:0;">Learn more...</div> 
                </div> 
                <div class="slideshow-container" id="${currentSlideshowId}" style="display: none;"> 
                    <div class="slide-nav-arrow left" role="button" tabindex="0" aria-label="Previous slide"> 
                        <div class="arrow-shape horizontal left"></div> 
                    </div> 
                    <div class="slide-content-display" aria-live="polite"> 
                        {/* Slide content will be injected by JS */} 
                    </div> 
                    <div class="slide-nav-arrow right" role="button" tabindex="0" aria-label="Next slide"> 
                        <div class="arrow-shape horizontal right"></div> 
                    </div> 
                    <div class="slide-indicators"></div> 
                </div> 
            </div> 
        `; 
    } 

    const vbcTitle = "VBC'c".replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, '');
    const vbcPunchline = "A universal app, guided by a universal theory.</br>VBC'c is both.".replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, '');
    const vbcFullDetails = `*-True universal theory transcends physics, and is applicable to any system. Without such universality, it would be an incomplete theory. 
	<br/><br/>VBC'c is complete. Using a calculus based on computational logic instead of numbers, VBC'c has the property of being compatible with uncertainty.-*
	*-Every layer of its technology is mathematically consistent with the theory (the OS framework, programming language, encryption algorithm, UI logic, etc.).<br/><br/>
	The design requirement of mathematical consistency was a test to see if VBC'c applies to useful but potentially complex systems, as a means to minimize complexity.<br/><br/>
 	Notable technologies include: <ul><li><b>VBC'c :</b> Universal Theory / Opensource OS Framework / etc.</li><li><b>VBC DEKrypt :</b> Post-Quantum Symmetric Encryption</li><li><b>VB Currency :</b> A Revolutionary Cryptocurrency</li></ul> Each technology is a genuine breakthrough, with more unrevealed innovations integral to the platform.-*
	*-Developed for Android, with cross-platform expansion imminent.</br></br>
	The mobile platform is fully programmable, supporting both GPU and CPU with GPU enabled runtime programming.</br></br>
	Our engineered input technology proves 2 thumbs can exceed the expression rate of all 10 of your thumbs on keyboard and mouse.</br></br>
	Beyond mobile, VB Currency itself forms a responsive, efficient supercomputer network—among other utilities—supporting your infinite growth trajectory.-*
	*-Once purchased, your VBC'c is yours to command.<br/>
	We are not responsible for the consequences of your creations.<br/><br/>
	VBC'c is our direct response to an evolving AI super-culture, engineered to fortify human intellectual competitiveness.<br/><br/>
	Von's Buffet is aware. Von's Buffet is responding.<br/>
	[80% Complete]<br/></br>
	<span style='color:grey'>B</span><span style='color:purple'>V</span> = <span style='color:green'>$2.10</span> + 0% Commission-*`.replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, ''); 

    const vpsTitle = "<span style='color:grey'>V</span>onder's <span style='color:grey'>P</span>rotection <span style='color:grey'>S</span>er'c".replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, '');
    const vpsPunchline = "Through our research in spacetime computing, </br>we strive to improve how your valuables are spatially transformed.".replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, '');
    const vpsFullDetails = `*-Information is everywhere.<br/><br/>
	And much like running a computer program, information can be relocated from point 'A', to point 'B'.<br/><br/>
	If we consider this a computation, it's only natural to say computation principles apply to real physical systems.<br/></br>
	When applying a computational theory (i.e. VBC'c) to physical systems, it becomes clear that spacetime operates like an extremely capable computer.<br/><br/>
	To address this computer's intracacies, Von's Buffet designed a business model that directly benefits from knowledge in this domain:</br></br>
 	Moving (physical) information, from point 'A' to point 'B', without information loss.-*
	*-Currently operating in Calgary, Alberta, Canada, we're established as the definitive solution for high-volume operations where conventional infrastructure fails and time is critical.<br/><br/>
	We routinely move assets valued over $800,000.<br/>
	At what cost you ask?<br/>
	<span style='color:grey'>B</span><span style='color:purple'>V</span> = <span style='color:green'>$200</span>/hour + Any Additional equipment/material costs (e.g. truck, boxes, tape, etc.).-*
	*-Your existing equipment and materials can be seamlessly integrated, thereby waiving additional costs. Otherwise, these additional costs will be presented as a bill of materials, strictly covering the direct expenses.<br/><br/>
	Von's Buffet does not profit from additional expenses; this commitment encourages us to 'lower', and eventually 'remove', all such external costs.<br/><br/>
	Now the <span style='color:green'>$200</span>/hour... How does paying premium rates for a moving service benefit you?<br/><br/>
 	Funds from industrial and residential asset relocation directly fuels our core research. Your investment propels our mission to architect future-proof information protection, envisioning services for natural or synthesized disaster scenarios, ensuring every intelligence remains connected.-*
	*-Also, we're simply that fast!<br/><br/>Contact Von today to prepare an order.-*`.replace(/[\n\t\r\f\v\u00A0\u2000-\u200B\u2028\u2029\uFEFF\u0000]/g, '');

    const vbcButtonId = 'vbc-action-button-vb'; 
    const vbcButtonText = '80% Complete'; 
    const vbcButtonSpecificClass = 'vbc-download-button'; 
    const vbcLearnMoreButtonId = 'vbc-learn-more-button'; 

    const vpsButtonId = 'vps-action-button-vb'; 
    const vpsButtonText = 'Contact'; 
    const vpsButtonSpecificClass = 'vps-contact-button'; 
    const vpsLearnMoreButtonId = 'vps-learn-more-button'; 

    if (aboveLogoTextDiv) aboveLogoTextDiv.innerHTML = generateServiceHTML(vbcTitle, vbcPunchline, vbcFullDetails, vbcButtonId, vbcButtonText, vbcButtonSpecificClass); 
    if (belowLogoTextDiv1) belowLogoTextDiv1.innerHTML = generateServiceHTML(vpsTitle, vpsPunchline, vpsFullDetails, vpsButtonId, vpsButtonText, vpsButtonSpecificClass); 

    const vpsActionButton = document.getElementById(vpsButtonId); 
    if (vpsActionButton) { 
        vpsActionButton.addEventListener('click', () => { 
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
        }); 
    } 

    function setupLearnMore(containerDiv) { 
        if (!containerDiv) return; 

        const learnMoreButton = containerDiv.querySelector('.learn-more-button'); 
        const slideshowContainer = containerDiv.querySelector('.slideshow-container'); 
        const actionButtonsContainer = containerDiv.querySelector('.action-buttons-container'); 


        if (!learnMoreButton || !slideshowContainer || !actionButtonsContainer) { 
            if(learnMoreButton && !slideshowContainer) learnMoreButton.style.display = 'none'; 
            return; 
        } 

        const slideshowId = slideshowContainer.id; 
        const slides = slideshowDataStore[slideshowId] || []; 

        if (slides.length === 0) { 
            slideshowContainer.style.display = 'none'; 
            learnMoreButton.style.display = 'none'; 
            return; 
        } 

        const slideContentDisplay = slideshowContainer.querySelector('.slide-content-display'); 
        const prevArrow = slideshowContainer.querySelector('.slide-nav-arrow.left'); 
        const nextArrow = slideshowContainer.querySelector('.slide-nav-arrow.right'); 
        const slideIndicatorsContainer = slideshowContainer.querySelector('.slide-indicators'); 

        let currentSlideIndex = 0; 

        function updateSlideView() { 
            if (!slideContentDisplay || slides.length === 0) { 
                if(slideContentDisplay) slideContentDisplay.innerHTML = ""; 
                if (prevArrow) prevArrow.style.visibility = 'hidden'; 
                if (nextArrow) nextArrow.style.visibility = 'hidden'; 
                return; 
            } 
            currentSlideIndex = Math.max(0, Math.min(slides.length - 1, currentSlideIndex)); 
            slideContentDisplay.innerHTML = slides[currentSlideIndex]; 
			
			slideContentDisplay.scrollTop = 0;

            if (prevArrow){
				prevArrow.style.padding = '1vh 1vh';
				prevArrow.style.visibility = currentSlideIndex === 0 ? 'hidden' : 'visible'; 
            }
			if (nextArrow){
				nextArrow.style.padding = '1vh 1vh';
				nextArrow.style.visibility = currentSlideIndex === slides.length - 1 ? 'hidden' : 'visible';
			}

            if (slideIndicatorsContainer) { 
                slideIndicatorsContainer.innerHTML = ''; 
                slides.forEach((_, index) => { 
                    const dot = document.createElement('span'); 
                    dot.classList.add('slide-dot'); 
                    if (index === currentSlideIndex) { 
                        dot.classList.add('active'); 
                    } 
                    dot.addEventListener('click', () => { 
                        currentSlideIndex = index; 
                        updateSlideView(); 
                    }); 
                    slideIndicatorsContainer.appendChild(dot); 
                }); 
                slideIndicatorsContainer.style.display = slides.length > 1 ? 'block' : 'none'; 
            } 
        } 

        if (slides.length <= 1) { 
            if (prevArrow) prevArrow.style.visibility = 'hidden'; 
            if (nextArrow) nextArrow.style.visibility = 'hidden'; 
            if (slideIndicatorsContainer) slideIndicatorsContainer.style.display = 'none'; 
        } 


        learnMoreButton.addEventListener('click', () => { 
            const isCurrentlyHidden = slideshowContainer.style.display === 'none'; 

            if (isCurrentlyHidden) { 
                slideshowContainer.style.position = 'absolute'; 

                const topOffsetForSlideshow = actionButtonsContainer.offsetTop + actionButtonsContainer.offsetHeight + 15;

                slideshowContainer.style.top = `${topOffsetForSlideshow}px`; 
                slideshowContainer.style.left = '0'; 
                slideshowContainer.style.width = '100%'; 

                slideshowContainer.style.display = 'flex'; 

                const scTop = slideshowContainer.getBoundingClientRect().top; 
                const vpHeight = window.innerHeight; 

                const scComputedStyle = window.getComputedStyle(slideshowContainer); 
                const scPaddingBottom = parseFloat(scComputedStyle.paddingBottom) || 35;

                const sdcComputedStyle = window.getComputedStyle(slideContentDisplay); 
                const sdcMinHeight = parseFloat(sdcComputedStyle.minHeight) || 60;
                const sdcCssMaxHeight = parseFloat(sdcComputedStyle.maxHeight) || 600;

                const bottomPageMargin = 20;

                let heightBudgetForSCD = vpHeight - scTop - scPaddingBottom - bottomPageMargin; 

                heightBudgetForSCD = Math.max(sdcMinHeight, heightBudgetForSCD); 

                const newMaxHeight = Math.min(sdcCssMaxHeight, heightBudgetForSCD); 

                slideContentDisplay.style.maxHeight = `${newMaxHeight}px`;

                learnMoreButton.textContent = 'Show less...'; 
                currentSlideIndex = 0; 
                updateSlideView();
            } else { 
                slideshowContainer.style.display = 'none'; 
                learnMoreButton.textContent = 'Learn more...'; 
                slideContentDisplay.style.maxHeight = '';
            } 
        }); 
        learnMoreButton.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter' || e.key === ' ') { 
                e.preventDefault(); 
                learnMoreButton.click(); 
            } 
        }); 

        if (prevArrow) { 
            prevArrow.addEventListener('click', () => { 
                if (currentSlideIndex > 0) { 
                    currentSlideIndex--; 
                    updateSlideView(); 
                } 
            }); 
            prevArrow.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevArrow.click(); } }); 
        } 
        if (nextArrow) { 
            nextArrow.addEventListener('click', () => { 
                if (currentSlideIndex < slides.length - 1) { 
                    currentSlideIndex++; 
                    updateSlideView(); 
                } 
            }); 
            nextArrow.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextArrow.click(); } }); 
        } 
    } 
    if (aboveLogoTextDiv) setupLearnMore(aboveLogoTextDiv); 
    if (belowLogoTextDiv1) setupLearnMore(belowLogoTextDiv1); 

    noisyTextBlocksData = []; 
    if (aboveLogoTextDiv) {
    	initializeNoiseForBlock(aboveLogoTextDiv);
        //const wrapperVBC = aboveLogoTextDiv.querySelector('.service-content-wrapper'); 
        //if(wrapperVBC) initializeNoiseForBlock(wrapperVBC); 
    } 
    if (belowLogoTextDiv1) { 
        initializeNoiseForBlock(belowLogoTextDiv1);
    	//const wrapperVPS = belowLogoTextDiv1.querySelector('.service-content-wrapper'); 
        //if(wrapperVPS) initializeNoiseForBlock(wrapperVPS); 
    } 

    const monospaceFont = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"; 
    if (arrowVbcLabel) arrowVbcLabel.style.fontFamily = monospaceFont; 
    if (arrowVpsLabel) arrowVpsLabel.style.fontFamily = monospaceFont; 

    if (arrowVbcToLogoGroup) arrowVbcToLogoGroup.querySelector('.indicator-label').style.fontFamily = monospaceFont;
    if (arrowVpsToLogoGroup) arrowVpsToLogoGroup.querySelector('.indicator-label').style.fontFamily = monospaceFont;


    const particles = [];

    function getRandomNumber(min, max) { return Math.random() * (max - min) + min; } 

    function initializeParticles() { 
        if (!darkMatter || !darkMatter_Context) return; 
        particles.length = 0; 
        const isPortrait = window.innerHeight > window.innerWidth; 
        const currentNumParticles = isPortrait ? 150 : 400; 
        const currentMinParticleSize = 1; 
        const currentMaxParticleSize = isPortrait ? 2 : 4; 

        for (let i = 0; i < currentNumParticles; i++) { 
            const x = Math.random() * darkMatter.width; 
            const y = Math.random() * darkMatter.height; 
            const size = getRandomNumber(currentMinParticleSize, currentMaxParticleSize); 
            particles.push({ x, y, size }); 
        } 
    } 

    const numFullSections = 3; 
    let currentSection = 1;
    const sectionPositions = {
        0: 0,
        1: -window.innerHeight,
        2: -2 * window.innerHeight
    };

    let initialLayoutDone = false; 

    function navigateToSection(sectionIndex) {
        if (typeof active_VonsBuffet === 'undefined' || !active_VonsBuffet) return;

        const targetY = sectionPositions[sectionIndex];
        if (scrollableContainer) {
            scrollableContainer.style.transition = initialLayoutDone ? 'transform 0.8s ease-in-out' : 'none'; 
            scrollableContainer.style.transform = `translateY(${targetY}px)`;
            currentSection = sectionIndex;
        }

        if (arrowVbcGroup) {
            arrowVbcGroup.style.opacity = (currentSection === 0 || currentSection === 2) ? '0' : '1';
            arrowVbcGroup.style.pointerEvents = (currentSection === 0 || currentSection === 2) ? 'none' : 'auto';
        }
        if (arrowVpsGroup) {
            arrowVpsGroup.style.opacity = (currentSection === 0 || currentSection === 2) ? '0' : '1';
            arrowVpsGroup.style.pointerEvents = (currentSection === 0 || currentSection === 2) ? 'none' : 'auto';
        }

        if (arrowVbcToLogoGroup) {
            arrowVbcToLogoGroup.style.opacity = (currentSection === 0) ? '1' : '0';
            arrowVbcToLogoGroup.style.pointerEvents = (currentSection === 0) ? 'auto' : 'none';
        }
        if (arrowVpsToLogoGroup) {
            arrowVpsToLogoGroup.style.opacity = (currentSection === 2) ? '1' : '0';
            arrowVpsToLogoGroup.style.pointerEvents = (currentSection === 2) ? 'auto' : 'none';
        }
    }


    function positionElementsForScrolling() { 
        const screenW = window.innerWidth; 
        const screenH = window.innerHeight; 
        if (screenH <= 0 || screenW <= 0) { 
            console.warn("Screen height or width is zero or invalid, skipping layout."); 
            return; 
        } 

        if (scrollableContainer) { 
            scrollableContainer.style.height = `${numFullSections * screenH}px`; 
        } 

        if (cpac) { 
            cpac.width = screenW; 
            cpac.height = numFullSections * screenH; 
        } 

        const isLandscape = screenW >= screenH; 

        let darkMatterCanvasScaleFactor = isLandscape ? 5 : 3; 
        const currentMaxScreenDim = Math.max(screenW, screenH); 
        if (darkMatter) { 
            darkMatter.width = darkMatterCanvasScaleFactor * currentMaxScreenDim; 
            darkMatter.height = darkMatterCanvasScaleFactor * currentMaxScreenDim; 
            if (darkMatter_Context) darkMatter_Context.clearRect(0, 0, darkMatter.width, darkMatter.height); 
            if (typeof active_VonsBuffet !== 'undefined' && active_VonsBuffet) initializeParticles(); 
        } 

        const commonTextWidthMobile = '90vw'; 
        const commonTextWidthDesktop = '60vh';
        const desktopBreakpoint = 768; 

        if (aboveLogoTextDiv) { 
            aboveLogoTextDiv.style.position = 'absolute'; 
            aboveLogoTextDiv.style.top = `0px`; 
            aboveLogoTextDiv.style.left = '0px'; 
            aboveLogoTextDiv.style.width = '100%'; 
            aboveLogoTextDiv.style.height = `${screenH}px`; 
            aboveLogoTextDiv.style.overflowY = 'hidden'; 
            aboveLogoTextDiv.style.display = 'flex'; 
            aboveLogoTextDiv.style.flexDirection = 'column'; 
            aboveLogoTextDiv.style.justifyContent = 'center'; 
            aboveLogoTextDiv.style.alignItems = 'center'; 

            const contentWrapperVBC = aboveLogoTextDiv.querySelector('.service-content-wrapper'); 
            if (contentWrapperVBC) { 
                contentWrapperVBC.style.width = screenW < desktopBreakpoint ? commonTextWidthMobile : commonTextWidthDesktop; 
                contentWrapperVBC.style.textAlign = 'center'; 
            } 
        } 

        if (logo) { 
            logo.style.position = 'absolute'; 
            logo.style.top = `${1.5 * screenH}px`; 
            logo.style.left = '50%'; 
            logo.style.transform = 'translate(-50%, -50%)'; 
            logo.style.height = (screenW >= desktopBreakpoint && isLandscape) ? '25vh' : '20vh'; 
            logo.style.width = 'auto'; 
        } 
        const arrowPadding = 20;
        const estimatedArrowRenderedHeight = 60 + (2 * arrowPadding);
        const arrowMarginFromViewportEdge = (screenW < desktopBreakpoint && !isLandscape) ? 25 : 40; 

        if (arrowVbcGroup) { 
            arrowVbcGroup.style.position = 'absolute'; 
            arrowVbcGroup.style.top = `${screenH + arrowMarginFromViewportEdge}px`; 
            arrowVbcGroup.style.left = '50%'; 
            arrowVbcGroup.style.transform = 'translateX(-50%)'; 
            arrowVbcGroup.style.cursor = 'pointer'; 
            arrowVbcGroup.setAttribute('role', 'button');
            arrowVbcGroup.setAttribute('aria-label', 'Scroll to VBC section');
            arrowVbcGroup.style.padding = `${arrowPadding}px`;
            arrowVbcGroup.style.boxSizing = 'content-box';
            arrowVbcGroup.addEventListener('click', () => navigateToSection(0));
            arrowVbcGroup.style.opacity = '0';
            arrowVbcGroup.style.transition = 'opacity 0.5s ease-in-out';
        } 
        if (arrowVpsGroup) { 
            arrowVpsGroup.style.position = 'absolute'; 
            arrowVpsGroup.style.top = `${(2 * screenH) - estimatedArrowRenderedHeight - arrowMarginFromViewportEdge}px`; 
            arrowVpsGroup.style.left = '50%'; 
            arrowVpsGroup.style.transform = 'translateX(-50%)'; 
            arrowVpsGroup.style.cursor = 'pointer'; 
            arrowVpsGroup.setAttribute('role', 'button');
            arrowVpsGroup.setAttribute('aria-label', 'Scroll to VPS section');
            arrowVpsGroup.style.padding = `${arrowPadding}px`;
            arrowVpsGroup.style.boxSizing = 'content-box';
            arrowVpsGroup.addEventListener('click', () => navigateToSection(2)); 
            arrowVpsGroup.style.opacity = '0';
            arrowVpsGroup.style.transition = 'opacity 0.5s ease-in-out';
        } 

        if (arrowVbcToLogoGroup) {
            arrowVbcToLogoGroup.style.position = 'absolute';
            arrowVbcToLogoGroup.style.top = `${arrowMarginFromViewportEdge}px`; 
            arrowVbcToLogoGroup.style.left = '50%';
            arrowVbcToLogoGroup.style.transform = 'translateX(-50%)';
            arrowVbcToLogoGroup.style.cursor = 'pointer';
            arrowVbcToLogoGroup.setAttribute('role', 'button');
            arrowVbcToLogoGroup.setAttribute('aria-label', 'Return to VBLogo section');
            arrowVbcToLogoGroup.style.padding = `${arrowPadding}px`;
            arrowVbcToLogoGroup.style.boxSizing = 'content-box';
            arrowVbcToLogoGroup.addEventListener('click', () => navigateToSection(1)); 
            // Initially hidden
            arrowVbcToLogoGroup.style.opacity = '0';
            arrowVbcToLogoGroup.style.transition = 'opacity 0.5s ease-in-out';
        }
        if (arrowVpsToLogoGroup) {
            arrowVpsToLogoGroup.style.position = 'absolute';
            arrowVpsToLogoGroup.style.top = `${(2 * screenH) + arrowMarginFromViewportEdge}px`;
            arrowVpsToLogoGroup.style.left = '50%';
            arrowVpsToLogoGroup.style.transform = 'translateX(-50%)'; 
            arrowVpsToLogoGroup.style.cursor = 'pointer';
            arrowVpsToLogoGroup.setAttribute('role', 'button');
            arrowVpsToLogoGroup.setAttribute('aria-label', 'Return to VBLogo section');
            arrowVpsToLogoGroup.style.padding = `${arrowPadding}px`;
            arrowVpsToLogoGroup.style.boxSizing = 'content-box';
            arrowVpsToLogoGroup.addEventListener('click', () => navigateToSection(1)); 
            // Initially hidden
            arrowVpsToLogoGroup.style.opacity = '0';
            arrowVpsToLogoGroup.style.transition = 'opacity 0.5s ease-in-out';
        }


        if (belowLogoTextDiv1) { 
            belowLogoTextDiv1.style.position = 'absolute'; 
            belowLogoTextDiv1.style.top = `${2 * screenH}px`; 
            belowLogoTextDiv1.style.left = '0px'; 
            belowLogoTextDiv1.style.width = '100%'; 
            belowLogoTextDiv1.style.height = `${screenH}px`; 
            belowLogoTextDiv1.style.overflowY = 'hidden'; 
            belowLogoTextDiv1.style.display = 'flex'; 
            belowLogoTextDiv1.style.flexDirection = 'column'; 
            belowLogoTextDiv1.style.justifyContent = 'center'; 
            belowLogoTextDiv1.style.alignItems = 'center'; 

            const contentWrapperVPS = belowLogoTextDiv1.querySelector('.service-content-wrapper'); 
            if (contentWrapperVPS) { 
                contentWrapperVPS.style.width = screenW < desktopBreakpoint ? commonTextWidthMobile : commonTextWidthDesktop; 
                contentWrapperVPS.style.textAlign = 'center'; 
            } 
        } 

        [aboveLogoTextDiv, belowLogoTextDiv1].forEach(parentDiv => { 
            if (!parentDiv) return; 
            const contentWrapper = parentDiv.querySelector('.service-content-wrapper'); 
            if (!contentWrapper) return; 
            const container = contentWrapper.querySelector('.action-buttons-container'); 
            if (container) { 
                container.style.marginTop = '25px'; 
                if (screenW < desktopBreakpoint && !isLandscape) { 
                    container.style.flexDirection = 'column'; 
                    container.style.alignItems = 'center'; 
                } else { 
                    container.style.flexDirection = 'row'; 
                    container.style.justifyContent = 'center'; 
                    container.style.alignItems = 'center'; 
                } 
            } 
        }); 

        if (!initialLayoutDone) { 
            navigateToSection(1);
            initialLayoutDone = true; 
        } 
    } 

    setTimeout(() => { 
        if (typeof active_VonsBuffet === 'undefined' || active_VonsBuffet) { 
            positionElementsForScrolling(); 
        } 
    }, 100); 

    setTimeout(() => { 
        if (typeof active_VonsBuffet === 'undefined' || !active_VonsBuffet) return; 
        if (aboveLogoTextDiv) aboveLogoTextDiv.style.opacity = 1; 
        if (belowLogoTextDiv1) belowLogoTextDiv1.style.opacity = 1; 
        if (logo) logo.style.opacity = 1; 
        
        if (arrowVbcGroup) arrowVbcGroup.style.opacity = (currentSection === 0 || currentSection === 2) ? '0' : '1';
        if (arrowVpsGroup) arrowVpsGroup.style.opacity = (currentSection === 0 || currentSection === 2) ? '0' : '1';
        if (arrowVbcToLogoGroup) arrowVbcToLogoGroup.style.opacity = (currentSection === 0) ? '1' : '0';
        if (arrowVpsToLogoGroup) arrowVpsToLogoGroup.style.opacity = (currentSection === 2) ? '1' : '0';

        document.querySelectorAll('.vons-buffet-action-button, .learn-more-button').forEach(btn => { 
            btn.style.opacity = 1; 
        }); 

    }, 600); 

    let backgroundColor = 'black'; 
    const flashInterval = 2000; let flashDuration = 7000; let isFlashingWhite = false; 
    let flashIntervalId = null; 
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; 
    function flashBackground() { 
        if (prefersReducedMotion || (typeof active_VonsBuffet !== 'undefined' && !active_VonsBuffet)) { 
            backgroundColor = 'white'; 
            drawBackground(); 
            if (flashIntervalId) { clearInterval(flashIntervalId); flashIntervalId = null; } 
            return; 
        } 
        isFlashingWhite = true; 
        backgroundColor = 'white'; 
        setTimeout(() => { 
            isFlashingWhite = false; 
            backgroundColor = 'black'; 
        }, flashDuration); 
    } 
    function drawBackground() { 
        if(cpac_Context && cpac) { 
            cpac_Context.fillStyle = backgroundColor; 
            cpac_Context.fillRect(0, 0, cpac.width, cpac.height); 
        } 
    } 

    function actualGetLogoScreenCenter() { 
        if (!logo) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }; 
        const rect = logo.getBoundingClientRect(); 
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; 
    } 

    function updateDarkMatter() {
	if (((typeof active_VonsBuffet !== 'undefined' && !active_VonsBuffet) && !blackHoleAnimation.isActive) || !darkMatter || !darkMatter_Context || !logo || !scrollableContainer) {
		return;
	}

	const scrollableContainerRect = scrollableContainer.getBoundingClientRect();
	
	const logoRect = logo.getBoundingClientRect();
	const logoScreenCenterX = logoRect.left + logoRect.width / 2;
	const logoScreenCenterY = logoRect.top + logoRect.height / 2;
	const logoCenterInContainerX = logoScreenCenterX - scrollableContainerRect.left;
	const logoCenterInContainerY = logoScreenCenterY - scrollableContainerRect.top;

	const dmStyleLeft = logoCenterInContainerX - darkMatter.width / 2;
	const dmStyleTop = logoCenterInContainerY - darkMatter.height / 2;

	darkMatter.style.left = `${dmStyleLeft}px`;
	darkMatter.style.top = `${dmStyleTop}px`;
	darkMatter_Context.clearRect(0, 0, darkMatter.width, darkMatter.height);

	const targetXForParticles = darkMatter.width / 2;
	const targetYForParticles = darkMatter.height / 2;
	const currentParticleSpeed = window.innerHeight > window.innerWidth ? 15 : 20;
	const removalThreshold = Math.min(logo.offsetWidth, logo.offsetHeight) / 2;
	const currentMinParticleSize = 1;
	const currentMaxParticleSize = window.innerHeight > window.innerWidth ? 2 : 4;

	for (let i = particles.length - 1; i >= 0; i--) {
		const particle = particles[i];
		const dx = targetXForParticles - particle.x;
		const dy = targetYForParticles - particle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		const fadeStartDistance = Math.max(logo.offsetWidth, logo.offsetHeight) * 2;
		let alpha = 1;
		if (distance < fadeStartDistance) {
			alpha = Math.max(0, distance / fadeStartDistance);
		}

		darkMatter_Context.beginPath();
		darkMatter_Context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
		darkMatter_Context.fillStyle = isFlashingWhite ? `rgba(0, 0, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
		darkMatter_Context.fill();

		if (distance > 0) {
			const velocityX = (dx / distance) * currentParticleSpeed;
			const velocityY = (dy / distance) * currentParticleSpeed;
			particle.x += velocityX;
			particle.y += velocityY;
		}

		if (distance < removalThreshold) {
			particles.splice(i, 1);
			const newParticle = {};
			const edge = Math.floor(Math.random() * 4);
			switch (edge) {
				case 0: newParticle.x = Math.random() * darkMatter.width; newParticle.y = 0 - currentMaxParticleSize; break;
				case 1: newParticle.x = darkMatter.width + currentMaxParticleSize; newParticle.y = Math.random() * darkMatter.height; break;
				case 2: newParticle.x = Math.random() * darkMatter.width; newParticle.y = darkMatter.height + currentMaxParticleSize; break;
				case 3: newParticle.x = 0 - currentMaxParticleSize; newParticle.y = Math.random() * darkMatter.height; break;
			}
			newParticle.size = getRandomNumber(currentMinParticleSize, currentMaxParticleSize);
			particles.push(newParticle);
		}
	}
    }
	
    function setupBlackHoleCanvas() { 
        if (document.getElementById('blackHoleEffectCanvas')) { 
            blackHoleCanvas = document.getElementById('blackHoleEffectCanvas'); 
        } else { 
            blackHoleCanvas = document.createElement('canvas'); 
            blackHoleCanvas.id = 'blackHoleEffectCanvas'; 
            document.body.appendChild(blackHoleCanvas); 
        } 
        blackHoleCanvas.style.position = 'fixed'; 
        blackHoleCanvas.style.top = '0'; 
        blackHoleCanvas.style.left = '0'; 
        blackHoleCanvas.style.width = '100vw'; 
        blackHoleCanvas.style.height = '100vh'; 
        blackHoleCanvas.style.zIndex = '10000'; 
        blackHoleCanvas.style.display = 'none';
		blackHoleCanvas.width = window.innerWidth;
		blackHoleCanvas.height = window.innerHeight;
        blackHoleCtx = blackHoleCanvas.getContext('2d'); 
        if (!blackHoleCtx) { 
            console.error("Black Hole Canvas context not supported!"); 
            blackHoleCanvas = null; 
        } 
    } 

    function drawBlackHoleFrame() { 
        if (!blackHoleAnimation.isActive || !blackHoleCanvas || !blackHoleCtx) return; 
        const currentTime = Date.now(); 
        const elapsedTime = currentTime - blackHoleAnimation.startTime; 

        if (elapsedTime < blackHoleAnimation.duration) { 
            const progress = elapsedTime / blackHoleAnimation.duration; 
            blackHoleAnimation.currentDiameter = blackHoleAnimation.startDiameter + 
                                                (blackHoleAnimation.endDiameter - blackHoleAnimation.startDiameter) * progress; 
            blackHoleCtx.clearRect(0, 0, blackHoleCanvas.width, blackHoleCanvas.height); 
            blackHoleCtx.fillStyle = 'black'; 
            blackHoleCtx.beginPath(); 
            blackHoleCtx.arc(blackHoleAnimation.centerX, blackHoleAnimation.centerY, blackHoleAnimation.currentDiameter / 2, 0, Math.PI * 2); 
            blackHoleCtx.fill(); 
            requestAnimationFrame(drawBlackHoleFrame); 
        } else { 
            blackHoleCtx.fillStyle = 'black'; 
            blackHoleCtx.fillRect(0, 0, blackHoleCanvas.width, blackHoleCanvas.height); 
            blackHoleAnimation.isActive = false; 
            if (typeof active_VonsBuffet !== 'undefined') active_VonsBuffet = false; 
            console.log("active_VonsBuffet is now false. VonsBuffet black hole complete. Transitioning to Star scene."); 

            if (flashIntervalId) { clearInterval(flashIntervalId); flashIntervalId = null; } 
            if (logo) logo.style.opacity = '0'; 
            if(aboveLogoTextDiv) aboveLogoTextDiv.style.opacity = '0'; 
            if(belowLogoTextDiv1) belowLogoTextDiv1.style.opacity = '0'; 

            if (arrowVbcGroup) arrowVbcGroup.style.opacity = '0'; 
            if (arrowVpsGroup) arrowVpsGroup.style.opacity = '0'; 
            if (arrowVbcToLogoGroup) arrowVbcToLogoGroup.style.opacity = '0';
            if (arrowVpsToLogoGroup) arrowVpsToLogoGroup.style.opacity = '0';

            if (blackHoleCanvas) blackHoleCanvas.style.display = 'none'; 
            if (cpac_Context && cpac) cpac_Context.clearRect(0, 0, cpac.width, cpac.height); 

            if (typeof Star === 'function') Star(); 
            else console.error("Star function is not defined."); 
        } 
    } 

    if (logo) { 
        logo.addEventListener('click', () => { 
            if ((typeof active_VonsBuffet !== 'undefined' && !active_VonsBuffet) || blackHoleAnimation.isActive || !blackHoleCanvas) return; 
            console.log("VBLogo clicked - initiating black hole sequence."); 
            isFlashingWhite = false; 
            if (flashIntervalId) { clearInterval(flashIntervalId); flashIntervalId = null; } 
            if(cpac_Context && cpac) { 
                cpac_Context.fillStyle = 'black'; 
                cpac_Context.fillRect(0, 0, cpac.width, cpac.height); 
            }
			
			if (blackHoleCanvas) {
				blackHoleCanvas.width = window.innerWidth;
				blackHoleCanvas.height = window.innerHeight;
			}

            const logoCenter = actualGetLogoScreenCenter(); 
            blackHoleAnimation.centerX = logoCenter.x; 
            blackHoleAnimation.centerY = logoCenter.y; 
            blackHoleAnimation.startDiameter = 1; 
            blackHoleAnimation.endDiameter = 5 * Math.max(window.innerWidth, window.innerHeight); 
            blackHoleAnimation.currentDiameter = blackHoleAnimation.startDiameter; 
            blackHoleAnimation.startTime = Date.now(); 
            blackHoleAnimation.isActive = true; 
            if (blackHoleCanvas) blackHoleCanvas.style.display = 'block'; 
            requestAnimationFrame(drawBlackHoleFrame); 
        }); 
    } 

    function animate() { 
        if (typeof active_VonsBuffet !== 'undefined' && active_VonsBuffet) { 
            drawBackground(); 
            const textColor = isFlashingWhite ? 'black' : 'white'; 

            [aboveLogoTextDiv, belowLogoTextDiv1].forEach(panel => { 
                if (panel) { 
                    const serviceContentWrapper = panel.querySelector('.service-content-wrapper'); 
                    if (serviceContentWrapper) { 
                        panel.querySelectorAll('.service-title-text, .service-punchline, .vons-buffet-action-button, .learn-more-button').forEach(el => el.style.color = textColor); 

                        const slideshow = panel.querySelector('.slideshow-container'); 
                        if (slideshow && slideshow.style.display !== 'none') { 
                            const slideContentDisp = slideshow.querySelector('.slide-content-display'); 
                            if (slideContentDisp) slideContentDisp.style.color = textColor; 

                            slideshow.querySelectorAll('.slide-nav-arrow .arrow-shape.horizontal.left').forEach(arr => arr.style.borderRightColor = textColor); 
                            slideshow.querySelectorAll('.slide-nav-arrow .arrow-shape.horizontal.right').forEach(arr => arr.style.borderLeftColor = textColor); 
                            slideshow.querySelectorAll('.slide-dot').forEach(dot => { 
                                dot.style.backgroundColor = isFlashingWhite ? 
                                    (dot.classList.contains('active') ? '#aaa' : '#333') : 
                                    (dot.classList.contains('active') ? '#bbb' : '#555'); 
                            }); 
                        } 
                    } 
                } 
            }); 

            if (arrowVbcIcon && arrowVbcLabel) { 
                arrowVbcLabel.style.color = textColor; 
                arrowVbcIcon.style.borderBottomColor = textColor; 
            } 
            if (arrowVpsIcon && arrowVpsLabel) { 
                arrowVpsLabel.style.color = textColor; 
                arrowVpsIcon.style.borderTopColor = textColor; 
            } 

            if (arrowVbcToLogoGroup) {
                arrowVbcToLogoGroup.querySelector('.indicator-label').style.color = textColor;
                arrowVbcToLogoGroup.querySelector('.arrow-shape.down').style.borderTopColor = textColor;
            }
            if (arrowVpsToLogoGroup) {
                arrowVpsToLogoGroup.querySelector('.indicator-label').style.color = textColor;
                arrowVpsToLogoGroup.querySelector('.arrow-shape.up').style.borderBottomColor = textColor;
            }

            updateDarkMatter(); 
            updateSimplifiedNoiseEffect(); 
            requestAnimationFrame(animate); 
        } 
    } 

    setupBlackHoleCanvas(); 
    if(!prefersReducedMotion && typeof active_VonsBuffet !== 'undefined' && active_VonsBuffet) { 
        if (flashIntervalId) clearInterval(flashIntervalId); 
        flashIntervalId = setInterval(flashBackground, flashInterval); 
    } else if (flashIntervalId) { 
        clearInterval(flashIntervalId); flashIntervalId = null; 
    } 
    animate(); 

    const internalResizeHandler = () => { 
        if (typeof active_VonsBuffet !== 'undefined' && active_VonsBuffet) { 
            positionElementsForScrolling();
			
			if (blackHoleCanvas) {
				blackHoleCanvas.width = window.innerWidth;
				blackHoleCanvas.height = window.innerHeight;
			}

            document.querySelectorAll('.slideshow-container').forEach(sc => { 
                if (sc.style.display !== 'none' && sc.style.position === 'absolute') { 
                    const sdc = sc.querySelector('.slide-content-display'); 
                    if (sdc) { 
                        const scTop = sc.getBoundingClientRect().top; 
                        const vpHeight = window.innerHeight; 

                        const scComputedStyle = window.getComputedStyle(sc); 
                        const scPaddingBottom = parseFloat(scComputedStyle.paddingBottom) || 35; 

                        const sdcComputedStyle = window.getComputedStyle(sdc); 
                        const sdcMinHeight = parseFloat(sdcComputedStyle.minHeight) || 60;
                        const sdcCssMaxHeight = parseFloat(sdcComputedStyle.maxHeight) || 300; 

                        const bottomPageMargin = 20; 

                        let heightBudgetForSCD = vpHeight - scTop - scPaddingBottom - bottomPageMargin; 
                        heightBudgetForSCD = Math.max(sdcMinHeight, heightBudgetForSCD); 

                        const newResizedMaxHeight = Math.min(sdcCssMaxHeight, heightBudgetForSCD); 
                        sdc.style.maxHeight = `${newResizedMaxHeight}px`;
                    } 
                } 
            }); 
        } 
    }; 
    window.removeEventListener('resize', internalResizeHandler); 
    window.addEventListener('resize', internalResizeHandler); 

    window.handleVonsBuffetLayout = () => { 
        if (typeof active_VonsBuffet !== 'undefined' && active_VonsBuffet) { 
            positionElementsForScrolling(); 
        } else if (typeof active_VonsBuffet === 'undefined') { 
            console.warn("handleVonsBuffetLayout called but active_VonsBuffet is not defined."); 
        } 
    }; 
}

