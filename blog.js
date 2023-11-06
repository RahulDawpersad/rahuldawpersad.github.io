const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach((elem) => elem.addEventListener("click", navbarLinkClick));

function navbarLinkClick() {
  if (navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

// Onscroll Effect
//create the intersection observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //it can observe multiple entries at the same time
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
//grab all the elements that have that specific class.
const hiddenElements = document.querySelectorAll(".hidden");

//tell it what to observe
hiddenElements.forEach((el) => observer.observe(el)); //Tell the observer to observe

// Making the loader functional
// Loader
setTimeout(function(){
  $('.wrapper').fadeToggle();
}, 4000);
