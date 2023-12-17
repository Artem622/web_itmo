<template>
    <div class="wrap" >
        <canvas class="graph_canvas" width="300px" height="300px" id="graph" ref="graph" @click="drawPoint" ></canvas>
    </div>
</template>

<script>
export default {
    name: 'GraphComp',
    data(){
        return{
            x: 1,
            y: 1,
            r: null
        }
    },
    methods:{
        drawCellBackground(){
            const graph = this.$refs.graph
            const context = graph.getContext("2d")
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
        },
        test(){
            this.drawGraph()
        },

        test1(event){
            let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const {x,y} = isSafari ? { x: event.layerX, y: event.layerY } : { x: event.offsetX, y: event.offsetY }

            console.log(x,y)
            return (x,y)
        },

        drawGraph(){
            const graph = this.$refs.graph
            const context = graph.getContext("2d")
            this.drawCellBackground()
            let radius = this.$store.getters.getRadius
            const centerX = graph.width / 2;
            const centerY = graph.height / 2;

            //рисуем график
            context.fillStyle = 'rgba(217,18,239,0.45)'

            if(radius >= 0){
                //4 четверть
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.lineTo(centerX+radius*25, centerY);
                context.lineTo(centerX,centerY+radius*25);
                context.fill();

                //2 четверть
                context.fillRect(centerX-radius*25/2,centerY,radius*25/2,-radius*25)

                //1 четверть
                context.beginPath();
                context.moveTo(centerX, centerY); // Перемещаемся в центр круга
                context.arc(centerX, centerY, radius*25/2, -Math.PI/2, 0, false); // Рисуем дугу
                context.closePath();
                context.fill(); // Закрашиваем область, чтобы получить четверть круга
            }

            if(radius < 0){
                //2 четверть
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.lineTo(centerX+radius*25, centerY);
                context.lineTo(centerX,centerY+radius*25);
                context.fill();

                //4 четверть
                context.fillRect(centerX-radius*25/2,centerY,radius*25/2,-radius*25)

                //3 четверть
                context.beginPath();
                context.moveTo(centerX, centerY); // Перемещаемся в центр круга
                context.arc(centerX, centerY, -radius*25/2, Math.PI/2, Math.PI, false); // Рисуем дугу
                context.closePath();
                context.fill(); // Закрашиваем область, чтобы получить четверть круга
            }

        },
        drawPoint(event){
            let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const {x,y} = isSafari ? { x: event.layerX, y: event.layerY } : { x: event.offsetX, y: event.offsetY }
            const graph = this.$refs.graph
            const context = graph.getContext("2d")
            context.fillStyle='#cc1b71'
            context.beginPath();
            context.arc(x,y,3, 0, Math.PI*2, false);
            context.closePath()
            context.fill()
            console.log(x,y)
        },

        // конвертация х в координаты ДПСК
        convertInputX(x){
            return (x/25)-6
        },

        //конвертация у в координаты ДПСК
        convertInputY(y){
            return -(y/25-6)
        }

    },


    created() {
        this.r = this.$store.getters.getRadius
        this.$store.subscribe(() => {
            this.r = this.$store.getters.getRadius
            console.log(this.r,'trs')
        }, "setRadius")
    },
    mounted() {
        this.drawGraph()
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.wrap{
    min-width: 350px;
    min-height: 350px;
    width: 40vw;
    height: 50vh;
    background-color: rgba(66, 7, 100, 0.4);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    align-items: center;
    backdrop-filter: blur(10px);
}
</style>