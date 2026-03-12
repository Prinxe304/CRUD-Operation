package com.AaruStore.BookStore.Service;

import com.AaruStore.BookStore.Entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
public class BookService {

    private Map<Long, Book> bookMap = new HashMap<>();

    @GetMapping
    public ResponseEntity<List<Book>> getAllBook() {
        return ResponseEntity.ok(new ArrayList<>(bookMap.values()));
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        bookMap.put(book.getId(), book);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book entity = bookMap.get(id);
        if (entity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBook(@PathVariable Long id , @RequestBody Book book) {
        Book entity = bookMap.get(id);
        if (entity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        bookMap.put(id, book);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/price")
    public ResponseEntity<Book> updateBook(@PathVariable Long id , @RequestBody double price) {
        Book entity = bookMap.get(id);
        if (entity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        entity.setPrice(price);
        bookMap.put(id, entity);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookMap.remove(id);
        return ResponseEntity.noContent().build();
    }
}
