package com.cyber.backend.repo;

import com.cyber.backend.model.exam.Questions;
import com.cyber.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionsRepository extends JpaRepository<Questions , Long> {
    Set<Questions> findByQuiz(Quiz quiz);
}
