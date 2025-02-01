package com.cyber.backend.service;

import com.cyber.backend.model.exam.Category;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);

    public Category upateCategory(Category category);

    public Set<Category> getCategories();

    public Category getCategoryById(Long CategoryId);

    public void deleteCategory(Long CategoryId);
}
