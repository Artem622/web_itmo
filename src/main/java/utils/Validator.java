package utils;

public class Validator {
    private final double x, y, r;

    public Validator(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean checkData() {
        if (!checkX()) System.out.println("X validation haven't passed");
        if (!checkY()) System.out.println("Y validation haven't passed");
        if (!checkR()) System.out.println("R validation haven't passed");
        System.out.println(x);
        System.out.println(y);
        System.out.println(r);
        return checkX() && checkY() && checkR();
    }

    private boolean checkX() {
            return x >= -3 && x <= 5;
        }



    private boolean checkY() {
        return y >= -5 && y <= 3;
    }

    private boolean checkR() {
        return r >= 1 && r <= 5;
    }
}
