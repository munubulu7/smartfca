package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.CenterLocation;
import com.sys.org.repository.CenterLocationRepository;
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
 * Test class for the CenterLocationResource REST controller.
 *
 * @see CenterLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class CenterLocationResourceIntTest {

    private static final String DEFAULT_LOCATION_CODE = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DRSCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DRSCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CenterLocationRepository centerLocationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCenterLocationMockMvc;

    private CenterLocation centerLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CenterLocationResource centerLocationResource = new CenterLocationResource(centerLocationRepository);
        this.restCenterLocationMockMvc = MockMvcBuilders.standaloneSetup(centerLocationResource)
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
    public static CenterLocation createEntity(EntityManager em) {
        CenterLocation centerLocation = new CenterLocation()
            .locationCode(DEFAULT_LOCATION_CODE)
            .drscription(DEFAULT_DRSCRIPTION);
        return centerLocation;
    }

    @Before
    public void initTest() {
        centerLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createCenterLocation() throws Exception {
        int databaseSizeBeforeCreate = centerLocationRepository.findAll().size();

        // Create the CenterLocation
        restCenterLocationMockMvc.perform(post("/api/center-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerLocation)))
            .andExpect(status().isCreated());

        // Validate the CenterLocation in the database
        List<CenterLocation> centerLocationList = centerLocationRepository.findAll();
        assertThat(centerLocationList).hasSize(databaseSizeBeforeCreate + 1);
        CenterLocation testCenterLocation = centerLocationList.get(centerLocationList.size() - 1);
        assertThat(testCenterLocation.getLocationCode()).isEqualTo(DEFAULT_LOCATION_CODE);
        assertThat(testCenterLocation.getDrscription()).isEqualTo(DEFAULT_DRSCRIPTION);
    }

    @Test
    @Transactional
    public void createCenterLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centerLocationRepository.findAll().size();

        // Create the CenterLocation with an existing ID
        centerLocation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCenterLocationMockMvc.perform(post("/api/center-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerLocation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<CenterLocation> centerLocationList = centerLocationRepository.findAll();
        assertThat(centerLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCenterLocations() throws Exception {
        // Initialize the database
        centerLocationRepository.saveAndFlush(centerLocation);

        // Get all the centerLocationList
        restCenterLocationMockMvc.perform(get("/api/center-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centerLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].locationCode").value(hasItem(DEFAULT_LOCATION_CODE.toString())))
            .andExpect(jsonPath("$.[*].drscription").value(hasItem(DEFAULT_DRSCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getCenterLocation() throws Exception {
        // Initialize the database
        centerLocationRepository.saveAndFlush(centerLocation);

        // Get the centerLocation
        restCenterLocationMockMvc.perform(get("/api/center-locations/{id}", centerLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(centerLocation.getId().intValue()))
            .andExpect(jsonPath("$.locationCode").value(DEFAULT_LOCATION_CODE.toString()))
            .andExpect(jsonPath("$.drscription").value(DEFAULT_DRSCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCenterLocation() throws Exception {
        // Get the centerLocation
        restCenterLocationMockMvc.perform(get("/api/center-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCenterLocation() throws Exception {
        // Initialize the database
        centerLocationRepository.saveAndFlush(centerLocation);
        int databaseSizeBeforeUpdate = centerLocationRepository.findAll().size();

        // Update the centerLocation
        CenterLocation updatedCenterLocation = centerLocationRepository.findOne(centerLocation.getId());
        updatedCenterLocation
            .locationCode(UPDATED_LOCATION_CODE)
            .drscription(UPDATED_DRSCRIPTION);

        restCenterLocationMockMvc.perform(put("/api/center-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCenterLocation)))
            .andExpect(status().isOk());

        // Validate the CenterLocation in the database
        List<CenterLocation> centerLocationList = centerLocationRepository.findAll();
        assertThat(centerLocationList).hasSize(databaseSizeBeforeUpdate);
        CenterLocation testCenterLocation = centerLocationList.get(centerLocationList.size() - 1);
        assertThat(testCenterLocation.getLocationCode()).isEqualTo(UPDATED_LOCATION_CODE);
        assertThat(testCenterLocation.getDrscription()).isEqualTo(UPDATED_DRSCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCenterLocation() throws Exception {
        int databaseSizeBeforeUpdate = centerLocationRepository.findAll().size();

        // Create the CenterLocation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCenterLocationMockMvc.perform(put("/api/center-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerLocation)))
            .andExpect(status().isCreated());

        // Validate the CenterLocation in the database
        List<CenterLocation> centerLocationList = centerLocationRepository.findAll();
        assertThat(centerLocationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCenterLocation() throws Exception {
        // Initialize the database
        centerLocationRepository.saveAndFlush(centerLocation);
        int databaseSizeBeforeDelete = centerLocationRepository.findAll().size();

        // Get the centerLocation
        restCenterLocationMockMvc.perform(delete("/api/center-locations/{id}", centerLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CenterLocation> centerLocationList = centerLocationRepository.findAll();
        assertThat(centerLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CenterLocation.class);
        CenterLocation centerLocation1 = new CenterLocation();
        centerLocation1.setId(1L);
        CenterLocation centerLocation2 = new CenterLocation();
        centerLocation2.setId(centerLocation1.getId());
        assertThat(centerLocation1).isEqualTo(centerLocation2);
        centerLocation2.setId(2L);
        assertThat(centerLocation1).isNotEqualTo(centerLocation2);
        centerLocation1.setId(null);
        assertThat(centerLocation1).isNotEqualTo(centerLocation2);
    }
}
