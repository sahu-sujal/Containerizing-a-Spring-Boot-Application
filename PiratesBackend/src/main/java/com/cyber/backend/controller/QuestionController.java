package com.cyber.backend.controller;

import com.cyber.backend.model.exam.Questions;
import com.cyber.backend.model.exam.Quiz;
import com.cyber.backend.service.QuestionService;
import com.cyber.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add Questions
    @PostMapping("/")
    public ResponseEntity<Questions> addQuestion(@RequestBody Questions questions){
        return ResponseEntity.ok(this.questionService.addQuestion(questions));
    }

    //upate Questions
    @PutMapping("/")
    public ResponseEntity<Questions> updateQuestion(@RequestBody Questions questions){
        return ResponseEntity.ok(this.questionService.addQuestion(questions));
    }

    //get list of question using quiz id
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionByQuizID(@PathVariable("quizId") Long quizId){

//        Quiz quiz = new Quiz();
//        quiz.setQid(quizId);
//        Set<Questions> questionsOfQuiz = this.questionService.getQuestionsofQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuizById(quizId);
        Set<Questions> questions = quiz.getQuestions();

        List list = new ArrayList(questions);

        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){

            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));

        }
        Collections.shuffle(list);
    return ResponseEntity.ok(list);

    }


    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionByQuizAdmin(@PathVariable("quizId") Long quizId){

        Quiz quiz = new Quiz();
        quiz.setQid(quizId);
        Set<Questions> questionsOfQuiz = this.questionService.getQuestionsofQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);

    }

    //get single question by id
    @GetMapping("/{quesId}")
    public Questions getSingleQuestionById(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestionById(quesId);
    }

    //delete questions using id
    @DeleteMapping("/{quesId}")
    public  void deleteQuestion(@PathVariable("quesId") Long quesId){
        this.questionService.deleteQuestion(quesId);
    }
}
