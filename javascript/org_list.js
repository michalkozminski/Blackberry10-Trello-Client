var showError = function(error){
	console.log(error);
};
var renderOrganizations = function(organizations){
	var arrayList = document.getElementById("organizationsArrowList");
	for(var id in organizations){		
		addItemToArrayList(arrayList, organizations[id].displayName, {onclick: "window.orgId = '"+organizations[id].id+"'; bb.pushScreen('organization.html','organization')"});
	}
};
Trello.get("members/me/organizations",{}, renderOrganizations, showError);