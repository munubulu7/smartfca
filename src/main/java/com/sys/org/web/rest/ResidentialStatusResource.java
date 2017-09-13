package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.ResidentialStatus;

import com.sys.org.repository.ResidentialStatusRepository;
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
 * REST controller for managing ResidentialStatus.
 */
@RestController
@RequestMapping("/api")
public class ResidentialStatusResource {

    private final Logger log = LoggerFactory.getLogger(ResidentialStatusResource.class);

    private static final String ENTITY_NAME = "residentialStatus";

    private final ResidentialStatusRepository residentialStatusRepository;

    public ResidentialStatusResource(ResidentialStatusRepository residentialStatusRepository) {
        this.residentialStatusRepository = residentialStatusRepository;
    }

    /**
     * POST  /residential-statuses : Create a new residentialStatus.
     *
     * @param residentialStatus the residentialStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new residentialStatus, or with status 400 (Bad Request) if the residentialStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/residential-statuses")
    @Timed
    public ResponseEntity<ResidentialStatus> createResidentialStatus(@RequestBody ResidentialStatus residentialStatus) throws URISyntaxException {
        log.debug("REST request to save ResidentialStatus : {}", residentialStatus);
        if (residentialStatus.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new residentialStatus cannot already have an ID")).body(null);
        }
        ResidentialStatus result = residentialStatusRepository.save(residentialStatus);
        return ResponseEntity.created(new URI("/api/residential-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /residential-statuses : Updates an existing residentialStatus.
     *
     * @param residentialStatus the residentialStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated residentialStatus,
     * or with status 400 (Bad Request) if the residentialStatus is not valid,
     * or with status 500 (Internal Server Error) if the residentialStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/residential-statuses")
    @Timed
    public ResponseEntity<ResidentialStatus> updateResidentialStatus(@RequestBody ResidentialStatus residentialStatus) throws URISyntaxException {
        log.debug("REST request to update ResidentialStatus : {}", residentialStatus);
        if (residentialStatus.getId() == null) {
            return createResidentialStatus(residentialStatus);
        }
        ResidentialStatus result = residentialStatusRepository.save(residentialStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, residentialStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /residential-statuses : get all the residentialStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of residentialStatuses in body
     */
    @GetMapping("/residential-statuses")
    @Timed
    public List<ResidentialStatus> getAllResidentialStatuses() {
        log.debug("REST request to get all ResidentialStatuses");
        return residentialStatusRepository.findAll();
    }

    /**
     * GET  /residential-statuses/:id : get the "id" residentialStatus.
     *
     * @param id the id of the residentialStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the residentialStatus, or with status 404 (Not Found)
     */
    @GetMapping("/residential-statuses/{id}")
    @Timed
    public ResponseEntity<ResidentialStatus> getResidentialStatus(@PathVariable Long id) {
        log.debug("REST request to get ResidentialStatus : {}", id);
        ResidentialStatus residentialStatus = residentialStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(residentialStatus));
    }

    /**
     * DELETE  /residential-statuses/:id : delete the "id" residentialStatus.
     *
     * @param id the id of the residentialStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/residential-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteResidentialStatus(@PathVariable Long id) {
        log.debug("REST request to delete ResidentialStatus : {}", id);
        residentialStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
