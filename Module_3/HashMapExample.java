import java.util.HashMap;
import java.util.Scanner;
public class HashMapExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<Integer, String> students = new HashMap<>();
        System.out.println("Enter student data (ID Name) or type 'search' to find:");
        while (true) {
            System.out.print("Enter ID and Name (or 'search'): ");
            String input = sc.nextLine().trim();
            if (input.equalsIgnoreCase("search")) {
                System.out.print("Enter ID to search: ");
                int id = sc.nextInt();
                sc.nextLine();
                if (students.containsKey(id)) {
                    System.out.println("Name: " + students.get(id));
                } else {
                    System.out.println("ID not found");
                }
            } else if (input.equalsIgnoreCase("done")) {
                break;
            } else {
                String[] parts = input.split(" ", 2);
                if (parts.length == 2) {
                    int id = Integer.parseInt(parts[0]);
                    students.put(id, parts[1]);
                }
            }
        }
        sc.close();
    }
}
