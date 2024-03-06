let coulc = [];

let oldTime;
let deltaTime;

let ynBVms;
let fadeRate;

let flag = 1;

function Draw(_newTime){
    deltaTime = _newTime - oldTime;
    oldTime = _newTime; 

    let bynCtep = 0;
    while (bynCtep < bync.length){

        let byn = bync[bynCtep];
        let bynBar = bynBarc[bynCtep];
        let bynBox = bynBoxc[bynCtep];

        let coul = coulc[bynCtep];

        DrawBe(coul, byn);
        DrawVee(coul, bynBox, bynBar);

        bynCtep += 1;
    }

    window.requestAnimationFrame(Draw);
}

function DrawCe(){

    coulc.length = bync.length;
    
    let bynCtep = 0;
    while (bynCtep < bync.length){
        
        coulc[bynCtep] = {viB:ViBPec, ynVB:0.0, alphaPoint:0, alphaLimit:0, alphaCtep:0, alphac:[], byn:[]};

        bynCtep += 1;
    }

    oldTime = 0;
    deltaTime = 0;

    ynBVms = 100;
    fadeRate = 1.0 / 1000.0; // alpha / ms

    window.requestAnimationFrame(Draw);
}

function DrawBe(_coul, _byn){
    if (_coul.viB == ViBPec){

        _coul.viB = ViBCe;
        _coul.ynVB = 0.0;
        _coul.alphaPoint = 0;
        _coul.alphaLimit = 0;
        _coul.alphaCtep = 0;
        if (_coul.alphac.length != _byn[BynBioYnLimit]){
            _coul.alphac.length = _byn[BynBioYnLimit];
            _coul.byn = Array.from(_byn);
        }

    }
}

function DrawVee(_coul, _gBox, _gBar){

    _gBar.clearRect(0, 0, _gBox.width, _gBox.height);

    // More
    _coul.ynVB += deltaTime;
    while (_coul.ynVB >= ynBVms){
        _coul.ynVB -= ynBVms;

        if (_coul.alphaLimit < _coul.alphac.length){
            _coul.alphac[_coul.alphaLimit] = 1.0;
            _coul.alphaLimit += 1;

            if (_coul.alphaLimit == _coul.alphac.length)
                break;
        }
    }

    // Scale
    let xScale = 1.0;
    if (_coul.byn[BynBioMinX] != _coul.byn[BynBioMaxX]){
        xScale = (_gBox.width - 20) / (_coul.byn[BynBioMaxX] - _coul.byn[BynBioMinX]);
    }
    let yScale = 1.0;
    if (_coul.byn[BynBioMinY] != _coul.byn[BynBioMaxY]){
        yScale = (_gBox.height - 20) / (_coul.byn[BynBioMaxY] - _coul.byn[BynBioMinY]);
    }
    let scale;
    if (xScale < yScale)
        scale = xScale;
    else
        scale = yScale;

    let bynCenterX = _coul.byn[BynBioMinX] + (_coul.byn[BynBioMaxX] - _coul.byn[BynBioMinX]) / 2;
    let bynCenterY = _coul.byn[BynBioMinY] + (_coul.byn[BynBioMaxY] - _coul.byn[BynBioMinY]) / 2;

    let gCenterX = _gBox.width / 2;
    let gCenterY = _gBox.height / 2;

    // Draw
    _coul.alphaCtep = _coul.alphaPoint;
    while (_coul.alphaCtep < _coul.alphaLimit){
        let ynPoint = BynBioCtep + 4 * _coul.alphaCtep;

        let ynX = _coul.byn[ynPoint + 0] + _coul.byn[ynPoint + 1] - bynCenterX;
        let ynY = _coul.byn[ynPoint + 2] + _coul.byn[ynPoint + 3] - bynCenterY;

        let posX = Math.floor(gCenterX + ynX * scale);
        let posY = Math.floor(gCenterY + ynY * scale);

        _gBar.beginPath();
        _gBar.arc(posX, posY, _coul.byn[BynBioYnBV] * scale, 0, 2 * Math.PI);
        _gBar.lineWidth = 1;
        _gBar.strokeStyle = `rgba(134, 31, 198, ${_coul.alphac[_coul.alphaCtep]})`;
        _gBar.stroke();

        _coul.alphac[_coul.alphaCtep] -= fadeRate * deltaTime;
        if (_coul.alphac[_coul.alphaCtep] <= 0)
            _coul.alphaPoint += 1;
        
        _coul.alphaCtep += 1;
    }

    if (_coul.alphaPoint == _coul.alphac.length){
        _coul.viB = ViBPec;
    }

}
