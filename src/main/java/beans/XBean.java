package beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;

//@ManagedBean
//@SessionScoped
public class XBean implements Serializable {
    private double value = 0.0;

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

}
