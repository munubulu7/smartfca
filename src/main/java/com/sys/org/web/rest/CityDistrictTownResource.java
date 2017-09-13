package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.CityDistrictTown;

import com.sys.org.repository.CityDistrictTownRepository;
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
 * REST controller for managing CityDistrictTown.
 */
@RestController
@RequestMapping("/api")
public class CityDistrictTownResource {

    private final Logger log = LoggerFactory.getLogger(CityDistrictTownResource.class);

    private static final String ENTITY_NAME = "cityDistrictTown";

    private final CityDistrictTownRepository cityDistrictTownRepository;

    public CityDistrictTownResource(CityDistrictTownRepository cityDistrictTownRepository) {
        this.cityDistrictTownRepository = cityDistrictTownRepository;
    }

    /**
     * POST  /city-district-towns : Create a new cityDistrictTown.
     *
     * @param cityDistrictTown the cityDistrictTown to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cityDistrictTown, or with status 400 (Bad Request) if the cityDistrictTown has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/city-district-towns")
    @Timed
    public ResponseEntity<CityDistrictTown> createCityDistrictTown(@RequestBody CityDistrictTown cityDistrictTown) throws URISyntaxException {
        log.debug("REST request to save CityDistrictTown : {}", cityDistrictTown);
        if (cityDistrictTown.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cityDistrictTown cannot already have an ID")).body(null);
        }
        CityDistrictTown result = cityDistrictTownRepository.save(cityDistrictTown);
        return ResponseEntity.created(new URI("/api/city-district-towns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /city-district-towns : Updates an existing cityDistrictTown.
     *
     * @param cityDistrictTown the cityDistrictTown to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cityDistrictTown,
     * or with status 400 (Bad Request) if the cityDistrictTown is not valid,
     * or with status 500 (Internal Server Error) if the cityDistrictTown couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/city-district-towns")
    @Timed
    public ResponseEntity<CityDistrictTown> updateCityDistrictTown(@RequestBody CityDistrictTown cityDistrictTown) throws URISyntaxException {
        log.debug("REST request to update CityDistrictTown : {}", cityDistrictTown);
        if (cityDistrictTown.getId() == null) {
            return createCityDistrictTown(cityDistrictTown);
        }
        CityDistrictTown result = cityDistrictTownRepository.save(cityDistrictTown);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cityDistrictTown.getId().toString()))
            .body(result);
    }

    /**
     * GET  /city-district-towns : get all the cityDistrictTowns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cityDistrictTowns in body
     */
    @GetMapping("/city-district-towns")
    @Timed
    public List<CityDistrictTown> getAllCityDistrictTowns() {
        log.debug("REST request to get all CityDistrictTowns");
        return cityDistrictTownRepository.findAll();
    }

    /**
     * GET  /city-district-towns/:id : get the "id" cityDistrictTown.
     *
     * @param id the id of the cityDistrictTown to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cityDistrictTown, or with status 404 (Not Found)
     */
    @GetMapping("/city-district-towns/{id}")
    @Timed
    public ResponseEntity<CityDistrictTown> getCityDistrictTown(@PathVariable Long id) {
        log.debug("REST request to get CityDistrictTown : {}", id);
        CityDistrictTown cityDistrictTown = cityDistrictTownRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cityDistrictTown));
    }

    /**
     * DELETE  /city-district-towns/:id : delete the "id" cityDistrictTown.
     *
     * @param id the id of the cityDistrictTown to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/city-district-towns/{id}")
    @Timed
    public ResponseEntity<Void> deleteCityDistrictTown(@PathVariable Long id) {
        log.debug("REST request to delete CityDistrictTown : {}", id);
        cityDistrictTownRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
