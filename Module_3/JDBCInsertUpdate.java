import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
public class JDBCInsertUpdate {
    public static void insertStudent(int id, String name, double marks) {
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection("jdbc:sqlite:students.db");
            String insertSQL = "INSERT INTO students (id, name, marks) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(insertSQL);
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.setDouble(3, marks);
            pstmt.executeUpdate();
            pstmt.close();
            conn.close();
            System.out.println("Student inserted successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void updateStudent(int id, double marks) {
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection("jdbc:sqlite:students.db");
            String updateSQL = "UPDATE students SET marks = ? WHERE id = ?";
            PreparedStatement pstmt = conn.prepareStatement(updateSQL);
            pstmt.setDouble(1, marks);
            pstmt.setInt(2, id);
            pstmt.executeUpdate();
            pstmt.close();
            conn.close();
            System.out.println("Student updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        insertStudent(1, "John", 85.5);
        updateStudent(1, 90.0);
    }
}
