package model.dto;

public class ErrorDto {
    public String field;
    public String errorText;
    public String providedValue;
    @Override
    public String toString() {
        return "An error occurred during validation: Field " + field + " " + errorText + " you pass " + providedValue;
    }
}
