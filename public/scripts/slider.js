const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let slideIndex = 0;

// Show the initial slide
showSlide(slideIndex);

// Event listeners for the previous and next buttons
prevButton.addEventListener('click', () => {
  showSlide(slideIndex -= 1);
});

nextButton.addEventListener('click', () => {
  showSlide(slideIndex += 1);
});

function showSlide(index) {
  // Wrap around to the last slide if the index goes out of bounds
  if (index < 0) {
    index = slider.childElementCount - 1;
  } else if (index >= slider.childElementCount) {
    index = 0;
  }

  // Translate the slider to show the current slide
  slider.style.transform = `translateX(-${index * 100}%)`;

  // Update the slide index
  slideIndex = index;
}
