package com.data_science.snproject.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class APIException extends Exception {

    // -------------- attributes ----------------

    private String errorCode;
    private Object[] translationArgs;
    private int apiErrorCode;

    // -------------- constructors ----------------

    public APIException(String errorCode, Object[] translationArgs, int apiErrorCode) {
        this.errorCode = errorCode;
        this.translationArgs = translationArgs;
        this.apiErrorCode = apiErrorCode;
    }

    public APIException(String errorCode, int apiErrorCode) {
        this.errorCode = errorCode;
        this.apiErrorCode = apiErrorCode;
    }
}
