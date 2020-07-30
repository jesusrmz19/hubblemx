var curBot = 0;
var scrollable = true;
var scrollableSec = false;
var scrolling = false;
var upOrDown = '';
var section = document.querySelector('.sections');
var sections = document.querySelectorAll("section");
var sectionIndex ;
var numPlanes = 5;
var plan = 1;
var prefix = ".plan-";
var secPrefix = ".sec-";
var radioPrefix = "#radio-";
var radio = document.querySelector('.side-nav-flex');
var scrollTo = 0;
var test = "";
var footerTrig = false;
var temp ;
var coolDownVal;

// Check if user is using Mar or Windows
function isMacintosh() {
    if(navigator.platform.indexOf('Mac') > -1){
        coolDownVal = 2500;
        return true;
    }
    coolDownVal = 1500;
    return false;
}

// Portals

const portalesBtn = document.querySelector('.portales-btn');
const portales = document.querySelector('.portales-wrapper');
let isPortalActive = false;
function showPortals() {
    if(!isPortalActive) {
        portales.setAttribute('style','left: calc(100% - 300px)');
        isPortalActive = true;
    }else{
        portales.setAttribute('style','left: calc(100% - 50px)');
        isPortalActive = false;
    }
}
portalesBtn.addEventListener('click',showPortals);

// Video Can Play, if so, play in 5s
var video = document.getElementById("video");
video.addEventListener("canplay", function() {
  setTimeout(function() {
    video.play();
  }, 3100);
});


// Mobile Navbar Overlay function:

const menuBtn = document.querySelector('#toggleNav');
const myMenu = document.querySelector('#myMenu');

function toggleMenu(){
    myMenu.classList.toggle('open');
    console.log(document.querySelector('.logo'));

}

menuBtn.addEventListener('click', toggleMenu);

// Navbar Into view
function intoView() {
    scrollable = false;
    document.querySelector('.nav').classList.remove('active');
    document.querySelector('.side-nav').classList.remove('active');
    //document.querySelector(radioPrefix+test).innerHTML = test;
    section.style.transform = "translateY(-"+curBot+"vh)";
    setTimeout(function() {
        scrollable = true;
    }, 2500);
}
document.getElementById('nav-menu').addEventListener('click', function(e){
    curBot = parseInt(e.target.getAttribute('data-curBot'));
    let targetRad = e.target.getAttribute('data-rad');
    let prevRad ;
    sections.forEach(function(section,index) {
        if(isElementVisible(section)){
            prevRad = section.getAttribute('data-rad');
        }
    });
    if(prevRad != "0" && prevRad != "v"){
        radio.querySelector(radioPrefix+prevRad).classList.remove('active');
        radio.querySelector(radioPrefix+targetRad).classList.add('active');
    }else if(prevRad == "v") {
        radio.querySelector(radioPrefix+"1").classList.remove('active');
        radio.querySelector(radioPrefix+targetRad).classList.add('active');
    }
    intoView();
});

document.getElementById('myMenu').addEventListener('click', function(e){
    curBot = parseInt(e.target.getAttribute('data-curBot'));
    myMenu.classList.toggle('open');
    if(curBot != 0 ){
        intoView();
    }
    return;
});

// Check what section is visible to work accordingly
function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    // Return false if it's not in the viewport
    if (rect.y != 0)
        return false;
    // Return true if any of its four corners are visible
    return (rect.x == 0 && rect.y == 0);
}
function startCooldown() {
    scrollable = false;
    setTimeout (function(){ scrollable = true}, 1500);
}
function startCooldown2() {
    scrollableSec = false;
    setTimeout (function(){ scrollableSec = true}, 1500);
}
// Navigate Down one section
function navDown() {
    curBot += 100;
    //section.style.transform = "translateY(-"+curBot+"vh)";
    section.setAttribute('style','transform:translateY(-'+curBot+'vh); -webkit-transform: translateY(-'+curBot+'vh)');
    console.log(curBot);
    startCooldown();
}

// Navigate Up one section
function navUp() {
    curBot -= 100;
    //section.style.transform = "translateY(-"+curBot+"vh)";
    section.setAttribute('style','transform:translateY(-'+curBot+'vh); -webkit-transform: translateY(-'+curBot+'vh)');
    console.log(curBot);
    startCooldown();
}

// Pagination in section four, to show the plans
function paginationDown() {
    scrolling = true;
    document.querySelector(prefix+plan).classList.add('active');
    document.querySelector(prefix+(plan-1)).classList.remove('active');
    setTimeout(function() {
        scrolling = false;
    }, 1500);
}

// Pagination in section four, to show the plans
function paginationUp() {
    scrolling = true;
    document.querySelector(prefix+plan).classList.add('active');
    document.querySelector(prefix+(plan+1)).classList.remove('active');
    setTimeout(function() {
        scrolling = false;
    }, 1500);
}
function descubreMas() {
    document.querySelector('.nav').classList.remove('active');
    document.querySelector('.side-nav').classList.remove('active');
    document.querySelector('.logo').classList.add('active');
    upOrDown = '';
    navDown();
}

// Case function for a continuos scrolling and/or up and down with arrow keys and buttons
function animateSections(sectionIndex){
    switch (sectionIndex) {
        case "0":
            if(upOrDown == 'down') {
                document.querySelector('.nav').classList.remove('active');
                //document.querySelector('#radio-1').innerHTML = '01';
                document.querySelector('.side-nav').classList.remove('active');
                document.querySelector('.logo').classList.add('active');
                upOrDown = '';
                navDown();
            }else{
                return;
            }
        break;
        case "1":
            let animate = document.querySelector(secPrefix+sectionIndex);
            if(upOrDown == 'down') {
                if(animate.classList.contains('active') && scrollableSec) {
                    upOrDown = '';
                    navDown();
                    document.querySelector(radioPrefix+'1').classList.remove('active');
                    document.querySelector(radioPrefix+'2').classList.add('active');
                }else{
                    animate.classList.add('active');
                    startCooldown2();
                }
            }else if(upOrDown == 'up') {
                if(animate.classList.contains('active') ) {
                    upOrDown = '';
                    animate.classList.remove('active');
                }else{
                    return;
                }
            }
        break;
        case "2":
            let animate3 = document.querySelector(secPrefix+sectionIndex);
            if(upOrDown == 'down') {
                if(animate3.classList.contains('active') && scrollableSec) {
                    upOrDown = '';
                    navDown();
                    document.querySelector(radioPrefix+'2').classList.remove('active');
                    document.querySelector(radioPrefix+'3').classList.add('active');
                }else{
                    animate3.classList.add('active');
                    startCooldown2();
                }
            }else if(upOrDown == 'up') {
                if(animate3.classList.contains('active')) {
                    upOrDown = '';
                    animate3.classList.remove('active');
                }else if(!animate3.classList.contains('active')){
                    upOrDown = '';
                    navUp();
                    document.querySelector(radioPrefix+'2').classList.remove('active');
                    document.querySelector(radioPrefix+'1').classList.add('active');
                }
            }
        break;
        case "3":
            let animate5 = document.querySelector(secPrefix+sectionIndex);
            if(upOrDown == 'down') {
                if(animate5.classList.contains('active') && scrollableSec) {
                    upOrDown = '';
                    navDown();
                    document.querySelector(radioPrefix+'3').classList.remove('active');
                    document.querySelector(radioPrefix+'4').classList.add('active');
                }else{
                    animate5.classList.add('active');
                    startCooldown2();
                }
            }else if(upOrDown == 'up') {
                if(animate5.classList.contains('active')) {
                    upOrDown = '';
                    animate5.classList.remove('active');
                }else if(!animate5.classList.contains('active')){
                    upOrDown = '';
                    navUp();
                    document.querySelector(radioPrefix+'3').classList.remove('active');
                    document.querySelector(radioPrefix+'2').classList.add('active');

                }
            }
        break;
        case "4":
            if(scrolling){return;}
            if(upOrDown == 'down') {
                if(plan == numPlanes) {
                    upOrDown = '';
                    navDown();
                }else{
                    plan++;
                    paginationDown();
                }
            }else if(upOrDown == 'up') {
                if(plan == 1) {
                    upOrDown = '';
                    navUp();
                    document.querySelector(radioPrefix+'4').classList.remove('active');
                    document.querySelector(radioPrefix+'3').classList.add('active');
                }else{
                    plan--;
                    paginationUp();
                }
            }
        break;
        case "6":
            let animate6 = document.querySelector(secPrefix+sectionIndex);
            if(upOrDown == 'down') {
                if(animate6.classList.contains('active') && scrollableSec) {
                    upOrDown = '';
                    navDown();
                    document.querySelector(radioPrefix+'4').classList.remove('active');
                    document.querySelector(radioPrefix+'5').classList.add('active');
                }else{
                    animate6.classList.add('active');
                    startCooldown2();
                }
            }else if(upOrDown == 'up') {
                if(animate6.classList.contains('active')) {
                    upOrDown = '';
                    animate6.classList.remove('active');
                    startCooldown2();
                }else if(!animate6.classList.contains('active')) {
                    upOrDown = '';
                    navUp();
                }
            }
        break;
        case "7":
            let animate7 = document.querySelector(secPrefix+sectionIndex);
            let footer = document.querySelector('.footer');
            if(upOrDown == 'down') {
                animate7.classList.add('active');/*
                if(animate7.classList.contains('active') && footerTrig) {
                    upOrDown = '';
                    footer.classList.add('active');
                    footerTrig = false;
                }else{
                    animate7.classList.add('active');
                    setTimeout (function(){ footerTrig = true}, 2000);
                }*/
            }else if(upOrDown == 'up') {
                if(animate7.classList.contains('active')) {
                    upOrDown = '';
                    animate7.classList.remove('active');
                    startCooldown2();
                }else if(!animate7.classList.contains('active')){
                    upOrDown = '';
                    navUp();
                    document.querySelector(radioPrefix+'5').classList.remove('active');
                    document.querySelector(radioPrefix+'4').classList.add('active');

                }
            }
        break;
        default:
            if(upOrDown == 'down') {
                upOrDown = '';
                navDown()
            }else if(upOrDown == 'up') {
                upOrDown = '';
                navUp();
            }
        break;
    }
}
// Para el botón del side nav
document.getElementById('btn-down').addEventListener('click', function(){
    sections.forEach(function(section,index) {
        if(isElementVisible(section)){
            sectionIndex = section.getAttribute('data-index');
        }
    });
    upOrDown = 'down';
    animateSections(sectionIndex);
});

// KeyUp listener for the page up page down up and down arrow keys
document.addEventListener('keyup', function(e){
    if (event.keyCode == 9) {
        return;
    }
    sections.forEach(function(section,index) {
        if(isElementVisible(section)){
            sectionIndex = section.getAttribute('data-index');
        }
    });
    if (event.keyCode == 40 && curBot <= 900 && scrollable || event.keyCode == 34 && curBot <= 900 && scrollable) {
            upOrDown = 'down';
    }
    else if (event.keyCode == 38 && curBot > 0 && scrollable || event.keyCode == 33 && curBot <= 900 && scrollable){
            upOrDown = 'up';
    }
    animateSections(sectionIndex);
});

// Window scroll listener
window.addEventListener('wheel', function(e){
    sections.forEach(function(section,index) {
        if(isElementVisible(section)){
            sectionIndex = section.getAttribute('data-index');
        }
    });
    if((e.wheelDelta < 0 || e.detail > 0) && curBot <= 900 && scrollable) {
        upOrDown = 'down';
    }else if((e.wheelDelta > 0 || e.detail < 0) && curBot > 0 && scrollable) {
        upOrDown = 'up';
    }else if((e.wheelDelta > 0 || e.detail < 0) && curBot >= 0 && scrollable) {
        upOrDown = 'up';
    }
    animateSections(sectionIndex);
});

// Window scroll listener
var ts;
window.addEventListener('touchstart', function(e){
    ts = e.changedTouches[0].clientY;
});
window.addEventListener('touchmove', function(e){
    var te = e.changedTouches[0].clientY;
    sections.forEach(function(section,index) {
        if(isElementVisible(section)){
            sectionIndex = section.getAttribute('data-index');
        }
    });
    if ((ts > te)  && scrollable) {
        upOrDown = 'down';
    } else if((ts < te)  && scrollable) {
        upOrDown = 'up';
    }
    animateSections(sectionIndex);
});
