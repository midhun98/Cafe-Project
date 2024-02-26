window.onload = function () {
    document.getElementById("msform").reset();
};

const nextButton = document.getElementById('nextButton');
nextButton.setAttribute('disabled', 'disabled');

function validateForm() {
    let isValid = true;
    const recipeName = document.getElementById('recipeName').value.trim();
    const calories = document.getElementById('calories').value.trim();
    const protein = document.getElementById('protein').value.trim();
    const fat = document.getElementById('fat').value.trim();
    const carbs = document.getElementById('carbs').value.trim();
    if (!recipeName) {
        document.getElementById('nextButton').setAttribute('disabled', 'disabled');
        document.getElementById('recipeNameError').innerText = 'Recipe Name is required';
        document.getElementById('recipeNameError').style.display = 'block';
        isValid = false;
    } else {
        console.log('else recipeNameError')
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('recipeNameError').style.display = 'none';
    }

    if (!calories) {
        document.getElementById('nextButton').setAttribute('disabled', 'disabled');
        document.getElementById('caloriesError').innerText = 'Calories is required';
        document.getElementById('caloriesError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('caloriesError').style.display = 'none';
    }

    if (!protein) {
        document.getElementById('nextButton').setAttribute('disabled', 'disabled');
        document.getElementById('proteinError').innerText = 'Protein is required';
        document.getElementById('proteinError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('proteinError').style.display = 'none';
    }

    if (!fat) {
        document.getElementById('nextButton').setAttribute('disabled', 'disabled');
        document.getElementById('fatError').innerText = 'Fat is required';
        document.getElementById('fatError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('fatError').style.display = 'none';
    }

    if (!carbs) {
        document.getElementById('nextButton').setAttribute('disabled', 'disabled');
        document.getElementById('carbsError').innerText = 'Carbs is required';
        document.getElementById('carbsError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('carbsError').style.display = 'none';
    }

    return isValid;
}

document.getElementById('recipeName').addEventListener('input', validateForm);
document.getElementById('calories').addEventListener('input', validateForm);
document.getElementById('protein').addEventListener('input', validateForm);
document.getElementById('fat').addEventListener('input', validateForm);
document.getElementById('carbs').addEventListener('input', validateForm);

function nextStep() {
    const isValid = validateForm();
    console.log('isValid', isValid)
    if (isValid) {
        console.log('Form is valid');
        nextButton.removeAttribute('disabled'); // Enable button
    } else {
        console.log('Form contains errors');
        nextButton.setAttribute('disabled', 'disabled');
    }
}

// function initializeFormValidation() {
//     validateForm();
// }
// document.addEventListener('DOMContentLoaded', initializeFormValidation);

$(document).ready(function () {
    $("#msform").submit(function (event) {
        console.log("hii");
        event.preventDefault();
        clearFieldErrors();

        let uploadFoodImagesInput = document.getElementById("uploadFoodImages");
        let uploadPlateDishInput = document.getElementById("uploadPlateDish");
        let selectedMealType = $("input[name='mealType']:checked").val();
        let meal_category = $("input[name='mealCategory']:checked").val();
        let formData = new FormData(); // Create FormData object

        // Add form fields to FormData object
        formData.append("recipe_name", $("#recipeName").val());
        formData.append("calories", $("#calories").val());
        formData.append("protein", $("#protein").val());
        formData.append("fat", $("#fat").val());
        formData.append("carbs", $("#carbs").val());
        formData.append("egg_quantity", $("#eggs").val());
        formData.append("milk_products_quantity", $("#milk_milk_products").val());
        formData.append("fats_oil_quantity", $("#fats-oil").val());
        formData.append("spices_herbs_quantity", $("#spices-herbs").val());
        formData.append("vegetables_fruits_quantity", $("#veggies-fruits").val());
        formData.append("cereals_pulses_quantity", $("#cereals-pulses").val());
        formData.append("meat_seafood_quantity", $("#meat-seafood").val());
        formData.append("dry_fruits_quantity", $("#dry-fruits").val());
        formData.append("sugar_products_quantity", $("#sugar-products").val());
        formData.append("other_products_quantity", $("#other-products").val());
        formData.append("cooking_instruction", $("#cooking_instructions").val());
        formData.append("food_url", $("#food_url").val());
        formData.append("food_suggestions", $("#food_suggestions").val());
        formData.append("food_category", selectedMealType);
        formData.append("meal_category", meal_category);

        // Add uploaded food images to FormData object
        for (let i = 0; i < uploadFoodImagesInput.files.length; i++) {
            formData.append("food_images", uploadFoodImagesInput.files[i]);
        }

        // Add uploaded plate dish images to FormData object
        for (let i = 0; i < uploadPlateDishInput.files.length; i++) {
            formData.append("plate_dish_images", uploadPlateDishInput.files[i]);
        }

        console.log('formData', formData);
        $.ajax({
            type: "POST",
            url: "/api/foods/",
            data: formData, // Pass FormData object directly
            processData: false,  // Prevent jQuery from processing the data
            contentType: false,  // Prevent jQuery from setting contentType
            headers: {
                'X-CSRFToken': csrfToken,
            },
            success: function (response) {
                swal.fire({
                    title: "Success",
                    text: "Recipe created successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            },
            error: function (xhr) {
                if (xhr.status === 400) {
                    displayFieldErrors(xhr.responseJSON);
                } else {
                    console.log('xhr.responseText', xhr.responseText);
                    alert("Error creating Recipe: " + xhr.responseText);
                }
            }
        });
    });
});

function clearFieldErrors() {
    $(".error-message").remove(); // Remove existing error messages
    $(".input-error").removeClass("input-error"); // Remove error styling
}

function displayFieldErrors(errors) {
    for (let field in errors) {
        if (errors.hasOwnProperty(field)) {
            let inputElement = $("#" + field);
            let errorMessage = errors[field][0];
            displayError(inputElement, errorMessage);
        }
    }
}

function displayError(inputElement, errorMessage) {
    let errorElement = $("<div class='error-message'></div>").text(errorMessage);
    inputElement.addClass("input-error");
    inputElement.after(errorElement);
}