assignedUsersArray = [];


// Set Description and NAme
Trello.cards.get(window.cardId, function(card){
	document.getElementById("cardDescription").value = card.desc;
	document.getElementById("cardName").value = card.name;
}, showError);

usersAssignedToCard(window.cardId,function(users){
	var usersList = document.getElementById("assignedTo");
	for(id in users){
		assignedUsersArray.push(users[id].id);		
		addItemToArrayList(usersList, users[id].fullName, {onbtnclick: "removeUser()", userid: users[id].id});
	}
	usersAssignedToBoard(window.boardId, function(users){
		var usersList = document.getElementById("boardUsers");
		for(id in users){
			var isIncludedAlready = ( assignedUsersArray.indexOf(users[id].id) >= 0 );
			if(!isIncludedAlready){
				addItemToArrayList(usersList, users[id].fullName, {onbtnclick: "addUser()", userid: users[id].id});
			}
		}
		assignedUsersArrayOld = assignedUsersArray.slice();
		

	});
});


//render Dropdown
Trello.get("board/"+window.boardId+"/lists",function(lists){
	var selectedId, 
		cardList = document.getElementById("cardList");
	for(id in lists){
		var option = document.createElement("option");
		option.value = lists[id].id;
		option.text = lists[id].name;
		if(lists[id].id == window.listId){
			selectedId = id;
		}
		cardList.add(option);
	}
	cardList.refresh();
	cardList.setSelectedItem(selectedId);
}, showError);



var updateCard = function(){
	//get assigned users from list
	var assignedUsersArrayNew = []
	var items =  document.getElementById('assignedTo').getItems();
	for(id in items){
		assignedUsersArrayNew.push(items[id].getAttribute("userid"));
	}
	
	//find differences
	var newUsers = whatIsNewInArray(assignedUsersArray, assignedUsersArrayNew);
	var deletedUsers = whatIsRemovedInArray(assignedUsersArray, assignedUsersArrayNew);

	var cardList = document.getElementById("cardList");
	var cardListId = cardList[cardList.selectedIndex].value

	Trello.put("card/"+window.cardId+"/name", {value: document.getElementById("cardName").value});
	Trello.put("card/"+window.cardId+"/desc", {value: document.getElementById("cardDescription").value});
	Trello.put("card/"+window.cardId+"/idList", {value: cardListId});
	
	for(id in newUsers){
		console.log(newUsers[id]);
		Trello.post("card/"+window.cardId+"/members",{value: newUsers[id]});
	}
	for(id in deletedUsers){
		Trello.delete("card/"+window.cardId+"/members/"+deletedUsers[id]);
	}
	
	bb.pushScreen("card.html", "card");
};


var addUser = function(){
	var selected = document.getElementById('boardUsers').selected;
	if (selected) {
		addItemToArrayList(document.getElementById('assignedTo'), selected.getTitle(), {onbtnclick: "removeUser()", userid: selected.getAttribute("userid")});
		selected.remove();
	} else {
		alert('no item selected');
	}
	
};
var removeUser = function(){
	var selected = document.getElementById('assignedTo').selected;
	if (selected) {
		addItemToArrayList(document.getElementById('boardUsers'), selected.getTitle(), {onbtnclick: "addUser()", userid: selected.getAttribute("userid")});
		selected.remove();
	} else {
		alert('no item selected');
	}
	
};
