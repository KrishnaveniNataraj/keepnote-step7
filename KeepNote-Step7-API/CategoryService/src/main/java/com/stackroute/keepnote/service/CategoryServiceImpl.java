package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class CategoryServiceImpl implements CategoryService {

	/*
	 * Autowiring should be implemented for the CategoryRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	private CategoryRepository categoryRepository;

	@Autowired
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	/*
	 * This method should be used to save a new category.Call the corresponding
	 * method of Respository interface.
	 */
	@Override
	public Category createCategory(Category category) throws CategoryNotCreatedException {
		category.setCategoryCreationDate(new Date());
		Category categoryCreated = categoryRepository.insert(category);
		if (categoryCreated == null) {
			throw new CategoryNotCreatedException("Unable to create new Category");
		}
		return categoryCreated;
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	@Override
	public boolean deleteCategory(String categoryId) throws CategoryDoesNoteExistsException {
		boolean categoryDeleted = false;
		Category fetchedCategory = categoryRepository.findById(categoryId).get();
		if (fetchedCategory == null) {
			throw new CategoryDoesNoteExistsException("Category with given name does not exists " + categoryId);

		} else {
			categoryRepository.delete(fetchedCategory);
			categoryDeleted = true;
		}
		return categoryDeleted;
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	@Override
	public Category updateCategory(Category category, String categoryId) {

		Category fetchedCategory = categoryRepository.findById(categoryId).get();
		fetchedCategory.setCategoryName(category.getCategoryName());
		fetchedCategory.setCategoryDescription(category.getCategoryDescription());
		fetchedCategory.setCategoryCreatedBy(category.getCategoryCreatedBy());
		fetchedCategory.setCategoryCreationDate(new Date());
		categoryRepository.save(fetchedCategory);

		return fetchedCategory;
	}

	/*
	 * This method should be used to get a category by categoryId.Call the
	 * corresponding method of Respository interface.
	 */
	@Override
	public Category getCategoryById(String categoryId) throws CategoryNotFoundException {

		try {
			Category fetchedCategory = categoryRepository.findById(categoryId).get();

			return fetchedCategory;
		} catch (NoSuchElementException e) {
			throw new CategoryNotFoundException("Category does not exists");
		}

	}

	/*
	 * This method should be used to get a category by userId.Call the corresponding
	 * method of Respository interface.
	 */
	@Override
	public List<Category> getAllCategoryByUserId(String userId) {
		return categoryRepository.findAllCategoryByCategoryCreatedBy(userId);
	}

}
