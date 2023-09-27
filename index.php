<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/style.css">
    <link type="image/x-icon" href="/images/favicon-32x32.png" rel="icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="wrapper">
        <div class="top">

            <div class="header">
                <img src="images/logo_itmo.svg" class="logo_itmo">
                <p class="header_text">Kotenkov Artem Alekseevich</p>
                <p class="header_text">P3222</p>
                <p class="header_text">Variant № 3289</p>
            </div>

            <div class="content">
                <div class="container">
                    <canvas class="graph_canvas" width="300px" height="300px" id="graph"></canvas>

                </div>

                <form class="container" id="form">
                    <p class="text_form">Choose X coordinat:</p>
                    <select name="x" class="select_form" id="x">
                        <option value="-5">-5</option>
                        <option value="-4">-4</option>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option selected value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p class="text_form">Choose Y coordinat:</p>
                    <div class="popup" id="y_popup">
                        <p class="popup_text" id="y_popup_text"></p>
                    </div>
                    <input name="y" type="text"  class="input_text" id="y">
                    <p class="text_form">Choose R:</p>
                    <select name="r" class="select_form" id="r">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option selected value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button class="button" id="check">Check</button>
                </form>
            </div>
        </div>

        <div class="footer">
            <img src="images/slogan-chernyy.svg" class="footer_img">
        </div>

    </div>
<script src="js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</body>
</html>