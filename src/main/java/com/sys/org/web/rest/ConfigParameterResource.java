package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.ConfigParameter;

import com.sys.org.repository.ConfigParameterRepository;
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
 * REST controller for managing ConfigParameter.
 */
@RestController
@RequestMapping("/api")
public class ConfigParameterResource {

    private final Logger log = LoggerFactory.getLogger(ConfigParameterResource.class);

    private static final String ENTITY_NAME = "configParameter";

    private final ConfigParameterRepository configParameterRepository;

    public ConfigParameterResource(ConfigParameterRepository configParameterRepository) {
        this.configParameterRepository = configParameterRepository;
    }

    /**
     * POST  /config-parameters : Create a new configParameter.
     *
     * @param configParameter the configParameter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new configParameter, or with status 400 (Bad Request) if the configParameter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/config-parameters")
    @Timed
    public ResponseEntity<ConfigParameter> createConfigParameter(@RequestBody ConfigParameter configParameter) throws URISyntaxException {
        log.debug("REST request to save ConfigParameter : {}", configParameter);
        if (configParameter.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new configParameter cannot already have an ID")).body(null);
        }
        ConfigParameter result = configParameterRepository.save(configParameter);
        return ResponseEntity.created(new URI("/api/config-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /config-parameters : Updates an existing configParameter.
     *
     * @param configParameter the configParameter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated configParameter,
     * or with status 400 (Bad Request) if the configParameter is not valid,
     * or with status 500 (Internal Server Error) if the configParameter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/config-parameters")
    @Timed
    public ResponseEntity<ConfigParameter> updateConfigParameter(@RequestBody ConfigParameter configParameter) throws URISyntaxException {
        log.debug("REST request to update ConfigParameter : {}", configParameter);
        if (configParameter.getId() == null) {
            return createConfigParameter(configParameter);
        }
        ConfigParameter result = configParameterRepository.save(configParameter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, configParameter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /config-parameters : get all the configParameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of configParameters in body
     */
    @GetMapping("/config-parameters")
    @Timed
    public List<ConfigParameter> getAllConfigParameters() {
        log.debug("REST request to get all ConfigParameters");
        return configParameterRepository.findAll();
    }

    /**
     * GET  /config-parameters/:id : get the "id" configParameter.
     *
     * @param id the id of the configParameter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the configParameter, or with status 404 (Not Found)
     */
    @GetMapping("/config-parameters/{id}")
    @Timed
    public ResponseEntity<ConfigParameter> getConfigParameter(@PathVariable Long id) {
        log.debug("REST request to get ConfigParameter : {}", id);
        ConfigParameter configParameter = configParameterRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(configParameter));
    }

    /**
     * DELETE  /config-parameters/:id : delete the "id" configParameter.
     *
     * @param id the id of the configParameter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/config-parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteConfigParameter(@PathVariable Long id) {
        log.debug("REST request to delete ConfigParameter : {}", id);
        configParameterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
