/* allows left and right arrow keys and esc key to work slideshow */
window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  if (event.code === "ArrowLeft") {
    plusSlides(-1);
  } else if (event.code === "ArrowRight") {
    plusSlides(1);
  } else if (event.code === "Escape") {
    closeModal();
  }

  refresh();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
}, true);

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

document.getElementById("container").addEventListener("click", toggleMenu);
function toggleMenu() {
  let x = document.getElementById("menu");
  console.log(x.className);
  if (x.className === "menu") {
    x.className += " responsive";
	document.getElementById("ddpointer").innerHTML = "&#x25B4;";
  } else {
    x.className = "menu";
	document.getElementById("ddpointer").innerHTML = "&#9662;";
  }
}






