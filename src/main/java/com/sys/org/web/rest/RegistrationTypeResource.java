package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.RegistrationType;

import com.sys.org.repository.RegistrationTypeRepository;
import com.sys.org.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RegistrationType.
 */
@RestController
@RequestMapping("/api")
public class RegistrationTypeResource {

    private final Logger log = LoggerFactory.getLogger(RegistrationTypeResource.class);

    private static final String ENTITY_NAME = "registrationType";

    private final RegistrationTypeRepository registrationTypeRepository;

    public RegistrationTypeResource(RegistrationTypeRepository registrationTypeRepository) {
        this.registrationTypeRepository = registrationTypeRepository;
    }

    /**
     * POST  /registration-types : Create a new registrationType.
     *
     * @param registrationType the registrationType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new registrationType, or with status 400 (Bad Request) if the registrationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/registration-types")
    @Timed
    public ResponseEntity<RegistrationType> createRegistrationType(@RequestBody RegistrationType registrationType) throws URISyntaxException {
        log.debug("REST request to save RegistrationType : {}", registrationType);
        if (registrationType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new registrationType cannot already have an ID")).body(null);
        }
        RegistrationType result = registrationTypeRepository.save(registrationType);
        return ResponseEntity.created(new URI("/api/registration-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registration-types : Updates an existing registrationType.
     *
     * @param registrationType the registrationType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registrationType,
     * or with status 400 (Bad Request) if the registrationType is not valid,
     * or with status 500 (Internal Server Error) if the registrationType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registration-types")
    @Timed
    public ResponseEntity<RegistrationType> updateRegistrationType(@RequestBody RegistrationType registrationType) throws URISyntaxException {
        log.debug("REST request to update RegistrationType : {}", registrationType);
        if (registrationType.getId() == null) {
            return createRegistrationType(registrationType);
        }
        RegistrationType result = registrationTypeRepository.save(registrationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registrationType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /registration-types : get all the registrationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of registrationTypes in body
     */
    @GetMapping("/registration-types")
    @Timed
    public List<RegistrationType> getAllRegistrationTypes() {
        log.debug("REST request to get all RegistrationTypes");
        return registrationTypeRepository.findAll();
    }

    /**
     * GET  /registration-types/:id : get the "id" registrationType.
     *
     * @param id the id of the registrationType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registrationType, or with status 404 (Not Found)
     */
    @GetMapping("/registration-types/{id}")
    @Timed
    public ResponseEntity<RegistrationType> getRegistrationType(@PathVariable Long id) {
        log.debug("REST request to get RegistrationType : {}", id);
        RegistrationType registrationType = registrationTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(registrationType));
    }

    /**
     * DELETE  /registration-types/:id : delete the "id" registrationType.
     *
     * @param id the id of the registrationType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registration-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegistrationType(@PathVariable Long id) {
        log.debug("REST request to delete RegistrationType : {}", id);
        registrationTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
