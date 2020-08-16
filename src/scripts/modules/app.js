(function($) {

  const fixedHeader = () => {
    $(window).on('scroll load', () => {
      if ( $(window).scrollTop() >= 1 ) {
        $('.header').addClass('header-fixed');
      } else {
        $('.header').removeClass('header-fixed');
      }
    });

    $('.navbar-toggler').on('click', () => {
      $('.header .nav-link').on('click', () => {
        $('.navbar-toggler')[0].setAttribute('aria-expanded', 'false');
        $('.navbar-collapse').removeClass('show');
        $('body').removeClass('body-lock');
      });

      if ( $('.navbar-toggler').attr('aria-expanded') === 'true' ) {
        $('body').removeClass('body-lock');
      } else if ( $('.navbar-toggler').attr('aria-expanded') === 'false' ) {
        $('body').addClass('body-lock');
      }
    });
  };

  const swiperPeople = () => {
    const swiper = new Swiper('.swiper-container.swiper-people', {
      loop: true,
      spaceBetween: 18,
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 45
        },
        1200: {
          slidesPerView: 3
        },
      }
    });
  };

  const swiperTestimonial = () => {
    const swiper = new Swiper('.swiper-container.swiper-testimonial', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  };

  /* Functions */
  fixedHeader();
  swiperPeople();
  swiperTestimonial();

}(jQuery));