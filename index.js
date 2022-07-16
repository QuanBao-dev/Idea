const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let page = 0;
const numberOfPages = 5;
let direction = null;
let startDelta = 0;
let isScrollVisible = false;
$(".header__logo").addEventListener("click", () => {
  slidingToPage(0, true);
});

window.addEventListener("resize", () => {
  window.removeEventListener("scroll", trackingPage);
  handleChangeStateScroll();
});

window.addEventListener("load", () => {
  window.removeEventListener("scroll", trackingPage);
  handleChangeStateScroll();
  handleHeader();
  $(".navigation-large").style.zIndex = -1;
});

function handleChangeStateScroll() {
  if (window.innerWidth <= 990) {
    isScrollVisible = true;
    window.document.body.style.overflowY = "visible";
    $("#fullpage").style.position = "static";
    $("#fullpage").style.transition = "0s";
    $("#fullpage").style.transform = "translateY(0)";
    $(".nav-bar__container").style.display = "none";
    if ($(".header")) $(".header").className = "header-mobile";
    onClickNavBar();
  } else {
    const temp = window.location.href.match(/#[a-zA-Z]+/);
    if (!temp) window.location.replace("#firstPage");
    isScrollVisible = false;
    window.document.body.style.overflowY = "hidden";
    $("#fullpage").style.position = "fixed";
    $(".nav-bar__container").style.display = "block";
    if ($(".header-mobile")) $(".header-mobile").className = "header";
    window.removeEventListener("scroll", trackingPage);
    initWebSlide();
  }
  sectionHeightAuto();
  anchorPageNavigate(false);
}

let scrollY1 = 0;
let scrollY2 = 0;
function trackingPage() {
  const sections = [...$$("#section")];
  scrollY2 = scrollY1 - window.scrollY;
  scrollY1 = window.scrollY;
  if ($(".header-mobile")) {
    if (scrollY2 > 0) {
      $(".header-mobile").style.transform = "translateY(0)";
    }
    if (scrollY2 < 0) {
      $(".header-mobile").style.transform = "translateY(-100%)";
    }
  }
  scrollingPathNavigate(sections[0], 0);
  scrollingPathNavigate(sections[1], 1);
  scrollingPathNavigate(sections[2], 2);
  scrollingPathNavigate(sections[3], 3);
  scrollingPathNavigate(sections[4], 4);
}
function scrollingPathNavigate(section, index) {
  if (
    section.getBoundingClientRect().top - 300 <= 1 &&
    section.getBoundingClientRect().top +
      section.getBoundingClientRect().height -
      300 >
      1
  ) {
    replacePath();
    page = index;
  }
}

function initWebSlide() {
  const sections = [...$$("#section")];
  onClickNavBar();
  $("#fullpage").style.transition = "0s";
  sections[page].addEventListener("wheel", handleWheel);
}

function onClickNavBar() {
  const listAnchorLink = [...$$("#overlay2-list a")];
  const listAnchorLinkImage = [...$$("#overlay3-list a")];
  const listNavBarItems = [...$$(".nav-bar__container__item")];
  listNavBarItems.forEach((link, index) => {
    link.addEventListener("click", () => {
      slidingToPage(index);
      navigationOff();
    });
  });
  listAnchorLink.forEach((link, index) => {
    link.addEventListener("click", () => {
      slidingToPage(index);
      navigationOff();
    });
    link.addEventListener("mouseenter", () => {
      listAnchorLinkImage[index].className = "hover";
    });
    link.addEventListener("touchstart", () => {
      listAnchorLinkImage[index].className = "hover";
    });
    link.addEventListener("touchend", () => {
      listAnchorLinkImage[index].className = null;
    });
    link.addEventListener("mouseleave", () => {
      listAnchorLinkImage[index].className = null;
    });
  });
  listAnchorLinkImage.forEach((link, index) => {
    link.addEventListener("click", () => {
      slidingToPage(index);
      navigationOff();
    });
  });
}

function anchorPageNavigate(isAnimation = true) {
  const temp = window.location.href.match(/#[a-zA-Z]+/);
  let anchorPage;
  if (temp) anchorPage = temp[0];
  else anchorPage = "#firstPage";
  if (anchorPage === "#firstPage") {
    slidingToPage(0, isAnimation);
  }
  if (anchorPage === "#secondPage") {
    slidingToPage(1, isAnimation);
  }
  if (anchorPage === "#thirdPage") {
    slidingToPage(2, isAnimation);
  }
  if (anchorPage === "#fourthPage") {
    slidingToPage(3, isAnimation);
  }
  if (anchorPage === "#fifthPage") {
    slidingToPage(4, isAnimation);
  }
}

function handleWheel(e) {
  if (isScrollVisible) return;
  if (e.deltaY > 0) {
    direction = "down";
  }
  if (e.deltaY < 0) {
    direction = "up";
  }
  if (direction === "down") {
    nextPage();
  } else {
    prevPage();
  }
}

function updateCurrentPageHeight() {
  if (!isScrollVisible) {
    $("#fullpage").style.transition = "0s";
    $("#fullpage").style.transform = `translateY(-${
      window.innerHeight * page
    }px)`;
  } else {
    setTimeout(() => {
      window.scroll({
        top: (window.innerWidth > 570 ? window.innerHeight : 900) * page,
        behavior: "auto",
      });
    }, 10);
  }
}

function slidingToPage(pageNavigate, isAnimation = true) {
  let sections = [...$$("#section")];
  sections[page].removeEventListener("wheel", handleWheel);
  page = pageNavigate;
  if (!isScrollVisible) {
    if (isAnimation) $("#fullpage").style.transition = "0.5s";
    else $("#fullpage").style.transition = "0s";
    $("#fullpage").style.transform = `translateY(-${
      window.innerHeight * page
    }px)`;
    sections[page].addEventListener("wheel", handleWheel);
    if ($(".header"))
      if (page === 1) {
        $(".header").style.color = "black";
        $(".header .one").style.backgroundColor = "black";
        $(".header .two").style.backgroundColor = "black";
        $(".header .three").style.backgroundColor = "black";
        $(".header__logo").style.color = "black";
      } else {
        $(".header").style.color = "white";
        $(".header .one").style.backgroundColor = "white";
        $(".header .two").style.backgroundColor = "white";
        $(".header .three").style.backgroundColor = "white";
        $(".header__logo").style.color = "white";
      }
    const navBarItems = [...$$(".nav-bar__container__item")];
    navBarItems.forEach((navBarItem, index) => {
      if (index === page) {
        navBarItem.className = "nav-bar__container__item active";
      } else {
        navBarItem.className = "nav-bar__container__item";
      }
    });
    if (page === 1) {
      navBarItems[1].style.backgroundColor = "black";
    } else {
      navBarItems[1].style.backgroundColor = "#bcbec28e";
    }
  } else {
    $(".header-mobile").style.color = "white";
    $(".header-mobile .one").style.backgroundColor = "white";
    $(".header-mobile .two").style.backgroundColor = "white";
    $(".header-mobile .three").style.backgroundColor = "white";
    setTimeout(() => {
      window.addEventListener("scroll", trackingPage);
      window.scroll({
        top: (window.innerWidth > 570 ? window.innerHeight : 900) * page,
        behavior: "auto",
      });
    }, 10);
  }
}

let prevAnchorLink = "firstPage";
function replacePath() {
  let newAnchorLink;
  if (page === 0) {
    newAnchorLink =
      window.location.href.replace(/\/$/, "").replace(/#[a-zA-Z]+/, "") +
      "#firstPage";
  }
  if (page === 1) {
    newAnchorLink =
      window.location.href.replace(/\/$/, "").replace(/#[a-zA-Z]+/, "") +
      "#secondPage";
  }
  if (page === 2) {
    newAnchorLink =
      window.location.href.replace(/\/$/, "").replace(/#[a-zA-Z]+/, "") +
      "#thirdPage";
  }
  if (page === 3) {
    newAnchorLink =
      window.location.href.replace(/\/$/, "").replace(/#[a-zA-Z]+/, "") +
      "#fourthPage";
  }
  if (page === 4) {
    newAnchorLink =
      window.location.href.replace(/\/$/, "").replace(/#[a-zA-Z]+/, "") +
      "#fifthPage";
  }
  if (!newAnchorLink) newAnchorLink = "#firstPage";

  if (newAnchorLink !== prevAnchorLink) {
    prevAnchorLink = newAnchorLink;
    window.location.replace(newAnchorLink);
  }
}

function prevPage() {
  if (page - 1 >= 0) {
    slidingToPage(page - 1, true);
    replacePath();
  }
}

function nextPage() {
  if (page + 1 < numberOfPages) {
    slidingToPage(page + 1, true);
    replacePath();
  }
}

function sectionHeightAuto() {
  const sections = [...$$("#section")];
  sections.forEach((sectionE) => {
    sectionE.style.height = `${window.innerHeight}px`;
  });
  updateCurrentPageHeight();
}

let toggleHeader = false;
let timeout;
function handleHeader() {
  $(".menu-toggle").addEventListener("click", () => {
    clearTimeout(timeout);
    toggleHeader = !toggleHeader;
    if (toggleHeader) {
      navigationOn();
    } else {
      navigationOff();
    }
  });
}

function navigationOff() {
  const [overlay1, overlay4] = [...$$("#overlay")];
  const overlay2 = $("#overlay2");
  const overlay3 = $("#overlay3");
  $(".menu-toggle").className = "menu-toggle";
  overlay1.className = overlay1.className.replace(" on", "");
  overlay4.className = overlay4.className.replace(" on", "");
  overlay2.className = overlay2.className.replace(" on", "");
  overlay3.className = overlay3.className.replace(" on", "");
  toggleHeader = false;
  if ($(".header")) {
    if (page === 1) {
      $(".header").style.color = "black";
      $(".header .one").style.backgroundColor = "black";
      $(".header .two").style.backgroundColor = "black";
      $(".header .three").style.backgroundColor = "black";
    }
  }
  timeout = setTimeout(() => {
    $(".fullpage-wrapper").style.zIndex = 1;
    $(".navigation-large").style.zIndex = -1;
    $(".nav-bar").style.zIndex = 10;
  }, 1000);
}

function navigationOn() {
  const [overlay1, overlay4] = [...$$("#overlay")];
  const overlay2 = $("#overlay2");
  const overlay3 = $("#overlay3");
  $(".navigation-large").style.zIndex = "1";
  $(".menu-toggle").className = "menu-toggle on";
  $(".nav-bar").style.zIndex = -1;
  overlay1.className += " on";
  overlay4.className += " on";
  overlay2.className += " on";
  overlay3.className += " on";
  toggleHeader = true;
  $(".fullpage-wrapper").style.zIndex = -1;
  if ($(".header")) {
    $(".header").style.color = "white";
    $(".header .one").style.backgroundColor = "white";
    $(".header .two").style.backgroundColor = "white";
    $(".header .three").style.backgroundColor = "white";
  }
}
