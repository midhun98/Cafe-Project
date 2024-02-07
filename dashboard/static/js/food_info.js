document.addEventListener('DOMContentLoaded', function () {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imagesContainer = document.querySelector('.images-container');
    const images = document.querySelectorAll('.image');
    let currentIndex = 0;

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToCurrentImage();
            highlightCurrentImage();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            scrollToCurrentImage();
            highlightCurrentImage();
        }
    });

    function scrollToCurrentImage() {
        images[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    }

    function highlightCurrentImage() {
        images.forEach((image, index) => {
            if (index === currentIndex) {
                image.classList.add('highlight');
            } else {
                image.classList.remove('highlight');
            }
        });
    }

    // Scroll back to the first image when the page is refreshed
    scrollToCurrentImage();
});


document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image');

    images.forEach(image => {
        image.addEventListener('click', function () {
            const imageUrl = image.querySelector('img').src;

            Swal.fire({
                html: `<img src="${imageUrl}" style="max-width: 100%; max-height: 80vh;" alt="">`, // Adjust max-width and max-height as needed
            });

            const closeButton = document.getElementById('close-btn');
            closeButton.addEventListener('click', function () {
                Swal.close();
            });
        });
    });
});

