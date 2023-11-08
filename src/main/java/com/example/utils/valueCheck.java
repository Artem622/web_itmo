package com.example.utils;

public class valueCheck {
    public static boolean isInArea(double x, double y, double r) {
        // 1 quarter
        if (x >= 0 && y >= 0) {
//            return ((Math.abs(x) >= Math.abs(y)) && (Math.abs(y) <= r/2) && (Math.abs(x) <= r)) || ((x == 0) && (Math.abs(y) <= r/2));
            return (y + 0.5 * x - r / 2) <= 0;
        }
        // 3 quarter
        if (x <= 0 && y <= 0) {
            return (Math.abs(x) <= Math.abs(r/2)) && (Math.abs(y) <= Math.abs(r));
        }
        // 4 quarter
        if (x >= 0 && y <= 0) {
            return (Math.abs(x) <= Math.abs(r)) && (Math.abs(y) <= Math.abs(r)) && (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(r,2));
        }
        // 2 quarter
        return false;
    }
}
