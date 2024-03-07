let ynLimit;
let ynBV;
let bZone;
let vZone;

const BynBioCyn = 0;
const BynBioBPoint = 1;
const BynBioVPoint = 2;
const BynBioMinX = 3;
const BynBioMaxX = 4;
const BynBioMinY = 5;
const BynBioMaxY = 6;
const BynBioYnBV = 7;
const BynBioYnLimit = 8;
const BynBioCtep = 9;

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
    
    ynBV = window.screen.height * 0.08;
    bZone = 0.1;
    vZone = 0.9; 

    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 0 ] Youtube
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 1 ] Shop
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 2 ] RulesForFun
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 3 ] Patreon
    bync.push([-1, -1, -1, 0, 0, 0, 0, 0, 0]); // [ 4 ] Sauce
    bynPoint = 2;

    byn0Box.style.border = "1px solid transparent";
    byn1Box.style.border = "1px solid transparent";
    byn2Box.style.border = "1px solid transparent";
    byn3Box.style.border = "1px solid transparent";
    byn4Box.style.border = "1px solid transparent";

    byn2Box.style.border = "1px solid grey";
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
        // Be
        let byn = bync[bynPoint];

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
        while (ynVB >= byn[BynBioYnBV]){

            topYnXP += deltaXP * (byn[BynBioYnBV] / deltaVB);
            topYnXN += deltaXN * (byn[BynBioYnBV] / deltaVB);
            topYnYP += deltaYP * (byn[BynBioYnBV] / deltaVB);
            topYnYN += deltaYN * (byn[BynBioYnBV] / deltaVB);

            byn.push(topYnXP);
            byn.push(topYnXN);
            byn.push(topYnYP);
            byn.push(topYnYN);
            ynLimit += 1;
            
            xCtep += deltaXP * (byn[BynBioYnBV] / deltaVB) + deltaXN * (byn[BynBioYnBV] / deltaVB);
            if (xCtep > xMax)
                xMax = xCtep;
            if (xCtep < xMin)
                xMin = xCtep;

            yCtep += deltaYP * (byn[BynBioYnBV] / deltaVB) + deltaYN * (byn[BynBioYnBV] / deltaVB);
            if (yCtep > yMax)
                yMax = yCtep;
            if (yCtep < yMin)
                yMin = yCtep;
            

            ynVB -= byn[BynBioYnBV];

        }

    }
    else if (_viB == ViBCe){
        // Ce
        let byn = bync[bynPoint];

        if (byn[BynBioCyn] >= 0){
            cync[byn[BynBioCyn]].cynViB = 0;
        }

        byn.length = BynBioCtep;
        byn[BynBioCyn] =  _cynPoint; // Cyn
        byn[BynBioBPoint] = -1; // BPoint
        byn[BynBioVPoint] = -1; // VPoint
        byn[BynBioMinX] = 0; // MinX
        byn[BynBioMaxX] = 0; // MaxX
        byn[BynBioMinY] = 0; // MinY
        byn[BynBioMaxY] = 0; // MaxY
        byn[BynBioYnBV] = ynBV; // YnBV
        byn[BynBioYnLimit] = 0; // YnLimit

        ynLimit = 0;

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
    }
    else if (_viB == ViBPec){
        // Pec
        let byn = bync[bynPoint];

        byn[BynBioCyn] = -1; // Cyn
        if (ynLimit != 0){
            
            let ynVB = Math.sqrt(topYnXP * topYnXP + topYnXN * topYnXN + topYnYP * topYnYP + topYnYN * topYnYN) + byn[BynBioYnBV];
            byn[BynBioBPoint] = ynVB * bZone; // BPoint
            byn[BynBioVPoint] = ynVB * vZone; // VPoint
            byn[BynBioMinX] = xMin - byn[BynBioYnBV]; // MinX
            byn[BynBioMaxX] = xMax + byn[BynBioYnBV]; // MaxX
            byn[BynBioMinY] = yMin - byn[BynBioYnBV]; // MinY
            byn[BynBioMaxY] = yMax + byn[BynBioYnBV]; // MaxY
            byn[BynBioYnLimit] = ynLimit; // YnLimit

        }

    }
}

function BynVee(_cynPoint, _viB){
    let cyn = cync[_cynPoint];
    if (_viB == 0){
        // Vee
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
                if (deltaVBSqr <= byn[BynBioYnBV] * byn[BynBioYnBV]){
                    break;
                }

                ynPointCtep += 4;
            }

            if (ynPointCtep < ynPointLimit){
                if (cyn.cynYnVB <= byn[BynBioBPoint]){
                    byn[BynBioCyn] =  _cynPoint;
                }
                if (cyn.cynYnVB >= byn[BynBioVPoint] && byn[BynBioCyn] == _cynPoint){
                    if ('vibrate' in navigator) {
                        navigator.vibrate(5);
                    }
                    if (bynCtep == 0){
                        // Youtube
                        window.open("https://youtube.com/@VonsBuffet", "_blank");
                    }
                    else if (bynCtep == 1){
                        // Shop
                        alert("What if you could make money with this?");
                    }
                    else if (bynCtep == 2){
                        // Sauce
                        window.open("https://github.com/vonsbuffet?tab=repositories", "_blank");
                    }
                    else if (bynCtep == 3){
                        // Website
                        alert("New website dropping by end of the month. Vay Vuned!");
                    }
                    else if (bynCtep == 4){
                        // RulesForFun
                        alert("Yeo!! You got skills!\n Maybe we should build a game?");
                    }
                    CynPec(_cynPoint, -1, -1);
                    byn[BynBioCyn] = -1;
                }
            }

            bynCtep += 1;
        }
    }
    else if (_viB == ViBCe){
        // Ce
        let bynCtep = 0;
        while (bynCtep < bync.length){
            
            let byn = bync[bynCtep];
            byn[BynBioCyn] = _cynPoint;

            bynCtep += 1;
        }
    }
    else if (_viB == ViBPec){
        // Pec
        let bynCtep = 0;
        while (bynCtep < bync.length){

            let byn = bync[bynCtep];
            if (byn[BynBioCyn] == _cynPoint){
                byn[BynBioCyn] = -1;
    
            }

            bynCtep += 1;
        }
    }
}

function BynYnBV(_cynPoint, _viB){

    let cyn = cync[_cynPoint];

    if (_viB == 0){

        let newHeight = ynBVBoxCpac.bottom - cyn.cynY;
        if (newHeight > ynBVBoxCpac.height)
            newHeight = ynBVBoxCpac.height;
        if (newHeight < 10)
            newHeight = 10;

        ynBVBoxCtep.style.height = newHeight + "px";
        ynBV = 10 + newHeight;

    }
    else if (_viB == ViBCe){

        let newHeight = ynBVBoxCpac.bottom - cyn.cynY;
        if (newHeight > ynBVBoxCpac.height)
            newHeight = ynBVBoxCpac.height;
        if (newHeight < 10)
            newHeight = 10;

        ynBVBoxCtep.style.height = newHeight + "px";
        ynBV = newHeight;

    }
}

function BynBZone(_cynPoint, _viB){

    let cyn = cync[_cynPoint];

    if (_viB == 0){

        let newHeight = zoneBoxCpac.bottom - cyn.cynY;
        if (newHeight > zoneBoxCpac.height - zoneBoxVHeight)
            newHeight = zoneBoxCpac.height - zoneBoxVHeight;

        zoneBoxBCtep.style.height = newHeight + "px";
        bZone = newHeight / zoneBoxCpac.height;
        zoneBoxBHeight = newHeight;

    }
    else if (_viB == ViBCe){

        let newHeight = zoneBoxCpac.bottom - cyn.cynY;
        if (newHeight > zoneBoxCpac.height - zoneBoxVHeight)
            newHeight = zoneBoxCpac.height - zoneBoxVHeight;

        zoneBoxBCtep.style.height = newHeight + "px";
        bZone = newHeight / zoneBoxCpac.height;
        zoneBoxBHeight = newHeight;

    }
}

function BynVZone(_cynPoint, _viB){

    let cyn = cync[_cynPoint];

    if (_viB == 0){

        let newHeight = cyn.cynY - zoneBoxCpac.top;
        if (newHeight > zoneBoxCpac.height - zoneBoxBHeight)
            newHeight = zoneBoxCpac.height - zoneBoxBHeight;

        zoneBoxVCtep.style.height = newHeight + "px";
        vZone = newHeight / zoneBoxCpac.height;
        zoneBoxVHeight = newHeight;

    }
    else if (_viB == ViBCe){

        let newHeight = cyn.cynY - zoneBoxCpac.top;
        if (newHeight > zoneBoxCpac.height - zoneBoxBHeight)
            newHeight = zoneBoxCpac.height - zoneBoxBHeight;

        zoneBoxVCtep.style.height = newHeight + "px";
        vZone = newHeight / zoneBoxCpac.height;
        zoneBoxVHeight = newHeight;
    }
}
