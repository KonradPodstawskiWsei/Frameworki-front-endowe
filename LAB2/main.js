const main = document.querySelector('main');
const buttons = document.querySelector('.buttons');
const timer = document.querySelector('.timer');
const slides = document.querySelector('.slides');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const slides_children = slides.children;

let localId = 0;

const moveSlide = (id) => {
    slides.style.transform = `translateX(-${id * 600}px)`;
    localId = id;
}

[...slides_children].forEach((child, id)=> {
    buttons.innerHTML += '<button onclick=moveSlide('+id+')>' + id + '</button>';
});

const nextSlide = () => {
    localId++;
    if (localId === slides_children.length) {
        localId = 0;
    }

    moveSlide(localId);
}

const prevSlide = () => {
    localId--;
    if (localId === -1) {
        localId = slides_children.length - 1;
    }

    moveSlide(localId);
}

let intervalRef;

startInterval()
function startInterval() {
    intervalRef = setInterval(() => {
        localId++;
        moveSlide(localId % slides_children.length);
    }, 4000);
}

function stopInterval() {
    if (intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null; 
    }
}