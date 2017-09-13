package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.RegistrationInformation;

import com.sys.org.repository.RegistrationInformationRepository;
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
 * REST controller for managing RegistrationInformation.
 */
@RestController
@RequestMapping("/api")
public class RegistrationInformationResource {

    private final Logger log = LoggerFactory.getLogger(RegistrationInformationResource.class);

    private static final String ENTITY_NAME = "registrationInformation";

    private final RegistrationInformationRepository registrationInformationRepository;

    public RegistrationInformationResource(RegistrationInformationRepository registrationInformationRepository) {
        this.registrationInformationRepository = registrationInformationRepository;
    }

    /**
     * POST  /registration-informations : Create a new registrationInformation.
     *
     * @param registrationInformation the registrationInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new registrationInformation, or with status 400 (Bad Request) if the registrationInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/registration-informations")
    @Timed
    public ResponseEntity<RegistrationInformation> createRegistrationInformation(@RequestBody RegistrationInformation registrationInformation) throws URISyntaxException {
        log.debug("REST request to save RegistrationInformation : {}", registrationInformation);
        if (registrationInformation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new registrationInformation cannot already have an ID")).body(null);
        }
        RegistrationInformation result = registrationInformationRepository.save(registrationInformation);
        return ResponseEntity.created(new URI("/api/registration-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registration-informations : Updates an existing registrationInformation.
     *
     * @param registrationInformation the registrationInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registrationInformation,
     * or with status 400 (Bad Request) if the registrationInformation is not valid,
     * or with status 500 (Internal Server Error) if the registrationInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registration-informations")
    @Timed
    public ResponseEntity<RegistrationInformation> updateRegistrationInformation(@RequestBody RegistrationInformation registrationInformation) throws URISyntaxException {
        log.debug("REST request to update RegistrationInformation : {}", registrationInformation);
        if (registrationInformation.getId() == null) {
            return createRegistrationInformation(registrationInformation);
        }
        RegistrationInformation result = registrationInformationRepository.save(registrationInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registrationInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /registration-informations : get all the registrationInformations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of registrationInformations in body
     */
    @GetMapping("/registration-informations")
    @Timed
    public List<RegistrationInformation> getAllRegistrationInformations() {
        log.debug("REST request to get all RegistrationInformations");
        return registrationInformationRepository.findAll();
    }

    /**
     * GET  /registration-informations/:id : get the "id" registrationInformation.
     *
     * @param id the id of the registrationInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registrationInformation, or with status 404 (Not Found)
     */
    @GetMapping("/registration-informations/{id}")
    @Timed
    public ResponseEntity<RegistrationInformation> getRegistrationInformation(@PathVariable Long id) {
        log.debug("REST request to get RegistrationInformation : {}", id);
        RegistrationInformation registrationInformation = registrationInformationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(registrationInformation));
    }

    /**
     * DELETE  /registration-informations/:id : delete the "id" registrationInformation.
     *
     * @param id the id of the registrationInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registration-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegistrationInformation(@PathVariable Long id) {
        log.debug("REST request to delete RegistrationInformation : {}", id);
        registrationInformationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
