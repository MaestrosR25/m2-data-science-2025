package com.data_science.snproject.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    // -------------- attributes ----------------



    @ExceptionHandler(APIException.class)
    public ResponseEntity<Map<String, Object>> handleAPIException(APIException ex) {
        Map<String, Object> response = new HashMap<>();
        
        // Utilisation de la méthode resolveHttpStatus pour récupérer le statut HTTP
        HttpStatus status = HttpStatus.NOT_FOUND;
        
        response.put("status", status.value());
        
        
        response.put("messageCode", ex.getErrorCode());
        
        return new ResponseEntity<>(response, status);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGlobalException(Exception e) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // Utilisation de la méthode centralisée
        response.put("status", status.value());
        response.put("message", e.getMessage());
        response.put("messageCode", "global.error");
        return new ResponseEntity<>(response, status);
    }
}
