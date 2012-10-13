doSave = function(){
	Trello.post("cards", { name: document.getElementById("cardName").value, idList: window.listId, desc: document.getElementById("cardDesc").value	 });
	bb.pushScreen("list.html", "list");
} 	