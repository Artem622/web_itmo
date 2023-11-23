package beans;

import lombok.*;
import model.ResultsBean;


import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.time.format.DateTimeFormatter;
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "result")
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private double r;
    @Column(name = "is_hit", nullable = false)
    private Boolean isHit;
    @Column(name = "work_time", nullable = false)
    private Double workTime;
    @Column(name = "date_time", nullable = false)
    private String dateTime;

    public double startTime = 0;

    public Result(double x, double y, double r, boolean isHit, double workTime, LocalDateTime dateTime) {
        this.id = null;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.workTime = workTime;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.dateTime = dateFormat.format(dateTime);
    }

    public String convertLocalDateTimeToString(LocalDateTime localDateTime){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = localDateTime.format(formatter);

        return formattedDateTime;
    }

    public LocalDateTime convertStringToLocalDateTime(String localDateTimeString){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(localDateTimeString, formatter);

        return localDateTime;
    }
    public Result(ResultsBean.Result result) {
        this.id = null;
        this.x = result.xOriginal;
        this.y = result.yOriginal;
        this.r = result.rOriginal;
        this.isHit = result.isHit;
        this.workTime = result.workTime;
        this.dateTime = convertLocalDateTimeToString(result.dateTime);
    }

    public ResultsBean.Result convertToDto() {
        return new ResultsBean.Result(
                this.x, this.y, this.r, this.isHit, this.workTime, convertStringToLocalDateTime(this.dateTime)
        );
    }
}