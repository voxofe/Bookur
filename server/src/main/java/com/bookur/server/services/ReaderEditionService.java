package com.bookur.server.services;

import com.bookur.server.dto.UpdateRequest;
import com.bookur.server.models.ReaderEdition;
import com.bookur.server.repositories.ReaderEditionRepository;
import org.springframework.stereotype.Service;

@Service
public class ReaderEditionService {
    private final ReaderEditionRepository readerEditionRepository;

    public ReaderEditionService(ReaderEditionRepository readerEditionRepository) {
        this.readerEditionRepository = readerEditionRepository;
    }

    public ReaderEdition updateBookRating(UpdateRequest request) {
        ReaderEdition readerEdition = findReaderEdition(request.getEditionId());
        readerEdition.setRating(request.getRating());
        return readerEditionRepository.save(readerEdition);
    }

    public ReaderEdition updateBookStatus(UpdateRequest request) {
        ReaderEdition readerEdition = findReaderEdition(request.getEditionId());
        try {
            ReaderEdition.Status statusEnum = ReaderEdition.Status.valueOf(request.getStatus().toUpperCase());
            readerEdition.setStatus(statusEnum);
            return readerEditionRepository.save(readerEdition);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + request.getStatus());
        }
    }

    public ReaderEdition updateBookPage(UpdateRequest request) {
        ReaderEdition readerEdition = findReaderEdition(request.getEditionId());
        readerEdition.setCurrentPage(request.getCurrentPage());
        return readerEditionRepository.save(readerEdition);
    }
    
    
    public ReaderEdition updateBookFavorited(UpdateRequest request) {
        ReaderEdition readerEdition = findReaderEdition(request.getEditionId());
        readerEdition.setFavorited(request.getFavorited());
        return readerEditionRepository.save(readerEdition);
    }

    private ReaderEdition findReaderEdition(Long id) {
        return readerEditionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }
}
