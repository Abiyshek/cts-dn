import java.lang.reflect.Method;
public class ReflectionInJava {
    public void sayHello(String name) {
        System.out.println("Hello, " + name);
    }
    public int add(int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
        try {
            Class<?> cls = Class.forName("ReflectionInJava");
            System.out.println("Class: " + cls.getName());
            Method[] methods = cls.getDeclaredMethods();
            System.out.println("Methods:");
            for (Method method : methods) {
                System.out.println("  " + method.getName());
                Class<?>[] paramTypes = method.getParameterTypes();
                System.out.print("    Parameters: ");
                for (Class<?> param : paramTypes) {
                    System.out.print(param.getSimpleName() + " ");
                }
                System.out.println();
            }
            Object obj = cls.getDeclaredConstructor().newInstance();
            Method sayHelloMethod = cls.getMethod("sayHello", String.class);
            sayHelloMethod.invoke(obj, "World");
            Method addMethod = cls.getMethod("add", int.class, int.class);
            Object result = addMethod.invoke(obj, 5, 10);
            System.out.println("Result: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
