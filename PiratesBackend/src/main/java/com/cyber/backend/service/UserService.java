package com.cyber.backend.service;

import com.cyber.backend.model.UserRole;
import com.cyber.backend.model.User;

import java.util.Set;

public interface UserService {

    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    public User getUser(String username );

    //delete user by id
    public void deleteUser(Long id);

    //update user by username
    public String updateUser(String Name,User user);
}
