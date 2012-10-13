var onCheckboxChange = function(checkbox, checklistId, checkItemId){
	if(checked.checked){
		Trello.put("cards/"+window.cardId+"/checklist/"+checklistId+"/checkItem/"+checkItemId+"/state", {value: true});
	}
};
Trello.get("cards/"+window.cardId+"/checklists", function(checklists){
	var checkboxesList = document.getElementById("checklists");
	console.log(checklists);
	for(id in checklists){
		for(itemId in checklists[id].checkItems){
			var checkboxDiv = document.createElement("div");
			var checkboxTitle = document.createElement("p");
			checkboxTitle.innerHTML = checklists[id].checkItems[itemId].name;
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.value = checklists[id].checkItems[itemId].id;
			checkbox.setAttribute("onclick", "onCheckboxChange(this, "+checklists[id].id+", "+checklists[id].checkItems[itemId].id+")");
			checkboxDiv.appendChild(checkboxTitle);
			checkboxDiv.appendChild(checkbox);	 
			console.log(bb.checkbox.apply([checkbox]));
			checkboxesList.appendChild(checkboxDiv); 
		}
	}
}, showError);