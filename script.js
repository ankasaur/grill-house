$(window).on('load', function() {
    let slideNum = 0;
    let flag = false;
    let slideWidth = $('#slider').width();

    $('.prev').on('click', function() {
        if (flag == false) {
            slideNum--;
            if (slideNum < 0) {
                slideNum = $('.slide').length - 1;
            }
            slideTo(slideNum);
            clearTimer();
        }
    });

    $('.next').on('click', function() {
        if (flag == false) {
            slideNum++;
            if (slideNum > $('.slide').length - 1) {
                slideNum = 0;
            }
            slideTo(slideNum);
            clearTimer();
        }
    });


    $('.dot').on('click', function() {
        if ($(this).hasClass('active')) {
            return;
        } else {
            if (flag == false) {
                slideNum = $(this).index() - 1;
                $('.dot.active').removeClass('active');
                $(this).addClass('active');
                slideTo(slideNum);
                clearTimer();
            }
        }
        
    });

    const slideTo = (num) => {
        let currentSlide = $('.slide.active');
        let nextSlide = $('.slide').eq(num);
        let currentDot = $('.dot.active');
        let nextDot = $('.dot').eq(num);
        
        if (num > $('.slide.active').data('num')) {
            currentSlide.animate({marginLeft: `-${slideWidth}px`}, 800, function() {
                currentSlide.removeClass('active');
                flag = true;
            });
            nextSlide.css('margin-left', `${slideWidth}px`);
            flag = false;
        } else {
            currentSlide.animate({marginLeft: `${slideWidth}px`}, 800, function() {
                currentSlide.removeClass('active');
                flag = true;
            });
            nextSlide.css('margin-left', `-${slideWidth}px`);
            flag = false;
        }

        if (flag == false) {
            flag = true;
            currentDot.removeClass('active');
            nextDot.addClass('active');
            nextSlide.addClass('active');
            nextSlide.animate({marginLeft: '0'}, 800, function() {
                flag = false;
            });
        }
    }

    let slideTimer = setInterval(function() {
        if (flag == false) {
            slideNum++;
        if (slideNum > $('.slide').length - 1) {
            slideNum = 0;
        }
        slideTo(slideNum);
        }
    }, 8000);
        

    const clearTimer = () => {
        clearInterval(slideTimer);
        slideTimer = setInterval(function() {
            if (flag == false) {
                slideNum++;
            if (slideNum > $('.slide').length - 1) {
                slideNum = 0;
            }
            slideTo(slideNum);
            }
        }, 8000);
    }

    $(window).on('scroll', function() {
        let offsetTop = $('#menu').offset().top;
        let scrollTop = $(window).scrollTop();
    
        if (scrollTop >= offsetTop && $(window).width() > 1280) {
            $('#fixed').fadeIn();
        } else {
            $('#fixed').fadeOut();
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() > 1280) {
            $('#fixed').fadeIn();
        } else {
            $('#fixed').fadeOut();
        }
    });

    $('#fixed').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });
});
