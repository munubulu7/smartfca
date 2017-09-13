package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.PoliceStation;
import com.sys.org.repository.PoliceStationRepository;
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
 * Test class for the PoliceStationResource REST controller.
 *
 * @see PoliceStationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class PoliceStationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PoliceStationRepository policeStationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPoliceStationMockMvc;

    private PoliceStation policeStation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PoliceStationResource policeStationResource = new PoliceStationResource(policeStationRepository);
        this.restPoliceStationMockMvc = MockMvcBuilders.standaloneSetup(policeStationResource)
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
    public static PoliceStation createEntity(EntityManager em) {
        PoliceStation policeStation = new PoliceStation()
            .name(DEFAULT_NAME);
        return policeStation;
    }

    @Before
    public void initTest() {
        policeStation = createEntity(em);
    }

    @Test
    @Transactional
    public void createPoliceStation() throws Exception {
        int databaseSizeBeforeCreate = policeStationRepository.findAll().size();

        // Create the PoliceStation
        restPoliceStationMockMvc.perform(post("/api/police-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(policeStation)))
            .andExpect(status().isCreated());

        // Validate the PoliceStation in the database
        List<PoliceStation> policeStationList = policeStationRepository.findAll();
        assertThat(policeStationList).hasSize(databaseSizeBeforeCreate + 1);
        PoliceStation testPoliceStation = policeStationList.get(policeStationList.size() - 1);
        assertThat(testPoliceStation.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPoliceStationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = policeStationRepository.findAll().size();

        // Create the PoliceStation with an existing ID
        policeStation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoliceStationMockMvc.perform(post("/api/police-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(policeStation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<PoliceStation> policeStationList = policeStationRepository.findAll();
        assertThat(policeStationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPoliceStations() throws Exception {
        // Initialize the database
        policeStationRepository.saveAndFlush(policeStation);

        // Get all the policeStationList
        restPoliceStationMockMvc.perform(get("/api/police-stations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(policeStation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPoliceStation() throws Exception {
        // Initialize the database
        policeStationRepository.saveAndFlush(policeStation);

        // Get the policeStation
        restPoliceStationMockMvc.perform(get("/api/police-stations/{id}", policeStation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(policeStation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPoliceStation() throws Exception {
        // Get the policeStation
        restPoliceStationMockMvc.perform(get("/api/police-stations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePoliceStation() throws Exception {
        // Initialize the database
        policeStationRepository.saveAndFlush(policeStation);
        int databaseSizeBeforeUpdate = policeStationRepository.findAll().size();

        // Update the policeStation
        PoliceStation updatedPoliceStation = policeStationRepository.findOne(policeStation.getId());
        updatedPoliceStation
            .name(UPDATED_NAME);

        restPoliceStationMockMvc.perform(put("/api/police-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPoliceStation)))
            .andExpect(status().isOk());

        // Validate the PoliceStation in the database
        List<PoliceStation> policeStationList = policeStationRepository.findAll();
        assertThat(policeStationList).hasSize(databaseSizeBeforeUpdate);
        PoliceStation testPoliceStation = policeStationList.get(policeStationList.size() - 1);
        assertThat(testPoliceStation.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPoliceStation() throws Exception {
        int databaseSizeBeforeUpdate = policeStationRepository.findAll().size();

        // Create the PoliceStation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPoliceStationMockMvc.perform(put("/api/police-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(policeStation)))
            .andExpect(status().isCreated());

        // Validate the PoliceStation in the database
        List<PoliceStation> policeStationList = policeStationRepository.findAll();
        assertThat(policeStationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePoliceStation() throws Exception {
        // Initialize the database
        policeStationRepository.saveAndFlush(policeStation);
        int databaseSizeBeforeDelete = policeStationRepository.findAll().size();

        // Get the policeStation
        restPoliceStationMockMvc.perform(delete("/api/police-stations/{id}", policeStation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PoliceStation> policeStationList = policeStationRepository.findAll();
        assertThat(policeStationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PoliceStation.class);
        PoliceStation policeStation1 = new PoliceStation();
        policeStation1.setId(1L);
        PoliceStation policeStation2 = new PoliceStation();
        policeStation2.setId(policeStation1.getId());
        assertThat(policeStation1).isEqualTo(policeStation2);
        policeStation2.setId(2L);
        assertThat(policeStation1).isNotEqualTo(policeStation2);
        policeStation1.setId(null);
        assertThat(policeStation1).isNotEqualTo(policeStation2);
    }
}
