package com.data_science.snproject.services.initializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.data_science.snproject.exceptions.APIException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DbInitializer {

    private final UserInitializer userInitializer;


    @Autowired
    public DbInitializer(
            UserInitializer userInitializer
        ) {
        this.userInitializer = userInitializer;
    }

    public void init() throws APIException {
        log.info("╔═══════════════════════════════════════════╗");
        log.info("║   Démarrage initialisation base données   ║");
        log.info("╚═══════════════════════════════════════════╝");



        log.info("➤ Initialisation des utilisateurs");
        userInitializer.initUsers();
        log.info("✓ Utilisateurs initialisés avec succès");
        

        log.info("╔═══════════════════════════════════════════╗");
        log.info("║   Initialisation base données terminée    ║");
        log.info("╚═══════════════════════════════════════════╝");
    }
}
