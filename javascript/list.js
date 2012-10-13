var renderList = function(cards){
	document.getElementById("titleBar").setCaption(window.listName);
	var arrowList = document.getElementById("cardsArrowList");
	for(var id in cards){
		addItemToArrayList(arrowList, cards[id].name,
			{onclick: 'window.cardId = "'+cards[id].id+'"; bb.pushScreen("card.html", "card");'}
		);
	}
}
Trello.get("lists/"+window.listId+"/cards", renderList, showError);
