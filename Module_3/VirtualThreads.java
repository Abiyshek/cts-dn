public class VirtualThreads {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            final int threadNum = i;
            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + threadNum);
            });
        }
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Time taken: " + (endTime - startTime) + "ms");
    }
}
