const main = document.querySelector('main');
const buttons = document.querySelector('.buttons');
const timer = document.querySelector('.timer');
const slides = document.querySelector('.slides');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const slides_children = slides.children;

let localId = 0;
let isFade = false;

const setAnimationType = (type) => {
    isFade = type;
}

const moveSlide = (id) => {

    if (isFade) {
        slides.style.opacity = 0;
        setTimeout(() => {
            slides.style.opacity = 1;
            slides.style.transform = `translateX(-${id * 600}px)`;
        }, 250);

    } else {
        slides.style.transform = `translateX(-${id * 600}px)`;
    }

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

function openLightbox(event) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.display = 'flex';

    const content = document.createElement('div');
    content.className = 'lightbox-content';

    if (event.target.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = event.target.src;
        content.appendChild(img);
    } else if (event.target.tagName === 'VIDEO') {
        const video = document.createElement('video');
        video.src = event.target.src;
        video.controls = true;
        video.autoplay = true;
        content.appendChild(video);
    }

    lightbox.appendChild(content);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
        lightbox.remove();
        startInterval();
    });

    stopInterval();
}

document.querySelectorAll('.zoomable').forEach(item => {
    item.addEventListener('click', openLightbox);
});