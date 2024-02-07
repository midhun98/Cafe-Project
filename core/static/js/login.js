let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
function otpless(otplessUser) {
    $.ajax({
        type: "POST",
        url: "/api/otplesslogin/",
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        data: JSON.stringify(otplessUser),
        contentType: "application/json",
        success: function (response) {
            swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(function () {
                window.location = '/trainer_dashboard/';
            }, 1500);
        },
        error: function (error) {
        },
    });
    console.log(JSON.stringify(otplessUser));
}

