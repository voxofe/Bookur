package com.bookur.server.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.Data;

@Data // Generates getters, setters, toString, equals, and hashCode
@Entity
public class Reader implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "reader", cascade = CascadeType.ALL)
    private List<ReaderEdition> trackedEditions;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Return user roles/authorities
    }

    @Override
    public String getPassword() {
        return password; 
    }

    @Override
    public String getUsername() {
        return username; 
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}