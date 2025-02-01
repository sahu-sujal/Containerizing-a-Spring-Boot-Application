package com.cyber.backend.service.impl;

import com.cyber.backend.model.exam.Category;
import com.cyber.backend.repo.CategoryRepository;
import com.cyber.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category upateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategoryById(Long CategoryId) {
        return this.categoryRepository.findById(CategoryId).get();
    }

    @Override
    public void deleteCategory(Long CategoryId) {

        Category category = new Category();
        category.setCid(CategoryId);
        this.categoryRepository.delete(category);
    }
}
