import java.util.ArrayList;
import java.util.Scanner;
public class ArrayListExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> names = new ArrayList<>();
        System.out.println("Enter student names (type 'done' to finish):");
        while (true) {
            System.out.print("Enter name: ");
            String name = sc.nextLine();
            if (name.equalsIgnoreCase("done")) {
                break;
            }
            names.add(name);
        }
        System.out.println("\nStudent names:");
        for (String name : names) {
            System.out.println(name);
        }
        sc.close();
    }
}
