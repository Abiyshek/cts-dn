import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class LambdaExpressions {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        strings.add("zebra");
        strings.add("apple");
        strings.add("mango");
        strings.add("banana");
        Collections.sort(strings, (a, b) -> a.compareTo(b));
        System.out.println("Sorted list:");
        for (String s : strings) {
            System.out.println(s);
        }
    }
}
