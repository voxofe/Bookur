package com.bookur.server.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data // Generates getters, setters, toString, equals, and hashCode
@Entity
public class ReaderEdition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reader_id")
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @Enumerated(EnumType.STRING)
    private Status status;  

    private int currentPage;
    private int rating;
    private LocalDate dateStarted; 
    private LocalDate dateFinished; 
    private boolean isOwned;
    private boolean isFavorited;

    // Enum for Status
    public enum Status {
        TO_READ, READING, READ
    }
}