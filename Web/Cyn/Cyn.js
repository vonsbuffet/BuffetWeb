let cync = [{
    cynViB:0.0, 
    cynX:0.0, 
    cynY:0.0, 
    cynNormVB:0.0, 
    cynNormXP:0.0, 
    cynNormXN:0.0, 
    cynNormYP:0.0, 
    cynNormYN:0.0, 
    cynYnVB:0.0, 
    cynYnXP:0.0, 
    cynYnXN:0.0, 
    cynYnYP:0.0, 
    cynYnYN:0.0
}];

function Cyn(_cynPoint, _newX, _newY){
    let cyn = cync[_cynPoint];

    let deltaX = _newX - cyn.cynX;
    let deltaY = _newY - cyn.cynY;

    cyn.cynX = _newX;
    cyn.cynY = _newY;
    cyn.cynNormVB = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    cyn.cynNormXP = (deltaX > 0) ? (deltaX / cyn.cynNormVB) : 0.0;
    cyn.cynNormXN = (deltaX < 0) ? (deltaX / cyn.cynNormVB) : 0.0;
    cyn.cynNormYP = (deltaY > 0) ? (deltaY / cyn.cynNormVB) : 0.0;
    cyn.cynNormYN = (deltaY < 0) ? (deltaY / cyn.cynNormVB) : 0.0;
    cyn.cynYnVB += cyn.cynNormVB;
    cyn.cynYnXP += cyn.cynNormXP * cyn.cynNormVB;
    cyn.cynYnXN += cyn.cynNormXN * cyn.cynNormVB;
    cyn.cynYnYP += cyn.cynNormYP * cyn.cynNormVB;
    cyn.cynYnYN += cyn.cynNormYN * cyn.cynNormVB;
}

function CynCe(_cynPoint, _newX, _newY){
    if (_cynPoint == cync.length){
        cync.push({
            cynViB:0.0, 
            cynX:0.0, 
            cynY:0.0, 
            cynNormVB:0.0, 
            cynNormXP:0.0, 
            cynNormXN:0.0, 
            cynNormYP:0.0, 
            cynNormYN:0.0, 
            cynYnVB:0.0, 
            cynYnXP:0.0, 
            cynYnXN:0.0, 
            cynYnYP:0.0, 
            cynYnYN:0.0
        });
    }
    let cyn = cync[_cynPoint];
    cyn.cynViB = 0;
    cyn.cynX = _newX;
    cyn.cynY = _newY;
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
}

function CynPec(_cynPoint, _newX, _newY){
    let cyn = cync[_cynPoint];

    cyn.cynViB = -1;
    cyn.cynX = _newX;
    cyn.cynY = _newY;
}