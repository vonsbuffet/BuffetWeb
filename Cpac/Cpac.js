let vBox;
let vBoxCpac;
let bBox;
let bBoxCpac;
let byn0Box;
let byn0BoxCpac;
let byn0Bar;
let byn1Box;
let byn1BoxCpac;
let byn1Bar;
let byn2Box;
let byn2BoxCpac;
let byn2Bar;
let byn3Box;
let byn3BoxCpac;
let byn3Bar;
let byn4Box;
let byn4BoxCpac;
let byn4Bar;
let ynBVBox;
let ynBVBoxCpac;
let ynBVBoxCtep;
let zoneBox;
let zoneBoxCpac;
let zoneBoxBHeight;
let zoneBoxBCtep;
let zoneBoxVHeight;
let zoneBoxVCtep;

let bynBarc = [];
let bynBoxc = [];

function CpacCe(){

    vBox = document.getElementById("vBox");
    vBoxCpac = vBox.getBoundingClientRect();

    bBox = document.getElementById("bBox");
    bBoxCpac = bBox.getBoundingClientRect();

    byn0Box = document.getElementById("byn0Box");
    let style = getComputedStyle(byn0Box);
    byn0Box.width = parseInt(style.width);
    byn0Box.height = parseInt(style.height);
    byn0BoxCpac = byn0Box.getBoundingClientRect();
    byn0Bar = byn0Box.getContext('2d');

    byn1Box = document.getElementById("byn1Box");
    style = getComputedStyle(byn1Box);
    byn1Box.width = Math.round(parseInt(style.width));
    byn1Box.height = Math.round(parseInt(style.height));
    byn1BoxCpac = byn1Box.getBoundingClientRect();
    byn1Bar = byn1Box.getContext('2d');

    byn2Box = document.getElementById("byn2Box");
    style = getComputedStyle(byn2Box);
    byn2Box.width = Math.round(parseInt(style.width));
    byn2Box.height = Math.round(parseInt(style.height));
    byn2BoxCpac = byn2Box.getBoundingClientRect();
    byn2Bar = byn2Box.getContext('2d');

    byn3Box = document.getElementById("byn3Box");
    style = getComputedStyle(byn3Box);
    byn3Box.width = Math.round(parseInt(style.width));
    byn3Box.height = Math.round(parseInt(style.height));
    byn3BoxCpac = byn3Box.getBoundingClientRect();
    byn3Bar = byn3Box.getContext('2d');

    byn4Box = document.getElementById("byn4Box");
    style = getComputedStyle(byn4Box);
    byn4Box.width = Math.round(parseInt(style.width));
    byn4Box.height = Math.round(parseInt(style.height));
    byn4BoxCpac = byn4Box.getBoundingClientRect();
    byn4Bar = byn4Box.getContext('2d');

    ynBVBox = document.getElementById("ynBVBox");
    ynBVBoxCpac = ynBVBox.getBoundingClientRect();
    ynBVBoxCtep = document.getElementById("ynBVBoxCtep");

    zoneBox = document.getElementById("zoneBox");
    zoneBox.style.display = "none";
    zoneBoxCpac = zoneBox.getBoundingClientRect();
    zoneBoxBCtep = document.getElementById("zoneBoxBCtep");
    let zoneBoxBCpac = zoneBoxBCtep.getBoundingClientRect();
    zoneBoxBHeight = zoneBoxBCpac.height;
    zoneBoxVCtep = document.getElementById("zoneBoxVCtep");
    let zoneBoxVCpac = zoneBoxVCtep.getBoundingClientRect();
    zoneBoxVHeight = zoneBoxVCpac.height;

    bynBarc.length = 5;
    bynBarc[0] = byn0Bar;
    bynBarc[1] = byn1Bar;
    bynBarc[2] = byn2Bar;
    bynBarc[3] = byn3Bar;
    bynBarc[4] = byn4Bar;

    bynBoxc.length = 5;
    bynBoxc[0] = byn0Box;
    bynBoxc[1] = byn1Box;
    bynBoxc[2] = byn2Box;
    bynBoxc[3] = byn3Box;
    bynBoxc[4] = byn4Box;
}

function Cpac(_cynPoint, _x, _y){

    if (_x >= vBoxCpac.left && _x <= vBoxCpac.right && _y >= vBoxCpac.top && _y <= vBoxCpac.bottom){
        // V
        viB = ViBVee;

        vBox.style.color = "rgb(75,75,75)";
        bBox.style.color = "rgb(20,20,20)";
        ynBVBox.style.display = "none";
        zoneBox.style.display = "none";
        if (bynPoint == 0)
            byn0Box.style.border = "1px solid transparent";
        else if (bynPoint == 1)
            byn1Box.style.border = "1px solid transparent";
        else if (bynPoint == 2)
            byn2Box.style.border = "1px solid transparent";
        else if (bynPoint == 3)
            byn3Box.style.border = "1px solid transparent";
        else if (bynPoint == 4)
            byn4Box.style.border = "1px solid transparent";

        let cynCtep = 0;
        while (cynCtep < cync.length){

            let cyn = cync[cynCtep];
            if (cyn.cynViB == ViBBe){

                cyn.cynViB = viB;
                BynBe(cynCtep, ViBPec);

            }
            cyn.cynNormVB = 0.0;
            cyn.cynNormXP = 0.0;
            cyn.cynNormXN = 0.0;
            cyn.cynNormYP = 0.0;
            cyn.cynNormYN = 0.0;
            cyn.cynYnVB = 0.0;
            cyn.cynYnXP = 0.0;
            cyn.cynYnXN = 0.0;
            cyn.cynYnYP = 0.0;
            cyn.cynYnYN = 0.0;

            cynCtep += 1;
        }

    }
    else if (_x >= bBoxCpac.left && _x <= bBoxCpac.right && _y >= bBoxCpac.top && _y <= bBoxCpac.bottom){
        // B
        viB = ViBBe;

        vBox.style.color = "rgb(20,20,20)";
        bBox.style.color = "rgb(75,75,75)";
        ynBVBox.style.display = "block";
        zoneBox.style.display = "none";
        if (bynPoint == 0)
            byn0Box.style.border = "1px solid grey";
        else if (bynPoint == 1)
            byn1Box.style.border = "1px solid grey";
        else if (bynPoint == 2)
            byn2Box.style.border = "1px solid grey";
        else if (bynPoint == 3)
            byn3Box.style.border = "1px solid grey";
        else if (bynPoint == 4)
            byn4Box.style.border = "1px solid grey";

        let cynCtep = 0;
        while (cynCtep < cync.length){

            let cyn = cync[cynCtep];
            if (cyn.cynViB == ViBVee){

                cyn.cynViB = viB;
                BynBe(cynCtep, ViBCe);

            }
            cyn.cynNormVB = 0.0;
            cyn.cynNormXP = 0.0;
            cyn.cynNormXN = 0.0;
            cyn.cynNormYP = 0.0;
            cyn.cynNormYN = 0.0;
            cyn.cynYnVB = 0.0;
            cyn.cynYnXP = 0.0;
            cyn.cynYnXN = 0.0;
            cyn.cynYnYP = 0.0;
            cyn.cynYnYN = 0.0;

            cynCtep += 1;
        }

    }
    else if (_x >= byn0BoxCpac.left && _x <= byn0BoxCpac.right && _y >= byn0BoxCpac.top && _y <= byn0BoxCpac.bottom){
        // Byn0
        if (viB == ViBBe){
    
            byn0Box.style.border = "1px solid transparent";
            byn1Box.style.border = "1px solid transparent";
            byn2Box.style.border = "1px solid transparent";
            byn3Box.style.border = "1px solid transparent";
            byn4Box.style.border = "1px solid transparent";

            byn0Box.style.border = "1px solid grey";

            let oldByn = bync[bynPoint];
            let oldBynBioCyn = oldByn[BynBioCyn];
    
            let cynCtep = 0;
            while (cynCtep < cync.length){
    
                let cyn = cync[cynCtep];
                if (cyn.cynViB == ViBBe){
    
                    BynBe(cynCtep, ViBPec);
                }
                cyn.cynNormVB = 0.0;
                cyn.cynNormXP = 0.0;
                cyn.cynNormXN = 0.0;
                cyn.cynNormYP = 0.0;
                cyn.cynNormYN = 0.0;
                cyn.cynYnVB = 0.0;
                cyn.cynYnXP = 0.0;
                cyn.cynYnXN = 0.0;
                cyn.cynYnYP = 0.0;
                cyn.cynYnYN = 0.0;
    
                cynCtep += 1;
            }
    
            bynPoint = 0;
            let newByn = bync[bynPoint];
            newByn[BynBioCyn] = oldBynBioCyn;
    
        }
    
    }
    else if (_x >= byn1BoxCpac.left && _x <= byn1BoxCpac.right && _y >= byn1BoxCpac.top && _y <= byn1BoxCpac.bottom){
        // Byn1
        if (viB == ViBBe){
    
            byn0Box.style.border = "1px solid transparent";
            byn1Box.style.border = "1px solid transparent";
            byn2Box.style.border = "1px solid transparent";
            byn3Box.style.border = "1px solid transparent";
            byn4Box.style.border = "1px solid transparent";

            byn1Box.style.border = "1px solid grey";

            let oldByn = bync[bynPoint];
            let oldBynBioCyn = oldByn[BynBioCyn];
    
            let cynCtep = 0;
            while (cynCtep < cync.length){
    
                let cyn = cync[cynCtep];
                if (cyn.cynViB == ViBBe){
    
                    BynBe(cynCtep, ViBPec);
                }
                cyn.cynNormVB = 0.0;
                cyn.cynNormXP = 0.0;
                cyn.cynNormXN = 0.0;
                cyn.cynNormYP = 0.0;
                cyn.cynNormYN = 0.0;
                cyn.cynYnVB = 0.0;
                cyn.cynYnXP = 0.0;
                cyn.cynYnXN = 0.0;
                cyn.cynYnYP = 0.0;
                cyn.cynYnYN = 0.0;
    
                cynCtep += 1;
            }
    
            bynPoint = 1;
            let newByn = bync[bynPoint];
            newByn[BynBioCyn] = oldBynBioCyn;
    
        }
    
    }
    else if (_x >= byn2BoxCpac.left && _x <= byn2BoxCpac.right && _y >= byn2BoxCpac.top && _y <= byn2BoxCpac.bottom){
        // Byn2
        if (viB == ViBBe){
    
            byn0Box.style.border = "1px solid transparent";
            byn1Box.style.border = "1px solid transparent";
            byn2Box.style.border = "1px solid transparent";
            byn3Box.style.border = "1px solid transparent";
            byn4Box.style.border = "1px solid transparent";

            byn2Box.style.border = "1px solid grey";

            let oldByn = bync[bynPoint];
            let oldBynBioCyn = oldByn[BynBioCyn];
    
            let cynCtep = 0;
            while (cynCtep < cync.length){
    
                let cyn = cync[cynCtep];
                if (cyn.cynViB == ViBBe){
    
                    BynBe(cynCtep, ViBPec);
                }
                cyn.cynNormVB = 0.0;
                cyn.cynNormXP = 0.0;
                cyn.cynNormXN = 0.0;
                cyn.cynNormYP = 0.0;
                cyn.cynNormYN = 0.0;
                cyn.cynYnVB = 0.0;
                cyn.cynYnXP = 0.0;
                cyn.cynYnXN = 0.0;
                cyn.cynYnYP = 0.0;
                cyn.cynYnYN = 0.0;
    
                cynCtep += 1;
            }
    
            bynPoint = 2;
            let newByn = bync[bynPoint];
            newByn[BynBioCyn] = oldBynBioCyn;
    
        }
    
    }
    else if (_x >= byn3BoxCpac.left && _x <= byn3BoxCpac.right && _y >= byn3BoxCpac.top && _y <= byn3BoxCpac.bottom){
        // Byn3
        if (viB == ViBBe){
    
            byn0Box.style.border = "1px solid transparent";
            byn1Box.style.border = "1px solid transparent";
            byn2Box.style.border = "1px solid transparent";
            byn3Box.style.border = "1px solid transparent";
            byn4Box.style.border = "1px solid transparent";

            byn3Box.style.border = "1px solid grey";

            let oldByn = bync[bynPoint];
            let oldBynBioCyn = oldByn[BynBioCyn];
    
            let cynCtep = 0;
            while (cynCtep < cync.length){
    
                let cyn = cync[cynCtep];
                if (cyn.cynViB == ViBBe){
    
                    BynBe(cynCtep, ViBPec);
                }
                cyn.cynNormVB = 0.0;
                cyn.cynNormXP = 0.0;
                cyn.cynNormXN = 0.0;
                cyn.cynNormYP = 0.0;
                cyn.cynNormYN = 0.0;
                cyn.cynYnVB = 0.0;
                cyn.cynYnXP = 0.0;
                cyn.cynYnXN = 0.0;
                cyn.cynYnYP = 0.0;
                cyn.cynYnYN = 0.0;
    
                cynCtep += 1;
            }
    
            bynPoint = 3;
            let newByn = bync[bynPoint];
            newByn[BynBioCyn] = oldBynBioCyn;
    
        }
    
    }
    else if (_x >= byn4BoxCpac.left && _x <= byn4BoxCpac.right && _y >= byn4BoxCpac.top && _y <= byn4BoxCpac.bottom){
        // Byn4
        if (viB == ViBBe){
    
            byn0Box.style.border = "1px solid transparent";
            byn1Box.style.border = "1px solid transparent";
            byn2Box.style.border = "1px solid transparent";
            byn3Box.style.border = "1px solid transparent";
            byn4Box.style.border = "1px solid transparent";

            byn4Box.style.border = "1px solid grey";

            let oldByn = bync[bynPoint];
            let oldBynBioCyn = oldByn[BynBioCyn];
    
            let cynCtep = 0;
            while (cynCtep < cync.length){
    
                let cyn = cync[cynCtep];
                if (cyn.cynViB == ViBBe){
    
                    BynBe(cynCtep, ViBPec);
                }
                cyn.cynNormVB = 0.0;
                cyn.cynNormXP = 0.0;
                cyn.cynNormXN = 0.0;
                cyn.cynNormYP = 0.0;
                cyn.cynNormYN = 0.0;
                cyn.cynYnVB = 0.0;
                cyn.cynYnXP = 0.0;
                cyn.cynYnXN = 0.0;
                cyn.cynYnYP = 0.0;
                cyn.cynYnYN = 0.0;
    
                cynCtep += 1;
            }
    
            bynPoint = 4;
            let newByn = bync[bynPoint];
            newByn[BynBioCyn] = oldBynBioCyn;
    
        }
    
    }
    else if (_x >= ynBVBoxCpac.left && _x <= ynBVBoxCpac.right && _y >= ynBVBoxCpac.top && _y <= ynBVBoxCpac.bottom){
        if (viB == ViBBe){

            let cyn = cync[_cynPoint];
            cyn.cynViB = ViBYnBV;
        }
    }
    else if (_x >= zoneBoxCpac.left && _x <= zoneBoxCpac.right && _y >= zoneBoxCpac.top && _y <= zoneBoxCpac.bottom){
        if (viB == ViBBe){

            let bDelta = (_y - (zoneBoxCpac.bottom + zoneBoxBHeight)) ** 2;
            let vDelta = (_y - (zoneBoxCpac.top - zoneBoxBHeight)) ** 2;

            let cyn = cync[_cynPoint];
            if (bDelta < vDelta)
                cyn.cynViB = ViBBZone;
            else
                cyn.cynViB = ViBVZone;

        }
    }
    else {
        let cyn = cync[_cynPoint];
        cyn.cynViB = viB;
    }
}
