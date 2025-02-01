package com.cyber.backend.helper;

public class UserNotFoundException extends Exception{

    public UserNotFoundException(){
        super("User with this Username isn't exist in DB!! try Again with another Username");
    }

    public UserNotFoundException(String msg){
        super(msg);
    }
}
