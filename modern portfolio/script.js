
gsap.registerPlugin(ScrollTrigger);


function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });


    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.childNodes[1].childNodes[1];

        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';
    })
}
function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            // create two spans
            let parent = document.createElement("span")
            let child = document.createElement("span")


            // parent and child both sets their respenctive classes
            parent.classList.add("parent")
            child.classList.add("child")

            // span parent gets child and child get elem details
            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);


            //elem replaces its value with parent span 
            elem.innerHTML = "";
            elem.appendChild(parent);
        })
}

function loaderAnimation() {
    var tl = gsap.timeline();

    tl
        .from(" #loader .child span", {
            x: 100,
            duration: 1.4,
            delay: 1,
            stagger: .2,
            ease: Power3.easeInOut
        })
        .to(" #loader .parent .child", {
            y: "-100%",
            duration: 1,
            ease: Circ.easeInOut
        })
        .to("#loader", {
            height: 0,
            duration: 1.5,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "100%",
            top: 0,
            duration: 1,
            delay: -1.23,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "0%",
            duration: 1.5,
            delay: -.5,
            ease: Circ.easeInOut,
            onComplete: function () {
                animateHomepage();
            }
        })

}

function animateHomepage() {

    var tl = gsap.timeline();
    tl
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: .05,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y: 0,
            stagger: .1,
            duration: 2,
            ease: Expo.easeInOut,
        })
        .to("#home .row img", {
            opacity: 1,
            delay: -0.8,
            onComplete: function () {
                animateSvg();
            }
        })
}

function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
}

// function locoInitialize() {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector('#main'),
//         smooth: true
//     });
// }

// function cardShow() {
//     document.querySelectorAll(".cnt")
//         .forEach(function (cnt) {
//             cnt.addEventListener("mousemove", function (dets) {
//                 // console.log(dets.target)
//                 // console.log(document.querySelector("#cursor").children)
//                 document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
//                 document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
//             })
//         })
// }
let scroll;

function locoInitialize() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}


function cardHoverEffect() {
    document.querySelectorAll(".cnt").forEach(function (cnt) {
        var showingImage;
        cnt.addEventListener("mousemove", function (dets) {
            const scrollY = scroll.scroll.instance.scroll.y
            const scrollX = scroll.scroll.instance.scroll.x;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
            showingImage = dets.target;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX + scrollX}px, ${dets.clientY + scrollY}px)`;

            showingImage.style.filter = "grayscale(1)"
            document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
        });
        cnt.addEventListener("mouseleave", function (dets) {
            document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
            showingImage.style.filter = "grayscale(0)"
            document.querySelector("#work").style.backgroundColor = "#F2F2F2";
        });
    });
}

revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
cardHoverEffect()

ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();



// honors_bottom_right_div_mid gsap goes here


document.querySelectorAll('.honors_bottom_right_mid').forEach((el) => {
    new SplitType(el);
    const direction = el.dataset.direction;
    let fromVars = {};
    if (direction === "bottom") fromVars = { y: 100 };

    gsap.set(el.querySelectorAll('.char'), fromVars);

    gsap.to(el.querySelectorAll('.char'), {
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            scroller: "#main", // Needed for Locomotive
            // markers: true,
        }
    });
});

document.querySelectorAll('.gray_text').forEach(el => {
    gsap.set(el, { y: 100, opacity: 0 });

    gsap.to(el, {
        y: 0,
        opacity: 0.6,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 92%",
            scroller: "#main",
            // markers: true
        }
    });
});
document.querySelectorAll('.tick_img').forEach(el => {
    gsap.set(el, { x: -40, opacity: 0 });

    gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            scroller: "#main",
            // markers: true
        }
    });
});


// footer divs click to open the links for linkedIn , twitter and netlify and many more

  document.getElementById("footer_socials_div1").addEventListener("click", function () {
    window.open("https://github.com/okroshan4u", "_blank");
  });
  document.getElementById("footer_socials_div2").addEventListener("click", function () {
    window.open("https://github.com/okroshan4u", "_blank");
  });
  document.getElementById("footer_socials_div3").addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/roshan-kumar-ram-512457246/", "_blank");
  });
  document.getElementById("footer_socials_div4").addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/roshan-kumar-ram-512457246/", "_blank");
  });
