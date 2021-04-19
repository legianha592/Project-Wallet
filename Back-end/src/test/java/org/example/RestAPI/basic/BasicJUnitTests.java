package org.example.RestAPI.basic;

import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class BasicJUnitTests {

    @Test
    public void testSum1(){
        assertEquals(3, Integer.sum(1, 2));
        assertEquals(2, Integer.sum(1, 1));
        assertEquals(1, Integer.sum(1, 0));
    }

    @Test
    public void testSum2(){
        assertEquals(4, Integer.sum(2, 2));
    }
}
