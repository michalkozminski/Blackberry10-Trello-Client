var showError = function(error){
	console.log(error);
};

var boards_listLoad = function(element){
}
var renderBoards = function(boards){
	var arrayList = document.getElementById("boardsArrayList");
	for(var id in boards){
		addItemToArrayList(arrayList, boards[id].name,
			{onclick: "window.boardId = '"+boards[id].id+"'; bb.pushScreen('board.html', 'board')"}
		)
	}
};

Trello.get("members/me/boards",{}, renderBoards, showError);