// const speedEl = document.querySelector("#speed");
// const textEl = document.querySelector("#typed_text");

// let textToAnimate = "we love programming...";
// let index = 0;
// let isDeleting = false;

// let speed = 300 / speedEl.value;


// speedEl.addEventListener("input", (e) => {
//     speed = 300 / e.target.value;
// });

// function animateText() {

//     textEl.innerText = textToAnimate.slice(0, index);


//     if (isDeleting) {
//         index--;
//     } else {
//         index++;
//     }


//     if (index === textToAnimate.length) {
//         isDeleting = true;
//     } else if (index === 0) {
//         isDeleting = false;
//     }

//     setTimeout(animateText, speed);
// }

// animateText();


const speedEl = document.querySelector("#speed");
const textEl = document.querySelector("#typed_text");

const texts = [
  "We love programming...",
  "JavaScript is fun!",
  "You're doing great!",
  "Keep coding!"
];

let textIndex = 0;
let index = 0;
let isDeleting = false;

let speed = 300 / speedEl.value;

speedEl.addEventListener("input", (e) => {
  speed = 300 / e.target.value;
});

function animateText() {
  const currentText = texts[textIndex];
  textEl.innerText = currentText.slice(0, index);

  if (isDeleting) {
    index--;
  } else {
    index++;
  }

  if (index === currentText.length && !isDeleting) {
    isDeleting = true;
    setTimeout(animateText, 1000); // waiting 1s before deleting the current text which is aniamted
    return;
  }

  if (index === 0 && isDeleting) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(animateText, speed);
}

animateText();
