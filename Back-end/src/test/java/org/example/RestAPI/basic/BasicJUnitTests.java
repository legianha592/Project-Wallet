package org.example.RestAPI.basic;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class BasicJUnitTests {

    @Test
    public void testSum1() {
        List mockList = Mockito.mock(List.class);

        for (int i = 0; i < 10; i++) {
            Mockito.when(mockList.get(i)).thenReturn(i);
            assertTrue((int) mockList.get(i) < 10, i + " bigger than 10");
        }

        assertEquals(5, Integer.sum(2, 3));
    }

    @Test
    public void testSum2() {
        assertEquals(4, Integer.sum(2, 2), "Fail test case");
    }
}
