function getCurrentUser(){
    'use strict';
    $.ajax({
        type: "GET",
        url: "/api/get_current_user/",
        success: function (data) {
            $("#user_name").text(data.username);
            console.log('data.username', data.username)
        }
    });
}
getCurrentUser();