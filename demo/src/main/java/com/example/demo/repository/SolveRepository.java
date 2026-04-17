package com.example.demo.repository;

import com.example.demo.model.Solve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolveRepository extends JpaRepository<Solve, Long> {
    List<Solve> findByUserIdOrderByTimestampDesc(Long userId);
    void deleteAllByUserId(Long userId);
}
