package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.Employers;
import com.sys.org.repository.EmployersRepository;
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
 * Test class for the EmployersResource REST controller.
 *
 * @see EmployersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class EmployersResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EmployersRepository employersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployersMockMvc;

    private Employers employers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        EmployersResource employersResource = new EmployersResource(employersRepository);
        this.restEmployersMockMvc = MockMvcBuilders.standaloneSetup(employersResource)
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
    public static Employers createEntity(EntityManager em) {
        Employers employers = new Employers()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return employers;
    }

    @Before
    public void initTest() {
        employers = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployers() throws Exception {
        int databaseSizeBeforeCreate = employersRepository.findAll().size();

        // Create the Employers
        restEmployersMockMvc.perform(post("/api/employers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employers)))
            .andExpect(status().isCreated());

        // Validate the Employers in the database
        List<Employers> employersList = employersRepository.findAll();
        assertThat(employersList).hasSize(databaseSizeBeforeCreate + 1);
        Employers testEmployers = employersList.get(employersList.size() - 1);
        assertThat(testEmployers.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmployers.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createEmployersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employersRepository.findAll().size();

        // Create the Employers with an existing ID
        employers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployersMockMvc.perform(post("/api/employers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employers)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Employers> employersList = employersRepository.findAll();
        assertThat(employersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmployers() throws Exception {
        // Initialize the database
        employersRepository.saveAndFlush(employers);

        // Get all the employersList
        restEmployersMockMvc.perform(get("/api/employers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employers.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getEmployers() throws Exception {
        // Initialize the database
        employersRepository.saveAndFlush(employers);

        // Get the employers
        restEmployersMockMvc.perform(get("/api/employers/{id}", employers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employers.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployers() throws Exception {
        // Get the employers
        restEmployersMockMvc.perform(get("/api/employers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployers() throws Exception {
        // Initialize the database
        employersRepository.saveAndFlush(employers);
        int databaseSizeBeforeUpdate = employersRepository.findAll().size();

        // Update the employers
        Employers updatedEmployers = employersRepository.findOne(employers.getId());
        updatedEmployers
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restEmployersMockMvc.perform(put("/api/employers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployers)))
            .andExpect(status().isOk());

        // Validate the Employers in the database
        List<Employers> employersList = employersRepository.findAll();
        assertThat(employersList).hasSize(databaseSizeBeforeUpdate);
        Employers testEmployers = employersList.get(employersList.size() - 1);
        assertThat(testEmployers.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmployers.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployers() throws Exception {
        int databaseSizeBeforeUpdate = employersRepository.findAll().size();

        // Create the Employers

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployersMockMvc.perform(put("/api/employers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employers)))
            .andExpect(status().isCreated());

        // Validate the Employers in the database
        List<Employers> employersList = employersRepository.findAll();
        assertThat(employersList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployers() throws Exception {
        // Initialize the database
        employersRepository.saveAndFlush(employers);
        int databaseSizeBeforeDelete = employersRepository.findAll().size();

        // Get the employers
        restEmployersMockMvc.perform(delete("/api/employers/{id}", employers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Employers> employersList = employersRepository.findAll();
        assertThat(employersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Employers.class);
        Employers employers1 = new Employers();
        employers1.setId(1L);
        Employers employers2 = new Employers();
        employers2.setId(employers1.getId());
        assertThat(employers1).isEqualTo(employers2);
        employers2.setId(2L);
        assertThat(employers1).isNotEqualTo(employers2);
        employers1.setId(null);
        assertThat(employers1).isNotEqualTo(employers2);
    }
}
