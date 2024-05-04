document.getElementById("contactForm").addEventListener("submit", function (event) {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("message");

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        event.preventDefault();
    }

    if (emailInput.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        event.preventDefault();
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            event.preventDefault();
        } else {
            emailError.textContent = ""; // Clear the error message if email is valid
        }
    }

    var phonePattern = /^(\+27|0)[0-9]{9,10}$/; // South African phone number pattern
    if (phoneInput.value.trim() === "") {
        phoneError.textContent = "Please enter your phone number.";
        event.preventDefault();
    } else if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.textContent = "Please enter a valid South African phone number.";
        event.preventDefault();
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter your message.";
        event.preventDefault();
    }
});

//create the intersection observer
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {   //it can observe multiple entries at the same time
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});
//grab all the elements that have that specific class.
const hiddenElements = document.querySelectorAll('.hidden');

//tell it what to observe
hiddenElements.forEach((el)=> observer.observe(el)); //Tell the observer to observe

let btnWebOne = document.getElementById('btnweb_one');
let btnWebTwo = document.getElementById("btnweb_two");
let btnWebThree = document.getElementById("btnweb_three");


btnWebOne.addEventListener('click', function(){
  window.open('https://nails-and-beauty.netlify.app/', 'blank')
})

btnWebTwo.addEventListener('click', function(){
  window.open('https://indico-construction-solutions.netlify.app', 'blank')
})

btnWebThree.addEventListener('click', function(){
  window.open('https://bmw-drivebavaria-official.netlify.app/', 'blank')
})

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

