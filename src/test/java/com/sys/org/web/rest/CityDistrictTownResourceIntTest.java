package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.CityDistrictTown;
import com.sys.org.repository.CityDistrictTownRepository;
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
 * Test class for the CityDistrictTownResource REST controller.
 *
 * @see CityDistrictTownResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class CityDistrictTownResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CityDistrictTownRepository cityDistrictTownRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCityDistrictTownMockMvc;

    private CityDistrictTown cityDistrictTown;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CityDistrictTownResource cityDistrictTownResource = new CityDistrictTownResource(cityDistrictTownRepository);
        this.restCityDistrictTownMockMvc = MockMvcBuilders.standaloneSetup(cityDistrictTownResource)
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
    public static CityDistrictTown createEntity(EntityManager em) {
        CityDistrictTown cityDistrictTown = new CityDistrictTown()
            .name(DEFAULT_NAME);
        return cityDistrictTown;
    }

    @Before
    public void initTest() {
        cityDistrictTown = createEntity(em);
    }

    @Test
    @Transactional
    public void createCityDistrictTown() throws Exception {
        int databaseSizeBeforeCreate = cityDistrictTownRepository.findAll().size();

        // Create the CityDistrictTown
        restCityDistrictTownMockMvc.perform(post("/api/city-district-towns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityDistrictTown)))
            .andExpect(status().isCreated());

        // Validate the CityDistrictTown in the database
        List<CityDistrictTown> cityDistrictTownList = cityDistrictTownRepository.findAll();
        assertThat(cityDistrictTownList).hasSize(databaseSizeBeforeCreate + 1);
        CityDistrictTown testCityDistrictTown = cityDistrictTownList.get(cityDistrictTownList.size() - 1);
        assertThat(testCityDistrictTown.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCityDistrictTownWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cityDistrictTownRepository.findAll().size();

        // Create the CityDistrictTown with an existing ID
        cityDistrictTown.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCityDistrictTownMockMvc.perform(post("/api/city-district-towns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityDistrictTown)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<CityDistrictTown> cityDistrictTownList = cityDistrictTownRepository.findAll();
        assertThat(cityDistrictTownList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCityDistrictTowns() throws Exception {
        // Initialize the database
        cityDistrictTownRepository.saveAndFlush(cityDistrictTown);

        // Get all the cityDistrictTownList
        restCityDistrictTownMockMvc.perform(get("/api/city-district-towns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cityDistrictTown.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCityDistrictTown() throws Exception {
        // Initialize the database
        cityDistrictTownRepository.saveAndFlush(cityDistrictTown);

        // Get the cityDistrictTown
        restCityDistrictTownMockMvc.perform(get("/api/city-district-towns/{id}", cityDistrictTown.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cityDistrictTown.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCityDistrictTown() throws Exception {
        // Get the cityDistrictTown
        restCityDistrictTownMockMvc.perform(get("/api/city-district-towns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCityDistrictTown() throws Exception {
        // Initialize the database
        cityDistrictTownRepository.saveAndFlush(cityDistrictTown);
        int databaseSizeBeforeUpdate = cityDistrictTownRepository.findAll().size();

        // Update the cityDistrictTown
        CityDistrictTown updatedCityDistrictTown = cityDistrictTownRepository.findOne(cityDistrictTown.getId());
        updatedCityDistrictTown
            .name(UPDATED_NAME);

        restCityDistrictTownMockMvc.perform(put("/api/city-district-towns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCityDistrictTown)))
            .andExpect(status().isOk());

        // Validate the CityDistrictTown in the database
        List<CityDistrictTown> cityDistrictTownList = cityDistrictTownRepository.findAll();
        assertThat(cityDistrictTownList).hasSize(databaseSizeBeforeUpdate);
        CityDistrictTown testCityDistrictTown = cityDistrictTownList.get(cityDistrictTownList.size() - 1);
        assertThat(testCityDistrictTown.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCityDistrictTown() throws Exception {
        int databaseSizeBeforeUpdate = cityDistrictTownRepository.findAll().size();

        // Create the CityDistrictTown

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCityDistrictTownMockMvc.perform(put("/api/city-district-towns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityDistrictTown)))
            .andExpect(status().isCreated());

        // Validate the CityDistrictTown in the database
        List<CityDistrictTown> cityDistrictTownList = cityDistrictTownRepository.findAll();
        assertThat(cityDistrictTownList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCityDistrictTown() throws Exception {
        // Initialize the database
        cityDistrictTownRepository.saveAndFlush(cityDistrictTown);
        int databaseSizeBeforeDelete = cityDistrictTownRepository.findAll().size();

        // Get the cityDistrictTown
        restCityDistrictTownMockMvc.perform(delete("/api/city-district-towns/{id}", cityDistrictTown.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CityDistrictTown> cityDistrictTownList = cityDistrictTownRepository.findAll();
        assertThat(cityDistrictTownList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CityDistrictTown.class);
        CityDistrictTown cityDistrictTown1 = new CityDistrictTown();
        cityDistrictTown1.setId(1L);
        CityDistrictTown cityDistrictTown2 = new CityDistrictTown();
        cityDistrictTown2.setId(cityDistrictTown1.getId());
        assertThat(cityDistrictTown1).isEqualTo(cityDistrictTown2);
        cityDistrictTown2.setId(2L);
        assertThat(cityDistrictTown1).isNotEqualTo(cityDistrictTown2);
        cityDistrictTown1.setId(null);
        assertThat(cityDistrictTown1).isNotEqualTo(cityDistrictTown2);
    }
}
