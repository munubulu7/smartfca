package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.Employers;

import com.sys.org.repository.EmployersRepository;
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
 * REST controller for managing Employers.
 */
@RestController
@RequestMapping("/api")
public class EmployersResource {

    private final Logger log = LoggerFactory.getLogger(EmployersResource.class);

    private static final String ENTITY_NAME = "employers";

    private final EmployersRepository employersRepository;

    public EmployersResource(EmployersRepository employersRepository) {
        this.employersRepository = employersRepository;
    }

    /**
     * POST  /employers : Create a new employers.
     *
     * @param employers the employers to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employers, or with status 400 (Bad Request) if the employers has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employers")
    @Timed
    public ResponseEntity<Employers> createEmployers(@RequestBody Employers employers) throws URISyntaxException {
        log.debug("REST request to save Employers : {}", employers);
        if (employers.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new employers cannot already have an ID")).body(null);
        }
        Employers result = employersRepository.save(employers);
        return ResponseEntity.created(new URI("/api/employers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employers : Updates an existing employers.
     *
     * @param employers the employers to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employers,
     * or with status 400 (Bad Request) if the employers is not valid,
     * or with status 500 (Internal Server Error) if the employers couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employers")
    @Timed
    public ResponseEntity<Employers> updateEmployers(@RequestBody Employers employers) throws URISyntaxException {
        log.debug("REST request to update Employers : {}", employers);
        if (employers.getId() == null) {
            return createEmployers(employers);
        }
        Employers result = employersRepository.save(employers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employers.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employers : get all the employers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employers in body
     */
    @GetMapping("/employers")
    @Timed
    public List<Employers> getAllEmployers() {
        log.debug("REST request to get all Employers");
        return employersRepository.findAll();
    }

    /**
     * GET  /employers/:id : get the "id" employers.
     *
     * @param id the id of the employers to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employers, or with status 404 (Not Found)
     */
    @GetMapping("/employers/{id}")
    @Timed
    public ResponseEntity<Employers> getEmployers(@PathVariable Long id) {
        log.debug("REST request to get Employers : {}", id);
        Employers employers = employersRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employers));
    }

    /**
     * DELETE  /employers/:id : delete the "id" employers.
     *
     * @param id the id of the employers to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employers/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployers(@PathVariable Long id) {
        log.debug("REST request to delete Employers : {}", id);
        employersRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
