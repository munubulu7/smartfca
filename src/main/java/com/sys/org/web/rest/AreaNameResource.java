package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.AreaName;

import com.sys.org.repository.AreaNameRepository;
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
 * REST controller for managing AreaName.
 */
@RestController
@RequestMapping("/api")
public class AreaNameResource {

    private final Logger log = LoggerFactory.getLogger(AreaNameResource.class);

    private static final String ENTITY_NAME = "areaName";

    private final AreaNameRepository areaNameRepository;

    public AreaNameResource(AreaNameRepository areaNameRepository) {
        this.areaNameRepository = areaNameRepository;
    }

    /**
     * POST  /area-names : Create a new areaName.
     *
     * @param areaName the areaName to create
     * @return the ResponseEntity with status 201 (Created) and with body the new areaName, or with status 400 (Bad Request) if the areaName has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/area-names")
    @Timed
    public ResponseEntity<AreaName> createAreaName(@RequestBody AreaName areaName) throws URISyntaxException {
        log.debug("REST request to save AreaName : {}", areaName);
        if (areaName.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new areaName cannot already have an ID")).body(null);
        }
        AreaName result = areaNameRepository.save(areaName);
        return ResponseEntity.created(new URI("/api/area-names/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /area-names : Updates an existing areaName.
     *
     * @param areaName the areaName to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated areaName,
     * or with status 400 (Bad Request) if the areaName is not valid,
     * or with status 500 (Internal Server Error) if the areaName couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/area-names")
    @Timed
    public ResponseEntity<AreaName> updateAreaName(@RequestBody AreaName areaName) throws URISyntaxException {
        log.debug("REST request to update AreaName : {}", areaName);
        if (areaName.getId() == null) {
            return createAreaName(areaName);
        }
        AreaName result = areaNameRepository.save(areaName);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, areaName.getId().toString()))
            .body(result);
    }

    /**
     * GET  /area-names : get all the areaNames.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of areaNames in body
     */
    @GetMapping("/area-names")
    @Timed
    public List<AreaName> getAllAreaNames() {
        log.debug("REST request to get all AreaNames");
        return areaNameRepository.findAll();
    }

    /**
     * GET  /area-names/:id : get the "id" areaName.
     *
     * @param id the id of the areaName to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the areaName, or with status 404 (Not Found)
     */
    @GetMapping("/area-names/{id}")
    @Timed
    public ResponseEntity<AreaName> getAreaName(@PathVariable Long id) {
        log.debug("REST request to get AreaName : {}", id);
        AreaName areaName = areaNameRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(areaName));
    }

    /**
     * DELETE  /area-names/:id : delete the "id" areaName.
     *
     * @param id the id of the areaName to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/area-names/{id}")
    @Timed
    public ResponseEntity<Void> deleteAreaName(@PathVariable Long id) {
        log.debug("REST request to delete AreaName : {}", id);
        areaNameRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
