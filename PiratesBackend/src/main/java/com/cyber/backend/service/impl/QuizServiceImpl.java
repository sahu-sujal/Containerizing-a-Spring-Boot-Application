package com.cyber.backend.service.impl;

import com.cyber.backend.model.exam.Category;
import com.cyber.backend.model.exam.Quiz;
import com.cyber.backend.repo.QuizRepository;
import com.cyber.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    @Override
    public Quiz getQuizById(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {

        this.quizRepository.deleteById(quizId);
    }

    @Override
    public List<Quiz> getListOfQuizzesofcategory(Category c) {
        return this.quizRepository.findBycategory(c);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.quizRepository.findByactive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOFCategroy(Category c) {
        return this.quizRepository.findByCategoryAndActive(c,true);
    }

}
