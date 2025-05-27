let active_VonsBuffet = true;
window.addEventListener("resize", DemoChefCe); // Assuming DemoChefCe is your main resize handler in Chef

// Modify DemoChefCe or add another listener:
function DemoChefCe(){ // Or whatever your main resize handler in Chef.js is
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Your existing Chef.js resize logic...
    // e.g., resizing cpac, cpac2 if needed specifically by Chef's independent logic

    // Now, also call the VonsBuffet layout function
    if (typeof window.handleVonsBuffetLayout === 'function' && active_VonsBuffet) { // Check if VonsBuffet is active
        window.handleVonsBuffetLayout();
    }
}

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

window.onload = function start(){

    window.addEventListener("pointerdown", PointerCe);
    window.addEventListener("pointermove", PointerMove);
    window.addEventListener("pointerup", PointerPec);
    window.addEventListener("pointercancel", PointerPec);
	window.addEventListener("resize", DemoChefCe);

    cpac2 = document.getElementById('Cpac2');
    cpac2.width = window.innerWidth;
    cpac2.height = window.innerHeight;
    cpac2_Context = cpac2.getContext('2d');
    if (!cpac2_Context) {
        alert("Background Canvas context not supported!");
        return;
    }

	cpac = document.getElementById('Cpac');
    cpac.width = window.innerWidth;
    cpac.height = window.innerHeight;
    cpac_Context = cpac.getContext('2d');
    if (!cpac_Context) {
        alert("Canvas context not supported!");
        return;
    }
	
	VonsBuffet();

    window.addEventListener('resize', function() {
        cpac.width = window.innerWidth;
        cpac.height = window.innerHeight;
    });
}