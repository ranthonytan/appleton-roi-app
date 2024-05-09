
    // $(".navigation").addClass("js");
    // $(".navigation").addClass("js").before('<img src="img/menu.png" alt="mobile" width="50" height="50" id="mobile"/>');

    // $(".dropdown").mouseover(function () {
        // $(this).toggleClass('open');
    // })
	// $(".dropdown").mouseout(function () {
        // $(this).removeClass('open');
    // });
	// $(".ind .dropdown-toggle").mouseover(function () {
        // $(".ind").addClass('dropdown-backdrop');
    // }).mouseout(function () {
		// $(this).removeClass('dropdown-backdrop');
	// })
	// $(".ind .dropdown-menu").mouseover(function () {
        // $(".ind").addClass('open');
    // });
	/* Open the sidenav */
// if ( $(window).width() > 250 && $(window).width() < 765 ) {
	// function openNav() {
    // document.getElementById("mySidenav").style.width = "100%";
	// }
	// /* Close/hide the sidenav */
	// function closeNav() {
		// document.getElementById("mySidenav").style.width = "0";
	// }	
// }

// if ( $(window).width() > 767 && $(window).width() < 1024 ) {
	// function openNav() {
    // document.getElementById("mySidenav").style.width = "350px";
// }

// /* Set the width of the side navigation to 0 */
	// function closeNav() {
		// document.getElementById("mySidenav").style.width = "0";
	// }
	
// }


	function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
	}
	/* Close/hide the sidenav */
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}	


if ( $(window).width() > 360 ) {
  $(window).scroll(function(){ //Header Scroll to Fixed
    if ($(window).scrollTop() >= 100) {
       $('.main-header').addClass('fixed-header');
    }
    else {
       $('.main-header').removeClass('fixed-header');
    }
}); }
else {
	$(window).scroll(function(){ //Header Scroll to Fixed
    if ($(window).scrollTop() >= 100) {
       $('.main-header').addClass('fixed-header');
       $('.main-header').removeClass('fixed-header');
    } });
}