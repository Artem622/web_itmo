<%--
  Created by IntelliJ IDEA.
  User: artemkotenkov
  Date: 26.10.2023
  Time: 09:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="results" scope="session" class="com.example.model.ResultsBean"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/resources/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<div class="wrapper">
    <div class="top">

        <div class="header">
            <img src="/resources/logo_itmo.svg" class="logo_itmo">
            <p class="header_text">Kotenkov Artem Alekseevich</p>
            <p class="header_text">P3222</p>
            <p class="header_text">Variant &#8470; 66087</p>
        </div>

        <div class="content">
            <div class="container">
                <canvas class="graph_canvas" width="300px" height="300px" id="graph"></canvas>
            </div>

            <form class="container" id="form">
                <p class="text_form">Choose X coordinat:</p>
                <div class="radio_conteiner">
                    <div class="radio_group">
                        <div class="radio_col">
                            <input type="radio" value="-4" id="1" class="radio" name="inp_x">
                            <label for="1" class="radio_label">-4</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="-3" id="2" name="inp_x">
                            <label for="1" class="radio_label">-3</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="-2" id="3" name="inp_x">
                            <label for="1" class="radio_label">-2</label>
                        </div>
                    </div>
                    <div class="radio_group">
                        <div class="radio_col">
                            <input type="radio" value="-1" id="4" class="radio" name="inp_x">
                            <label for="1" class="radio_label">-1</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="0" id="5" name="inp_x" checked>
                            <label for="1" class="radio_label">0</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="1" id="6" name="inp_x">
                            <label for="1" class="radio_label">1</label>
                        </div>
                    </div>
                    <div class="radio_group">
                        <div class="radio_col">
                            <input type="radio" value="2" id="7" class="radio" name="inp_x">
                            <label for="1" class="radio_label">2</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="3" id="8" name="inp_x">
                            <label for="1" class="radio_label">3</label>
                        </div>
                        <div class="radio_col">
                            <input type="radio" value="4" id="9" name="inp_x">
                            <label for="1" class="radio_label">4</label>
                        </div>
                    </div>
                </div>
                <p class="text_form">Choose Y coordinat:</p>
                <div class="popup" id="y_popup">
                    <p class="popup_text" id="y_popup_text"></p>
                </div>
                <input name="y" type="text"  class="input_text" id="y">
                <p class="text_form">Choose R:</p>
                <div class="radio_r_container">
                    <div class="radio_r_group">
                        <div class="radio_r_col">
                            <input type="radio" value="1" id="10" name="inp_r">
                            <label for="1" class="radio_label">1</label>
                        </div>
                        <div class="radio_r_col">
                            <input type="radio" value="1.5" id="11" name="inp_r">
                            <label for="1" class="radio_label">1.5</label>
                        </div>
                        <div class="radio_r_col">
                            <input type="radio" value="2" id="12" name="inp_r" checked>
                            <label for="1" class="radio_label">2</label>
                        </div>
                        <div class="radio_r_col">
                            <input type="radio" value="2.5" id="13" name="inp_r">
                            <label for="1" class="radio_label">2.5</label>
                        </div>
                        <div class="radio_r_col">
                            <input type="radio" value="3" id="14" name="inp_r">
                            <label for="1" class="radio_label">3</label>
                        </div>
                    </div>
                </div>
                <button class="button" id="check">Check</button>
                <button class="button" id="go_next">Go to result</button>
            </form>
        </div>
    </div>

    <div class="footer">
        <img src="/resources/slogan-chernyy.svg" class="footer_img">
    </div>
</div>
<script src="/resources/main.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    const data = ${results.results}
    data.map(el => {
        drawOldPoint(el.x, el.y)
    })
    radios.forEach(radio => radio.addEventListener('change', () => {
        drawGraph(document.querySelector('input[name="inp_r"]:checked').value)
        data.map(el => {
            drawOldPoint(el.x, el.y)
        })
    }));
</script>
</body>
</html>
