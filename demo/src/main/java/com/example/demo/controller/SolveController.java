package com.example.demo.controller;

import com.example.demo.dto.SolveRequest;
import com.example.demo.dto.SolveResponse;
import com.example.demo.service.SolveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solves")
public class SolveController {

    private final SolveService solveService;

    public SolveController(SolveService solveService) {
        this.solveService = solveService;
    }

    @GetMapping
    public List<SolveResponse> getSolves(@RequestHeader("X-User-Id") Long userId) {
        return solveService.getSolves(userId);
    }

    @PostMapping
    public SolveResponse addSolve(@RequestHeader("X-User-Id") Long userId,
                                  @RequestBody SolveRequest request) {
        return solveService.addSolve(userId, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolve(@RequestHeader("X-User-Id") Long userId,
                                            @PathVariable Long id) {
        solveService.deleteSolve(userId, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllSolves(@RequestHeader("X-User-Id") Long userId) {
        solveService.deleteAllSolves(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/penalty")
    public SolveResponse updatePenalty(@RequestHeader("X-User-Id") Long userId,
                                      @PathVariable Long id,
                                      @RequestBody Map<String, String> body) {
        return solveService.updatePenalty(userId, id, body.get("penalty"));
    }
}
