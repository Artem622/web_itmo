// localStorage.clear()
const graph = document.getElementById("graph");
const context = graph.getContext("2d");
let x = 0
let y = 1
let r = 3
let lastBntId = 'form:btn4'
const gostPointColor = '#7e5468'
const successPointColor = '#0deeb2'
const unsuccessPointColor = '#cc1b71'
console.log(graph.width, graph.height)

//Рисуем ДПСК
function drawCellBackground(){

    // Задаем размеры клетки
    let cellSize = 25;
    // Изменяем цвета
    context.strokeStyle = 'black'; // Цвет обводки клеток
    context.fillStyle = 'rgb(97, 234, 17)'; // Цвет заливки клеток

    // Количество клеток в ширину и высоту, основываясь на новом размере
    let numRows = (graph.height / cellSize )
    let numCols = (graph.width / cellSize )



    // Рисуем клетчатое поле
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {

            // Определяем координаты верхнего левого угла каждой клетки
            let x = col * cellSize;
            let y = row * cellSize;

            // Рисуем клетку
            context.strokeRect(x, y, cellSize, cellSize);
            context.fillRect(x, y, cellSize, cellSize);
        }
    }
    context.font = '12px monospace'
    // Рисуем ось X
    context.strokeStyle = 'black'; // Цвет оси X
    context.beginPath();
    context.moveTo(0, graph.height / 2);
    context.lineTo(graph.width, graph.height / 2);
    context.stroke();

    // Стрелка для оси X
    context.fillStyle = 'black';
    context.beginPath();
    context.moveTo(graph.width - 10, graph.height / 2 - 5);
    context.lineTo(graph.width, graph.height / 2);
    context.lineTo(graph.width - 10, graph.height / 2 + 5);
    context.closePath();
    context.fill();

    // Добавляем отметки на оси X
    context.fillStyle = 'black'; // Цвет отметок и чисел

    let stepX = cellSize; // Шаг между отметками
    let centerX = graph.width / 2;
    for (let x = centerX + stepX; x < graph.width; x += stepX) {
        context.fillRect(x, graph.height / 2 - 5, 1, 10); // Рисуем вертикальную отметку
        context.fillText((x - centerX) / stepX, x - 3, graph.height / 2 + 20); // Рисуем число
    }
    for (let x = centerX - stepX; x > 0; x -= stepX) {
        context.fillRect(x, graph.height / 2 - 5, 1, 10); // Рисуем вертикальную отметку
        context.fillText((x - centerX) / stepX, x - 6, graph.height / 2 + 20); // Рисуем число
    }

    // Рисуем ось Y
    context.strokeStyle = 'black'; // Цвет оси Y
    context.beginPath();
    context.moveTo(graph.width / 2, 0);
    context.lineTo(graph.width / 2, graph.height);
    context.stroke();

    // Стрелка для оси Y
    context.fillStyle = 'black';
    context.beginPath();
    context.moveTo(graph.width / 2 - 5, 10);
    context.lineTo(graph.width / 2, 0);
    context.lineTo(graph.width / 2 + 5, 10);
    context.closePath();
    context.fill();

    // Добавляем отметки на оси Y
    context.fillStyle = 'black'; // Цвет отметок и чисел
    let stepY = cellSize; // Шаг между отметками
    let centerY = graph.height / 2;
    for (let y = centerY + stepY; y < graph.height; y += stepY) {context.fillRect(graph.width / 2 - 5, y, 10, 1); // Рисуем горизонтальную отметку
        context.fillText(-(y - centerY) / stepY, graph.width / 2 +7, y + 5); // Рисуем число
        console.log(graph.width,graph.height,'fhsd')
    }
    for (let y = centerY - stepY; y > 0; y -= stepY) {context.fillRect(graph.width / 2 - 5, y, 10, 1); // Рисуем горизонтальную отметку
        context.fillText(-(y - centerY) / stepY, graph.width / 2 +7, y + 5); // Рисуем число
    }
}

//рисуем график
function drawGraph(r){
    drawCellBackground()
    let radius = r
    const centerX = graph.width / 2;
    const centerY = graph.height / 2;

    //рисуем график
    context.fillStyle = 'rgba(217,18,239,0.45)'

    //1 четверть
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX+radius*25, centerY);
    context.lineTo(centerX,centerY-radius*25);
    context.fill();

    //2 четверть
    context.fillRect(centerX-radius*25,centerY-radius*25/2,radius*25,radius*25/2)

    //4 четверть
    context.beginPath();
    context.moveTo(centerX, centerY); // Перемещаемся в центр круга
    context.arc(centerX, centerY, radius*25, 0, Math.PI/2, false); // Рисуем дугу
    context.closePath();
    context.fill(); // Закрашиваем область, чтобы получить четверть круга
}


function drawText(x,y,r){
    let drX = (x- 150) / 25
    let drY = (-y + 150)/ 25
    context.fillStyle = 'black';
    context.textAlign = "center";
    context.fontWeight = "bold"
    context.font = "12px arial";
    context.fillText(`(${drX},${drY},${r})`,x+5,y-5)
}
//рисуем точку по координатам
function drawPoint(x,y,colorPoint){
    drawText(x * 25 + 150, -y * 25 + 150,r)
    context.fillStyle= colorPoint
    context.beginPath();
    context.arc(x*25+150,-y*25+150,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}

function drawGostPoint(x,y,colorPoint){
    context.fillStyle= colorPoint
    context.beginPath();
    context.arc(x*25+150,-y*25+150,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}

function jokeOnJsf(x,y,r,color){
    let xArr = []
    let yArr = []
    let rArr = []
    let colorArr = []
    if(localStorage.getItem('x') != null){
        xArr = JSON.parse(localStorage.getItem('x'))
    }
    if(localStorage.getItem('y') != null){
        yArr = JSON.parse(localStorage.getItem('y'))
    }
    if(localStorage.getItem('r') != null){
        rArr = JSON.parse(localStorage.getItem('r'))
    }
    if(localStorage.getItem('color') != null){
        colorArr = JSON.parse(localStorage.getItem('color'))
    }
    xArr.push(parseFloat(x))
    yArr.push(parseFloat(y))
    rArr.push(parseFloat(r))
    colorArr.push(color)
    localStorage.setItem("x", JSON.stringify(xArr))
    localStorage.setItem("y", JSON.stringify(yArr))
    localStorage.setItem("r", JSON.stringify(rArr))
    localStorage.setItem("color", JSON.stringify(colorArr))
}
function checkFirstQuarter(x,y,r){
    if (x >= 0 && y >= 0) {
//            return ((Math.abs(x) >= Math.abs(y)) && (Math.abs(y) <= r/2) && (Math.abs(x) <= r)) || ((x == 0) && (Math.abs(y) <= r/2));
        return (y + x - r) <= 0;
    }
}

function checkSecondQuarter(x,y,r){
    if (x <= 0 && y >= 0) {
        return (Math.abs(x) <= Math.abs(r)) && (Math.abs(y) <= Math.abs(r/2));
    }
}
function checkForthQuarter(x,y,r){
    if (x >= 0 && y <= 0) {
        return (Math.abs(x) <= Math.abs(r)) && (Math.abs(y) <= Math.abs(r)) && (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(r,2));
    }
}

//отправка точки с графа
document.getElementById('graph').addEventListener("click", (event)=>{
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const {x,y} = isSafari ? { x: event.layerX, y: event.layerY } : { x: event.offsetX, y: event.offsetY }
    let rad = r
    let tempColor = null
    document.getElementById("form:x-hidden-value").value = convertInputX(x)
    document.getElementById("form:y-hidden-value").value = convertInputY(y)
    if(checkFirstQuarter(convertInputX(x),convertInputY(y),r) || checkSecondQuarter(convertInputX(x),convertInputY(y),r) || checkForthQuarter(convertInputX(x),convertInputY(y),r)){
        tempColor = successPointColor
    }
    else {
        tempColor = unsuccessPointColor
    }
    console.log(localStorage)
    jokeOnJsf(convertInputX(x),convertInputY(y),r,tempColor)
    console.log(localStorage)
    drawPointInput(x,y,tempColor)
    console.log(convertInputX(x),convertInputY(y))
    console.log(document.getElementById("form:x-hidden-value").value)
    console.log(document.getElementById("form:y-hidden-value").value)
    console.log("    document.getElementById(\"testButton\").click()\n")
    document.getElementById("form:testButton").click()


})


function drawPointInput(x,y,color){
    drawText(x,y,r)
    context.fillStyle=color
    context.beginPath();
    context.arc(x,y,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}

function drawOldPoint(r){
    const xArr = JSON.parse(localStorage.getItem('x'))
    const yArr = JSON.parse(localStorage.getItem('y'))
    const rArr = JSON.parse(localStorage.getItem('r'))
    const colorArr = JSON.parse(localStorage.getItem('color'))
    for (let i = 0; i < xArr.length; i++) {
        if(rArr[i] == r){
            console.log(xArr[i],yArr[i])
            drawPoint(xArr[i],yArr[i],colorArr[i])
        }
    }
}

//выводим попап, если y не удоветворяет
function setPopup(){
    document.getElementById('form:y_popup_text').style.display = 'flex'

    setTimeout(()=>{
        document.getElementById('form:y_popup_text').style.display = 'none'

    },4000)
}

//проверка на пустоту y
function checkYNull(y){
    if ((y != "" && y != NaN) || y===0){
        return true
    } else{
        setPopup()
        return false
    }
}

//проверка на корректность y
function checkY(y) {
    if(-5 <= y && y <= 3){
        return true
    } else {
        setPopup()
        return false
    }
}

//конвертация х в координаты ДПСК
function convertInputX(x){
    return x/25-6
}

//конвертация у в координаты ДПСК
function convertInputY(y){
    return -(y/25-6)
}

function setX(value,ids){
    x = value
    console.log(x)
    console.log(lastBntId)
    let lastBtn = document.getElementById(lastBntId);
    lastBtn.classList.remove("active");
    let btn = document.getElementById(ids);
    btn.classList.add("active");
    lastBntId = ids
    drawGostPoint(x,y,gostPointColor)
}

function setR(value){
    r = value
    drawGraph(value)
    drawOldPoint(r)
    console.log("complete r",r)
}

//отрисовка точки по клику на кнопку
function drawResultUser(){
    let tempColor = null
    let yinp = parseFloat(document.getElementById("form:y-value").value.replace(/,/g, "."))
    y = yinp

    console.log(y)
    if(checkY(y) && checkYNull(y)){
        if(checkFirstQuarter(x,y,r) || checkSecondQuarter(x,y,r) || checkForthQuarter(x,y,r)){
            tempColor = successPointColor
        }
        else {
            tempColor = unsuccessPointColor
        }
        jokeOnJsf(x,y,r,tempColor)
        drawPoint(x,y,tempColor)
        console.log('fe')
        console.log(x,y,r,tempColor,'yes')
        console.log(checkFirstQuarter(x,y,r),checkSecondQuarter(x,y,r),checkForthQuarter(x,y,r))

    }

}

const yinp = document.getElementById("form:y-value")
yinp.addEventListener("change", ()=>{
    y = parseFloat(yinp.value)
    drawGostPoint(x,y,gostPointColor)
    // if(!checkY(y)){
    //     yinp.value = '1.0'
    // }
    console.log(yinp.value)
    console.log(context)
})

// //подхват радио кнопок
// const save = document.getElementById('rRadio');
// for (let i = 0; i < save.length; i++) {
//     save[i].onclick = function() {
//         localStorage.setItem('Radio', this.value);
//     }
// }
// let Radio = localStorage.getItem('Radio');
// if (Radio) {
//     let inp = document.querySelector('input[id="rRadio"][value="' + Radio + '"]');
//     if (inp) {
//         inp.checked = true;
//         console.log(Radio)
//         r = Radio
//     }
// }

drawCellBackground()
drawGraph(r)
// drawPoint(1,1)
document.getElementById("form:btn4").classList.add("active");

function test(){
    document.getElementById("form:fakeMainButton").click()
}

function joke1(){
    document.getElementById("fakeRButton1").click()
}
function joke2(){
    document.getElementById("fakeRButton2").click()
}
function joke3(){
    document.getElementById("fakeRButton3").click()
}
function joke4(){
    document.getElementById("fakeRButton4").click()
}
function joke5(){
    document.getElementById("fakeRButton5").click()
}
function joke6(){
    document.getElementById("fakeRButton6").click()
}
function joke7(){
    document.getElementById("fakeRButton7").click()
}
function joke8(){
    document.getElementById("fakeRButton8").click()
}
function joke9(){
    document.getElementById("fakeRButton9").click()
}

function jokeY(){
    document.getElementById("fakeYButton").click()
    let temp = yinp.value.replace(/,/g, ".")
    if(!(-5 <= temp && temp <= 3)){
        yinp.value = 1
    }
    document.getElementById("form:x-answer-value").value = temp
}

function Ytap(){
    let ty = parseFloat(yinp.value)
    checkY(ty)
    if(!(-5 <= y && y <= 3)){
        // yinp.value = 1
        document.getElementById("form:x-answer-value").value = 1
    }
    console.log(ty)
    console.log('kaif')
}
window.onload(console.log(r))

