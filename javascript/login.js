var login = function(){
    Trello.authorize({
        type: "redirect",
        success: function(){
			bb.pushScreen('boards_list.html', 'boards_list');
		},
        scope: { write: true, read: true }
    })
};
