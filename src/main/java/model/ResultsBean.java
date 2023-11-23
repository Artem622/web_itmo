package model;

import beans.Result;
import database.ResultInterface;
import utils.ValueCheck;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.inject.Inject;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@ManagedBean
@SessionScoped
public class ResultsBean implements Serializable {
    @Inject
    private ResultInterface resultInterface;
    @Serial
    private static final long serialVersionUID = 1L;
    private List<Result> results;

    public ResultsBean() {
        this.results = new ArrayList<>();
    }

    public void addResult(double x, double y, double r) {
        LocalDateTime time = LocalDateTime.now();
        double temp;
        temp = LocalDateTime.now().getNano() - time.getNano();
        Result result = new Result(x,y,r, ValueCheck.isInArea(x, y, r),temp,LocalDateTime.now());
        this.results.add(result);
        beans.Result resultModel = new beans.Result(result);
        resultInterface.save(resultModel);
        System.out.println(result);
    }

    public List<Result> getResults() {
        return resultInterface.getAll().stream().map(beans.Result::convertToDto).toList();
    }

    public static class Result implements Serializable {
        @Serial
        private static final long serialVersionUID = 2L;
        public String x;
        public Double xOriginal;
        public String y;
        public Double yOriginal;
        public String r;
        public Double rOriginal;
        public boolean isHit;
        public double workTime;
        public LocalDateTime dateTime;


        public Result(double x, double y, double r, boolean isHit, double workTime, LocalDateTime dateTime) {
            this.xOriginal = x;
            this.yOriginal = y;
            this.rOriginal = r;
            this.x = String.valueOf(x);
            this.y = String.valueOf(y);
            this.r = String.valueOf(r);
            this.isHit = isHit;
            this.workTime = workTime;
            this.dateTime = dateTime;
        }

        public Result() {}

        public String getX() {
            return x;
        }

        public void setX(String x) {
            this.x = x;
        }

        public String getY() {
            return y;
        }

        public void setY(String y) {
            this.y = y;
        }

        public String getR() {
            return r;
        }

        public void setR(String r) {
            this.r = r;
        }

        public boolean getIsHit() {
            return isHit;
        }

        public void setIsHit(boolean hit) {
            this.isHit = hit;
        }

        public double getWorkTime(){
            return workTime;
        }
        public void setWorkTime(double workTime){
            this.workTime = workTime;
        }

        public LocalDateTime getDateTime(){
            return dateTime;
        }

        public void setDateTime(LocalDateTime dateTime){
            this.dateTime = dateTime;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Result result = (Result) o;
            return isHit == result.isHit &&
                    x.equals(result.x) &&
                    y.equals(result.y) &&
                    r.equals(result.r);
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y, r, isHit, workTime,dateTime);
        }

        @Override
        public String toString() {
            return "{" +
                    "x:'" + x + '\'' +
                    ", y:'" + y + '\'' +
                    ", r:'" + r + '\'' +
                    ", isHit:'" + isHit + '\'' +
                    ", workTime:'" + workTime + '\'' +
                    ", dateTime:'" + dateTime + '\'' +
                    '}';
        }
    }
}