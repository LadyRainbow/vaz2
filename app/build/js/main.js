$ = jQuery.noConflict(true);
$(document).ready(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $header = $('header');

    var $popUpGeneralBlock = $('.pop-up-general-block');

    var $overlayPopUpWRP = $('.pop-up-overlay-wrapper');
    var $overlay = $('.overlay-pop-up');
    var $closePopUpBtn = $('.pop-up-general-block-close-btn');

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    let vhMenu = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vhMenu = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);
    });


    // soft scroll
    $(".scrollTo").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        $('.burger').removeClass('active');
        $('.menu').removeClass('active');
        $('body').removeClass('active');
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        // анимируем переход к блоку, время: 500 мс
        $('body,html').animate({scrollTop: top}, 500);
        // находим высоту, на которой расположен блок
    });

    $('.row-masonry').masonry({
        itemSelector: '.block-masonry-wrp',
    });


    // scroll header
    $(window).scroll(function() {
        headerChange();
    });
    headerChange();

    function headerChange () {
        if($window.scrollTop() > 100) {
            $header.addClass('header-scroll');
        } else {
            $header.removeClass('header-scroll');
        }
    };

    // accordion collaps cars
    $('.accordion-wrp .card').click(function () {
        var dataCar = $(this).attr('data-car');
        $('.programm-points-img img').removeClass('active');
        $('.programm-points-img img[data-car="' + dataCar + '"]').addClass('active');
    });

    // chnge text's height
    $('.block-masonry-text').each(function (index, value){
        var heightText = $(this).height() + 9;
        $(this).closest('.block-masonry-content').css('transform', 'translateY(' + heightText + 'px)')
    });

    // slider
    $('.review-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev-main-arrow'),
        nextArrow: $('.next-main-arrow'),
        dots: false,
    });
    $('.partner-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev-partner-arrow'),
        nextArrow: $('.next-partner-arrow'),
        dots: false,
        responsive: [
            {
                breakpoint: 1517,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 826,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


   // form checked
    $('.checkbox-check').change(function() {
      if(this.checked) {
          $(this).closest('form').find('.btn-checkbox').removeClass('btn-checkbox-disabled');
      }
      else {
          $(this).closest('form').find('.btn-checkbox').addClass('btn-checkbox-disabled');
      }
    });

    // menu
    $('.burger').click(function () {
        $(this).toggleClass('active');
        $('.menu').toggleClass('active');
        $('body').toggleClass('active');
        $header.toggleClass('header-scroll');
    });

    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });

    // masked
    $('.mask-phone').mask('+799999?9999999999', {placeholder: ""});

    function amount () {
        var ticketPrice = $('.radio input:checked').closest('.row-line').find('.ticketPrice').text();
        ticketPrice = +ticketPrice;
        if($('.checkbox-amount').is(':checked')) {
            var placeAmount = $('.place-amount').text();
            placeAmount = +placeAmount;
            ticketPrice = ticketPrice + placeAmount;
        }
        $('.val-price span').text(ticketPrice);
    };

    $('.checkbox-amount').change(function () {
        amount ();
    });
    $('.radio input').change(function () {
        amount ();
    });

    amount ();


    // pop-ups
    function thnx () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#thnx').addClass('active');
    };

    $('.open-pop-up-menu').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#buyTicket').addClass('active');
        $('.burger').removeClass('active');
        $('.menu').removeClass('active');
        $('body').removeClass('active');
    });
    $('.open-pop-buyTicket').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#buyTicket').addClass('active');
    });
    $('.open-accred-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#accredBlock').addClass('active');
    });

    $overlay.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
    $closePopUpBtn.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });

    // map section
    ymaps.ready(init);

    var centerMap = [59.795277, 30.820440];
    function init(){
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: centerMap, // Москва
            zoom: 8
        });

        myGeoObject = new ymaps.GeoObject({
           // Описание геометрии.
           geometry: {
               type: "Point",
               coordinates: centerMap,
               // iconContent: '12'
           },
        },
        {
            preset: 'islands#darkBlueDotIcon'
        });
        myMap.geoObjects.add(myGeoObject);
    };

});
