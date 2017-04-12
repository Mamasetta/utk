//= owl.carousel.min.js

+function ($) {
	'use strict';

	alert("123");

	$(document).ready(function(){
		$('.tabgroup > div').hide();
		$('.tabs a').click(function(e){
			e.preventDefault();
			var $this = $(this),
			tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
			target = $this.attr('href');
			$this.toggleClass('active');
			// $(this).hasClass('active').parents('.slide_filtr').siblings(".wrap_select").find('.apply_filtr-click').addClass('active');
			$(target).toggle();
			if ($('.tabs a').hasClass('active')) {
				$(this).parents('.slide_filtr').siblings(".wrap_select").find('.apply_filtr-click').addClass('active');
			}
			else {
				$(this).parents('.slide_filtr').siblings(".wrap_select").find('.apply_filtr-click').removeClass('active');
			}
		});

		$(".slide_places-click").click(function () {
			$(this).parent(".main-title").siblings(".slide_places").slideToggle("slow");
			$(this).toggleClass("active");
		});


		$('.regional_block').on("click", '.regional_dropdown-link', function () {
			$(this).parent().children('div.list_regional').toggle('normal');
			return false;
		});

		$('a[href^="#"]').not(".dropdown-link").click(function(){
		    $('html, body').stop().animate({
		        scrollTop: $( $(this).attr('href') ).offset().top
		    }, 400);
		    return false;
		});

		$('.dropdown-link').click(function(){
			$('.trigger-menu').removeClass('active');
			$('.wrapper').removeClass('active');
			$('.menu').removeClass('active');			
			$(this).parent('.header_right-block').toggleClass('open');
			return false;
		});
		$('.dropdown-menu .submit').click(function(){
			$('.header_right-block').removeClass('open');
		});
		$('.close-menu').click(function(){
			$('.header_right-block').removeClass('open');
		});
		$('body').addClass('js');
		$('.trigger-menu').click(function() {
			$('.trigger-menu').toggleClass('active');
			$('.wrapper').toggleClass('active');
			$('.menu').toggleClass('active');
			$('.header_right-block').removeClass('open');
			return false;
		});
		$('.wrapper').click(function() {
			$('.trigger-menu').removeClass('active');
			$('.wrapper').removeClass('active');
			$('.menu').removeClass('active');
		});

	});



	$("input.selector").slider({from:200000,to:2000000 ,step: 50000,format: { format: '$,###', locale: 'us' },onstatechange: function(value) {
	   var SavedResult1 = value/100*6-499;
	   /*var SavedResult2 = value/100*4-799;*/
	   var SavedResult3 = value/100*3-995;
	   document.getElementById("SavedOptions1").innerHTML= jQuery.formatNumber(SavedResult1, {format:"$,###", locale:"us"});
	   /*document.getElementById("SavedOptions2").innerHTML= jQuery.formatNumber(SavedResult2, {format:"$,###", locale:"us"});*/
	   document.getElementById("SavedOptions3").innerHTML= jQuery.formatNumber(SavedResult3, {format:"$,###", locale:"us"});}}); 



	var $window = jQuery(window), flexslider;

    function getGridSize() {
        var a;
        if (window.innerWidth < 776) a = 1
            else a = 2;
        return a;
    };

    function startPosition() {
        var a;
        if (window.innerWidth < 776) a = 1
            else a = 0;
        return a;            
    }    

    jQuery('.flex3').flexslider({
        animation: "slide",
        animationLoop: true,
        itemMargin: 0,
        startAt: startPosition(),
        controlsContainer: 0,
        minItems: 2, // use function to pull in initial value
        maxItems: 2 // use function to pull in initial value
    });  

    jQuery('.flex2').flexslider({
        animation: "slide",
        animationLoop: true,
        itemMargin: 0,
        direction: 0,
        controlsContainer: 0
    });

    jQuery('.flex1').flexslider({
        animation: "slide",
        animationLoop: false,
        minItems: 3,
        maxItems: 5,
        itemWidth: 200,
        itemMargin: 0,
        direction: 0,
        controlsContainer: 0,
        mousewheel: true
    });    

    $window.resize(function() {
        var gridSize = getGridSize();
 
        //flexslider.vars.minItems = gridSize;
        //flexslider.vars.maxItems = gridSize;
    });	


}(jQuery);



