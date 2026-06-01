public class DecompileClassFile {
    private int value;
    private String name;
    public DecompileClassFile(int value, String name) {
        this.value = value;
        this.name = name;
    }
    public void display() {
        System.out.println("Value: " + value + ", Name: " + name);
    }
    public int getValue() {
        return value;
    }
    public String getName() {
        return name;
    }
    public static void main(String[] args) {
        DecompileClassFile obj = new DecompileClassFile(42, "Example");
        obj.display();
        System.out.println("Compile this file and decompile using JD-GUI or CFR");
    }
}
