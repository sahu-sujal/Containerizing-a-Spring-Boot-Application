package com.cyber.backend.controller;

import com.cyber.backend.config.JwtUtils;
import com.cyber.backend.helper.UserNotFoundException;
import com.cyber.backend.model.JwtRequest;
import com.cyber.backend.model.JwtResponse;
import com.cyber.backend.model.User;
import com.cyber.backend.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    //generate token

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {

        try{

            authenticate(jwtRequest.getUsername() , jwtRequest.getPassword() );

        }catch (UserNotFoundException e){

            e.printStackTrace();
            throw new Exception("User Not Found");
        }

        //authenticate

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }



    private void authenticate(String username , String password) throws Exception
    {
    try {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username , password));

    }catch (DisabledException e){

        throw new Exception("USER IS DISBALED : "+ e.getMessage());

    }catch (BadCredentialsException e){

        throw new Exception("Invalid Credentials : " + e.getMessage());

    }

    }

    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal)
    {
            return ((User)this.userDetailsService.loadUserByUsername(principal.getName()));
    }

}
