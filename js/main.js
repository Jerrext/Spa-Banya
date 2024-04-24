const overflowToggle = (arg) => {
  if (arg) {
    document.documentElement.style.overflow = "hidden auto";
    document.body.style.overflow = "hidden auto";
  } else {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
};

const popUpOpen = (window, wrapper, overlay, closeBtn, delay) => {
  overflowToggle(false);
  window.style.display = "block";

  setTimeout(() => {
    overlay.style.opacity = ".8";
    wrapper.style.opacity = "1";
    wrapper.style.top = "50%";
    closeBtn.style.opacity = "0.5";
  }, 0);

  if (delay) {
    setTimeout(() => {
      popUpClose(window, wrapper, overlay);
    }, delay);
  }
};

const popUpClose = (window, wrapper, overlay, closeBtn) => {
  setTimeout(() => {
    window.style.display = "";
  }, 300);
  closeBtn.style.opacity = "";
  overlay.style.opacity = "";
  wrapper.style.opacity = "";
  wrapper.style.top = "";

  overflowToggle(true);
};

const setPopUpVisibility = (visibility, window, wrapper, overlay, closeBtn, delay) => {
  if (visibility) {
    popUpOpen(window, wrapper, overlay, closeBtn, delay);
  } else {
    popUpClose(window, wrapper, overlay, closeBtn);
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
      if (
        this.el.classList.contains("btn-up_hide") &&
        !this.el.classList.contains("btn-up_hiding")
      ) {
        this.el.classList.remove("btn-up_hide");
        this.el.classList.add("btn-up_hiding");
        window.setTimeout(() => {
          this.el.classList.remove("btn-up_hiding");
        }, 300);
      }
    },
    hide() {
      if (
        !this.el.classList.contains("btn-up_hide") &&
        !this.el.classList.contains("btn-up_hiding")
      ) {
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

  const stagesResizeHandler = () => {
    if (window.innerWidth > 700) {
      stagesRange.style.width = stagesList.clientWidth - stagesItem.clientWidth + "px";
      stagesRange.style.height = "unset";
    } else {
      stagesRange.style.height =
        stagesList.clientHeight - stagesList.lastElementChild.clientHeight + 15 + "px";
      stagesRange.style.width = "unset";
    }
  };

  stagesResizeHandler();

  window.addEventListener("resize", stagesResizeHandler);

  // Map

  // const map = document.querySelector(".about__map iframe");
  // map.style.width = "100%";
  // map.style.height = "100%";

  // Services

  // document.querySelectorAll(".services__item").forEach((item,index) => item.dataset.number = index + 1)

  // Popup View

  // const popupView = document.querySelector(".popup-view")
  // const popupViewIWindow = document.querySelector(".popup-view__window")
  // const overlayView = document.querySelector(".popup-view__overlay")
  // const closeBtnView = document.querySelector(".popup-view__close")
  // const prevBtnView = document.querySelector(".popup-view__prev")
  // const nextBtnView = document.querySelector(".popup-view__next")

  // const img = document.querySelector(".popup-view__img")
  // const imgTitle = document.querySelector(".popup-view__title")
  // const imgDescription = document.querySelector(".popup-view__description")
  // const parentTextContainer = imgTitle.parentElement
  // const parentImgContainer = img.parentElement

  // const galleryItems = [...document.querySelectorAll(".gallery__grid-item")]

  // const galleryList = galleryItems.map((item, index)=> {
  //   return {
  //     id: index,
  //     img: item.firstElementChild.src,
  //     title: item.firstElementChild.nextElementSibling.textContent,
  //     description: item.lastElementChild.innerHTML,
  //   }
  // })

  // window.addEventListener('popstate', function(e) {
  //   setPopUpVisibility(false, popupView, popupViewIWindow, overlayView, closeBtnView)
  //   burgerMenuClose()
  // }, false);

  // let currentViewIndex

  // const openViewWindow = (id) => {
  //   if (id === 0) {
  //     prevBtnView.style.display = "none"
  //   } else if (id < 0) {
  //     return
  //   } else if (id === galleryList.length - 1) {
  //     nextBtnView.style.display = "none"
  //   } else if (id > galleryList.length - 1) {
  //     return
  //   } else {
  //     prevBtnView.style.display = "flex"
  //     nextBtnView.style.display = "flex"
  //   }

  //   currentViewIndex = id

  //   const currentItem = galleryList.find(work => work.id === id)

  //   if (!currentItem.title && !currentItem.description) {
  //     popupViewIWindow.style.width = "unset"
  //     parentTextContainer.style.display = "none"
  //     if (document.body.clientWidth < 600) parentImgContainer.style.maxHeight = ""
  //   } else {
  //     parentTextContainer.style.display = "block"
  //     if (document.body.clientWidth < 600) parentImgContainer.style.maxHeight = "400px"
  //     parentTextContainer.style.padding = "50px 20px"
  //     popupViewIWindow.style.width = "100%"
  //   }

  //   img.src = currentItem.img
  //   imgTitle.textContent = currentItem.title
  //   imgDescription.innerHTML = currentItem.description
  // }

  // const closeViewWindow = () => {
  //   window.history.back();
  //   setPopUpVisibility(false, popupView, popupViewIWindow, overlayView, closeBtnView)
  // }

  // prevBtnView.addEventListener("click", () => openViewWindow(currentViewIndex - 1))
  // nextBtnView.addEventListener("click", () => openViewWindow(currentViewIndex + 1))

  // galleryItems.forEach((item, index) => {
  //   item.dataset.index = index

  //   item.addEventListener("click", () => {
  //     openViewWindow(+item.dataset.index)
  //     window.history.pushState({popup: 1}, "popup","#popup")
  //     setPopUpVisibility(true, popupView, popupViewIWindow, overlayView, closeBtnView)
  //   })
  // })

  // closeBtnView.addEventListener("click", closeViewWindow)
  // overlayView.addEventListener("click", closeViewWindow)

  // Burger

  const burger = document.querySelector(".burger");

  let isOpen = false

  const burgerMenuClose = () => {
    burger.style.left = "";

    setTimeout(() => {
      burger.style.display = "";
      isOpen = false
    }, 500);

    overflowToggle(true);
  };

  const burgerMenuOpen = () => {
    window.history.pushState({ menu: 1 }, "menu", "#menu");

    burger.style.display = "flex";

    setTimeout(() => {
      burger.style.left = "0";
      isOpen = true
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
      burgerMenuOpen()
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
  spaceBetween: 20,
  slidesPerView: 6,
  navigation: {
    nextEl: ".referee .swiper-button-next",
    prevEl: ".referee .swiper-button-prev",
  },
  // simulateTouch: true,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 30,
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
  spaceBetween: 50,
  slidesPerView: 1,
  navigation: {
    nextEl: ".partners .swiper-button-next",
    prevEl: ".partners .swiper-button-prev",
  },
  breakpoints: {
    400: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    },
  },
});

const sponsorsSwiper = new Swiper(".sponsors__swiper", {
  spaceBetween: 50,
  slidesPerView: 1,
  navigation: {
    nextEl: ".sponsors .swiper-button-next",
    prevEl: ".sponsors .swiper-button-prev",
  },
  breakpoints: {
    400: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    },
  },
});
