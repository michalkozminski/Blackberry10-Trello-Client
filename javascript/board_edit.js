var removeList = function(){
	var selected = document.getElementById('lists').selected;
	if (selected) {
		addItemToArrayList(document.getElementById('boardUsers'), selected.getTitle(), {onbtnclick: "addUser()", userid: selected.getAttribute("userid")});
		selected.remove();
	} else {
		alert('no item selected');
	}
	
};

var renderLists = function(items){
	var cardsList = document.getElementById("cardsList");
	for(var item in items){
		addItemToArrayList(cardsList, items[item].name,
			{onbtnclick: "removeList()"}
		);
	}
}

Trello.get("boards/"+window.boardId+"/lists", renderLists, showError);	
