package com.example.controller;

import com.example.model.ResultsBean;
import com.example.utils.validator;
import com.example.utils.valueCheck;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;

@WebServlet(name = "AreaCheckServlet", value = "/check")

public class AreaCheckServlet extends HttpServlet {
    double x = 0;
    double y = 0;
    double r = 0;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LocalDateTime time = LocalDateTime.now();
        x = ControllerServlet.getDouble(request, "x");
        y = ControllerServlet.getDouble(request, "y");
        r = ControllerServlet.getDouble(request, "r");

        validator validator = new validator(x, y, r);

        ResultsBean bean = (ResultsBean) request.getSession().getAttribute("results");

        if (bean == null) {
            bean = new ResultsBean();
            request.getSession().setAttribute("results", bean);
        }
        Duration duration = Duration.between(time, LocalDateTime.now());
        double temp;
        temp = LocalDateTime.now().getNano() - time.getNano();
        ResultsBean.Result result = new ResultsBean.Result(String.valueOf( x), String.valueOf(y), String.valueOf(r), valueCheck.isInArea(x, y, r), temp, LocalDateTime.now());
        bean.addResult(result);

        System.out.println("Time elapsed: " + duration + " milliseconds");
        System.out.println("x  " + x + "y    " + y + "r    " + r);
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("WEB-INF/view/table.jsp");
        requestDispatcher.forward(request, response);
    }

}
