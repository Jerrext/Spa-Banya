const overflowToggle = (arg) => {
  if (arg) {
    document.documentElement.style.overflow = "hidden auto";
    document.body.style.overflow = "hidden auto";
  } else {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Header

  const header = document.querySelector(".header");

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 0) {
      header.classList.add("scrollNav");
    } else {
      header.classList.remove("scrollNav");
    }
  });

  //Прокрутка до якорей

  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const blockID = anchor.getAttribute("href");
      const block = document.getElementById(blockID.slice(1));
      const scrollY = block.getBoundingClientRect().y;
      window.scrollBy({ top: scrollY - 100, behavior: "smooth" });
    });
  }

  // Кнопка вверх

  const btnUp = {
    el: document.querySelector(".btn-up"),
    scrolling: false,
    show() {
      if (this.el.classList.contains("btn-up_hide") && !this.el.classList.contains("btn-up_hiding")) {
        this.el.classList.remove("btn-up_hide");
        this.el.classList.add("btn-up_hiding");
        window.setTimeout(() => {
          this.el.classList.remove("btn-up_hiding");
        }, 300);
      }
    },
    hide() {
      if (!this.el.classList.contains("btn-up_hide") && !this.el.classList.contains("btn-up_hiding")) {
        this.el.classList.add("btn-up_hiding");
        window.setTimeout(() => {
          this.el.classList.add("btn-up_hide");
          this.el.classList.remove("btn-up_hiding");
        }, 300);
      }
    },
    addEventListener() {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (this.scrolling && scrollY > 0) {
          return;
        }
        this.scrolling = false;
        if (scrollY > 400) {
          this.show();
        } else {
          this.hide();
        }
      });
      document.querySelector(".btn-up").onclick = () => {
        this.scrolling = true;
        this.hide();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      };
    },
  };

  btnUp.addEventListener();

  // Stages

  const stagesRange = document.querySelector(".stages__range");
  const stagesList = document.querySelector(".stages__list");
  const stagesItem = document.querySelector(".stages__item");

  const participationRange = document.querySelector(".participation__range");
  const participationList = document.querySelector(".participation__list");
  const participationItem = document.querySelector(".participation__item");

  const stagesResizeHandler = () => {
    if (window.innerWidth > 700) {
      stagesRange.style.width = stagesList.clientWidth - stagesItem.clientWidth + "px";
      stagesRange.style.height = "unset";
    } else {
      stagesRange.style.height = stagesList.clientHeight - stagesList.lastElementChild.clientHeight + 15 + "px";
      stagesRange.style.width = "unset";
    }

    if (window.innerWidth > 1100) {
      participationRange.style.width = participationList.clientWidth - participationItem.clientWidth + "px";
      participationRange.style.height = "unset";
    } else {
      participationRange.style.width = participationList.clientWidth - participationItem.clientWidth + 15 + "px";
      participationRange.style.width = "unset";
    }
  };

  stagesResizeHandler();

  window.addEventListener("resize", stagesResizeHandler);

  // Burger

  const burger = document.querySelector(".burger");

  let isOpen = false;

  const burgerMenuClose = () => {
    burger.style.left = "";

    setTimeout(() => {
      burger.style.display = "";
      isOpen = false;
    }, 500);

    overflowToggle(true);
  };

  const burgerMenuOpen = () => {
    window.history.pushState({ menu: 1 }, "menu", "#menu");

    burger.style.display = "flex";

    setTimeout(() => {
      burger.style.left = "0";
      isOpen = true;
    }, 0);

    overflowToggle(false);
  };

  window.addEventListener("resize", (e) => {
    const width = document.body.clientWidth;
    if (width > 900) {
      burgerMenuClose();
    }
  });

  document.querySelector(".header__burger-btn").addEventListener("click", () => {
    if (!isOpen) {
      burgerMenuOpen();
    }
  });
  document.querySelector(".header__burger-close-btn").addEventListener("click", () => {
    if (isOpen) {
      burgerMenuClose();
      window.history.back();
    }
  });

  document.querySelectorAll(".burger__nav-link").forEach((item) => {
    item.addEventListener("click", burgerMenuClose);
  });
});

const refereeSwiper = new Swiper(".referee__swiper", {
  spaceBetween: 25,
  slidesPerView: 6,
  navigation: {
    nextEl: ".referee .swiper-button-next",
    prevEl: ".referee .swiper-button-prev",
  },
  simulateTouch: true,
  breakpoints: {
    0: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    960: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1200: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    },
  },
});

const partnersSwiper = new Swiper(".partners__swiper", {
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: {
    nextEl: ".partners .swiper-button-next",
    prevEl: ".partners .swiper-button-prev",
  },
  simulateTouch: true,
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5,
    },
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
});

const sponsorsSwiper = new Swiper(".sponsors__swiper", {
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: {
    nextEl: ".sponsors .swiper-button-next",
    prevEl: ".sponsors .swiper-button-prev",
  },
  simulateTouch: true,
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5,
    },
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
});

const laznyaSwiper = new Swiper(".laznya__swiper", {
  spaceBetween: 20,
  slidesPerView: 1,
  loop: true,
  simulateTouch: true,
  pagination: {
    el: ".laznya .swiper-pagination",
    clickable: true,
  },
});
