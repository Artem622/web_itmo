<?php
//игнорируем корсы
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
session_start();
//получаем данные
$x = intval($_GET['x']);
$y = ($_GET['y']);
$r = intval($_GET['r']);
$answer = "";

//проверяем x на валидность
function isYRight($y) {
    return $y >= -3 && $y <= 5;
}

//проверяем y на валидность
function isXRight($x){
    return is_int($x) && $x >= -5 && $x <= 3;
}

//проверяем r на валидность
function isRRight($r){
    return is_int($r) && $r >= 1 && $r <= 5;
}

//проверяем на попадание в 2 четверть
function checkSecondSection($x,$y,$r){
    //придумать как проверять для треугольника
    return false;
}

//проверяем на попадание в 3 четверть
function checkThirdSection($x,$y,$r){
    return ($x <= 0 && $y <= 0 && abs($x)<=$r/2 && abs($y)<=$r);
}

//проверяем на попадание в 4 четверть
function checkForthSection($x,$y,$r){
    return($x >= 0 && $y <= 0 && abs($x)<=$r/2 && abs($y)<=$r/2 && (pow($x, 2) + pow($y, 2) <= pow($r/2, 2)));
}




if(isRRight($r) && isXRight($x) && isYRight($y)){
    if(checkSecondSection($x,$y,$r) || checkThirdSection($x,$y,$r) || checkForthSection($x,$y,$r)){
        $answer="попадание";
    }else{
        $answer="промах";
    }
}else $answer = "некорректные входные данные";

// Выводим полученные числа
echo "$answer";
