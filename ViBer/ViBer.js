const ViBPec = -1;
const ViBCe = 1;
const ViBBe = 2;
const ViBVee = 3;
const ViBYnBV = 4;
const ViBBZone = 5;
const ViBVZone = 6;

let viB = 0;
let viB2 = 0;

function ViBer(_cynPoint, _newX, _newY, _viB){

    if (_viB == 0){

        Cyn(_cynPoint, _newX, _newY);

        if (viB == ViBBe){
            BynBe(_cynPoint, 0);
        }
        else if (viB == ViBVee){
            BynVee(_cynPoint, 0);
        }

    }
    else if (_viB == ViBCe){

        CynCe(_cynPoint, _newX, _newY);
        Cpac(_cynPoint, _newX, _newY);

        if (viB == ViBBe){
            BynBe(_cynPoint, ViBCe);		
        }
        else if (viB == ViBVee){
            BynVee(_cynPoint, ViBCe);
        }
		// Extra Sauce
		else if (viB == -ViBBe)
			viB *= -1;

    }
    else if (_viB == ViBPec){

        CynPec(_cynPoint, _newX, _newY);

        if (viB == ViBBe){
            BynBe(_cynPoint, ViBPec);
        }
        else if (viB == ViBVee){
            BynVee(_cynPoint, ViBPec);
        }

    }
}

function ViBerCe(){
    viB = ViBBe;
}