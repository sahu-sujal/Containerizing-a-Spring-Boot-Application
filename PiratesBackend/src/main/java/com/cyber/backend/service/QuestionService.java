package com.cyber.backend.service;

import com.cyber.backend.model.exam.Questions;
import com.cyber.backend.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    public Questions addQuestion(Questions questions);

    public Questions UpateQuestion(Questions questions);

    public Set<Questions> getQuestions();

    public Questions getQuestionById(Long questionId);

    public Set<Questions> getQuestionsofQuiz(Quiz quiz);

    public void deleteQuestion(Long quesId);

}
