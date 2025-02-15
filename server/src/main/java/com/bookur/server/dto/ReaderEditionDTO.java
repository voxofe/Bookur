package com.bookur.server.dto;

import com.bookur.server.models.ReaderEdition;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ReaderEditionDTO {
    private Long readerEditionId;
    private Long readerId;
    
    private Long editionId;
    private String editionTitle;
    private String ISBN;
    private String image;
    private int pages;
    private String editionLanguage;
    private String editionCountry;

    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private int bookOriginalYear;
    private String bookOriginalLanguage;
    private String bookCountry;

    private ReaderEdition.Status status;
    private int currentPage;
    private int rating;
    private LocalDate dateStarted;
    private LocalDate dateFinished;
    private boolean owned;
    private boolean favorited;

    public ReaderEditionDTO(ReaderEdition readerEdition) {
        this.readerEditionId = readerEdition.getId();
        this.readerId = readerEdition.getReader().getId();
        
        this.editionId = readerEdition.getEdition().getId();
        this.editionTitle = readerEdition.getEdition().getTitle();
        this.ISBN = readerEdition.getEdition().getISBN();
        this.image = readerEdition.getEdition().getImage();
        this.pages = readerEdition.getEdition().getPages();
        this.editionLanguage = readerEdition.getEdition().getEditionLanguage();
        this.editionCountry = readerEdition.getEdition().getCountry();

        this.bookId = readerEdition.getEdition().getBook().getId();
        this.bookTitle = readerEdition.getEdition().getBook().getTitle();
        this.bookAuthor = readerEdition.getEdition().getBook().getAuthor();
        this.bookOriginalYear = readerEdition.getEdition().getBook().getOriginalYear();
        this.bookOriginalLanguage = readerEdition.getEdition().getBook().getOriginalLanguage();
        this.bookCountry = readerEdition.getEdition().getBook().getCountry();

        this.status = readerEdition.getStatus();
        this.currentPage = readerEdition.getCurrentPage();
        this.rating = readerEdition.getRating();
        this.dateStarted = readerEdition.getDateStarted();
        this.dateFinished = readerEdition.getDateFinished();
        this.owned = readerEdition.isOwned();
        this.favorited = readerEdition.isFavorited();
    }
}
