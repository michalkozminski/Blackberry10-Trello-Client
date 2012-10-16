Trello.organizations.get(window.orgId, function(organization){
	document.getElementById("orgName").innerHTML = organization.name;
	document.getElementById("orgDescription").innerHTML = organization.desc;
	document.getElementById("orgLogo").setAttribute("src", "https://trello-logos.s3.amazonaws.com/"+organization.logoHash+"/30.png")
}, showError);

Trello.get("organization/"+window.orgId+"/members", function(users){
	var usersList = document.getElementById("users");
	for(id in users){
		addItemToArrayList(usersList, users[id].fullName, {onbtnclick: "removeUser()", userid: users[id].id});
	}
}, showError);

Trello.get("organization/"+window.orgId+"/boards", function(boards){
	var boardsList = document.getElementById("boards");
	for(id in boards){
		addItemToArrayList(boardsList, boards[id].name, {onclick: "window.boardId = '"+boards[id].id+"'; bb.pushScreen('board.html', 'board');"});
	}
}, showError);
