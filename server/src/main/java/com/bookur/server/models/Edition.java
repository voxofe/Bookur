package com.bookur.server.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data // Generates getters, setters, toString, equals, and hashCode
@Entity
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String ISBN;
    private String image;
    private int pages;

    private String editionLanguage;
    private String country;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @OneToMany(mappedBy = "edition", cascade = CascadeType.ALL)
    private List<ReaderEdition> readerEditions;
}