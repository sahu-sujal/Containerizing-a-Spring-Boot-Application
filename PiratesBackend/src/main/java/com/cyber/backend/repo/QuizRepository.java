package com.cyber.backend.repo;

import com.cyber.backend.model.exam.Category;
import com.cyber.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    public List<Quiz> findBycategory(Category category);

       public List<Quiz> findByactive(boolean b);

       public List<Quiz> findByCategoryAndActive(Category c ,Boolean b);

}
