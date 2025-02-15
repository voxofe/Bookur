package com.bookur.server.repositories;

import com.bookur.server.models.ReaderEdition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReaderEditionRepository extends JpaRepository<ReaderEdition, Long> {
    List<ReaderEdition> findByReaderId(Long readerId);
    List<ReaderEdition> findByEditionId(Long editionId);
}

