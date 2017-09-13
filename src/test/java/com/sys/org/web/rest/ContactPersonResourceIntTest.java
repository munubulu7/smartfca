package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.ContactPerson;
import com.sys.org.repository.ContactPersonRepository;
import com.sys.org.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ContactPersonResource REST controller.
 *
 * @see ContactPersonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class ContactPersonResourceIntTest {

    @Autowired
    private ContactPersonRepository contactPersonRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContactPersonMockMvc;

    private ContactPerson contactPerson;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ContactPersonResource contactPersonResource = new ContactPersonResource(contactPersonRepository);
        this.restContactPersonMockMvc = MockMvcBuilders.standaloneSetup(contactPersonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactPerson createEntity(EntityManager em) {
        ContactPerson contactPerson = new ContactPerson();
        return contactPerson;
    }

    @Before
    public void initTest() {
        contactPerson = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactPerson() throws Exception {
        int databaseSizeBeforeCreate = contactPersonRepository.findAll().size();

        // Create the ContactPerson
        restContactPersonMockMvc.perform(post("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPerson)))
            .andExpect(status().isCreated());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeCreate + 1);
        ContactPerson testContactPerson = contactPersonList.get(contactPersonList.size() - 1);
    }

    @Test
    @Transactional
    public void createContactPersonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactPersonRepository.findAll().size();

        // Create the ContactPerson with an existing ID
        contactPerson.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactPersonMockMvc.perform(post("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPerson)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContactPeople() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);

        // Get all the contactPersonList
        restContactPersonMockMvc.perform(get("/api/contact-people?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactPerson.getId().intValue())));
    }

    @Test
    @Transactional
    public void getContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);

        // Get the contactPerson
        restContactPersonMockMvc.perform(get("/api/contact-people/{id}", contactPerson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactPerson.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingContactPerson() throws Exception {
        // Get the contactPerson
        restContactPersonMockMvc.perform(get("/api/contact-people/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);
        int databaseSizeBeforeUpdate = contactPersonRepository.findAll().size();

        // Update the contactPerson
        ContactPerson updatedContactPerson = contactPersonRepository.findOne(contactPerson.getId());

        restContactPersonMockMvc.perform(put("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactPerson)))
            .andExpect(status().isOk());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeUpdate);
        ContactPerson testContactPerson = contactPersonList.get(contactPersonList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingContactPerson() throws Exception {
        int databaseSizeBeforeUpdate = contactPersonRepository.findAll().size();

        // Create the ContactPerson

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContactPersonMockMvc.perform(put("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPerson)))
            .andExpect(status().isCreated());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);
        int databaseSizeBeforeDelete = contactPersonRepository.findAll().size();

        // Get the contactPerson
        restContactPersonMockMvc.perform(delete("/api/contact-people/{id}", contactPerson.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactPerson.class);
        ContactPerson contactPerson1 = new ContactPerson();
        contactPerson1.setId(1L);
        ContactPerson contactPerson2 = new ContactPerson();
        contactPerson2.setId(contactPerson1.getId());
        assertThat(contactPerson1).isEqualTo(contactPerson2);
        contactPerson2.setId(2L);
        assertThat(contactPerson1).isNotEqualTo(contactPerson2);
        contactPerson1.setId(null);
        assertThat(contactPerson1).isNotEqualTo(contactPerson2);
    }
}
