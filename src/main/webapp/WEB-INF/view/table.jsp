<%--
  Created by IntelliJ IDEA.
  User: artemkotenkov
  Date: 08.11.2023
  Time: 03:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="results" scope="session" class="com.example.model.ResultsBean"/>


<html>
<head>
    <title>Ответ</title>
    <link rel="stylesheet" href="/resources/table.css">
</head>
<body>
<div class="upWrapper">
    <button class="btn" id="btnBack">Назад на график</button>
</div>
<table id="answerTable">
    <thead>
    <tr>
        <th>x</th>
        <th>y</th>
        <th>r</th>
        <th>попадание</th>
        <th>время работы</th>
        <th>время</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<script>
    const data = ${results.results}
    const table = document.getElementById('answerTable');
    const tbody = table.querySelector('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');

        const xCell = document.createElement('td');
        xCell.textContent = item.x;
        row.appendChild(xCell);

        const yCell = document.createElement('td');
        yCell.textContent = item.y;
        row.appendChild(yCell);

        const rCell = document.createElement('td');
        rCell.textContent = item.r;
        row.appendChild(rCell);

        const isHitCell = document.createElement('td');
        isHitCell.textContent = item.isHit;
        row.appendChild(isHitCell);

        const workTimeCell = document.createElement('td');
        workTimeCell.textContent = item.workTime;
        row.appendChild(workTimeCell);

        const dateTimeCell = document.createElement('td');
        dateTimeCell.textContent = item.dateTime;
        row.appendChild(dateTimeCell);

        tbody.appendChild(row);

    });

    document.getElementById("btnBack").addEventListener("click", ()=>{
        window.location = 'http://localhost:8080'
        // open('http://localhost:8080/check')
    })
</script>
</body>
</html>

