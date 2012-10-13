var addItemToArrayList = function(arrayList, title){
	var container, item = document.createElement('div');
	item.setAttribute('data-bb-type', 'item');
	item.setAttribute('data-bb-title', title);
	var args = arguments[2];
	for(var arg in args){
		item.setAttribute(arg, args[arg]);
	}

	arrayList.appendItem(item);
};

var getuserInfo = function(userId, callback){
	Trello.members.get(userId, callback, showError);
};

var usersAssignedToBoard = function(boardId, callback){
	Trello.get("board/"+boardId+"/members", callback, showError);
};

var usersAssignedToCard = function(cardId, callback){
	Trello.get("card/"+cardId+"/members", callback, showError);
};