package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.PremisesBuildingVillage;
import com.sys.org.repository.PremisesBuildingVillageRepository;
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
 * Test class for the PremisesBuildingVillageResource REST controller.
 *
 * @see PremisesBuildingVillageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class PremisesBuildingVillageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PremisesBuildingVillageRepository premisesBuildingVillageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPremisesBuildingVillageMockMvc;

    private PremisesBuildingVillage premisesBuildingVillage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PremisesBuildingVillageResource premisesBuildingVillageResource = new PremisesBuildingVillageResource(premisesBuildingVillageRepository);
        this.restPremisesBuildingVillageMockMvc = MockMvcBuilders.standaloneSetup(premisesBuildingVillageResource)
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
    public static PremisesBuildingVillage createEntity(EntityManager em) {
        PremisesBuildingVillage premisesBuildingVillage = new PremisesBuildingVillage()
            .name(DEFAULT_NAME);
        return premisesBuildingVillage;
    }

    @Before
    public void initTest() {
        premisesBuildingVillage = createEntity(em);
    }

    @Test
    @Transactional
    public void createPremisesBuildingVillage() throws Exception {
        int databaseSizeBeforeCreate = premisesBuildingVillageRepository.findAll().size();

        // Create the PremisesBuildingVillage
        restPremisesBuildingVillageMockMvc.perform(post("/api/premises-building-villages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premisesBuildingVillage)))
            .andExpect(status().isCreated());

        // Validate the PremisesBuildingVillage in the database
        List<PremisesBuildingVillage> premisesBuildingVillageList = premisesBuildingVillageRepository.findAll();
        assertThat(premisesBuildingVillageList).hasSize(databaseSizeBeforeCreate + 1);
        PremisesBuildingVillage testPremisesBuildingVillage = premisesBuildingVillageList.get(premisesBuildingVillageList.size() - 1);
        assertThat(testPremisesBuildingVillage.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPremisesBuildingVillageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = premisesBuildingVillageRepository.findAll().size();

        // Create the PremisesBuildingVillage with an existing ID
        premisesBuildingVillage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPremisesBuildingVillageMockMvc.perform(post("/api/premises-building-villages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premisesBuildingVillage)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<PremisesBuildingVillage> premisesBuildingVillageList = premisesBuildingVillageRepository.findAll();
        assertThat(premisesBuildingVillageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPremisesBuildingVillages() throws Exception {
        // Initialize the database
        premisesBuildingVillageRepository.saveAndFlush(premisesBuildingVillage);

        // Get all the premisesBuildingVillageList
        restPremisesBuildingVillageMockMvc.perform(get("/api/premises-building-villages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(premisesBuildingVillage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPremisesBuildingVillage() throws Exception {
        // Initialize the database
        premisesBuildingVillageRepository.saveAndFlush(premisesBuildingVillage);

        // Get the premisesBuildingVillage
        restPremisesBuildingVillageMockMvc.perform(get("/api/premises-building-villages/{id}", premisesBuildingVillage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(premisesBuildingVillage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPremisesBuildingVillage() throws Exception {
        // Get the premisesBuildingVillage
        restPremisesBuildingVillageMockMvc.perform(get("/api/premises-building-villages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePremisesBuildingVillage() throws Exception {
        // Initialize the database
        premisesBuildingVillageRepository.saveAndFlush(premisesBuildingVillage);
        int databaseSizeBeforeUpdate = premisesBuildingVillageRepository.findAll().size();

        // Update the premisesBuildingVillage
        PremisesBuildingVillage updatedPremisesBuildingVillage = premisesBuildingVillageRepository.findOne(premisesBuildingVillage.getId());
        updatedPremisesBuildingVillage
            .name(UPDATED_NAME);

        restPremisesBuildingVillageMockMvc.perform(put("/api/premises-building-villages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPremisesBuildingVillage)))
            .andExpect(status().isOk());

        // Validate the PremisesBuildingVillage in the database
        List<PremisesBuildingVillage> premisesBuildingVillageList = premisesBuildingVillageRepository.findAll();
        assertThat(premisesBuildingVillageList).hasSize(databaseSizeBeforeUpdate);
        PremisesBuildingVillage testPremisesBuildingVillage = premisesBuildingVillageList.get(premisesBuildingVillageList.size() - 1);
        assertThat(testPremisesBuildingVillage.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPremisesBuildingVillage() throws Exception {
        int databaseSizeBeforeUpdate = premisesBuildingVillageRepository.findAll().size();

        // Create the PremisesBuildingVillage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPremisesBuildingVillageMockMvc.perform(put("/api/premises-building-villages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premisesBuildingVillage)))
            .andExpect(status().isCreated());

        // Validate the PremisesBuildingVillage in the database
        List<PremisesBuildingVillage> premisesBuildingVillageList = premisesBuildingVillageRepository.findAll();
        assertThat(premisesBuildingVillageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePremisesBuildingVillage() throws Exception {
        // Initialize the database
        premisesBuildingVillageRepository.saveAndFlush(premisesBuildingVillage);
        int databaseSizeBeforeDelete = premisesBuildingVillageRepository.findAll().size();

        // Get the premisesBuildingVillage
        restPremisesBuildingVillageMockMvc.perform(delete("/api/premises-building-villages/{id}", premisesBuildingVillage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PremisesBuildingVillage> premisesBuildingVillageList = premisesBuildingVillageRepository.findAll();
        assertThat(premisesBuildingVillageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PremisesBuildingVillage.class);
        PremisesBuildingVillage premisesBuildingVillage1 = new PremisesBuildingVillage();
        premisesBuildingVillage1.setId(1L);
        PremisesBuildingVillage premisesBuildingVillage2 = new PremisesBuildingVillage();
        premisesBuildingVillage2.setId(premisesBuildingVillage1.getId());
        assertThat(premisesBuildingVillage1).isEqualTo(premisesBuildingVillage2);
        premisesBuildingVillage2.setId(2L);
        assertThat(premisesBuildingVillage1).isNotEqualTo(premisesBuildingVillage2);
        premisesBuildingVillage1.setId(null);
        assertThat(premisesBuildingVillage1).isNotEqualTo(premisesBuildingVillage2);
    }
}
