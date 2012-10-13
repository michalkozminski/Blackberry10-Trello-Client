var renderMyAccount = function(myAccount){
	var avatarUrl = "http://gravatar.com/avatar/"+myAccount.gravatarHash;
	console.log("gavatar: "+avatarUrl);

	var titleBar = document.getElementById("titleBar");
	titleBar.setCaption(myAccount.fullName);
	titleBar.setImg(avatarUrl);
	// titleBar.setAccentText(myAccount.email);
};
Trello.get("member/me", renderMyAccount, showError);