package com.bookur.server.controllers;

import com.bookur.server.dto.ReaderEditionDTO;
import com.bookur.server.dto.UpdateRequest;
import com.bookur.server.services.ReaderEditionService;
import com.bookur.server.repositories.ReaderEditionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "${react.url}")
public class BookController {
    private final ReaderEditionRepository readerEditionRepository;
    private final ReaderEditionService readerEditionService;

    public BookController(ReaderEditionRepository readerEditionRepository, ReaderEditionService readerEditionService) {
        this.readerEditionRepository = readerEditionRepository;
        this.readerEditionService = readerEditionService;
    }

    @GetMapping("/{readerId}")
    public List<ReaderEditionDTO> getBooksForReader(@PathVariable Long readerId) {
        return readerEditionRepository.findByReaderId(readerId)
                .stream()
                .map(ReaderEditionDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/update/rating")
    public void updateBookRating(@RequestBody UpdateRequest request) {
        readerEditionService.updateBookRating(request);
    }

    @PostMapping("/update/status")
    public void updateBookStatus(@RequestBody UpdateRequest request) {
        readerEditionService.updateBookStatus(request);
    }

    @PostMapping("/update/page")
    public void updateBookPage(@RequestBody UpdateRequest request) {
        readerEditionService.updateBookPage(request);
    }

    @PostMapping("/update/favorited")
    public void updateBookFavorited(@RequestBody UpdateRequest request) {
        readerEditionService.updateBookFavorited(request);
    }
}
