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

let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
document.getElementById("logout-button").addEventListener("click", function () {
    'use strict';
    swal.fire({
        title: 'Are you sure you want to logout?',
        text: "You will be redirected to the login page",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/api/logout/",
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                success: function () {
                    swal.fire({
                        icon: 'success',
                        title: 'Logout Success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(function () {
                        window.location.replace("/signin/");
                    }, 1500);
                },
                error: function () {
                    swal.fire(
                        'Error!',
                        'An error occurred while logging out.',
                        'error'
                    );
                }
            });
        }
    });
});