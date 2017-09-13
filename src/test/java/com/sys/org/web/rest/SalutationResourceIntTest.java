package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.Salutation;
import com.sys.org.repository.SalutationRepository;
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
 * Test class for the SalutationResource REST controller.
 *
 * @see SalutationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class SalutationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SalutationRepository salutationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalutationMockMvc;

    private Salutation salutation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SalutationResource salutationResource = new SalutationResource(salutationRepository);
        this.restSalutationMockMvc = MockMvcBuilders.standaloneSetup(salutationResource)
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
    public static Salutation createEntity(EntityManager em) {
        Salutation salutation = new Salutation()
            .name(DEFAULT_NAME);
        return salutation;
    }

    @Before
    public void initTest() {
        salutation = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalutation() throws Exception {
        int databaseSizeBeforeCreate = salutationRepository.findAll().size();

        // Create the Salutation
        restSalutationMockMvc.perform(post("/api/salutations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salutation)))
            .andExpect(status().isCreated());

        // Validate the Salutation in the database
        List<Salutation> salutationList = salutationRepository.findAll();
        assertThat(salutationList).hasSize(databaseSizeBeforeCreate + 1);
        Salutation testSalutation = salutationList.get(salutationList.size() - 1);
        assertThat(testSalutation.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSalutationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salutationRepository.findAll().size();

        // Create the Salutation with an existing ID
        salutation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalutationMockMvc.perform(post("/api/salutations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salutation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Salutation> salutationList = salutationRepository.findAll();
        assertThat(salutationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSalutations() throws Exception {
        // Initialize the database
        salutationRepository.saveAndFlush(salutation);

        // Get all the salutationList
        restSalutationMockMvc.perform(get("/api/salutations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salutation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSalutation() throws Exception {
        // Initialize the database
        salutationRepository.saveAndFlush(salutation);

        // Get the salutation
        restSalutationMockMvc.perform(get("/api/salutations/{id}", salutation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salutation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSalutation() throws Exception {
        // Get the salutation
        restSalutationMockMvc.perform(get("/api/salutations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalutation() throws Exception {
        // Initialize the database
        salutationRepository.saveAndFlush(salutation);
        int databaseSizeBeforeUpdate = salutationRepository.findAll().size();

        // Update the salutation
        Salutation updatedSalutation = salutationRepository.findOne(salutation.getId());
        updatedSalutation
            .name(UPDATED_NAME);

        restSalutationMockMvc.perform(put("/api/salutations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSalutation)))
            .andExpect(status().isOk());

        // Validate the Salutation in the database
        List<Salutation> salutationList = salutationRepository.findAll();
        assertThat(salutationList).hasSize(databaseSizeBeforeUpdate);
        Salutation testSalutation = salutationList.get(salutationList.size() - 1);
        assertThat(testSalutation.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSalutation() throws Exception {
        int databaseSizeBeforeUpdate = salutationRepository.findAll().size();

        // Create the Salutation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSalutationMockMvc.perform(put("/api/salutations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salutation)))
            .andExpect(status().isCreated());

        // Validate the Salutation in the database
        List<Salutation> salutationList = salutationRepository.findAll();
        assertThat(salutationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSalutation() throws Exception {
        // Initialize the database
        salutationRepository.saveAndFlush(salutation);
        int databaseSizeBeforeDelete = salutationRepository.findAll().size();

        // Get the salutation
        restSalutationMockMvc.perform(delete("/api/salutations/{id}", salutation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Salutation> salutationList = salutationRepository.findAll();
        assertThat(salutationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Salutation.class);
        Salutation salutation1 = new Salutation();
        salutation1.setId(1L);
        Salutation salutation2 = new Salutation();
        salutation2.setId(salutation1.getId());
        assertThat(salutation1).isEqualTo(salutation2);
        salutation2.setId(2L);
        assertThat(salutation1).isNotEqualTo(salutation2);
        salutation1.setId(null);
        assertThat(salutation1).isNotEqualTo(salutation2);
    }
}
