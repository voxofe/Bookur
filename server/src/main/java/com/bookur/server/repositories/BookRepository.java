package com.bookur.server.repositories;

import com.bookur.server.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String title);
}
