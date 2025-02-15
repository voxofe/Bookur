package com.bookur.server.dto;

public class UpdateRequest {
    private Long editionId;
    private Integer rating;
    private String status;
    private Integer currentPage;
    private boolean favorited;

    public Long getEditionId() { return editionId; }
    public void setEditionId(Long editionId) { this.editionId = editionId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getCurrentPage() { return currentPage; }
    public void setCurrentPage(Integer currentPage) { this.currentPage = currentPage; }

    public boolean getFavorited() { return favorited; }
    public void setFavorited(boolean favorited) { this.favorited = favorited; }
}
