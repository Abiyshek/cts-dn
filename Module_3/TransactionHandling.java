import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
public class TransactionHandling {
    public static void transferMoney(int fromId, int toId, double amount) {
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection("jdbc:sqlite:accounts.db");
            conn.setAutoCommit(false);
            String debitSQL = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
            String creditSQL = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
            PreparedStatement debitStmt = conn.prepareStatement(debitSQL);
            debitStmt.setDouble(1, amount);
            debitStmt.setInt(2, fromId);
            debitStmt.executeUpdate();
            PreparedStatement creditStmt = conn.prepareStatement(creditSQL);
            creditStmt.setDouble(1, amount);
            creditStmt.setInt(2, toId);
            creditStmt.executeUpdate();
            conn.commit();
            System.out.println("Transfer successful");
            debitStmt.close();
            creditStmt.close();
            conn.close();
        } catch (Exception e) {
            System.out.println("Transfer failed: " + e.getMessage());
        }
    }
    public static void main(String[] args) {
        transferMoney(1, 2, 100);
    }
}
