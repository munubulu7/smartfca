package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.AreaName;
import com.sys.org.repository.AreaNameRepository;
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
 * Test class for the AreaNameResource REST controller.
 *
 * @see AreaNameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class AreaNameResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AreaNameRepository areaNameRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAreaNameMockMvc;

    private AreaName areaName;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AreaNameResource areaNameResource = new AreaNameResource(areaNameRepository);
        this.restAreaNameMockMvc = MockMvcBuilders.standaloneSetup(areaNameResource)
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
    public static AreaName createEntity(EntityManager em) {
        AreaName areaName = new AreaName()
            .name(DEFAULT_NAME);
        return areaName;
    }

    @Before
    public void initTest() {
        areaName = createEntity(em);
    }

    @Test
    @Transactional
    public void createAreaName() throws Exception {
        int databaseSizeBeforeCreate = areaNameRepository.findAll().size();

        // Create the AreaName
        restAreaNameMockMvc.perform(post("/api/area-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaName)))
            .andExpect(status().isCreated());

        // Validate the AreaName in the database
        List<AreaName> areaNameList = areaNameRepository.findAll();
        assertThat(areaNameList).hasSize(databaseSizeBeforeCreate + 1);
        AreaName testAreaName = areaNameList.get(areaNameList.size() - 1);
        assertThat(testAreaName.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAreaNameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areaNameRepository.findAll().size();

        // Create the AreaName with an existing ID
        areaName.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaNameMockMvc.perform(post("/api/area-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaName)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AreaName> areaNameList = areaNameRepository.findAll();
        assertThat(areaNameList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAreaNames() throws Exception {
        // Initialize the database
        areaNameRepository.saveAndFlush(areaName);

        // Get all the areaNameList
        restAreaNameMockMvc.perform(get("/api/area-names?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areaName.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getAreaName() throws Exception {
        // Initialize the database
        areaNameRepository.saveAndFlush(areaName);

        // Get the areaName
        restAreaNameMockMvc.perform(get("/api/area-names/{id}", areaName.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(areaName.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAreaName() throws Exception {
        // Get the areaName
        restAreaNameMockMvc.perform(get("/api/area-names/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAreaName() throws Exception {
        // Initialize the database
        areaNameRepository.saveAndFlush(areaName);
        int databaseSizeBeforeUpdate = areaNameRepository.findAll().size();

        // Update the areaName
        AreaName updatedAreaName = areaNameRepository.findOne(areaName.getId());
        updatedAreaName
            .name(UPDATED_NAME);

        restAreaNameMockMvc.perform(put("/api/area-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAreaName)))
            .andExpect(status().isOk());

        // Validate the AreaName in the database
        List<AreaName> areaNameList = areaNameRepository.findAll();
        assertThat(areaNameList).hasSize(databaseSizeBeforeUpdate);
        AreaName testAreaName = areaNameList.get(areaNameList.size() - 1);
        assertThat(testAreaName.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAreaName() throws Exception {
        int databaseSizeBeforeUpdate = areaNameRepository.findAll().size();

        // Create the AreaName

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAreaNameMockMvc.perform(put("/api/area-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaName)))
            .andExpect(status().isCreated());

        // Validate the AreaName in the database
        List<AreaName> areaNameList = areaNameRepository.findAll();
        assertThat(areaNameList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAreaName() throws Exception {
        // Initialize the database
        areaNameRepository.saveAndFlush(areaName);
        int databaseSizeBeforeDelete = areaNameRepository.findAll().size();

        // Get the areaName
        restAreaNameMockMvc.perform(delete("/api/area-names/{id}", areaName.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AreaName> areaNameList = areaNameRepository.findAll();
        assertThat(areaNameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaName.class);
        AreaName areaName1 = new AreaName();
        areaName1.setId(1L);
        AreaName areaName2 = new AreaName();
        areaName2.setId(areaName1.getId());
        assertThat(areaName1).isEqualTo(areaName2);
        areaName2.setId(2L);
        assertThat(areaName1).isNotEqualTo(areaName2);
        areaName1.setId(null);
        assertThat(areaName1).isNotEqualTo(areaName2);
    }
}
