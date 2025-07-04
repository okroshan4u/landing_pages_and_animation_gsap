
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
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

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
}

locomotiveAnimation();

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize",function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    render();
})

// function files(index){
//     var data = `./img1/male0001.png
//     ./img1/male0002.png
//     ./img1/male0003.png
//     ./img1/male0004.png
//     ./img1/male0005.png
//     `
//     return data.split("\n")[index];
// }

// const frameCount = 300;

// const images = [];
// const imgaeSeq = {
//     frame:1,
// }

// for(let i=0 ; i< frameCount ; i++){
//     const img = new Image();
//      img.src = files(i)
//      images.push(img)
//     }


// Function to generate file path based on index
function files(index) {
    // Pad the index with leading zeros to get '0001', '0002', ..., '0300'
    const paddedIndex = String(index + 1).padStart(4, '0');
    return `./img1/male${paddedIndex}.png`;
}

const frameCount = 300;
const images = [];
const imageSeq = {
    frame: 1,
};

// Preload all 300 images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i); // dynamically generate each file path
    images.push(img);
}


gsap.to(imageSeq,{
    frame:frameCount - 1,
    snap:"frame",
    ease:"none",
    scrollTrigger:{
        scrub:0.15,
        trigger:'#page>canvas',
        start:'top top',
        end:"600% top",
        scroller:"#main",
    },
    onUpdate:render,
});

images[1].onloade = render;

function render(){
    scaleImage(images[imageSeq.frame],context);
}

function scaleImage(img , ctx){
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;

    var ratio = Math.max(hRatio,vRatio);
    var centerShift_x = (canvas.width - img.width * ratio )/2;
    var centerShift_y = (canvas.height - img.height * ratio )/2;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
}


ScrollTrigger.create({
    trigger: "#page > canvas",
    pin: true,
    // markers: true,
    scroller: "#main", // Fix the selector
    start: "top top",
    end: "600% top"
});



["#page1", "#page2", "#page3"].forEach(page => {
    gsap.to(page, {
        scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom top",
            // markers: true,
            pin: true,
            scroller: "#main",
            pinType: "transform"
        }
    });
});

