package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.AreaType;

import com.sys.org.repository.AreaTypeRepository;
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
 * REST controller for managing AreaType.
 */
@RestController
@RequestMapping("/api")
public class AreaTypeResource {

    private final Logger log = LoggerFactory.getLogger(AreaTypeResource.class);

    private static final String ENTITY_NAME = "areaType";

    private final AreaTypeRepository areaTypeRepository;

    public AreaTypeResource(AreaTypeRepository areaTypeRepository) {
        this.areaTypeRepository = areaTypeRepository;
    }

    /**
     * POST  /area-types : Create a new areaType.
     *
     * @param areaType the areaType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new areaType, or with status 400 (Bad Request) if the areaType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/area-types")
    @Timed
    public ResponseEntity<AreaType> createAreaType(@RequestBody AreaType areaType) throws URISyntaxException {
        log.debug("REST request to save AreaType : {}", areaType);
        if (areaType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new areaType cannot already have an ID")).body(null);
        }
        AreaType result = areaTypeRepository.save(areaType);
        return ResponseEntity.created(new URI("/api/area-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /area-types : Updates an existing areaType.
     *
     * @param areaType the areaType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated areaType,
     * or with status 400 (Bad Request) if the areaType is not valid,
     * or with status 500 (Internal Server Error) if the areaType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/area-types")
    @Timed
    public ResponseEntity<AreaType> updateAreaType(@RequestBody AreaType areaType) throws URISyntaxException {
        log.debug("REST request to update AreaType : {}", areaType);
        if (areaType.getId() == null) {
            return createAreaType(areaType);
        }
        AreaType result = areaTypeRepository.save(areaType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, areaType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /area-types : get all the areaTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of areaTypes in body
     */
    @GetMapping("/area-types")
    @Timed
    public List<AreaType> getAllAreaTypes() {
        log.debug("REST request to get all AreaTypes");
        return areaTypeRepository.findAll();
    }

    /**
     * GET  /area-types/:id : get the "id" areaType.
     *
     * @param id the id of the areaType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the areaType, or with status 404 (Not Found)
     */
    @GetMapping("/area-types/{id}")
    @Timed
    public ResponseEntity<AreaType> getAreaType(@PathVariable Long id) {
        log.debug("REST request to get AreaType : {}", id);
        AreaType areaType = areaTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(areaType));
    }

    /**
     * DELETE  /area-types/:id : delete the "id" areaType.
     *
     * @param id the id of the areaType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/area-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAreaType(@PathVariable Long id) {
        log.debug("REST request to delete AreaType : {}", id);
        areaTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
