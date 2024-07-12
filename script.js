const canvas = document.getElementById("bubbleSort");
const ctx = canvas.getContext("2d");
const button = document.querySelector('#myButton');
const buttonValue =document.querySelector("#includeNumbers");
const speed = 1;
const width = 55;
const height = 50;
const margin = 10;
const colorSort = "rgb(100, 0, 0)";
const color = "rgb(200, 0, 0)";

class Rectangle {
    constructor(width, height, cordX, cordY, number, color) {
        this.height = height;
        this.width = width;
        this.cordX = cordX;
        this.cordY = cordY;
        this.number = number;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.cordX, this.cordY, this.width, this.height);
        ctx.font = '25px Arial';
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(
            this.number, 
            this.cordX + (this.width / 2) - 7, 
            this.cordY + (this.height / 2) + 7 
        );
    }
    clear() {
        ctx.clearRect(this.cordX, this.cordY, this.width, this.height);
    }
}

function addValue() {
    let rectLst = [];
    const input = document.getElementById("numbers");
    const value = input.value;
    let lst = value.split(" ").map(Number);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < lst.length; i++) {
        rectLst.push(new Rectangle(width, height, i * (width + margin) + ((canvas.width - (width * lst.length))/2) , 100, lst[i], color));
        rectLst[i].draw();
    }
    return rectLst;
}

async function animateSwap(el1, el2, resolve, rectLst) {
    let newXEl1 = el2.cordX;
    let newXEl2 = el1.cordX;
    await new Promise(resolve => setTimeout(resolve, speed + 1000));
    const intervalId = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        el1.cordX += 1;
        el2.cordX -= 1;
        for (let i = 0; i < rectLst.length; i++) {
            rectLst[i].draw();
        }

        if (el1.cordX == newXEl1 && el2.cordX == newXEl2) {
            clearInterval(intervalId);
            resolve();
        }
    }, speed)
}

async function bubbleSort(rectLst) {
    for (let j = rectLst.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            rectLst[i].color = "rgb(250, 233, 0)";
            rectLst[i+1].color = "rgb(250, 233, 0)";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < rectLst.length; i++) {
                rectLst[i].draw();
            }
            if (rectLst[i].number > rectLst[i + 1].number) {
                await new Promise(resolve => {
                    animateSwap(rectLst[i], rectLst[i+1], resolve, rectLst);
                }) 
                let temp = rectLst[i];
                rectLst[i] = rectLst[i + 1];
                rectLst[i + 1] = temp;
            } else {
                await new Promise(resolve => setTimeout(resolve, speed + 1200));
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < rectLst.length; i++) {
                rectLst[i].draw();
            }
            rectLst[i].color = color;
            rectLst[i+1].color = color;
        }
        rectLst[j].color = colorSort;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < rectLst.length; i++) {
            rectLst[i].draw();
        }

    }
    rectList = [];
    console.log(rectLst);
}

button.addEventListener("click", async () => {
    let rectLst = addValue();
    rectLst = await bubbleSort(rectLst);
});
buttonValue.addEventListener("click", () => addValue());
