var addComment = function(){
	var commentBody = document.getElementById("commentText").value;
	document.getElementById("commentText").value = "";
	Trello.post("cards/"+window.cardId+"/actions/comments", {text: commentBody});
	//create comment Object
	var commentObject = {
		authorName: "me",
		body: commentBody
	};
	//add comment
	renderComment(document.getElementById("commentsPanel"), commentObject);
	
};

var renderComment = function(commentsDiv, comment){
	var commentDiv = document.createElement('div');
	commentDiv.setAttribute("data-bb-type", "round-panel");
	
	var authorDiv = document.createElement('div');
	authorDiv.setAttribute("data-bb-type", "panel-header");
	authorDiv.innerHTML = comment.authorName;
	
	var commentBodyDiv = document.createElement('div'); 
	commentBodyDiv.setAttribute("data-bb-type", "label-control-container");
	commentBodyDiv.innerHTML = '<p style="text-align:center;">'+comment.body+'</p>';
	
	commentDiv.appendChild(authorDiv);
	commentDiv.appendChild(commentBodyDiv);

	commentsDiv.appendChild(commentDiv);
}

var addLabel = function(labelElement, label){
	singleLabel = document.createElement("p");
	singleLabel.innerHTML = label.color+":"+label.name;
	labelElement.appendChild(singleLabel);
};

var addAssignedUser = function(assingedUsersElement, userId){
	getuserInfo(userId, function(userObject){
		userElement = document.createElement("p");
		userElement.innerHTML = userObject.fullName;
		assingedUsersElement.appendChild(userElement);
	})

};

var renderCard = function(card){
	document.getElementById("titleBar").setCaption(card.name);
	document.getElementById("cardDescription").innerHTML = card.desc;
	document.getElementById("dueDate").innerHTML = card.due;
	document.getElementById("checklistsTab").setCaption("Checklists ("+card.idChecklists.length+")");
	
	//render labels
	var labelElement = document.getElementById("cardLabels");
	for(id in card.labels){
		console.log("labelElement:"+document.getElementById("cardLabels"));
		addLabel(labelElement, card.labels[id]);
	}
	//render Assigned Users
	var usersElement = document.getElementById("assignedUsers");
	for(id in card.idMembers){
		addAssignedUser(usersElement, card.idMembers[id]);
	}
	
	var renderComments = function(comments){
		commentsDiv = document.getElementById("commentsPanel");
		for(id in comments){
			var comment = {
				body: comments[id].data.text,
				authorName: comments[id].memberCreator.fullName
			};
			renderComment(commentsDiv, comment);
		}
	}
	Trello.get("card/"+window.cardId+"/actions", {filter: "commentCard"}, renderComments, showError);
}

Trello.cards.get(window.cardId, renderCard, showError);
