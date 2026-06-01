interface Playable {
    void play();
}
class Guitar implements Playable {
    @Override
    public void play() {
        System.out.println("Playing guitar");
    }
}
class Piano implements Playable {
    @Override
    public void play() {
        System.out.println("Playing piano");
    }
}
public class InterfaceImplementation {
    public static void main(String[] args) {
        Guitar guitar = new Guitar();
        guitar.play();
        Piano piano = new Piano();
        piano.play();
    }
}
