package com.cyber.backend.service.impl;

import com.cyber.backend.helper.UserFoundException;
import com.cyber.backend.model.User;
import com.cyber.backend.model.UserRole;
import com.cyber.backend.repo.RoleRepository;
import com.cyber.backend.repo.UserRepository;
import com.cyber.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());

        if(local!=null){
            System.out.println("User is alreday there !!");
            throw new UserFoundException();
        }else{

            //user create
            for(UserRole ur : userRoles){
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }
        return local;
    }

    //delete user by user id
    @Override
    public void deleteUser(Long userId) {

        this.userRepository.deleteById(userId);

    }

    //getting user by user name
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public String updateUser(String Name , User user) {

        User local = this.userRepository.findByUsername(user.getUsername());

        if(local != null){

            String msg="Username alreday exist";
            return msg;

        }else {
            User oldone = getUser(Name);
            oldone.setUsername(user.getUsername());
            oldone.setFirstName(user.getFirstName());
            oldone.setLastName(user.getLastName());
            oldone.setPassword(user.getPassword());
            oldone.setEmail(user.getEmail());
            oldone.setPhone(user.getPhone());
            oldone.setProfile(user.getProfile());

            this.userRepository.save(oldone);

            String msg ="User Successfully Updated";
            return msg;
        }
    }
}
