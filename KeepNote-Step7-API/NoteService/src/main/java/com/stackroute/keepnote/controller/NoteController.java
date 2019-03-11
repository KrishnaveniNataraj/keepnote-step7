package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@RequestMapping("/note-service/api/v1/note")
@Api(tags = "NoteController")
@CrossOrigin(origins = "*")
public class NoteController {

	private Log log = LogFactory.getLog(getClass());

	/*
	 * Autowiring should be implemented for the NoteService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	private NoteService noteService;

	@Autowired
	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public String swaggerUi() {
		return "redirect:/swagger-ui.html";
	}

	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the note created
	 * successfully. 2. 409(CONFLICT) - If the noteId conflicts with any
	 * existing user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST
	 * method
	 */
	@ApiOperation(value = "Create Note")
	@PostMapping()
	public ResponseEntity addNote(@RequestBody Note note) {
		log.info("createNote : STARTED ");
		HttpHeaders headers = new HttpHeaders();

		try {
			note.setNoteCreationDate(new Date());

			if (noteService.createNote(note)) {
				log.info("Note created successfully..... ");
				return new ResponseEntity<>(note, headers, HttpStatus.CREATED);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
		}
		log.info("createNote : ENDED ");
		return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
	}

	/*
	 * Define a handler method which will delete a note from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the note with specified noteId is not
	 * found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid noteId without {}
	 */
	@ApiOperation(value = "Delete Note")
	@DeleteMapping("/{userId}/{id}")
	public ResponseEntity deleteNote(@PathVariable("userId") String userId, @PathVariable("id") int id) {
		log.info("deleteNote : STARTED ");
		HttpHeaders headers = new HttpHeaders();

		try {
			if (noteService.deleteNote(userId, id)) {
				return new ResponseEntity<>(headers, HttpStatus.OK);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("deleteNote : ENDED ");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Delete All Note for given user")
	@DeleteMapping("/{userId}")
	public ResponseEntity deleteAllNotes(@PathVariable() String userId) {
		log.info("deleteAllNotes : STARTED ");
		HttpHeaders headers = new HttpHeaders();

		try {
			if (noteService.deleteAllNotes(userId)) {
				return new ResponseEntity<>(headers, HttpStatus.OK);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("deleteAllNotes : ENDED ");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in
	 * a database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the note updated
	 * successfully. 2. 404(NOT FOUND) - If the note with specified noteId is
	 * not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP
	 * PUT method.
	 */
	@ApiOperation(value = "Update Note")
	@PutMapping("/{userId}/{id}")
	public ResponseEntity updateNote(@PathVariable() String userId, @PathVariable() int id, @RequestBody Note note) {
		log.info("updateNote : STARTED ");

		HttpHeaders headers = new HttpHeaders();
		Note noteUpd = null;
		try {
			noteUpd = noteService.updateNote(note, id, userId);
			if (noteUpd != null) {
				return new ResponseEntity<>(noteUpd, headers, HttpStatus.OK);
			}
		} catch (NoteNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}

		log.info("updateNote : ENDED ");
		return new ResponseEntity<>(noteUpd, headers, HttpStatus.OK);
	}

	/*
	 * Define a handler method which will get us the all notes by a userId. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note found successfully.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP GET
	 * method
	 */
	@ApiOperation(value = "Get all Note for given User")
	@GetMapping("/{userId}")
	public ResponseEntity getAllNoteByUserId(@PathVariable() String userId) {
		log.info("getAllNoteByUserId : STARTED ");
		HttpHeaders headers = new HttpHeaders();

		List<Note> userNotes = noteService.getAllNoteByUserId(userId);

		if (userNotes != null) {
			return new ResponseEntity(userNotes, headers, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No Notes found in your list", HttpStatus.OK);
		}
	}

	/*
	 * Define a handler method which will show details of a specific note
	 * created by specific user. This handler method should return any one of
	 * the status messages basis on different situations: 1. 200(OK) - If the
	 * note found successfully. 2. 404(NOT FOUND) - If the note with specified
	 * noteId is not found. This handler method should map to the URL
	 * "/api/v1/note/{userId}/{noteId}" using HTTP GET method where "id" should
	 * be replaced by a valid reminderId without {}
	 * 
	 */
	@ApiOperation(value = "Get Note by ID")
	@GetMapping("{userId}/{noteId}")
	public ResponseEntity getNoteById(@PathVariable() String userId, @PathVariable() int noteId) {
		log.info("getNoteByUserId : STARTED");
		HttpHeaders headers = new HttpHeaders();
		ResponseEntity responseEntity = null;
		try {
			Note note = noteService.getNoteByNoteId(userId, noteId);
			responseEntity = new ResponseEntity(note, HttpStatus.OK);
		} catch (NoteNotFoundExeption exception) {
			log.info("NoteNotFoundExeption in getNoteByUserId ");
			responseEntity = new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}
}
