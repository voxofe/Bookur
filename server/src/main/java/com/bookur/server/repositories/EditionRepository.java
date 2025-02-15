package com.bookur.server.repositories;

import com.bookur.server.models.Edition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditionRepository extends JpaRepository<Edition, Long> {
}
