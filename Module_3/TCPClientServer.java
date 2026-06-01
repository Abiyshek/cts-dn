import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
public class TCPClientServer {
    public static class Server {
        public static void main(String[] args) throws Exception {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server listening on port 5000");
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected");
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
            String clientMessage = in.readLine();
            System.out.println("Client: " + clientMessage);
            out.println("Server received: " + clientMessage);
            in.close();
            out.close();
            clientSocket.close();
            serverSocket.close();
        }
    }
    public static class Client {
        public static void main(String[] args) throws Exception {
            Socket socket = new Socket("localhost", 5000);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            out.println("Hello from client");
            String serverMessage = in.readLine();
            System.out.println("Server: " + serverMessage);
            out.close();
            in.close();
            socket.close();
        }
    }
}
