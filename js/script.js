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

// webp support for browsers
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
let webp_imgs = document.querySelectorAll('.webp-img-check');

// missing forEach on NodeList for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

if(isIE || isSafari) {
    // replace webp images in css
    webp_imgs.forEach(img => {
        let url = img.currentStyle || window.getComputedStyle(img, false).backgroundImage.replace(/"/g, "");
        
        if(url === img.currentStyle)
            img.style.backgroundImage = url.backgroundImage.replace("webp","jpg");
        else if(url === window.getComputedStyle(img, false).backgroundImage.replace(/"/g, ""))
            img.style.backgroundImage = url.replace("webp","jpg");
    });
    
    // replace webp images in html
    const script1 = document.createElement('script');
    script1.setAttribute('src','https://unpkg.com/webp-hero@0.0.0-dev.27/dist-cjs/polyfills.js');
    const script2 = document.createElement('script');
    script2.setAttribute('src','https://unpkg.com/webp-hero@0.0.0-dev.27/dist-cjs/webp-hero.bundle.js');
    const head = document.querySelector('head');
    head.appendChild(script1);
    script1.addEventListener('load',function(e) {
        head.appendChild(script2);
        script2.addEventListener('load',function() {
            const webpMachine = new webpHero.WebpMachine();
            webpMachine.polyfillDocument();
        });
    });
}