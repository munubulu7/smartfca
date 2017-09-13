package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.ContactPerson;

import com.sys.org.repository.ContactPersonRepository;
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
 * REST controller for managing ContactPerson.
 */
@RestController
@RequestMapping("/api")
public class ContactPersonResource {

    private final Logger log = LoggerFactory.getLogger(ContactPersonResource.class);

    private static final String ENTITY_NAME = "contactPerson";

    private final ContactPersonRepository contactPersonRepository;

    public ContactPersonResource(ContactPersonRepository contactPersonRepository) {
        this.contactPersonRepository = contactPersonRepository;
    }

    /**
     * POST  /contact-people : Create a new contactPerson.
     *
     * @param contactPerson the contactPerson to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactPerson, or with status 400 (Bad Request) if the contactPerson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-people")
    @Timed
    public ResponseEntity<ContactPerson> createContactPerson(@RequestBody ContactPerson contactPerson) throws URISyntaxException {
        log.debug("REST request to save ContactPerson : {}", contactPerson);
        if (contactPerson.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new contactPerson cannot already have an ID")).body(null);
        }
        ContactPerson result = contactPersonRepository.save(contactPerson);
        return ResponseEntity.created(new URI("/api/contact-people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-people : Updates an existing contactPerson.
     *
     * @param contactPerson the contactPerson to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactPerson,
     * or with status 400 (Bad Request) if the contactPerson is not valid,
     * or with status 500 (Internal Server Error) if the contactPerson couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-people")
    @Timed
    public ResponseEntity<ContactPerson> updateContactPerson(@RequestBody ContactPerson contactPerson) throws URISyntaxException {
        log.debug("REST request to update ContactPerson : {}", contactPerson);
        if (contactPerson.getId() == null) {
            return createContactPerson(contactPerson);
        }
        ContactPerson result = contactPersonRepository.save(contactPerson);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactPerson.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-people : get all the contactPeople.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactPeople in body
     */
    @GetMapping("/contact-people")
    @Timed
    public List<ContactPerson> getAllContactPeople() {
        log.debug("REST request to get all ContactPeople");
        return contactPersonRepository.findAll();
    }

    /**
     * GET  /contact-people/:id : get the "id" contactPerson.
     *
     * @param id the id of the contactPerson to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactPerson, or with status 404 (Not Found)
     */
    @GetMapping("/contact-people/{id}")
    @Timed
    public ResponseEntity<ContactPerson> getContactPerson(@PathVariable Long id) {
        log.debug("REST request to get ContactPerson : {}", id);
        ContactPerson contactPerson = contactPersonRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contactPerson));
    }

    /**
     * DELETE  /contact-people/:id : delete the "id" contactPerson.
     *
     * @param id the id of the contactPerson to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-people/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactPerson(@PathVariable Long id) {
        log.debug("REST request to delete ContactPerson : {}", id);
        contactPersonRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
