package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.PoliceStation;

import com.sys.org.repository.PoliceStationRepository;
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
 * REST controller for managing PoliceStation.
 */
@RestController
@RequestMapping("/api")
public class PoliceStationResource {

    private final Logger log = LoggerFactory.getLogger(PoliceStationResource.class);

    private static final String ENTITY_NAME = "policeStation";

    private final PoliceStationRepository policeStationRepository;

    public PoliceStationResource(PoliceStationRepository policeStationRepository) {
        this.policeStationRepository = policeStationRepository;
    }

    /**
     * POST  /police-stations : Create a new policeStation.
     *
     * @param policeStation the policeStation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new policeStation, or with status 400 (Bad Request) if the policeStation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/police-stations")
    @Timed
    public ResponseEntity<PoliceStation> createPoliceStation(@RequestBody PoliceStation policeStation) throws URISyntaxException {
        log.debug("REST request to save PoliceStation : {}", policeStation);
        if (policeStation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new policeStation cannot already have an ID")).body(null);
        }
        PoliceStation result = policeStationRepository.save(policeStation);
        return ResponseEntity.created(new URI("/api/police-stations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /police-stations : Updates an existing policeStation.
     *
     * @param policeStation the policeStation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated policeStation,
     * or with status 400 (Bad Request) if the policeStation is not valid,
     * or with status 500 (Internal Server Error) if the policeStation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/police-stations")
    @Timed
    public ResponseEntity<PoliceStation> updatePoliceStation(@RequestBody PoliceStation policeStation) throws URISyntaxException {
        log.debug("REST request to update PoliceStation : {}", policeStation);
        if (policeStation.getId() == null) {
            return createPoliceStation(policeStation);
        }
        PoliceStation result = policeStationRepository.save(policeStation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, policeStation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /police-stations : get all the policeStations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of policeStations in body
     */
    @GetMapping("/police-stations")
    @Timed
    public List<PoliceStation> getAllPoliceStations() {
        log.debug("REST request to get all PoliceStations");
        return policeStationRepository.findAll();
    }

    /**
     * GET  /police-stations/:id : get the "id" policeStation.
     *
     * @param id the id of the policeStation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the policeStation, or with status 404 (Not Found)
     */
    @GetMapping("/police-stations/{id}")
    @Timed
    public ResponseEntity<PoliceStation> getPoliceStation(@PathVariable Long id) {
        log.debug("REST request to get PoliceStation : {}", id);
        PoliceStation policeStation = policeStationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(policeStation));
    }

    /**
     * DELETE  /police-stations/:id : delete the "id" policeStation.
     *
     * @param id the id of the policeStation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/police-stations/{id}")
    @Timed
    public ResponseEntity<Void> deletePoliceStation(@PathVariable Long id) {
        log.debug("REST request to delete PoliceStation : {}", id);
        policeStationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
