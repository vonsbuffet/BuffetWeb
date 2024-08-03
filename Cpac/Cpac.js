let element_Banner;
let element_Banner_Label;
let element_VBC_V;
let element_VBC_B;
let element_VBC_C;
let element_Infoo_VonsBuffet;
let element_Infoo_Rule30;
let element_Infoo_VBCc;
let element_Infoo_QuantumGravity;
let element_Infoo_BBrain;
let element_Infoo_MysteryBox;
let element_Byn_Youtube;
let element_Byn_Sauce;
let element_Byn_VB;
let element_Byn_X;
let element_PDF;

let rect_Banner;
let rect_Banner_Label;
let rect_VBC_V;
let rect_VBC_B;
let rect_VBC_C;
let rect_Infoo_VonsBuffet;
let rect_Infoo_Rule30;
let rect_Infoo_VBCc;
let rect_Infoo_QuantumGravity;
let rect_Infoo_BBrain;
let rect_Infoo_MysterBox;
let rect_Byn_VB;
let rect_Byn_Sauce;
let rect_Byn_Youtube;
let rect_Byn_X;

let context2D_Byn_VB;
let context2D_Byn_Sauce;
let context2D_Byn_Youtube;
let context2D_Byn_X;

let byn_Context2Dc = [];
let byn_Elementc = [];

function CpacCe(){
	
	// Element
	
	element_Banner = document.getElementById("banner");
	element_Banner_Label = document.getElementById("banner_Label");
	element_VBC_V = document.getElementById("vbc_V");
	element_VBC_B = document.getElementById("vbc_B");
	element_VBC_C = document.getElementById("vbc_C");
	element_Infoo_VonsBuffet = document.getElementById("infoo_VonsBuffet");
	element_Infoo_Rule30 = document.getElementById("infoo_Rule30");
	element_Infoo_VBCc = document.getElementById("infoo_VBCc");
	element_Infoo_QuantumGravity = document.getElementById("infoo_QuantumGravity");
	element_Infoo_MysteryBox = document.getElementById("infoo_MysteryBox");
	element_Infoo_BBrain = document.getElementById("infoo_BBrain");
	element_Byn_Youtube = document.getElementById("byn_Youtube");
	element_Byn_Sauce = document.getElementById("byn_Sauce");
	element_Byn_VB = document.getElementById("byn_VB");
	element_Byn_X = document.getElementById("byn_X");
	element_PDF = document.getElementById("pdf");
    
	byn_Elementc.length = 4;
    byn_Elementc[0] = element_Byn_Youtube;
    byn_Elementc[1] = element_Byn_VB;
    byn_Elementc[2] = element_Byn_Sauce;
    byn_Elementc[3] = element_Byn_X;
	
	// Context2D
	
	context2D_Byn_Youtube = element_Byn_Youtube.getContext('2d');
	context2D_Byn_VB = element_Byn_VB.getContext('2d');
	context2D_Byn_Sauce = element_Byn_Sauce.getContext('2d');
	context2D_Byn_X = element_Byn_X.getContext('2d');
	
    byn_Context2Dc.length = 4;
    byn_Context2Dc[0] = context2D_Byn_Youtube;
    byn_Context2Dc[1] = context2D_Byn_VB;
    byn_Context2Dc[2] = context2D_Byn_Sauce;
    byn_Context2Dc[3] = context2D_Byn_X;
}

function Cpac(_cynPoint, _x, _y){

    if (_x >= rect_VBC_V.left && _x <= rect_VBC_V.right && _y >= rect_VBC_V.top && _y <= rect_VBC_V.bottom){ // VBC | V

        viB = ViBVee;

        element_VBC_V.style.color = "rgb(125,125,125)";
        element_VBC_B.style.color = "rgb(50,50,50)";
        element_VBC_C.style.color = "rgb(50,50,50)";

        if (bynPoint == 0)
            element_Byn_Youtube.style.border = "1px solid transparent";
        else if (bynPoint == 1)
            element_Byn_VB.style.border = "1px solid transparent";
        else if (bynPoint == 2)
            element_Byn_Sauce.style.border = "1px solid transparent";
        else if (bynPoint == 3)
            element_Byn_X.style.border = "1px solid transparent";

		let bynCtep = 0;
		while (bynCtep < bync.length){
			
			let byn = bync[bynCtep];				
			byn[BynBioCyn] = -1;
			
			bynCtep += 1;
		}

		chefViB = ViBVee;
		DemoChefCe();
    }
    else if (_x >= rect_VBC_B.left && _x <= rect_VBC_B.right && _y >= rect_VBC_B.top && _y <= rect_VBC_B.bottom){ // VBC | B

        viB = -ViBBe;

        element_VBC_V.style.color = "rgb(50,50,50)";
        element_VBC_B.style.color = "rgb(125,125,125)";
        element_VBC_C.style.color = "rgb(50,50,50)";

        if (bynPoint == 0)
            element_Byn_Youtube.style.border = "1px solid grey";
        else if (bynPoint == 1)
            element_Byn_VB.style.border = "1px solid grey";
        else if (bynPoint == 2)
            element_Byn_Sauce.style.border = "1px solid grey";
        else if (bynPoint == 3)
            element_Byn_X.style.border = "1px solid grey";

		let bynCtep = 0;
		while (bynCtep < bync.length){
			
			let byn = bync[bynCtep];				
			byn[BynBioCyn] = -1;
			
			bynCtep += 1;
		}
		
		chefViB = ViBBe;
		DemoChefCe();		
    }
    else if (_x >= rect_VBC_C.left && _x <= rect_VBC_C.right && _y >= rect_VBC_C.top && _y <= rect_VBC_C.bottom){ // VBC | C

        if (viB == ViBPec){
			viB = viB2;
			
			element_VBC_C.children[0].textContent = "C";			
			element_VBC_C.style.zIndex = 2;
			
			element_PDF.style.zIndex = -1;
			element_PDF.src = "";
			
		} else {

			viB = ViBCe;
			
		        element_VBC_V.style.color = "rgb(50,50,50)";
			element_VBC_B.style.color = "rgb(50,50,50)";
		        element_VBC_C.style.color = "rgb(125,125,125)";
			
			if (bynPoint == 0)
				element_Byn_Youtube.style.border = "1px solid transparent";
			else if (bynPoint == 1)
				element_Byn_VB.style.border = "1px solid transparent";
			else if (bynPoint == 2)
				element_Byn_Sauce.style.border = "1px solid transparent";
			else if (bynPoint == 3)
				element_Byn_X.style.border = "1px solid transparent";			
			
			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynCtep];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}
			
			chefViB = ViBCe;
			DemoChefCe();
			
		}
    }	
    else if (_x >= rect_Byn_Youtube.left && _x <= rect_Byn_Youtube.right && _y >= rect_Byn_Youtube.top && _y <= rect_Byn_Youtube.bottom){ // Byn | Youtube

        if (viB == ViBBe){
			
			viB = -ViBBe;
    
            element_Byn_VB.style.border = "1px solid transparent";
            element_Byn_Sauce.style.border = "1px solid transparent";
            element_Byn_Youtube.style.border = "1px solid transparent";
            element_Byn_X.style.border = "1px solid transparent";

            element_Byn_Youtube.style.border = "1px solid grey";

			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynCtep];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}
    
            bynPoint = 0;
        }
		else
			alert("Tryna Pop the Trap????\nSorry, you need a key.\n\nLucky you, you are the key!\n\nUse [B] to draw a Byn in Cspac.\nThen [V] and draw it again!\n\nRemember: [B] a Byn, [V] the Byn.");
    
    }    
	else if (_x >= rect_Byn_VB.left && _x <= rect_Byn_VB.right && _y >= rect_Byn_VB.top && _y <= rect_Byn_VB.bottom){ // Byn | VB
        
		if (viB == ViBBe){
    
			viB = -ViBBe;
			
            element_Byn_VB.style.border = "1px solid transparent";
            element_Byn_Sauce.style.border = "1px solid transparent";
            element_Byn_Youtube.style.border = "1px solid transparent";
            element_Byn_X.style.border = "1px solid transparent";

            element_Byn_VB.style.border = "1px solid grey";

			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynCtep];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}
    
            bynPoint = 1;
        }
		else
			alert("Tryna Pop the Trap????\nSorry, you need a key.\n\nLucky you, you are the key!\n\nUse [B] to draw a Byn in Cspac.\nThen [V] and draw it again!\n\nRemember: [B] a Byn, [V] the Byn.");
    
    }
    else if (_x >= rect_Byn_Sauce.left && _x <= rect_Byn_Sauce.right && _y >= rect_Byn_Sauce.top && _y <= rect_Byn_Sauce.bottom){ // Byn | Sauce

        if (viB == ViBBe){
    
			viB = -ViBBe;
			
            element_Byn_VB.style.border = "1px solid transparent";
            element_Byn_Sauce.style.border = "1px solid transparent";
            element_Byn_Youtube.style.border = "1px solid transparent";
            element_Byn_X.style.border = "1px solid transparent";

            element_Byn_Sauce.style.border = "1px solid grey";

			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynCtep];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}
    
            bynPoint = 2;
        }
		else
			alert("Tryna Pop the Trap????\nSorry, you need a key.\n\nLucky you, you are the key!\n\nUse [B] to draw a Byn in Cspac.\nThen [V] and draw it again!\n\nRemember: [B] a Byn, [V] the Byn.");
    
    }
    else if (_x >= rect_Byn_X.left && _x <= rect_Byn_X.right && _y >= rect_Byn_X.top && _y <= rect_Byn_X.bottom){ // Byn | X

        if (viB == ViBBe){
    
			viB = -ViBBe;
			
            element_Byn_VB.style.border = "1px solid transparent";
            element_Byn_Sauce.style.border = "1px solid transparent";
            element_Byn_Youtube.style.border = "1px solid transparent";
            element_Byn_X.style.border = "1px solid transparent";

            element_Byn_X.style.border = "1px solid grey";

			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynCtep];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}
    
            bynPoint = 3;
        }
		else
			alert("Tryna Pop the Trap????\nSorry, you need a key.\n\nLucky you, you are the key!\n\nUse [B] to draw a Byn in Cspac.\nThen [V] and draw it again!\n\nRemember: [B] a Byn, [V] the Byn.");
    
    }
    else if (_x >= rect_Infoo_VonsBuffet.left && _x <= rect_Infoo_VonsBuffet.right && _y >= rect_Infoo_VonsBuffet.top && _y <= rect_Infoo_VonsBuffet.bottom){ // Infoo | VonsBuffet
		
		if (viB == ViBCe){
			
			viB2 = viB;
			viB = ViBPec;
			
			element_VBC_C.children[0].textContent = "P";			
			element_VBC_C.style.zIndex = 5;
			
			element_PDF.style.zIndex = 4;
			element_PDF.src = "VonsBuffet.pdf";
			
			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynPoint];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}			
		}
    
    }
    else if (_x >= rect_Infoo_Rule30.left && _x <= rect_Infoo_Rule30.right && _y >= rect_Infoo_Rule30.top && _y <= rect_Infoo_Rule30.bottom){ // Infoo | Rule30
		
		if (viB == ViBCe){
			
			viB2 = viB;
			viB = ViBPec;
			
			element_VBC_C.children[0].textContent = "P";			
			element_VBC_C.style.zIndex = 5;
			
			element_PDF.style.zIndex = 4;
			element_PDF.src = "Rule30.pdf";
			
			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynPoint];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}			
		}
    }	
    else if (_x >= rect_Infoo_QuantumGravity.left && _x <= rect_Infoo_QuantumGravity.right && _y >= rect_Infoo_QuantumGravity.top && _y <= rect_Infoo_QuantumGravity.bottom){ // Infoo | QuantumGravity
		
		if (viB == ViBCe){
			
			viB2 = viB;
			viB = ViBPec;
			
			element_VBC_C.children[0].textContent = "P";			
			element_VBC_C.style.zIndex = 5;
			
			element_PDF.style.zIndex = 4;
			element_PDF.src = "QuantumGravity.pdf";
			
			let bynCtep = 0;
			while (bynCtep < bync.length){
				
				let byn = bync[bynPoint];				
				byn[BynBioCyn] = -1;
				
				bynCtep += 1;
			}			
		}
    }	
}
