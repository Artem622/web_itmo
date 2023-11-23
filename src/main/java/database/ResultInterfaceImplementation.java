package database;


import beans.Result;
import model.ResultsBean;
import utils.Clock;

import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Default;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import javax.faces.bean.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.*;

@Default
@Named("ResultInterface")
@RequestScoped
public class ResultInterfaceImplementation implements ResultInterface, Serializable {
    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("ResultUnit");
    private final EntityManager entityManager = entityManagerFactory.createEntityManager();

    @Override
    public void save(Result result) {
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.persist(result);
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            Arrays.stream(e.getStackTrace()).forEach(System.out::println);
            transaction.rollback();
        }
    }

    @Override
    public boolean clear() {
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.createQuery("delete from Result").executeUpdate();
            transaction.commit();
            return true;
        } catch (Exception e) {
            transaction.rollback();
            return false;
        }
    }

    public List<Result> getAll() {
        return entityManager.createQuery("select result from Result result ORDER BY result.id", Result.class).getResultList();
    }
}
