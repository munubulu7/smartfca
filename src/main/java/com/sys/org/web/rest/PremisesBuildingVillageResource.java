package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.PremisesBuildingVillage;

import com.sys.org.repository.PremisesBuildingVillageRepository;
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
 * REST controller for managing PremisesBuildingVillage.
 */
@RestController
@RequestMapping("/api")
public class PremisesBuildingVillageResource {

    private final Logger log = LoggerFactory.getLogger(PremisesBuildingVillageResource.class);

    private static final String ENTITY_NAME = "premisesBuildingVillage";

    private final PremisesBuildingVillageRepository premisesBuildingVillageRepository;

    public PremisesBuildingVillageResource(PremisesBuildingVillageRepository premisesBuildingVillageRepository) {
        this.premisesBuildingVillageRepository = premisesBuildingVillageRepository;
    }

    /**
     * POST  /premises-building-villages : Create a new premisesBuildingVillage.
     *
     * @param premisesBuildingVillage the premisesBuildingVillage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new premisesBuildingVillage, or with status 400 (Bad Request) if the premisesBuildingVillage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/premises-building-villages")
    @Timed
    public ResponseEntity<PremisesBuildingVillage> createPremisesBuildingVillage(@RequestBody PremisesBuildingVillage premisesBuildingVillage) throws URISyntaxException {
        log.debug("REST request to save PremisesBuildingVillage : {}", premisesBuildingVillage);
        if (premisesBuildingVillage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new premisesBuildingVillage cannot already have an ID")).body(null);
        }
        PremisesBuildingVillage result = premisesBuildingVillageRepository.save(premisesBuildingVillage);
        return ResponseEntity.created(new URI("/api/premises-building-villages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /premises-building-villages : Updates an existing premisesBuildingVillage.
     *
     * @param premisesBuildingVillage the premisesBuildingVillage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated premisesBuildingVillage,
     * or with status 400 (Bad Request) if the premisesBuildingVillage is not valid,
     * or with status 500 (Internal Server Error) if the premisesBuildingVillage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/premises-building-villages")
    @Timed
    public ResponseEntity<PremisesBuildingVillage> updatePremisesBuildingVillage(@RequestBody PremisesBuildingVillage premisesBuildingVillage) throws URISyntaxException {
        log.debug("REST request to update PremisesBuildingVillage : {}", premisesBuildingVillage);
        if (premisesBuildingVillage.getId() == null) {
            return createPremisesBuildingVillage(premisesBuildingVillage);
        }
        PremisesBuildingVillage result = premisesBuildingVillageRepository.save(premisesBuildingVillage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, premisesBuildingVillage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /premises-building-villages : get all the premisesBuildingVillages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of premisesBuildingVillages in body
     */
    @GetMapping("/premises-building-villages")
    @Timed
    public List<PremisesBuildingVillage> getAllPremisesBuildingVillages() {
        log.debug("REST request to get all PremisesBuildingVillages");
        return premisesBuildingVillageRepository.findAll();
    }

    /**
     * GET  /premises-building-villages/:id : get the "id" premisesBuildingVillage.
     *
     * @param id the id of the premisesBuildingVillage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the premisesBuildingVillage, or with status 404 (Not Found)
     */
    @GetMapping("/premises-building-villages/{id}")
    @Timed
    public ResponseEntity<PremisesBuildingVillage> getPremisesBuildingVillage(@PathVariable Long id) {
        log.debug("REST request to get PremisesBuildingVillage : {}", id);
        PremisesBuildingVillage premisesBuildingVillage = premisesBuildingVillageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(premisesBuildingVillage));
    }

    /**
     * DELETE  /premises-building-villages/:id : delete the "id" premisesBuildingVillage.
     *
     * @param id the id of the premisesBuildingVillage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/premises-building-villages/{id}")
    @Timed
    public ResponseEntity<Void> deletePremisesBuildingVillage(@PathVariable Long id) {
        log.debug("REST request to delete PremisesBuildingVillage : {}", id);
        premisesBuildingVillageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
