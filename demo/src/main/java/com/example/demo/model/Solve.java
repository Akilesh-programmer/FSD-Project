package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solves")
public class Solve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(name = "solve_time", nullable = false)
    private Long time;

    private String scramble;

    private LocalDateTime timestamp;

    private String penalty;

    public Solve() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getTime() { return time; }
    public void setTime(Long time) { this.time = time; }

    public String getScramble() { return scramble; }
    public void setScramble(String scramble) { this.scramble = scramble; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getPenalty() { return penalty; }
    public void setPenalty(String penalty) { this.penalty = penalty; }
}
