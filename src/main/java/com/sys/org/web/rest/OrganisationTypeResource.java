package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.OrganisationType;

import com.sys.org.repository.OrganisationTypeRepository;
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
 * REST controller for managing OrganisationType.
 */
@RestController
@RequestMapping("/api")
public class OrganisationTypeResource {

    private final Logger log = LoggerFactory.getLogger(OrganisationTypeResource.class);

    private static final String ENTITY_NAME = "organisationType";

    private final OrganisationTypeRepository organisationTypeRepository;

    public OrganisationTypeResource(OrganisationTypeRepository organisationTypeRepository) {
        this.organisationTypeRepository = organisationTypeRepository;
    }

    /**
     * POST  /organisation-types : Create a new organisationType.
     *
     * @param organisationType the organisationType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new organisationType, or with status 400 (Bad Request) if the organisationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/organisation-types")
    @Timed
    public ResponseEntity<OrganisationType> createOrganisationType(@RequestBody OrganisationType organisationType) throws URISyntaxException {
        log.debug("REST request to save OrganisationType : {}", organisationType);
        if (organisationType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new organisationType cannot already have an ID")).body(null);
        }
        OrganisationType result = organisationTypeRepository.save(organisationType);
        return ResponseEntity.created(new URI("/api/organisation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /organisation-types : Updates an existing organisationType.
     *
     * @param organisationType the organisationType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated organisationType,
     * or with status 400 (Bad Request) if the organisationType is not valid,
     * or with status 500 (Internal Server Error) if the organisationType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/organisation-types")
    @Timed
    public ResponseEntity<OrganisationType> updateOrganisationType(@RequestBody OrganisationType organisationType) throws URISyntaxException {
        log.debug("REST request to update OrganisationType : {}", organisationType);
        if (organisationType.getId() == null) {
            return createOrganisationType(organisationType);
        }
        OrganisationType result = organisationTypeRepository.save(organisationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, organisationType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /organisation-types : get all the organisationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of organisationTypes in body
     */
    @GetMapping("/organisation-types")
    @Timed
    public List<OrganisationType> getAllOrganisationTypes() {
        log.debug("REST request to get all OrganisationTypes");
        return organisationTypeRepository.findAll();
    }

    /**
     * GET  /organisation-types/:id : get the "id" organisationType.
     *
     * @param id the id of the organisationType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the organisationType, or with status 404 (Not Found)
     */
    @GetMapping("/organisation-types/{id}")
    @Timed
    public ResponseEntity<OrganisationType> getOrganisationType(@PathVariable Long id) {
        log.debug("REST request to get OrganisationType : {}", id);
        OrganisationType organisationType = organisationTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(organisationType));
    }

    /**
     * DELETE  /organisation-types/:id : delete the "id" organisationType.
     *
     * @param id the id of the organisationType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/organisation-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrganisationType(@PathVariable Long id) {
        log.debug("REST request to delete OrganisationType : {}", id);
        organisationTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
