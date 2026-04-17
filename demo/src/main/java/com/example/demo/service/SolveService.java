package com.example.demo.service;

import com.example.demo.dto.SolveRequest;
import com.example.demo.dto.SolveResponse;
import com.example.demo.model.Solve;
import com.example.demo.repository.SolveRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolveService {

    private final SolveRepository solveRepository;

    public SolveService(SolveRepository solveRepository) {
        this.solveRepository = solveRepository;
    }

    public List<SolveResponse> getSolves(Long userId) {
        return solveRepository.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public SolveResponse addSolve(Long userId, SolveRequest request) {
        Solve solve = new Solve();
        solve.setUserId(userId);
        solve.setTime(request.getTime());
        solve.setScramble(request.getScramble());
        solve.setTimestamp(LocalDateTime.now());
        solve.setPenalty(request.getPenalty());
        solve = solveRepository.save(solve);
        return toResponse(solve);
    }

    public void deleteSolve(Long userId, Long solveId) {
        Solve solve = solveRepository.findById(solveId)
                .orElseThrow(() -> new RuntimeException("Solve not found"));
        if (!solve.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        solveRepository.delete(solve);
    }

    @Transactional
    public void deleteAllSolves(Long userId) {
        solveRepository.deleteAllByUserId(userId);
    }

    public SolveResponse updatePenalty(Long userId, Long solveId, String penalty) {
        Solve solve = solveRepository.findById(solveId)
                .orElseThrow(() -> new RuntimeException("Solve not found"));
        if (!solve.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        solve.setPenalty(penalty);
        solve = solveRepository.save(solve);
        return toResponse(solve);
    }

    private SolveResponse toResponse(Solve solve) {
        return new SolveResponse(
                solve.getId(),
                solve.getTime(),
                solve.getScramble(),
                solve.getTimestamp().toString(),
                solve.getPenalty()
        );
    }
}
