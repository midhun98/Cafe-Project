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

document.addEventListener("DOMContentLoaded", function () {
    var signUpCarousel = document.getElementById("signUpCarousel");
    var prevButton = signUpCarousel.querySelector(".carousel-control-prev");
    var nextButton = signUpCarousel.querySelector(".carousel-control-next");

    var firstNameInput = document.getElementById("first_name");
    var lastNameInput = document.getElementById("last_name");
    var firstNameWarning = document.getElementById("firstNameWarning");
    var lastNameWarning = document.getElementById("lastNameWarning");

    // Function to check if both first name and last name are filled
    function checkInputs() {
        var firstNameFilled = firstNameInput.value.trim() !== "";
        var lastNameFilled = lastNameInput.value.trim() !== "";

        // Return true if both fields are filled, otherwise false
        return firstNameFilled && lastNameFilled;
    }

    // Add input event listeners to first name and last name input fields
    firstNameInput.addEventListener("input", function () {
        if (firstNameInput.value.trim() !== "") {
            firstNameWarning.style.display = "none";
        }
    });

    lastNameInput.addEventListener("input", function () {
        if (lastNameInput.value.trim() !== "") {
            lastNameWarning.style.display = "none";
        }
    });

    signUpCarousel.addEventListener("slid.bs.carousel", function (event) {
        var activeItem = signUpCarousel.querySelector(".carousel-item.active");

        if (activeItem.classList.contains("my-2")) {
            prevButton.style.display = "block";
            nextButton.style.display = "none";
        } else {
            prevButton.style.display = "none";
            nextButton.style.display = "block";
        }
    });

    signUpCarousel.addEventListener("slide.bs.carousel", function (event) {
        if (!checkInputs()) {
            if (!firstNameInput.value.trim()) {
                firstNameWarning.style.display = "block";
            }

            if (!lastNameInput.value.trim()) {
                lastNameWarning.style.display = "block";
            }

            // Prevents the slide transition if fields are empty
            event.preventDefault();
        } else {
            // Both fields are filled, hide any previous warning messages
            firstNameWarning.style.display = "none";
            lastNameWarning.style.display = "none";
        }
    });
});
