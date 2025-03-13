package com.data_science.snproject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.data_science.snproject.services.initializer.DbInitializer;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class SnprojectApplication extends SpringBootServletInitializer implements CommandLineRunner {

	private final DbInitializer dbInitializer;

    @Autowired
    public SnprojectApplication(DbInitializer dbInitializer) {
        this.dbInitializer = dbInitializer;
    }

	public static void main(String[] args) {
		SpringApplication.run(SnprojectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		try {
			dbInitializer.init();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


}
