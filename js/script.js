const graph = document.getElementById("graph");
const context = graph.getContext("2d");

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

    console.log(graph.height,graph.width,numCols,numRows)

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
    }
    for (let y = centerY - stepY; y > 0; y -= stepY) {context.fillRect(graph.width / 2 - 5, y, 10, 1); // Рисуем горизонтальную отметку
    context.fillText(-(y - centerY) / stepY, graph.width / 2 +7, y + 5); // Рисуем число
    }
}

function drawGraph(){
    drawCellBackground()
    let radius = document.getElementById("r").value
    const centerX = graph.width / 2;
    const centerY = graph.height / 2;

    //рисуем график
    context.fillStyle = 'rgba(217,18,239,0.45)'

    //2 четверть
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX-radius*25, centerY);
    context.lineTo(centerX,centerY-radius*25/2);
    context.fill();

    //3 четверть
    context.fillRect(centerX-radius*25/2,centerY,radius*25/2,radius*25)

    //4 четверть
    context.beginPath();
    context.moveTo(centerX, centerY); // Перемещаемся в центр круга
    context.arc(centerX, centerY, radius*25/2, 0, Math.PI/2, false); // Рисуем дугу
    context.closePath();
    context.fill(); // Закрашиваем область, чтобы получить четверть круга
}

function drawPoint(x,y){
    context.fillStyle='#cc1b71'
    context.beginPath();
    context.arc(x*25+150,-y*25+150,3, 0, Math.PI*2, false);
    context.closePath()
    context.fill()

}
function setPopup(text){
    document.getElementById('y_popup_text').textContent = text
    document.getElementById('y_popup').style.display = 'flex'

    setTimeout(()=>{
        document.getElementById('y_popup').style.display = 'none'

    },3000)
}
function checkYNull(y){
    if (y != "" && !isNaN(y)){
        return true
    } else{
        setPopup('Поле Y не может быть пустым')
        return false
    }
}
function checkY(y) {
    if(-3 <= y && y <= 5){
        return true
    } else {
        setPopup('Вы ввели некорректное значение Y')
        return false
    }
}
function submitForm(){
    let x = document.getElementById("x").value
    let y = Number(document.getElementById("y").value)
    let r = document.getElementById("r").value
    if (checkY(y) && checkYNull(y)){
        drawPoint(x,y)

    }
}

drawGraph()
document.getElementById('r').addEventListener("change", () => drawGraph())

document.getElementById("form").addEventListener("submit", (event)=>{
    event.preventDefault()
    submitForm()
})