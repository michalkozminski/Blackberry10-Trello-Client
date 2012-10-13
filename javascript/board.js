var board_initialLoad = function(element){
};
var renderBoardInfo = function(boardInfo){
	title = document.getElementById("titleBar");
	title.setCaption(boardInfo.name);
	
	var renderActionMenu = function(items){
		var actionBar = document.getElementById("actionBar");
		var cardsList = document.getElementById("cardsList");
		for(var item in items){
			addActionMenu(actionBar, items[item].name);
			addItemToArrayList(cardsList, items[item].name,
				{onclick: "window.listId = '"+items[item].id+"'; window.listName = '"+items[item].name+"'; bb.pushScreen('list.html', 'board')"}
			);
		}
	}
	
	Trello.get("boards/"+window.boardId+"/lists", renderActionMenu, showError);	
	
}

var addActionMenu = function(actionMenu, title){
	var container, item = document.createElement('div');
	item.setAttribute('data-bb-type', 'action');
	item.setAttribute('data-bb-style', 'tab');
	item.innerHTML = "title"; 
	actionMenu.appendChild(item);
	
}

Trello.boards.get(window.boardId, renderBoardInfo, showError);
