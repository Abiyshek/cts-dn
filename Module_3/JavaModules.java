public class JavaModules {
    public static void main(String[] args) {
        System.out.println("This is a placeholder for Java modules example");
        System.out.println("Create two modules: com.greetings and com.utils");
        System.out.println("Each should have a module-info.java file");
        System.out.println("Use 'module' keyword in module-info.java");
        System.out.println("Compile with: javac -p . --module-source-path src -d out --module com.greetings,com.utils");
    }
}
