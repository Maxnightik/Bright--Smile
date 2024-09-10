document.addEventListener("DOMContentLoaded", () => {
  let headerLinks = document.querySelectorAll(".menu-item-has-children > a");
  headerLinks.forEach(function (link) {
    let span = document.createElement("span");
    span.className = "menu-item-plus";
    span.textContent = "+";
    link.appendChild(span);
  });
  // Mobile Sub Menu Open START
  const menuItem = document.querySelectorAll(
    ".mobile-menu-nav .menu-item-has-children"
  );
  menuItem.forEach((menuLi) => {
    menuLi.addEventListener("click", function (event) {
      event.preventDefault();
      const submenu = menuLi.querySelector(".sub-menu");
      if (submenu.style.display === "block" || submenu.style.height !== "") {
        slideUp(submenu, 300);
        submenu.classList.remove("is-active");
        menuLi.classList.remove("is-active");
      } else {
        slideDown(submenu, 300);
        submenu.classList.add("is-active");
        menuLi.classList.add("is-active");
      }
    });
  });
  //Mobile Sub Menu Open END

  let mobileMenu = document.querySelector(".header-mobile-wrap");
  document.querySelector(".hamburger").addEventListener("click", function () {
    mobileMenu.classList.add("is-active");
  });
  document
    .querySelector(".header-mobile-close")
    .addEventListener("click", function () {
      mobileMenu.classList.remove("is-active");
    });

  // Numbers Animation START
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  function countUp($element) {
    var countTo = $element.data("count");
    $({ countNum: $element.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 3000,
        easing: "swing",
        step: function () {
          $element.text(Math.floor(this.countNum));
        },
        complete: function () {
          $element.text(this.countNum);
        },
      }
    );
  }

  var counted = false;
  $(window).on("scroll", function () {
    var $numScroll = $(".num-scroll");
    if ($numScroll.length && isScrolledIntoView($numScroll) && !counted) {
      $(".num-js").each(function () {
        countUp($(this));
      });
      counted = true;
    }
  });
  // Numbers Animation END

  // Progress Script
  var animationDone = false;

  function startProgress() {
    if (animationDone) return;

    if ($(".progress-js").length) {
      var skillsTop = $(".progress-js").offset().top - 200;
    }
    if ($(window).scrollTop() >= skillsTop) {
      $(".progress-drag").each(function () {
        var $this = $(this);
        var percentNum = $this
          .closest(".progress-item")
          .find(".progress-percent")
          .data("percent");

        $({ numberValue: 0 }).animate(
          { numberValue: percentNum },
          {
            duration: 1500,
            easing: "linear",
            step: function () {
              var roundedValue = Math.floor(this.numberValue);
              $this
                .closest(".progress-item")
                .find(".progress-percent")
                .text(roundedValue + "%");
              $this.width(roundedValue + "%");
            },
            complete: function () {
              $this
                .closest(".progress-item")
                .find(".progress-percent")
                .text(percentNum + "%");
              $this.width(percentNum + "%");
            },
          }
        );
      });

      animationDone = true;
    }
  }

  startProgress();
  $(window).on("scroll", function () {
    startProgress();
  });

  // Progress Script END

  $(window).on("load", function () {
    $("#container1").twentytwenty();
  });

  // Slide Down Function START
  function slideDown(element, duration) {
    element.style.display = "block";
    let height = element.offsetHeight;
    element.style.height = 0;
    element.style.overflow = "hidden";

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let currentHeight = Math.min((progress / duration) * height, height);
      element.style.height = currentHeight + "px";
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.height = "";
      }
    }
    window.requestAnimationFrame(step);
  }
  // Slide Down Function END

  // Sub Menu Slide Up Function START
  function slideUp(element, duration) {
    let height = element.offsetHeight;
    element.style.height = height + "px";
    element.style.overflow = "hidden";

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let currentHeight = Math.max(height - (progress / duration) * height, 0);
      element.style.height = currentHeight + "px";
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.display = "none";
        element.style.height = "";
      }
    }
    window.requestAnimationFrame(step);
  }
  // Sub Menu Slide Up Function END

  // FAQ ACCORDIONS START
  const faqQuestion = document.querySelectorAll(".faq-item");
  faqQuestion.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const answer = button.querySelector(".faq-answer");
      if (answer.style.display === "block" || answer.style.height !== "") {
        slideUp(answer, 300);
        answer.classList.remove("is-active");
        button.classList.remove("is-active");
      } else {
        slideDown(answer, 300);
        answer.classList.add("is-active");
        button.classList.add("is-active");
      }
    });
  });
  // FAQ ACCORDIONS END

  // Testimonials START
  const swiperTestimonials = new Swiper(".swiper-testimonials", {
    speed: 1000,
    spaceBetween: 0,
    effect: "cube",
    cubEffect: {
      shadow: false,
    },
    pagination: {
      el: ".swiper-testimonials .swiper-pagination",
      clickable: true,
    },
  });
  // Testimonials END

  $(".magnific-iframe").magnificPopup({
    type: "iframe",
  });

  $(".magnific-image").magnificPopup({
    type: "image",
    mainClass: "mfp-with-zoom",
    zoom: {
      enabled: true,
      duration: 600,
      easing: "ease-in-out",
      opener: function (openerElement) {
        return openerElement.is("img")
          ? openerElement
          : openerElement.find("img");
      },
    },
  });

  // Gallerty START
  const swiperGallery = new Swiper(".swiper-gallery", {
    speed: 1000,
    scrollbar: {
      el: ".swiper-gallery .swiper-scrollbar",
      draggable: true,
      dragSize: 56,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
  // Gallerty END

  // Blog START
  const swiperBlog = new Swiper(".swiper-blog", {
    speed: 1000,
    pagination: {
      el: ".swiper-blog .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
    },
  });
  //  Blog END

  // Partners START
  const swiperPartners = new Swiper(".swiper-partnerts", {
    speed: 1000,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      575: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
  });
  //  Partners END

  // Services START
  const swiperServices = new Swiper(".swiper-services", {
    speed: 1000,
    slidesPerView: "auto",
    spaceBetween: 30,
    watchSlidesProgress: true,
    pagination: {
      el: ".swiper-services .swiper-pagination",
      clickable: true,
    },
  });
  //  Services END

  // Testimonials V2 START
  const swiperTestimonialsV2 = new Swiper(".swiper-testimonials-v2", {
    speed: 1000,
    watchSlidesProgress: true,
    pagination: {
      el: ".swiper-testimonials-v2 .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
  //  Testimonials V2 END

  // TIMER START
  function startTimer(duration, display) {
    let timer = duration,
      hours,
      minutes,
      seconds;
    setInterval(function () {
      hours = Math.floor(timer / 3600);
      minutes = Math.floor((timer % 3600) / 60);
      seconds = timer % 60;

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ":" + minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
      }
    }, 1000);
  }
  window.onload = function () {
    const duration = 5 * 3600 + 4 * 60 + 2;
    const display = document.querySelector("#countdown");
    if (display !== null) {
      startTimer(duration, display);
    }
  };
  // TIMER END

  // Video START
  $(".video-group").on("click", function () {
    let video = $(this).find("video")[0];
    let playBtn = $(this).find(".video-play-btn");
    if (video.paused) {
      video.play();
      playBtn.hide();
    } else {
      video.pause();
      playBtn.show();
    }
  });
  // Video END
});
