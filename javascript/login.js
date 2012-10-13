var onAuthorize = function() {
	bb.pushScreen('boards_list.html', 'boards_list');
};


var login = function(){
    Trello.authorize({
        type: "redirect",
        success: onAuthorize,
        scope: { write: true, read: true }
    })
};
