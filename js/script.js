var header = document.querySelector('header');
var mobile_menu = document.querySelector('.mobile-menu');
var btn_hamburger = document.querySelector('.btn-hamburger');

header.addEventListener('click',e => {
    if(e.target.parentElement.classList.contains('btn-hamburger') || e.target.classList.contains('btn-hamburger')) {
        if(mobile_menu.classList.contains("mobile-menu--hide"))
            openMenu();
        else
            closeMenu();
    }
});

function openMenu() {
    mobile_menu.classList.remove('mobile-menu--hide');
    btn_hamburger.classList.add('btn-hamburger--close');
    disableScroll();
}

function closeMenu() {
    mobile_menu.classList.add('mobile-menu--hide');
    btn_hamburger.classList.remove('btn-hamburger--close');
    enableScroll();
}

function disableScroll() {
    ["html","body"].forEach(el => {
        document.querySelector(el).style.overflow = "hidden";
    });
}

function enableScroll() {
    ["html","body"].forEach(el => {
        document.querySelector(el).style.overflow = "visible";
    });
}