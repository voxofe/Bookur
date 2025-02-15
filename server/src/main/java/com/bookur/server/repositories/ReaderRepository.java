package com.bookur.server.repositories;

import com.bookur.server.models.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
    Optional<Reader> findByUsername(String username);
    Reader findByEmail(String email);
}
