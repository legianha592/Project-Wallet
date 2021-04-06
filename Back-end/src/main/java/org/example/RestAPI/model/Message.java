package org.example.RestAPI.model;

public class Message<T> {
    public String message;
    public T result;

    public Message(String string, T obj) {
        this.message = string;
        this.result = obj;
    }
}
