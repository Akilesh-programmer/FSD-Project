package com.example.demo.dto;

public class SolveResponse {
    private Long id;
    private Long time;
    private String scramble;
    private String timestamp;
    private String penalty;

    public SolveResponse() {}

    public SolveResponse(Long id, Long time, String scramble, String timestamp, String penalty) {
        this.id = id;
        this.time = time;
        this.scramble = scramble;
        this.timestamp = timestamp;
        this.penalty = penalty;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTime() { return time; }
    public void setTime(Long time) { this.time = time; }

    public String getScramble() { return scramble; }
    public void setScramble(String scramble) { this.scramble = scramble; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getPenalty() { return penalty; }
    public void setPenalty(String penalty) { this.penalty = penalty; }
}
