<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link type="image/x-icon" href="/images/favicon-32x32.png" rel="icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<style>
    *{
        margin: 0;
        padding: 0;
        background-color: rgba(77, 239, 66, 0.67);
        font-family: "Al Bayan";
    }
    .table-container{
        padding-top:3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .form-header{
        margin-left: auto;
        margin-right: auto;
        font-family: monospace;
        font-size: 2rem;
    }
    .grid-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 1rem;
        border-bottom: 1px solid rgba(52, 33, 54, 0.88);
        padding: .1rem .3rem;
    }
    .header-item{
        font-family: monospace;
        font-size: 1.5rem;
    }
    .item{
        color: #cb2a78;
        margin: .2rem;
    }
</style>
<body>
    <div class="table-container">
        <?php
        //работаем с сессией
        session_start();
        $check = false;
        $rightX=[-5,-4,-3,-2,-1,0,1,2,3];
        $rightR=[0,1,2,3,4,5];
        if (!isset($_SESSION['prev'])) {
            $_SESSION['prev'] = [];
        }
        if (isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["r"])){
            //получаем данные
            $x = intval($_GET["x"]);
            $y = floatval(str_replace(",", ".", $_GET["y"]));
            $r = intval($_GET["r"]);
            $check = true;
        }
        function generateTable() {
            $table = '
                    <h2 class="form-header">
                        Результаты
                    </h2>
                    <div class="header grid-row">
                        <div class="header-item">x</div>
                        <div class="header-item">y</div>
                        <div class="header-item">r</div>
                        <div class="header-item">Время</div>
                        <div class="header-item">Результат</div>
                        <div class="header-item">Время работы</div>
                    </div>
            ';

            foreach ($_SESSION['prev'] as $item) {
                $x = $item['x'];
                $y = $item['y'];
                $r = $item['r'];
                $time = $item['time'];
                $answer = $item['answer'];
                $workTime = $item['workTime'];
                $table .= '
                    <div class="grid-row">
                        <div class="item">'.$x.'</div>
                        <div class="item">'.$y.'</div>
                        <div class="item">'.$r.'</div>
                        <div class="item">'.$time.'</div>
                        <div class="item">'.$answer.'</div>
                        <div class="item">'.$workTime.'</div>
                    </div>
                    ';

            }
            return $table;
        }
        $answer = "";
        date_default_timezone_set("Europe/Moscow");
        $time = date('H:i:s', time());
        $start = microtime(true);

        //проверяем x на валидность
        function isYRight($y) {
            return $y >= -3 && $y <= 5;
        }

        //проверяем y на валидность
        function isXRight($x,$rightX){
            return is_int($x) && $x >= -5 && $x <= 3 && in_array($x,$rightX);
        }

        //проверяем r на валидность
        function isRRight($r,$rightR){
            return is_int($r) && $r >= 1 && $r <= 5 && in_array($r,$rightR);
        }

        //проверяем на попадание в 2 четверть
        function checkSecondSection($x,$y,$r){
            return (($x <= 0 && $y >= 0 && abs($x) >= abs($y) && abs($y) <= $r/2 && abs($x) <= $r)||($x==0 && abs($y)<=$r/2)) ;//разобраься почему на границе мимо
        }

        //проверяем на попадание в 3 четверть
        function checkThirdSection($x,$y,$r){
            return ($x <= 0 && $y <= 0 && abs($x)<=$r/2 && abs($y)<=$r);
        }

        //проверяем на попадание в 4 четверть
        function checkForthSection($x,$y,$r){
            return($x >= 0 && $y <= 0 && abs($x)<=$r/2 && abs($y)<=$r/2 && (pow($x, 2) + pow($y, 2) <= pow($r/2, 2)));
        }
        //проверка на попадание в график

        if ($check==true){
            if(isRRight($r,$rightR) && isXRight($x,$rightX) && isYRight($y)){
                if(checkSecondSection($x,$y,$r) || checkThirdSection($x,$y,$r) || checkForthSection($x,$y,$r)){
                    $answer="попадание";
                }else{
                    $answer="промах";
                }
            }else {
                $answer = "некорректные входные данные";
            }
            $_SESSION['prev'][] = [
                'x' => $x, 'y' => $y, 'r' => $r, 'answer' => $answer, 'time' => $time, 'workTime' => sprintf('%.12f', microtime(true) - $start)
            ];
        }
        echo generateTable();
        ?>
    </div>
</body>
</html>






