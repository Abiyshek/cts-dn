public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleVal = 9.99;
        int intVal = (int) doubleVal;
        System.out.println("Double to int: " + doubleVal + " -> " + intVal);
        int intVal2 = 25;
        double doubleVal2 = (double) intVal2;
        System.out.println("Int to double: " + intVal2 + " -> " + doubleVal2);
    }
}
