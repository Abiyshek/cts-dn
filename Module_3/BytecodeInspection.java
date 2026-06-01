public class BytecodeInspection {
    public int add(int a, int b) {
        return a + b;
    }
    public String greet(String name) {
        return "Hello, " + name;
    }
    public static void main(String[] args) {
        BytecodeInspection obj = new BytecodeInspection();
        System.out.println(obj.add(5, 10));
        System.out.println(obj.greet("World"));
        System.out.println("Run: javap -c BytecodeInspection to view bytecode");
    }
}
