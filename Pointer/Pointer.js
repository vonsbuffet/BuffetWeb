let pointerc = [];

function FindPointer(_id) {
    var pointerCtep = 0;
    while (pointerCtep < pointerc.length){

        if (pointerc[pointerCtep].id == _id)
            return pointerCtep;

        pointerCtep += 1;
    }
    if (_id < 0){
        pointerc.push({id: _id});
        return pointerCtep;
    }
    return -1;
}

function PointerMove(_e){
    let index = FindPointer(_e.pointerId);
    if (index == -1){
        return;
    }
}

function PointerCe(_e){
    let index = FindPointer(-1);

    pointerc[index].id = _e.pointerId;
}

function PointerPec(_e){
    let index = FindPointer(_e.pointerId);

    pointerc[index].id = -1;
}