package database;

import beans.Result;
import model.ResultsBean;

import java.util.List;

public interface ResultInterface {
    void save(Result result);

    boolean clear();

    List<Result> getAll();
}
