package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.PostOffice;

import com.sys.org.repository.PostOfficeRepository;
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
 * REST controller for managing PostOffice.
 */
@RestController
@RequestMapping("/api")
public class PostOfficeResource {

    private final Logger log = LoggerFactory.getLogger(PostOfficeResource.class);

    private static final String ENTITY_NAME = "postOffice";

    private final PostOfficeRepository postOfficeRepository;

    public PostOfficeResource(PostOfficeRepository postOfficeRepository) {
        this.postOfficeRepository = postOfficeRepository;
    }

    /**
     * POST  /post-offices : Create a new postOffice.
     *
     * @param postOffice the postOffice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new postOffice, or with status 400 (Bad Request) if the postOffice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/post-offices")
    @Timed
    public ResponseEntity<PostOffice> createPostOffice(@RequestBody PostOffice postOffice) throws URISyntaxException {
        log.debug("REST request to save PostOffice : {}", postOffice);
        if (postOffice.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new postOffice cannot already have an ID")).body(null);
        }
        PostOffice result = postOfficeRepository.save(postOffice);
        return ResponseEntity.created(new URI("/api/post-offices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /post-offices : Updates an existing postOffice.
     *
     * @param postOffice the postOffice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated postOffice,
     * or with status 400 (Bad Request) if the postOffice is not valid,
     * or with status 500 (Internal Server Error) if the postOffice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/post-offices")
    @Timed
    public ResponseEntity<PostOffice> updatePostOffice(@RequestBody PostOffice postOffice) throws URISyntaxException {
        log.debug("REST request to update PostOffice : {}", postOffice);
        if (postOffice.getId() == null) {
            return createPostOffice(postOffice);
        }
        PostOffice result = postOfficeRepository.save(postOffice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, postOffice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /post-offices : get all the postOffices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of postOffices in body
     */
    @GetMapping("/post-offices")
    @Timed
    public List<PostOffice> getAllPostOffices() {
        log.debug("REST request to get all PostOffices");
        return postOfficeRepository.findAll();
    }

    /**
     * GET  /post-offices/:id : get the "id" postOffice.
     *
     * @param id the id of the postOffice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the postOffice, or with status 404 (Not Found)
     */
    @GetMapping("/post-offices/{id}")
    @Timed
    public ResponseEntity<PostOffice> getPostOffice(@PathVariable Long id) {
        log.debug("REST request to get PostOffice : {}", id);
        PostOffice postOffice = postOfficeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(postOffice));
    }

    /**
     * DELETE  /post-offices/:id : delete the "id" postOffice.
     *
     * @param id the id of the postOffice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/post-offices/{id}")
    @Timed
    public ResponseEntity<Void> deletePostOffice(@PathVariable Long id) {
        log.debug("REST request to delete PostOffice : {}", id);
        postOfficeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
