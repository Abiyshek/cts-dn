import java.util.Scanner;
public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int randomNum = (int) (Math.random() * 100) + 1;
        int guess = 0;
        int attempts = 0;
        while (guess != randomNum) {
            System.out.print("Guess a number between 1 and 100: ");
            guess = sc.nextInt();
            attempts++;
            if (guess < randomNum) {
                System.out.println("Too low!");
            } else if (guess > randomNum) {
                System.out.println("Too high!");
            } else {
                System.out.println("Correct! You guessed in " + attempts + " attempts.");
            }
        }
        sc.close();
    }
}
