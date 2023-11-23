package beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;

@ManagedBean
@SessionScoped
public class YUnvalidatedBean implements Serializable {
    private double value = 1.0;

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
