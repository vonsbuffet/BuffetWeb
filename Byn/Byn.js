let ynBV;

const BynBioCyn = 0;
const BynBioVB = 1;
const BynBioMinX = 2;
const BynBioMaxX = 3;
const BynBioMinY = 4;
const BynBioMaxY = 5;
const BynBioYnLimit = 6;
const BynBioCtep = 7;

let bynVB = 0;
let bynPoint = 0;
let bync = [];

let xMin = 0;
let xMax = 0;
let xCtep = 0;
let yMin = 0;
let yMax = 0;
let yCtep = 0;

function BynCe(){
    
	if (window.screen.height < window.screen.width) // Desktop
		ynBV = window.screen.height * 0.03;
	else // Mobile
		ynBV = window.screen.width * 0.0909 * 1.8;

    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 0 ] Youtube
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 1 ] VB
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 2 ] Sauce
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 3 ] X
    bynPoint = 2;

	element_Byn_Youtube.style.border = "1px solid transparent";
	element_Byn_Sauce.style.border = "1px solid transparent";
	element_Byn_VB.style.border = "1px solid transparent";
	element_Byn_X.style.border = "1px solid transparent";

	element_Byn_Sauce.style.border = "1px solid grey";
}

let ceYnXP;
let ceYnXN;
let ceYnYP;
let ceYnYN;

let topYnXP;
let topYnXN;
let topYnYP;
let topYnYN;

function BynBe(_cynPoint, _viB){
    let cyn = cync[_cynPoint];
    if (_viB == 0){
        //region Be
		
        let byn = bync[bynPoint];
		if (byn[BynBioCyn] != _cynPoint)
			return;

        ceYnXP += cyn.cynNormXP * cyn.cynNormVB;
        ceYnXN += cyn.cynNormXN * cyn.cynNormVB;
        ceYnYP += cyn.cynNormYP * cyn.cynNormVB;
        ceYnYN += cyn.cynNormYN * cyn.cynNormVB;

        let deltaXP = ceYnXP - topYnXP;
        let deltaXN = ceYnXN - topYnXN;
        let deltaYP = ceYnYP - topYnYP;
        let deltaYN = ceYnYN - topYnYN;
        let deltaVB = Math.sqrt(deltaXP * deltaXP + deltaXN * deltaXN + deltaYP * deltaYP + deltaYN * deltaYN);
        let ynVB = deltaVB; 
        while (ynVB >= ynBV){

            topYnXP += deltaXP * (ynBV / deltaVB);
            topYnXN += deltaXN * (ynBV / deltaVB);
            topYnYP += deltaYP * (ynBV / deltaVB);
            topYnYN += deltaYN * (ynBV / deltaVB);

            byn.push(topYnXP);
            byn.push(topYnXN);
            byn.push(topYnYP);
            byn.push(topYnYN);
            
            xCtep += deltaXP * (ynBV / deltaVB) + deltaXN * (ynBV / deltaVB);
            if (xCtep > xMax)
                xMax = xCtep;
            if (xCtep < xMin)
                xMin = xCtep;

            yCtep += deltaYP * (ynBV / deltaVB) + deltaYN * (ynBV / deltaVB);
            if (yCtep > yMax)
                yMax = yCtep;
            if (yCtep < yMin)
                yMin = yCtep;
				
			byn[BynBioVB] = Math.sqrt(topYnXP * topYnXP + topYnXN * topYnXN + topYnYP * topYnYP + topYnYN * topYnYN) + ynBV;				
            byn[BynBioMinX] = xMin - ynBV;
            byn[BynBioMaxX] = xMax + ynBV;
            byn[BynBioMinY] = yMin - ynBV;
            byn[BynBioMaxY] = yMax + ynBV;
			byn[BynBioYnLimit] += 1;
			
            ynVB -= ynBV;
        }

		//endregion
    }
    else if (_viB == ViBCe){
        //region Ce
		
        let byn = bync[bynPoint];

        byn.length = BynBioCtep;
        byn[BynBioCyn] =  _cynPoint;
        byn[BynBioVB] = 0;
        byn[BynBioMinX] = 0;
        byn[BynBioMaxX] = 0;
        byn[BynBioMinY] = 0;
        byn[BynBioMaxY] = 0;
        byn[BynBioYnLimit] = 0;

        xMax = -Infinity;
        xMin = Infinity;
        xCtep = 0;
        yMax = -Infinity;
        yMin = Infinity;
        yCtep = 0;

        ceYnXP = 0.0;
        ceYnXN = 0.0;
        ceYnYP = 0.0;
        ceYnYN = 0.0;

        topYnXP = 0.0;
        topYnXN = 0.0;
        topYnYP = 0.0;
        topYnYN = 0.0;
		
		//endregion
    }
    else if (_viB == ViBPec){
        //region Pec
		
        let byn = bync[bynPoint];
        byn[BynBioCyn] = -1;

		//endregion
    }
}

function BynVee(_cynPoint, _viB){
    let cyn = cync[_cynPoint];
    if (_viB == 0){
        //region Vee
		
        let bynCtep = 0;
        while (bynCtep < bync.length){

            let byn = bync[bynCtep];

            let ynPoint = BynBioCtep;
            let ynPointLimit = ynPoint + 4 * byn[BynBioYnLimit];
            let ynPointCtep = ynPoint;
            while (ynPointCtep < ynPointLimit){
                let ynXP = byn[ynPointCtep + 0];
                let ynXN = byn[ynPointCtep + 1];
                let ynYP = byn[ynPointCtep + 2];
                let ynYN = byn[ynPointCtep + 3];

                let deltaXP = ynXP - cyn.cynYnXP;
                let deltaXN = ynXN - cyn.cynYnXN;
                let deltaYP = ynYP - cyn.cynYnYP;
                let deltaYN = ynYN - cyn.cynYnYN;

                let deltaVBSqr =  (deltaXP * deltaXP) + (deltaXN * deltaXN) + (deltaYP * deltaYP) + (deltaYN * deltaYN);
                if (deltaVBSqr <= ynBV * ynBV){
                    break;
                }

                ynPointCtep += 4;
            }

            if (ynPointCtep < ynPointLimit){
                
				if (ynPointCtep == ynPoint)
                    byn[BynBioCyn] = _cynPoint;
				
                if (ynPointCtep == ynPointLimit - 4 && byn[BynBioCyn] == _cynPoint){
                    if ('vibrate' in navigator) {
                        navigator.vibrate(5);
                    }
                    if (bynCtep == 0){
                        // Youtube
                        window.open("https://youtube.com/@VonsBuffet", "_blank");
                    }
                    else if (bynCtep == 1){
                        // Sauce
                        window.open("https://github.com/vonsbuffet?tab=repositories", "_blank");
                    }
                    else if (bynCtep == 2){
                        // X
                        window.open("https://x.com/VonsBuffet", "_blank");
                    }
                    else if (bynCtep == 3){
                        // VB
                        alert("Yeo!! You got skills!\n");
                    }
                    CynPec(_cynPoint, -1, -1);
                    byn[BynBioCyn] = -1;
                }
            }

            bynCtep += 1;
        }
		
		//endregion
    }
    else if (_viB == ViBPec){
        //region Pec
		
        let bynCtep = 0;
        while (bynCtep < bync.length){

            let byn = bync[bynCtep];
            if (byn[BynBioCyn] == _cynPoint)
                byn[BynBioCyn] = -1;

            bynCtep += 1;
        }
		
		//endregion
    }
}