package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.ContactType;

import com.sys.org.repository.ContactTypeRepository;
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
 * REST controller for managing ContactType.
 */
@RestController
@RequestMapping("/api")
public class ContactTypeResource {

    private final Logger log = LoggerFactory.getLogger(ContactTypeResource.class);

    private static final String ENTITY_NAME = "contactType";

    private final ContactTypeRepository contactTypeRepository;

    public ContactTypeResource(ContactTypeRepository contactTypeRepository) {
        this.contactTypeRepository = contactTypeRepository;
    }

    /**
     * POST  /contact-types : Create a new contactType.
     *
     * @param contactType the contactType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactType, or with status 400 (Bad Request) if the contactType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-types")
    @Timed
    public ResponseEntity<ContactType> createContactType(@RequestBody ContactType contactType) throws URISyntaxException {
        log.debug("REST request to save ContactType : {}", contactType);
        if (contactType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new contactType cannot already have an ID")).body(null);
        }
        ContactType result = contactTypeRepository.save(contactType);
        return ResponseEntity.created(new URI("/api/contact-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-types : Updates an existing contactType.
     *
     * @param contactType the contactType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactType,
     * or with status 400 (Bad Request) if the contactType is not valid,
     * or with status 500 (Internal Server Error) if the contactType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-types")
    @Timed
    public ResponseEntity<ContactType> updateContactType(@RequestBody ContactType contactType) throws URISyntaxException {
        log.debug("REST request to update ContactType : {}", contactType);
        if (contactType.getId() == null) {
            return createContactType(contactType);
        }
        ContactType result = contactTypeRepository.save(contactType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-types : get all the contactTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactTypes in body
     */
    @GetMapping("/contact-types")
    @Timed
    public List<ContactType> getAllContactTypes() {
        log.debug("REST request to get all ContactTypes");
        return contactTypeRepository.findAll();
    }

    /**
     * GET  /contact-types/:id : get the "id" contactType.
     *
     * @param id the id of the contactType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactType, or with status 404 (Not Found)
     */
    @GetMapping("/contact-types/{id}")
    @Timed
    public ResponseEntity<ContactType> getContactType(@PathVariable Long id) {
        log.debug("REST request to get ContactType : {}", id);
        ContactType contactType = contactTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contactType));
    }

    /**
     * DELETE  /contact-types/:id : delete the "id" contactType.
     *
     * @param id the id of the contactType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactType(@PathVariable Long id) {
        log.debug("REST request to delete ContactType : {}", id);
        contactTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
