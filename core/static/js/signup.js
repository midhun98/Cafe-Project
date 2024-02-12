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
    var signupOptionWarning = document.getElementById("signupOptionWarning");

    // Reset input fields and hide error messages
    function resetFields() {
        firstNameInput.value = "";
        lastNameInput.value = "";
        firstNameWarning.style.display = "none";
        lastNameWarning.style.display = "none";
        signupOptionWarning.style.display = "none";

        // Uncheck radio buttons
        var radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');
        radioButtons.forEach(function (radioButton) {
            radioButton.checked = false;
        });
    }

    // Function to check if all inputs are filled
    function checkInputs() {
        var firstNameFilled = firstNameInput.value.trim() !== "";
        var lastNameFilled = lastNameInput.value.trim() !== "";
        var signupOptionChecked = document.querySelector('input[name="flexRadioDefault"]:checked');

        // Display error message if first name is not filled
        if (!firstNameFilled) {
            firstNameWarning.style.display = "block";
        } else {
            firstNameWarning.style.display = "none";
        }

        // Display error message if last name is not filled
        if (!lastNameFilled) {
            lastNameWarning.style.display = "block";
        } else {
            lastNameWarning.style.display = "none";
        }

        // Display error message if signup option is not selected
        if (!signupOptionChecked) {
            signupOptionWarning.style.display = "block";
        } else {
            signupOptionWarning.style.display = "none";
        }

        // Return true if all fields are filled and signup option is selected, otherwise false
        return firstNameFilled && lastNameFilled && signupOptionChecked;
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

    // Add event listeners to the radio buttons
    var radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
            signupOptionWarning.style.display = "none";
        });
    });

    // Reset fields and hide error messages when the page is refreshed
    resetFields();

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
            // Prevents the slide transition if fields are empty or signup option is not selected
            event.preventDefault();
        } else {
            // All inputs are filled and signup option is selected, hide any previous warning messages
            firstNameWarning.style.display = "none";
            lastNameWarning.style.display = "none";
            signupOptionWarning.style.display = "none";
        }
    });
});
