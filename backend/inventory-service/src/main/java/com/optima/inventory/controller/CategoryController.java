package com.optima.inventory.controller;

import com.optima.inventory.dto.request.CategoryRequestDto;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public CategoryEntity createCategory(@RequestBody @Valid CategoryRequestDto request) {
        return categoryService.createCategory(request);
    }

    @GetMapping
    public List<CategoryEntity> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/{categoryId}")
    public CategoryEntity getCategory(@PathVariable("categoryId") long categoryId) {
        return categoryService.getCategory(categoryId);
    }

    @PutMapping("/{categoryId}")
    public CategoryEntity updateCategory(@PathVariable("categoryId") long categoryId, @RequestBody CategoryRequestDto request) {
        return categoryService.updateCategory(categoryId, request);
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategory(@PathVariable("categoryId") long categoryId) {
        categoryService.deleteCategory(categoryId);
        return "Category has been deleted";
    }
}
