function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

init()

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 20+"px"
    crsr.style.top = dets.y + 20+"px"
})

gsap.from(".page1 h1,.page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
})
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
})
tl.to(".page1 h1", {
    x: -100,
}, "anim")
tl.to(".page1 h2", {
    x: 100
}, "anim")
tl.to(".page1 video", {
    width: "90%"
}, "anim")

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -100%",
        end: "top -120%",
        scrub: 3
    }
})
tl2.to(".main", {
    backgroundColor: "#fff",
})

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
})

tl3.to(".main",{
    backgroundColor:"#0F0D0D"
})


var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "470px"
        crsr.style.height = "370px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        crsr.style.width = "20px"
        crsr.style.height = "20px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})
// Selecting elements
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");

// Adding mouseenter and mouseleave event listeners
h4.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        purple.style.display = "block";
        purple.style.opacity = "1";
    });
    elem.addEventListener("mouseleave", function() {
        purple.style.display = "none";
        purple.style.opacity = "0";
    });
});

// Main video and grid videos interaction
const mainVideo = document.querySelector('.main-video');
const videos = document.querySelectorAll('.video');
const body = document.body;

// Calculate scroll thresholds
const expandThreshold = window.innerHeight;
const hideThreshold = window.innerHeight * 2;
const showGridThreshold = window.innerHeight * 3;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Phase 1: Expand main video
    if (scrollPosition < expandThreshold) {
        const scale = 1 + (scrollPosition / expandThreshold);
        mainVideo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        mainVideo.classList.remove('expanded');
        mainVideo.classList.remove('hidden');
    } 
    // Phase 2: Main video fullscreen
    else if (scrollPosition < hideThreshold) {
        mainVideo.classList.add('expanded');
        mainVideo.classList.remove('hidden');
    } 
    // Phase 3: Hide main video and show grid
    else if (scrollPosition >= hideThreshold) {
        mainVideo.classList.add('hidden');
        
        // Show grid videos with staggered animation
        videos.forEach((video, index) => {
            setTimeout(() => {
                video.classList.add('visible');
            }, index * 100);
        });
    }
});

// Scroll handling for layout visibility
const layoutContainer = document.querySelector('.layout-container');
const sections = document.querySelectorAll('.section');
const nextPage = document.querySelector('.next-page');
const socialMediaSection = document.querySelector('.social-media');

const expandThreshold2 = window.innerHeight * 0.5;
const layoutVisibleThreshold = socialMediaSection.offsetTop;
const nextPageThreshold = window.innerHeight * 6;

let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Handle scaling of main video based on scroll
    if (scrollPosition < expandThreshold2) {
        const scale = 1 + (scrollPosition / expandThreshold2) * 0.5;
        mainVideo.style.transform = `scale(${scale})`;
        mainVideo.style.opacity = '1';
        layoutContainer.classList.remove('visible');
    } else if (scrollPosition >= layoutVisibleThreshold) {
        mainVideo.style.opacity = '0';
        mainVideo.style.pointerEvents = 'none';
        layoutContainer.classList.add('visible');
        sections.forEach((section) => section.classList.add('visible'));
    }

    // Show next page when threshold is reached
    if (scrollPosition >= nextPageThreshold) {
        nextPage.classList.add('visible');
    }
});
