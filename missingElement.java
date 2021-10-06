import java.util.Scanner;

public class missingElement {
  public static void main(String[] args) {
    int[] array = {1, 2, 3, 5, 6, 7, 8};
    System.out.println(missingArrayElement((array)));
  }

  public static int missingArrayElement(int[] array) {
    int sum = 0;
    int total = 0;
    int size = array.length; // for given array length
    System.out.println(size);
    int actualSize = size + 1;  // for missing no.
//4
    total = actualSize * (actualSize + 1) / 2; // to get the sum till size + 1

    /* To get the given array sum; */
    for (int i = 0; i < size; i++) {
      sum += array[i];
    }

    // element which is missing from array
    return total - sum;
  }
}
