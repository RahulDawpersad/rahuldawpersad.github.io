// Making the loader functional
setTimeout(function () {
	$(".wrapper").fadeOut();
  }, 5000); //5 seconds loading
  





(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

})(jQuery);

// Cookie Functionality
document.addEventListener("DOMContentLoaded", function() {
    var cookiePopup = document.getElementById("cookie-popup");
    var acceptCookiesButton = document.getElementById("accept-cookies");
    var declineCookiesButton = document.getElementById("decline-cookies");
  
    acceptCookiesButton.addEventListener("click", function() {
      cookiePopup.style.display = "none";
      setCookie("cookiesAccepted", true, 365);
      // Store the user's data here
      var userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        // Add more data fields as needed
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    });
  
    declineCookiesButton.addEventListener("click", function() {
      cookiePopup.style.display = "none";
      setCookie("cookiesAccepted", false, 365);
      // Clear the user's data if they decline cookies
      localStorage.removeItem("userData");
    });
  
    if (!getCookie("cookiesAccepted")) {
      cookiePopup.style.display = "block";
    }
  
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  });
  
  // Icon Functionality
  function iconBtn(){
    window.location.href = 'cookie.html';
  }

 // On SCROLL Functionality
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




