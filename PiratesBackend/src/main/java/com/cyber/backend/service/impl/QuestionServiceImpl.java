package com.cyber.backend.service.impl;

import com.cyber.backend.model.exam.Questions;
import com.cyber.backend.model.exam.Quiz;
import com.cyber.backend.repo.QuestionsRepository;
import com.cyber.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Override
    public Questions addQuestion(Questions questions) {
        return this.questionsRepository.save(questions);
    }

    @Override
    public Questions UpateQuestion(Questions questions) {
        return this.questionsRepository.save(questions);
    }

    @Override
    public Set<Questions> getQuestions() {
        return new HashSet<>(this.questionsRepository.findAll());
    }

    @Override
    public Questions getQuestionById(Long questionId) {
        return this.questionsRepository.findById(questionId).get();
    }

    @Override
    public Set<Questions> getQuestionsofQuiz(Quiz quiz) {
        return this.questionsRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long quesId) {

        Questions questions = new Questions();
        questions.setQuesId(quesId);

        this.questionsRepository.delete(questions);

    }
}
