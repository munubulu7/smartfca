package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.RegistrationType;
import com.sys.org.repository.RegistrationTypeRepository;
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
 * Test class for the RegistrationTypeResource REST controller.
 *
 * @see RegistrationTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class RegistrationTypeResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DRSCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DRSCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RegistrationTypeRepository registrationTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegistrationTypeMockMvc;

    private RegistrationType registrationType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RegistrationTypeResource registrationTypeResource = new RegistrationTypeResource(registrationTypeRepository);
        this.restRegistrationTypeMockMvc = MockMvcBuilders.standaloneSetup(registrationTypeResource)
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
    public static RegistrationType createEntity(EntityManager em) {
        RegistrationType registrationType = new RegistrationType()
            .type(DEFAULT_TYPE)
            .drscription(DEFAULT_DRSCRIPTION);
        return registrationType;
    }

    @Before
    public void initTest() {
        registrationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegistrationType() throws Exception {
        int databaseSizeBeforeCreate = registrationTypeRepository.findAll().size();

        // Create the RegistrationType
        restRegistrationTypeMockMvc.perform(post("/api/registration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationType)))
            .andExpect(status().isCreated());

        // Validate the RegistrationType in the database
        List<RegistrationType> registrationTypeList = registrationTypeRepository.findAll();
        assertThat(registrationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        RegistrationType testRegistrationType = registrationTypeList.get(registrationTypeList.size() - 1);
        assertThat(testRegistrationType.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRegistrationType.getDrscription()).isEqualTo(DEFAULT_DRSCRIPTION);
    }

    @Test
    @Transactional
    public void createRegistrationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = registrationTypeRepository.findAll().size();

        // Create the RegistrationType with an existing ID
        registrationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegistrationTypeMockMvc.perform(post("/api/registration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationType)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<RegistrationType> registrationTypeList = registrationTypeRepository.findAll();
        assertThat(registrationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegistrationTypes() throws Exception {
        // Initialize the database
        registrationTypeRepository.saveAndFlush(registrationType);

        // Get all the registrationTypeList
        restRegistrationTypeMockMvc.perform(get("/api/registration-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registrationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].drscription").value(hasItem(DEFAULT_DRSCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getRegistrationType() throws Exception {
        // Initialize the database
        registrationTypeRepository.saveAndFlush(registrationType);

        // Get the registrationType
        restRegistrationTypeMockMvc.perform(get("/api/registration-types/{id}", registrationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(registrationType.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.drscription").value(DEFAULT_DRSCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRegistrationType() throws Exception {
        // Get the registrationType
        restRegistrationTypeMockMvc.perform(get("/api/registration-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegistrationType() throws Exception {
        // Initialize the database
        registrationTypeRepository.saveAndFlush(registrationType);
        int databaseSizeBeforeUpdate = registrationTypeRepository.findAll().size();

        // Update the registrationType
        RegistrationType updatedRegistrationType = registrationTypeRepository.findOne(registrationType.getId());
        updatedRegistrationType
            .type(UPDATED_TYPE)
            .drscription(UPDATED_DRSCRIPTION);

        restRegistrationTypeMockMvc.perform(put("/api/registration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegistrationType)))
            .andExpect(status().isOk());

        // Validate the RegistrationType in the database
        List<RegistrationType> registrationTypeList = registrationTypeRepository.findAll();
        assertThat(registrationTypeList).hasSize(databaseSizeBeforeUpdate);
        RegistrationType testRegistrationType = registrationTypeList.get(registrationTypeList.size() - 1);
        assertThat(testRegistrationType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRegistrationType.getDrscription()).isEqualTo(UPDATED_DRSCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRegistrationType() throws Exception {
        int databaseSizeBeforeUpdate = registrationTypeRepository.findAll().size();

        // Create the RegistrationType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegistrationTypeMockMvc.perform(put("/api/registration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationType)))
            .andExpect(status().isCreated());

        // Validate the RegistrationType in the database
        List<RegistrationType> registrationTypeList = registrationTypeRepository.findAll();
        assertThat(registrationTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegistrationType() throws Exception {
        // Initialize the database
        registrationTypeRepository.saveAndFlush(registrationType);
        int databaseSizeBeforeDelete = registrationTypeRepository.findAll().size();

        // Get the registrationType
        restRegistrationTypeMockMvc.perform(delete("/api/registration-types/{id}", registrationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RegistrationType> registrationTypeList = registrationTypeRepository.findAll();
        assertThat(registrationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegistrationType.class);
        RegistrationType registrationType1 = new RegistrationType();
        registrationType1.setId(1L);
        RegistrationType registrationType2 = new RegistrationType();
        registrationType2.setId(registrationType1.getId());
        assertThat(registrationType1).isEqualTo(registrationType2);
        registrationType2.setId(2L);
        assertThat(registrationType1).isNotEqualTo(registrationType2);
        registrationType1.setId(null);
        assertThat(registrationType1).isNotEqualTo(registrationType2);
    }
}
