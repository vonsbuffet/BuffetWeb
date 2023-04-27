const ViBPec = -1;
const ViBCe = 1;
const ViBBe = 2;
const ViBVee = 3;
const ViBYnBV = 4;
const ViBBZone = 5;
const ViBVZone = 6;

let viB = 0;

function ViBer(_cynPoint, _newX, _newY, _viB){

    if (_viB == 0){

        Cyn(_cynPoint, _newX, _newY);
        let cynViB = cync[_cynPoint].cynViB;

        if (cynViB == ViBBe){
            BynBe(_cynPoint, 0);
        }
        else if (cynViB == ViBVee){
            BynVee(_cynPoint, 0);
        }
        else if (cynViB == ViBYnBV){
            BynYnBV(_cynPoint, 0);
        }
        else if (cynViB == ViBBZone){
            BynBZone(_cynPoint, 0);
        }
        else if (cynViB == ViBVZone){
            BynVZone(_cynPoint, 0);
        }

    }
    else if (_viB == ViBCe){

        CynCe(_cynPoint, _newX, _newY);
        Cpac(_cynPoint, _newX, _newY);
        let cynViB = cync[_cynPoint].cynViB;

        if (cynViB == ViBBe){
            BynBe(_cynPoint, ViBCe);
        }
        else if (cynViB == ViBVee){
            BynVee(_cynPoint, ViBCe);
        }
        else if (cynViB == ViBYnBV){
            BynYnBV(_cynPoint, ViBCe);
        }
        else if (cynViB == ViBBZone){
            BynBZone(_cynPoint, ViBCe);
        }
        else if (cynViB == ViBVZone){
            BynVZone(_cynPoint, ViBCe);
        }

    }
    else if (_viB == ViBPec){

        let cynViB = cync[_cynPoint].cynViB;
        CynPec(_cynPoint, _newX, _newY);

        if (cynViB == ViBBe){
            BynBe(_cynPoint, ViBPec);
        }
        else if (cynViB == ViBVee){
            BynVee(_cynPoint, ViBPec);
        }
        else if (cynViB == ViBYnBV){
            BynYnBV(_cynPoint, ViBPec);
        }

    }
}

function ViBerCe(){
    viB = ViBBe;
}