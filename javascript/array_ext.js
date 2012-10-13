function IsNumeric(input)
{
    return (input - 0) == input && input.length > 0;
};

whatIsNewInArray = function(oldArray, newArray){
	var newItems = [];
	for(id in newArray){
		if(IsNumeric(id)){
			var isNew = !( oldArray.indexOf(newArray[id]) >= 0 );
			if(isNew){
				newItems.push(newArray[id]);
			}	
		}
	}
	return newItems;
};

whatIsRemovedInArray = function(oldArray, newArray){
	var removedItems = [];
	for(id in oldArray){
		if(IsNumeric(id)){
			var isNew = !( newArray.indexOf(oldArray[id]) >= 0 );
			if(isNew){
				removedItems.push(oldArray[id]);
			}	
		}
	}
	return removedItems;
};