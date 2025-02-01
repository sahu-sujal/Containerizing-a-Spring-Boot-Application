package com.cyber.backend.controller;

import com.cyber.backend.helper.UserFoundException;
import com.cyber.backend.model.Role;
import com.cyber.backend.model.User;
import com.cyber.backend.model.UserRole;
import com.cyber.backend.model.exam.Quiz;
import com.cyber.backend.repo.UserRepository;
import com.cyber.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //creating user end point(API)
    @PostMapping("/")
    public User createuser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");

        //encoding password with Bcrypt password encoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> roles = new HashSet<>();

        Role role=new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole =new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user , roles);

    }

    //get user end point(API)
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    //delete user endpoint(API)
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }

    //update user endpoint(API)
    @PutMapping("/{Name}")
    public String updateUser(@PathVariable("Name")String Name,@RequestBody User user){

        return this.userService.updateUser(Name , user);
    }

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?> exceptionHandler(UserFoundException e){
        ResponseEntity<?> responseEntity = new ResponseEntity<>( e , HttpStatus.BAD_REQUEST);
        return responseEntity ;
    }

}

