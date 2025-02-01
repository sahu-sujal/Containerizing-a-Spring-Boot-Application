package com.cyber.backend.helper;

public class UserFoundException extends Exception{
    public UserFoundException(){
        super("User with this Username Already Exist in the Database try again with different Username");
    }

    public UserFoundException(String msg){
        super(msg);
    }
}
