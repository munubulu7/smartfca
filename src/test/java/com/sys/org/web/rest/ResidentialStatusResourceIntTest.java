package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.ResidentialStatus;
import com.sys.org.repository.ResidentialStatusRepository;
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
 * Test class for the ResidentialStatusResource REST controller.
 *
 * @see ResidentialStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class ResidentialStatusResourceIntTest {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private ResidentialStatusRepository residentialStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResidentialStatusMockMvc;

    private ResidentialStatus residentialStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ResidentialStatusResource residentialStatusResource = new ResidentialStatusResource(residentialStatusRepository);
        this.restResidentialStatusMockMvc = MockMvcBuilders.standaloneSetup(residentialStatusResource)
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
    public static ResidentialStatus createEntity(EntityManager em) {
        ResidentialStatus residentialStatus = new ResidentialStatus()
            .status(DEFAULT_STATUS);
        return residentialStatus;
    }

    @Before
    public void initTest() {
        residentialStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createResidentialStatus() throws Exception {
        int databaseSizeBeforeCreate = residentialStatusRepository.findAll().size();

        // Create the ResidentialStatus
        restResidentialStatusMockMvc.perform(post("/api/residential-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residentialStatus)))
            .andExpect(status().isCreated());

        // Validate the ResidentialStatus in the database
        List<ResidentialStatus> residentialStatusList = residentialStatusRepository.findAll();
        assertThat(residentialStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ResidentialStatus testResidentialStatus = residentialStatusList.get(residentialStatusList.size() - 1);
        assertThat(testResidentialStatus.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createResidentialStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = residentialStatusRepository.findAll().size();

        // Create the ResidentialStatus with an existing ID
        residentialStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResidentialStatusMockMvc.perform(post("/api/residential-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residentialStatus)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ResidentialStatus> residentialStatusList = residentialStatusRepository.findAll();
        assertThat(residentialStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllResidentialStatuses() throws Exception {
        // Initialize the database
        residentialStatusRepository.saveAndFlush(residentialStatus);

        // Get all the residentialStatusList
        restResidentialStatusMockMvc.perform(get("/api/residential-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(residentialStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getResidentialStatus() throws Exception {
        // Initialize the database
        residentialStatusRepository.saveAndFlush(residentialStatus);

        // Get the residentialStatus
        restResidentialStatusMockMvc.perform(get("/api/residential-statuses/{id}", residentialStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(residentialStatus.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResidentialStatus() throws Exception {
        // Get the residentialStatus
        restResidentialStatusMockMvc.perform(get("/api/residential-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResidentialStatus() throws Exception {
        // Initialize the database
        residentialStatusRepository.saveAndFlush(residentialStatus);
        int databaseSizeBeforeUpdate = residentialStatusRepository.findAll().size();

        // Update the residentialStatus
        ResidentialStatus updatedResidentialStatus = residentialStatusRepository.findOne(residentialStatus.getId());
        updatedResidentialStatus
            .status(UPDATED_STATUS);

        restResidentialStatusMockMvc.perform(put("/api/residential-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResidentialStatus)))
            .andExpect(status().isOk());

        // Validate the ResidentialStatus in the database
        List<ResidentialStatus> residentialStatusList = residentialStatusRepository.findAll();
        assertThat(residentialStatusList).hasSize(databaseSizeBeforeUpdate);
        ResidentialStatus testResidentialStatus = residentialStatusList.get(residentialStatusList.size() - 1);
        assertThat(testResidentialStatus.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingResidentialStatus() throws Exception {
        int databaseSizeBeforeUpdate = residentialStatusRepository.findAll().size();

        // Create the ResidentialStatus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResidentialStatusMockMvc.perform(put("/api/residential-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residentialStatus)))
            .andExpect(status().isCreated());

        // Validate the ResidentialStatus in the database
        List<ResidentialStatus> residentialStatusList = residentialStatusRepository.findAll();
        assertThat(residentialStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResidentialStatus() throws Exception {
        // Initialize the database
        residentialStatusRepository.saveAndFlush(residentialStatus);
        int databaseSizeBeforeDelete = residentialStatusRepository.findAll().size();

        // Get the residentialStatus
        restResidentialStatusMockMvc.perform(delete("/api/residential-statuses/{id}", residentialStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ResidentialStatus> residentialStatusList = residentialStatusRepository.findAll();
        assertThat(residentialStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResidentialStatus.class);
        ResidentialStatus residentialStatus1 = new ResidentialStatus();
        residentialStatus1.setId(1L);
        ResidentialStatus residentialStatus2 = new ResidentialStatus();
        residentialStatus2.setId(residentialStatus1.getId());
        assertThat(residentialStatus1).isEqualTo(residentialStatus2);
        residentialStatus2.setId(2L);
        assertThat(residentialStatus1).isNotEqualTo(residentialStatus2);
        residentialStatus1.setId(null);
        assertThat(residentialStatus1).isNotEqualTo(residentialStatus2);
    }
}
