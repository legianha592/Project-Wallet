package org.example.RestAPI.JUnitTest.converter;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ConvertObjectToString {
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
