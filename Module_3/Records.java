import java.util.ArrayList;
import java.util.List;
record Person(String name, int age) {}
public class Records {
    public static void main(String[] args) {
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);
        Person person3 = new Person("Charlie", 20);
        System.out.println(person1);
        System.out.println(person2);
        System.out.println(person3);
        List<Person> people = new ArrayList<>();
        people.add(person1);
        people.add(person2);
        people.add(person3);
        List<Person> adults = people.stream()
                .filter(p -> p.age() >= 25)
                .toList();
        System.out.println("Adults (age >= 25):");
        adults.forEach(System.out::println);
    }
}
