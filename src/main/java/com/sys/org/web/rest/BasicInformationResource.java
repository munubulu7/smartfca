package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.BasicInformation;

import com.sys.org.repository.BasicInformationRepository;
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
 * REST controller for managing BasicInformation.
 */
@RestController
@RequestMapping("/api")
public class BasicInformationResource {

    private final Logger log = LoggerFactory.getLogger(BasicInformationResource.class);

    private static final String ENTITY_NAME = "basicInformation";

    private final BasicInformationRepository basicInformationRepository;

    public BasicInformationResource(BasicInformationRepository basicInformationRepository) {
        this.basicInformationRepository = basicInformationRepository;
    }

    /**
     * POST  /basic-informations : Create a new basicInformation.
     *
     * @param basicInformation the basicInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new basicInformation, or with status 400 (Bad Request) if the basicInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/basic-informations")
    @Timed
    public ResponseEntity<BasicInformation> createBasicInformation(@RequestBody BasicInformation basicInformation) throws URISyntaxException {
        log.debug("REST request to save BasicInformation : {}", basicInformation);
        if (basicInformation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new basicInformation cannot already have an ID")).body(null);
        }
        BasicInformation result = basicInformationRepository.save(basicInformation);
        return ResponseEntity.created(new URI("/api/basic-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /basic-informations : Updates an existing basicInformation.
     *
     * @param basicInformation the basicInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated basicInformation,
     * or with status 400 (Bad Request) if the basicInformation is not valid,
     * or with status 500 (Internal Server Error) if the basicInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/basic-informations")
    @Timed
    public ResponseEntity<BasicInformation> updateBasicInformation(@RequestBody BasicInformation basicInformation) throws URISyntaxException {
        log.debug("REST request to update BasicInformation : {}", basicInformation);
        if (basicInformation.getId() == null) {
            return createBasicInformation(basicInformation);
        }
        BasicInformation result = basicInformationRepository.save(basicInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, basicInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /basic-informations : get all the basicInformations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of basicInformations in body
     */
    @GetMapping("/basic-informations")
    @Timed
    public List<BasicInformation> getAllBasicInformations() {
        log.debug("REST request to get all BasicInformations");
        return basicInformationRepository.findAll();
    }

    /**
     * GET  /basic-informations/:id : get the "id" basicInformation.
     *
     * @param id the id of the basicInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the basicInformation, or with status 404 (Not Found)
     */
    @GetMapping("/basic-informations/{id}")
    @Timed
    public ResponseEntity<BasicInformation> getBasicInformation(@PathVariable Long id) {
        log.debug("REST request to get BasicInformation : {}", id);
        BasicInformation basicInformation = basicInformationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(basicInformation));
    }

    /**
     * DELETE  /basic-informations/:id : delete the "id" basicInformation.
     *
     * @param id the id of the basicInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/basic-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteBasicInformation(@PathVariable Long id) {
        log.debug("REST request to delete BasicInformation : {}", id);
        basicInformationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
