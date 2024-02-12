let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

function otpless(otplessUser) {
    // Collect first name, last name, and radio box choice from the form
    let firstName = $('#first_name').val();
    let lastName = $('#last_name').val();
    let signUpAs = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    otplessUser.first_name = firstName;
    otplessUser.last_name = lastName;
    otplessUser.sign_up_as = signUpAs;

    $.ajax({
        type: "POST",
        url: "/api/otplesssignup/",
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        data: JSON.stringify(otplessUser),
        contentType: "application/json",
        success: function (response) {
            if (response.status === 'success') {
                swal.fire({
                    icon: 'success',
                    title: 'SignUp Success',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(function () {
                    window.location = '/signin/';
                }, 1500);
            } else {
                // Handle failure due to phone number already registered
                swal.fire({
                    icon: "info",
                    title: 'SignUp Failed',
                    text: response.message,
                    showConfirmButton: true,
                });
            }
        },
        error: function (error) {
            // Handle other errors (e.g., network error)
            swal.fire({
                icon: 'error',
                title: 'SignUp Failed',
                text: 'An error occurred. Please try again later.',
                showConfirmButton: true,
            });
        },
    });
    console.log(JSON.stringify(otplessUser));
}
