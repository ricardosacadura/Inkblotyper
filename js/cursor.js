let innerCursor =document.querySelector('.inner-cursor');
let outerCursor =document.querySelector('.outer-cursor');

document.addEventListener('mousemove', moveCursor);

function moveCursor(e){
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}

let buttons = Array.from(document.querySelectorAll("button"));
let links = Array.from(document.querySelectorAll("a"));
let inputtext = Array.from(document.querySelectorAll("input"));

links.forEach(link =>{
    link.addEventListener('mouseover', ()=>{
    innerCursor.classList.add('grow');
    });
});
links.forEach(link =>{
    link.addEventListener('mouseleave', ()=>{
    innerCursor.classList.remove('grow');
    });
});


buttons.forEach(link =>{
    link.addEventListener('mouseover', ()=>{
    innerCursor.classList.add('grow');
    });
});
buttons.forEach(link =>{
    link.addEventListener('mouseleave', ()=>{
    innerCursor.classList.remove('grow');
    });
});

inputtext.forEach(link =>{
    link.addEventListener('mouseover', ()=>{
    innerCursor.classList.add('grow');
    });
});
inputtext.forEach(link =>{
    link.addEventListener('mouseleave', ()=>{
    innerCursor.classList.remove('grow');
    });
});