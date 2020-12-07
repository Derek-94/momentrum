const body = document.querySelector("body");

const IMG_NUM = 7;

function paintImg(imgNum){
    const image = new Image();
    image.src = `/images/${imgNum + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);

}

function genRandom(){
    const randomNum = Math.floor(Math.random() * IMG_NUM);
    return randomNum;
}

function init(){
    const imgNum = genRandom();
    paintImg(imgNum);
}

init();