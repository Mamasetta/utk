$(document).ready(function(){

  $('#nav-icon3').click(function(){
		$(this).toggleClass('open');
	});

  $(".call__btn").on("click", function(event) {
    $(".popup").addClass("show");
    $(".popup-1").addClass("showed");
    return false;
  });

  $(".buy__btn").on("click", function(event) {
    $(".popup").addClass("show");
    $(".popup-2").addClass("showed");
    return false;
  });

  $(".feedback__btn").on("click", function(event) {
    $(".popup").addClass("show");
    $(".popup-3").addClass("showed");
    return false;
  });

  $(".popup__cross").on('click', function(event) {
    $(".popup").removeClass("show");
    $(".popup-1").removeClass("showed");
    $(".popup-2").removeClass("showed");
    $(".popup-3").removeClass("showed");
    return false;
  });

  $('html').keydown(function(event){
    if (event.keyCode == 27) {
      $(".popup").removeClass("show");
      $(".popup-1").removeClass("showed");
      $(".popup-2").removeClass("showed");
      $(".popup-3").removeClass("showed");
      return false;
    }
  });

  $("#metall-link").on("click", function() {

      $("html, body").animate({scrollTop: $('#metall').offset().top}, 800);
      return false;

  })

  $("#steel-link").on("click", function() {

      $("html, body").animate({scrollTop: $('#steel').offset().top}, 800);
      return false;

  })

  $("#skeleton-link").on("click", function() {

      $("html, body").animate({scrollTop: $('#skeleton').offset().top}, 800);
      return false;

  })

  $("#wood-link").on("click", function() {

      $("html, body").animate({scrollTop: $('#wood').offset().top}, 800);
      return false;

  })

  $("#glass-link").on("click", function() {

      $("html, body").animate({scrollTop: $('#glass').offset().top}, 800);
      return false;

  })

  $(".page-footer__up_text").on("click", function() {

      $("html, body").animate({scrollTop: $('#top').offset().top}, 800);
      return false;

  })

});


var burger = document.querySelector(".page-header__menu-mobile_burger");
var popup = document.querySelector(".page-header__menu-mobile_popup");

burger.addEventListener("click", function(event) {
  event.preventDefault();
  if (popup.classList == "page-header__menu-mobile_popup show") {
    popup.classList.remove("show");
  } else {
    popup.classList.add("show");
  }

  return false;
});


ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [56.885323, 60.588806],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        }),

    // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [56.885323, 60.588806]
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#redStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        });

    myMap.geoObjects
        .add(myGeoObject)
        .add(myPieChart);
};

// function init() {
//     var myMap = new ymaps.Map("map-mobile", {
//             center: [56.885323, 60.588806],
//             zoom: 13
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//
//     // Создаем геообъект с типом геометрии "Точка".
//         myGeoObject = new ymaps.GeoObject({
//             // Описание геометрии.
//             geometry: {
//                 type: "Point",
//                 coordinates: [56.885323, 60.588806]
//             }
//         }, {
//             // Опции.
//             // Иконка метки будет растягиваться под размер ее содержимого.
//             preset: 'islands#redStretchyIcon',
//             // Метку можно перемещать.
//             draggable: true
//         });
//
//     myMap.geoObjects
//         .add(myGeoObject)
//         .add(myPieChart);
// };
