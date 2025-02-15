package com.bookur.server.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data // Generates getters, setters, toString, equals, and hashCode
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private int originalYear;

    private String originalLanguage;
    private String country;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Edition> editions;
}