package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.OrganisationType;
import com.sys.org.repository.OrganisationTypeRepository;
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
 * Test class for the OrganisationTypeResource REST controller.
 *
 * @see OrganisationTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class OrganisationTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private OrganisationTypeRepository organisationTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrganisationTypeMockMvc;

    private OrganisationType organisationType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        OrganisationTypeResource organisationTypeResource = new OrganisationTypeResource(organisationTypeRepository);
        this.restOrganisationTypeMockMvc = MockMvcBuilders.standaloneSetup(organisationTypeResource)
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
    public static OrganisationType createEntity(EntityManager em) {
        OrganisationType organisationType = new OrganisationType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return organisationType;
    }

    @Before
    public void initTest() {
        organisationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganisationType() throws Exception {
        int databaseSizeBeforeCreate = organisationTypeRepository.findAll().size();

        // Create the OrganisationType
        restOrganisationTypeMockMvc.perform(post("/api/organisation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationType)))
            .andExpect(status().isCreated());

        // Validate the OrganisationType in the database
        List<OrganisationType> organisationTypeList = organisationTypeRepository.findAll();
        assertThat(organisationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        OrganisationType testOrganisationType = organisationTypeList.get(organisationTypeList.size() - 1);
        assertThat(testOrganisationType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrganisationType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createOrganisationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organisationTypeRepository.findAll().size();

        // Create the OrganisationType with an existing ID
        organisationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganisationTypeMockMvc.perform(post("/api/organisation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationType)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<OrganisationType> organisationTypeList = organisationTypeRepository.findAll();
        assertThat(organisationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrganisationTypes() throws Exception {
        // Initialize the database
        organisationTypeRepository.saveAndFlush(organisationType);

        // Get all the organisationTypeList
        restOrganisationTypeMockMvc.perform(get("/api/organisation-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organisationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getOrganisationType() throws Exception {
        // Initialize the database
        organisationTypeRepository.saveAndFlush(organisationType);

        // Get the organisationType
        restOrganisationTypeMockMvc.perform(get("/api/organisation-types/{id}", organisationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organisationType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganisationType() throws Exception {
        // Get the organisationType
        restOrganisationTypeMockMvc.perform(get("/api/organisation-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganisationType() throws Exception {
        // Initialize the database
        organisationTypeRepository.saveAndFlush(organisationType);
        int databaseSizeBeforeUpdate = organisationTypeRepository.findAll().size();

        // Update the organisationType
        OrganisationType updatedOrganisationType = organisationTypeRepository.findOne(organisationType.getId());
        updatedOrganisationType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restOrganisationTypeMockMvc.perform(put("/api/organisation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganisationType)))
            .andExpect(status().isOk());

        // Validate the OrganisationType in the database
        List<OrganisationType> organisationTypeList = organisationTypeRepository.findAll();
        assertThat(organisationTypeList).hasSize(databaseSizeBeforeUpdate);
        OrganisationType testOrganisationType = organisationTypeList.get(organisationTypeList.size() - 1);
        assertThat(testOrganisationType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrganisationType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganisationType() throws Exception {
        int databaseSizeBeforeUpdate = organisationTypeRepository.findAll().size();

        // Create the OrganisationType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrganisationTypeMockMvc.perform(put("/api/organisation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationType)))
            .andExpect(status().isCreated());

        // Validate the OrganisationType in the database
        List<OrganisationType> organisationTypeList = organisationTypeRepository.findAll();
        assertThat(organisationTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrganisationType() throws Exception {
        // Initialize the database
        organisationTypeRepository.saveAndFlush(organisationType);
        int databaseSizeBeforeDelete = organisationTypeRepository.findAll().size();

        // Get the organisationType
        restOrganisationTypeMockMvc.perform(delete("/api/organisation-types/{id}", organisationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrganisationType> organisationTypeList = organisationTypeRepository.findAll();
        assertThat(organisationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrganisationType.class);
        OrganisationType organisationType1 = new OrganisationType();
        organisationType1.setId(1L);
        OrganisationType organisationType2 = new OrganisationType();
        organisationType2.setId(organisationType1.getId());
        assertThat(organisationType1).isEqualTo(organisationType2);
        organisationType2.setId(2L);
        assertThat(organisationType1).isNotEqualTo(organisationType2);
        organisationType1.setId(null);
        assertThat(organisationType1).isNotEqualTo(organisationType2);
    }
}
