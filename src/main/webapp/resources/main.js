// import axios from 'axios';
const graph = document.getElementById("graph");
const context = graph.getContext("2d");
let x = 1
let y = 1
let r = 2

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
    context.lineTo(centerX,centerY-radius*25/2);
    context.fill();

    //3 четверть
    context.fillRect(centerX-radius*25/2,centerY,radius*25/2,radius*25)

    //4 четверть
    context.beginPath();
    context.moveTo(centerX, centerY); // Перемещаемся в центр круга
    context.arc(centerX, centerY, radius*25, 0, Math.PI/2, false); // Рисуем дугу
    context.closePath();
    context.fill(); // Закрашиваем область, чтобы получить четверть круга
}

//рисуем точку по координатам
function drawPoint(x,y){
    context.fillStyle='#cc1b71'
    context.beginPath();
    context.arc(x*25+150,-y*25+150,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}

function drawOldPoint(x,y){
    context.fillStyle='#d51271'
    context.beginPath();
    context.arc(x*25+150,-y*25+150,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}
function drawPointInput(x,y){
    context.fillStyle='#3e0cd3'
    context.beginPath();
    context.arc(x,y,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()
}

//выводим попап, если y не удоветворяет
function setPopup(text){
    document.getElementById('y_popup_text').textContent = text
    document.getElementById('y_popup').style.display = 'flex'

    setTimeout(()=>{
        document.getElementById('y_popup').style.display = 'none'

    },3000)
}

//проверка на пустоту y
function checkYNull(y){
    if ((y != "" && y != NaN) || y===0){
        return true
    } else{
        setPopup('Поле Y не может быть пустым')
        return false
    }
}

//проверка на корректность y
function checkY(y) {
    if(-5 <= y && y <= 3){
        return true
    } else {
        setPopup('Вы ввели некорректное значение Y')
        return false
    }
}

//конвертация х в координаты ДПСК
function convertInputX(x){
    return (x/25)-6
}

//конвертация у в координаты ДПСК
function convertInputY(y){
    return -(y/25-6)
}

function getData(){
    x= document.querySelector('input[name="inp_x"]:checked').value
    y = parseFloat(document.getElementById("y").value.replace(',','.'))
    r = document.querySelector('input[name="inp_r"]:checked').value
    if (checkY(y) && checkYNull(y)){
        drawPoint(x,y)
        return true
    } else {
        return false
    }
}

function submitForm(){
    let cond = getData()
    // let cond = true
    if (cond){
        let url =(`http://localhost:8080`)
        axios.post(url, {x: x, y: y, r: r},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(response => {
                const data = response.data;
                window.location=(`http://localhost:8080/check`)
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

}

//подхват радио-кнопок
const save = document.getElementsByName('inp_r');
for (let i = 0; i < save.length; i++) {
    save[i].onclick = function() {
        localStorage.setItem('Radio', this.value);
    }
}
let Radio = localStorage.getItem('Radio');
if (Radio) {
    let inp = document.querySelector('input[name="inp_r"][value="' + Radio + '"]');
    if (inp) {
        inp.checked = true;
        console.log(Radio)
        r = Radio
    }
}


drawCellBackground()
drawGraph(r)
// drawPoint(1,1)

const radios = document.querySelectorAll('input[type=radio][name="inp_r"]');
radios.forEach(radio => radio.addEventListener('change', () => {
    drawGraph(document.querySelector('input[name="inp_r"]:checked').value)
}));
document.getElementById('graph').addEventListener("click", (event)=>{
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const {x,y} = isSafari ? { x: event.layerX, y: event.layerY } : { x: event.offsetX, y: event.offsetY }
    rad = document.querySelector('input[name="inp_r"]:checked').value
    drawPointInput(x,y)
    console.log(convertInputX(x),convertInputY(y))
    let url =(`http://localhost:8080`)
    axios.post(url, {x: convertInputX(x), y: convertInputY(y), r: rad},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
            window.location = 'http://localhost:8080/check'
            // window.location=(`http://localhost:8080/check`)
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
})

document.getElementById("form").addEventListener("submit", (event)=>{
    event.preventDefault()
    console.log(document.querySelector('input[name="inp_x"]:checked').value)
    console.log(12345)
    submitForm()
})

document.getElementById("go_next").addEventListener("click", ()=>{
    window.location = 'http://localhost:8080/check'
    // open('http://localhost:8080/check')
})

