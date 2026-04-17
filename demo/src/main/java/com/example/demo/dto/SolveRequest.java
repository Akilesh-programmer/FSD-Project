package com.example.demo.dto;

public class SolveRequest {
    private Long time;
    private String scramble;
    private String penalty;

    public Long getTime() { return time; }
    public void setTime(Long time) { this.time = time; }

    public String getScramble() { return scramble; }
    public void setScramble(String scramble) { this.scramble = scramble; }

    public String getPenalty() { return penalty; }
    public void setPenalty(String penalty) { this.penalty = penalty; }
}
