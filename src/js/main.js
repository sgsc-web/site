(function ($) {
    "use strict";

    // Loader
    setTimeout(function () {
        $(".loader-main").fadeOut();
    }, 800);

    // Sticky Header
    $(window).scroll(function () {
        var sticky = $(".header"),
            scroll = $(window).scrollTop();
        if (scroll > 0) sticky.addClass("fixed");
        else sticky.removeClass("fixed");
    });

    // Mobile menu sidebar overlay
    $("body").append('<div class="sidebar-overlay"></div>');
    $(document).on("click", "#mobile_btn", function () {
        $(".main-wrapper").toggleClass("slide-nav");
        $(".sidebar-overlay").toggleClass("opened");
        $("html").addClass("menu-opened");
        return false;
    });

    $(document).on("click", ".sidebar-overlay", function () {
        $("html").removeClass("menu-opened");
        $(this).removeClass("opened");
        $(".main-wrapper").removeClass("slide-nav");
    });

    $(document).on("click", "#menu_close", function () {
        $("html").removeClass("menu-opened");
        $(".sidebar-overlay").removeClass("opened");
        $(".main-wrapper").removeClass("slide-nav");
    });

    // Mobile Submenu
    if ($(window).width() <= 991) {
        $(document).on("click", ".main-nav .has-submenu > a", function (e) {
            e.preventDefault();
            if ($(this).next("ul").is(":visible")) {
                $(this).next("ul").slideUp(350);
                $(this).removeClass("submenu-open");
            } else {
                $(".main-nav ul").slideUp(350);
                $(".main-nav a").removeClass("submenu-open");
                $(this).next("ul").slideDown(350);
                $(this).addClass("submenu-open");
            }
        });
    }

    // Owl Carousel - Clients Slider
    if ($(".clients-slider").length > 0) {
        $(".clients-slider").owlCarousel({
            loop: true,
            margin: 24,
            nav: false,
            dots: false,
            smartSpeed: 2000,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 2,
                },
                550: {
                    items: 3,
                },
                768: {
                    items: 5,
                },
                1000: {
                    items: 6,
                },
            },
        });
    }

    // Owl Carousel - Category Slider
    if ($(".gigs-card-cat").length > 0) {
        $(".gigs-card-cat").owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            dots: false,
            smartSpeed: 2000,
            autoplay: false,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                420: {
                    items: 2,
                },
                500: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1000: {
                    items: 5,
                },
            },
        });
    }

    // Owl Carousel - Products Slider
    if ($(".gigs-card-slider").length > 0) {
        $(".gigs-card-slider").owlCarousel({
            loop: false,
            margin: 24,
            nav: true,
            dots: false,
            smartSpeed: 2000,
            autoplay: false,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                500: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
            },
        });
    }

    // Owl Carousel - Testimonial Slider
    if ($(".testimonial-slider").length > 0) {
        $(".testimonial-slider").owlCarousel({
            loop: true,
            margin: 22,
            nav: true,
            dots: false,
            smartSpeed: 2000,
            autoplay: true,
            autoplayTimeout: 5000,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1200: {
                    items: 3,
                },
            },
        });
    }

    // Back to Top
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 500) {
            $(".back-to-top").addClass("show");
        } else {
            $(".back-to-top").removeClass("show");
        }
    });

    $(".back-to-top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
    });

    // Select 2
    if ($(".select").length > 0) {
        $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
        });
    }

    // Favourite Toggle
    $(".fav-icon").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("favourite");
    });

    // AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            once: true,
        });
    }

    // Tooltip
    if ($('[data-bs-toggle="tooltip"]').length > 0) {
        var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

})(jQuery);
