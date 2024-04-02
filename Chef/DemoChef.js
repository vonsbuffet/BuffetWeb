let chefViB = ViBBe;
let chef_Width;
let chef_Height;
let chef_Canvas;
function DemoChefCe(){
    
	const width = window.innerWidth;
	const height = window.innerHeight;
	
	// VBC
	
	let v = element_VBC_V.children[0];
    v.style.fontSize = `${Math.round(0.0909 * width)}px`;

    let b = element_VBC_B.children[0];
    b.style.fontSize = `${Math.round(0.0909 * width)}px`;
	
    let c = element_VBC_C.children[0];
    c.style.fontSize = `${Math.round(0.0909 * width)}px`;
	
	if (width > height){ // PC
	
		//region Banner
	
		element_Banner.style.height = `${40}px`;
		element_Banner_Label.style.fontSize = `${20}px`;
	
		//endregion
		//region Infoo

		if (chefViB == ViBCe){
		
			let size = width / 7;
			let ctep = size / 9;
			let pointX = 2 * ctep;
			
			element_Infoo_VonsBuffet.style.width = `${Math.round(size)}px`;
			element_Infoo_VonsBuffet.style.height = `${Math.round(size)}px`;
			element_Infoo_VonsBuffet.style.top = `${0.5 * height - size}px`;
			element_Infoo_VonsBuffet.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_Rule30.style.width = `${Math.round(size)}px`;
			element_Infoo_Rule30.style.height = `${Math.round(size)}px`;
			element_Infoo_Rule30.style.top = `${0.5 * height - size}px`;
			element_Infoo_Rule30.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_VBCc.style.width = `${Math.round(size)}px`;
			element_Infoo_VBCc.style.height = `${Math.round(size)}px`;
			element_Infoo_VBCc.style.top = `${0.5 * height - size}px`;
			element_Infoo_VBCc.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_QuantumGravity.style.width = `${Math.round(size)}px`;
			element_Infoo_QuantumGravity.style.height = `${Math.round(size)}px`;
			element_Infoo_QuantumGravity.style.top = `${0.5 * height - size}px`;
			element_Infoo_QuantumGravity.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_MysteryBox.style.width = `${Math.round(size)}px`;
			element_Infoo_MysteryBox.style.height = `${Math.round(size)}px`;
			element_Infoo_MysteryBox.style.top = `${0.5 * height - size}px`;
			element_Infoo_MysteryBox.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;	

			element_Infoo_BBrain.style.width = `${Math.round(size)}px`;
			element_Infoo_BBrain.style.height = `${Math.round(size)}px`;
			element_Infoo_BBrain.style.top = `${0.5 * height - size}px`;
			element_Infoo_BBrain.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;		
		
		} else {
		
			element_Infoo_VonsBuffet.style.top = `${100}vh`;
			
			element_Infoo_Rule30.style.top = `${100}vh`;
			
			element_Infoo_VBCc.style.top = `${100}vh`;
			
			element_Infoo_QuantumGravity.style.top = `${100}vh`;
			
			element_Infoo_MysteryBox.style.top = `${100}vh`;

			element_Infoo_BBrain.style.top = `${100}vh`;
		
		}
		//endregion
		//region Byn
		
		if (chefViB == ViBBe || chefViB == ViBVee){
		
			let size = width / 7;
			let ctep = size / 9;
			let pointX = 2 * ctep;
			
			element_Byn_Youtube.width = Math.round(0.0909 * width);
			element_Byn_Youtube.height = Math.round(0.0909 * width);				
			element_Byn_Youtube.style.top = `${Math.round(0.5 * height - 0.0909 * width)}px`;
			element_Byn_Youtube.style.left = `${2 * 9.09}vw`;
			element_Byn_Youtube.style.transform = `translate(0, -50%)`;

			element_Byn_VB.width = Math.round(0.0909 * width);
			element_Byn_VB.height = Math.round(0.0909 * width);	
			element_Byn_VB.style.top = `${Math.round(0.5 * height - 0.0909 * width)}px`;
			element_Byn_VB.style.left = `${4 * 9.09}vw`;
			element_Byn_VB.style.transform = "translate(0, -50%)";

			element_Byn_Sauce.width = Math.round(0.0909 * width);
			element_Byn_Sauce.height = Math.round(0.0909 * width);	
			element_Byn_Sauce.style.top = `${Math.round(0.5 * height - 0.0909 * width)}px`;
			element_Byn_Sauce.style.left = `${6 * 9.09}vw`;
			element_Byn_Sauce.style.transform = "translate(0, -50%)";

			element_Byn_X.width = Math.round(0.0909 * width);
			element_Byn_X.height = Math.round(0.0909 * width);	
			element_Byn_X.style.top = `${Math.round(0.5 * height - 0.0909 * width)}px`;
			element_Byn_X.style.left = `${8 * 9.09}vw`;
			element_Byn_X.style.transform = "translate(0, -50%)";

		} else {
		
			element_Byn_Youtube.style.top = `${height + 2000}px`;

			element_Byn_VB.style.top = `${height + 2000}px`;

			element_Byn_Sauce.style.top = `${height + 2000}px`;

			element_Byn_X.style.top = `${height + 2000}px`;
				
		}
		
		//endregion		
	
	} else if (height >= width){ // Mobile
		
		//region Banner
		
		element_Banner.style.height = `${8}vw`;
		element_Banner_Label.style.fontSize = `${3}vw`;
		
		//endregion		
		//region Infoo
		
		if (chefViB == ViBCe){
		
			let size = width / 4;
			let ctep = size / 6;
			let pointX = 2 * size / 6;
			let pointY = height / 2 - size - ctep / 2;
			
			element_Infoo_VonsBuffet.style.width = `${Math.round(size)}px`;
			element_Infoo_VonsBuffet.style.height = `${Math.round(size)}px`;
			element_Infoo_VonsBuffet.style.top = `${Math.round(pointY)}px`;
			element_Infoo_VonsBuffet.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_Rule30.style.width = `${Math.round(size)}px`;
			element_Infoo_Rule30.style.height = `${Math.round(size)}px`;
			element_Infoo_Rule30.style.top = `${Math.round(pointY)}px`;
			element_Infoo_Rule30.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;

			element_Infoo_VBCc.style.width = `${Math.round(size)}px`;
			element_Infoo_VBCc.style.height = `${Math.round(size)}px`;
			element_Infoo_VBCc.style.top = `${Math.round(pointY)}px`;
			element_Infoo_VBCc.style.left = `${Math.round(pointX)}px`;
			pointX = 2 * size / 6;
			pointY += size + ctep;
			
			element_Infoo_QuantumGravity.style.width = `${Math.round(size)}px`;
			element_Infoo_QuantumGravity.style.height = `${Math.round(size)}px`;
			element_Infoo_QuantumGravity.style.top = `${Math.round(pointY)}px`;
			element_Infoo_QuantumGravity.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_MysteryBox.style.width = `${Math.round(size)}px`;
			element_Infoo_MysteryBox.style.height = `${Math.round(size)}px`;
			element_Infoo_MysteryBox.style.top = `${Math.round(pointY)}px`;
			element_Infoo_MysteryBox.style.left = `${Math.round(pointX)}px`;
			pointX += size + ctep;
			
			element_Infoo_BBrain.style.width = `${Math.round(size)}px`;
			element_Infoo_BBrain.style.height = `${Math.round(size)}px`;
			element_Infoo_BBrain.style.top = `${Math.round(pointY)}px`;
			element_Infoo_BBrain.style.left = `${Math.round(pointX)}px`;
		
		} else {
		
			element_Infoo_VonsBuffet.style.top = `${100}vh`;
			
			element_Infoo_Rule30.style.top = `${100}vh`;
			
			element_Infoo_VBCc.style.top = `${100}vh`;
			
			element_Infoo_QuantumGravity.style.top = `${100}vh`;
			
			element_Infoo_MysteryBox.style.top = `${100}vh`;

			element_Infoo_BBrain.style.top = `${100}vh`;
		
		}
				
		//endregion
		//region Byn
			
		if (chefViB == ViBBe || chefViB == ViBVee){
		
			let size = width / 4;
			let ctep = size / 6;
			let pointX = 2 * size / 6;
			let pointY = height / 2 - 0.0909 * width;
		
			element_Byn_Youtube.width = Math.round(0.0909 * width);
			element_Byn_Youtube.height = Math.round(0.0909 * width);			
			element_Byn_Youtube.style.top = `${Math.round(pointY)}px`;
			element_Byn_Youtube.style.left = `${2 * 9.09}vw`;
			element_Byn_Youtube.style.transform = `translate(0, -50%)`;

			element_Byn_VB.width = Math.round(0.0909 * width);
			element_Byn_VB.height = Math.round(0.0909 * width);
			element_Byn_VB.style.top = `${Math.round(pointY)}px`;
			element_Byn_VB.style.left = `${4 * 9.09}vw`;
			element_Byn_VB.style.transform = "translate(0, -50%)";

			element_Byn_Sauce.width = Math.round(0.0909 * width);
			element_Byn_Sauce.height = Math.round(0.0909 * width);
			element_Byn_Sauce.style.top = `${Math.round(pointY)}px`;
			element_Byn_Sauce.style.left = `${6 * 9.09}vw`;
			element_Byn_Sauce.style.transform = "translate(0, -50%)";

			element_Byn_X.width = Math.round(0.0909 * width);
			element_Byn_X.height = Math.round(0.0909 * width);
			element_Byn_X.style.top = `${Math.round(pointY)}px`;
			element_Byn_X.style.left = `${8 * 9.09}vw`;
			element_Byn_X.style.transform = "translate(0, -50%)";

		} else {
		
			element_Byn_Youtube.style.top = `${height + 2000}px`;

			element_Byn_VB.style.top = `${height + 2000}px`;

			element_Byn_Sauce.style.top = `${height + 2000}px`;

			element_Byn_X.style.top = `${height + 2000}px`;
				
		}
		
		//endregion		
	}
	
	// Rect

	rect_Banner = element_Banner.getBoundingClientRect();
	rect_Banner_Label = element_Banner_Label.getBoundingClientRect();
	rect_VBC_V = element_VBC_V.getBoundingClientRect();
	rect_VBC_B = element_VBC_B.getBoundingClientRect();
	rect_VBC_C = element_VBC_C.getBoundingClientRect();
	rect_Infoo_VonsBuffet = element_Infoo_VonsBuffet.getBoundingClientRect();
	rect_Infoo_Rule30 = element_Infoo_Rule30.getBoundingClientRect();
	rect_Infoo_VBCc = element_Infoo_VBCc.getBoundingClientRect();
	rect_Infoo_QuantumGravity = element_Infoo_QuantumGravity.getBoundingClientRect();
	rect_Infoo_MysteryBox = element_Infoo_MysteryBox.getBoundingClientRect();
	rect_Infoo_BBrain = element_Infoo_BBrain.getBoundingClientRect();
	rect_Byn_Youtube = element_Byn_Youtube.getBoundingClientRect();
	rect_Byn_Sauce = element_Byn_Sauce.getBoundingClientRect();
	rect_Byn_VB = element_Byn_VB.getBoundingClientRect();
	rect_Byn_X = element_Byn_X.getBoundingClientRect();
	
	//region Window
	
	if (chef_Canvas.width != width || chef_Canvas.height != height){
		
		var ctx = chef_Canvas.getContext('2d');

		chef_Canvas.width = window.innerWidth;
		chef_Canvas.height = window.innerHeight;
		
		// Draw circles with random sizes and positions
		for (var i = 0; i < 200; i++) {
			var x = getRandomNumber(0, chef_Canvas.width);
			var y = getRandomNumber(0, chef_Canvas.height);
			var radius = getRandomNumber(1, 4); // Random radius between 5 and 50

			// Generate random color
			var red = Math.floor(Math.random() * 256);
			var green = Math.floor(Math.random() * 256);
			var blue = Math.floor(Math.random() * 256);
			ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';

			// Draw circle
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();
		}			
	
	}
	
	//endregion
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

    CpacCe();

    BynCe();

    ViBerCe();

    DrawCe();
	
	chef_Canvas = document.getElementById('Cpac');
	chef_Canvas.width = 0;
	chef_Canvas.height = 0;
	DemoChefCe();
	
	alert("(Ayyyerr! Relax about the secure connection. This website doesn't collect infoo.)\n\nUse the VBC'c to make things happen!\nPop the Bangar's in the Trap for Extra Sauce...");

}
  