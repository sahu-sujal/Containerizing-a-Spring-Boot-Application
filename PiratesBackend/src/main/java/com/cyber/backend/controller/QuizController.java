package com.cyber.backend.controller;

import com.cyber.backend.model.exam.Category;
import com.cyber.backend.model.exam.Quiz;
import com.cyber.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    //add quiz
    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    //update quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    //get all quizzes
    @GetMapping("/")
    public ResponseEntity<?> getAllQuizzes(){
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    // get quiz by Id
    @GetMapping("/{quizId}")
    public Quiz quiz(@PathVariable("quizId") Long quizId){
        return this.quizService.getQuizById(quizId);
    }

    // delete quiz by Id
    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizid){
        this.quizService.deleteQuiz(quizid);
    }

    //loding quiz of particular quiz
    @GetMapping("/category/{cid}")
    public List<Quiz> LoadQuizOfCategory(@PathVariable("cid") Long cid)
    {
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getListOfQuizzesofcategory(category);
    }

    //load only activeQuiz
    @GetMapping("/activeQuiz")
    public List<Quiz> LoadActiveQuiz(){
        return this.quizService.getActiveQuizzes();
    }

    @GetMapping("/activeQuiz/{cid}")
    public List<Quiz> LoadActiveQuizOfCategory(@PathVariable("cid") Long cid){
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesOFCategroy(category);
    }
}
