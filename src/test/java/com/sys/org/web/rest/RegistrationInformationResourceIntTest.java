package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.RegistrationInformation;
import com.sys.org.repository.RegistrationInformationRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.sys.org.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RegistrationInformationResource REST controller.
 *
 * @see RegistrationInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class RegistrationInformationResourceIntTest {

    private static final String DEFAULT_APPLICATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_NUMBER = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_REGISTRATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_REGISTRATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_ID = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ID = "BBBBBBBBBB";

    @Autowired
    private RegistrationInformationRepository registrationInformationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegistrationInformationMockMvc;

    private RegistrationInformation registrationInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RegistrationInformationResource registrationInformationResource = new RegistrationInformationResource(registrationInformationRepository);
        this.restRegistrationInformationMockMvc = MockMvcBuilders.standaloneSetup(registrationInformationResource)
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
    public static RegistrationInformation createEntity(EntityManager em) {
        RegistrationInformation registrationInformation = new RegistrationInformation()
            .applicationNumber(DEFAULT_APPLICATION_NUMBER)
            .registrationDate(DEFAULT_REGISTRATION_DATE)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .mobileNumber(DEFAULT_MOBILE_NUMBER)
            .emailId(DEFAULT_EMAIL_ID);
        return registrationInformation;
    }

    @Before
    public void initTest() {
        registrationInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegistrationInformation() throws Exception {
        int databaseSizeBeforeCreate = registrationInformationRepository.findAll().size();

        // Create the RegistrationInformation
        restRegistrationInformationMockMvc.perform(post("/api/registration-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationInformation)))
            .andExpect(status().isCreated());

        // Validate the RegistrationInformation in the database
        List<RegistrationInformation> registrationInformationList = registrationInformationRepository.findAll();
        assertThat(registrationInformationList).hasSize(databaseSizeBeforeCreate + 1);
        RegistrationInformation testRegistrationInformation = registrationInformationList.get(registrationInformationList.size() - 1);
        assertThat(testRegistrationInformation.getApplicationNumber()).isEqualTo(DEFAULT_APPLICATION_NUMBER);
        assertThat(testRegistrationInformation.getRegistrationDate()).isEqualTo(DEFAULT_REGISTRATION_DATE);
        assertThat(testRegistrationInformation.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testRegistrationInformation.getMobileNumber()).isEqualTo(DEFAULT_MOBILE_NUMBER);
        assertThat(testRegistrationInformation.getEmailId()).isEqualTo(DEFAULT_EMAIL_ID);
    }

    @Test
    @Transactional
    public void createRegistrationInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = registrationInformationRepository.findAll().size();

        // Create the RegistrationInformation with an existing ID
        registrationInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegistrationInformationMockMvc.perform(post("/api/registration-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationInformation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<RegistrationInformation> registrationInformationList = registrationInformationRepository.findAll();
        assertThat(registrationInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegistrationInformations() throws Exception {
        // Initialize the database
        registrationInformationRepository.saveAndFlush(registrationInformation);

        // Get all the registrationInformationList
        restRegistrationInformationMockMvc.perform(get("/api/registration-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registrationInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationNumber").value(hasItem(DEFAULT_APPLICATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].registrationDate").value(hasItem(sameInstant(DEFAULT_REGISTRATION_DATE))))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].mobileNumber").value(hasItem(DEFAULT_MOBILE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].emailId").value(hasItem(DEFAULT_EMAIL_ID.toString())));
    }

    @Test
    @Transactional
    public void getRegistrationInformation() throws Exception {
        // Initialize the database
        registrationInformationRepository.saveAndFlush(registrationInformation);

        // Get the registrationInformation
        restRegistrationInformationMockMvc.perform(get("/api/registration-informations/{id}", registrationInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(registrationInformation.getId().intValue()))
            .andExpect(jsonPath("$.applicationNumber").value(DEFAULT_APPLICATION_NUMBER.toString()))
            .andExpect(jsonPath("$.registrationDate").value(sameInstant(DEFAULT_REGISTRATION_DATE)))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.mobileNumber").value(DEFAULT_MOBILE_NUMBER.toString()))
            .andExpect(jsonPath("$.emailId").value(DEFAULT_EMAIL_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRegistrationInformation() throws Exception {
        // Get the registrationInformation
        restRegistrationInformationMockMvc.perform(get("/api/registration-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegistrationInformation() throws Exception {
        // Initialize the database
        registrationInformationRepository.saveAndFlush(registrationInformation);
        int databaseSizeBeforeUpdate = registrationInformationRepository.findAll().size();

        // Update the registrationInformation
        RegistrationInformation updatedRegistrationInformation = registrationInformationRepository.findOne(registrationInformation.getId());
        updatedRegistrationInformation
            .applicationNumber(UPDATED_APPLICATION_NUMBER)
            .registrationDate(UPDATED_REGISTRATION_DATE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .emailId(UPDATED_EMAIL_ID);

        restRegistrationInformationMockMvc.perform(put("/api/registration-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegistrationInformation)))
            .andExpect(status().isOk());

        // Validate the RegistrationInformation in the database
        List<RegistrationInformation> registrationInformationList = registrationInformationRepository.findAll();
        assertThat(registrationInformationList).hasSize(databaseSizeBeforeUpdate);
        RegistrationInformation testRegistrationInformation = registrationInformationList.get(registrationInformationList.size() - 1);
        assertThat(testRegistrationInformation.getApplicationNumber()).isEqualTo(UPDATED_APPLICATION_NUMBER);
        assertThat(testRegistrationInformation.getRegistrationDate()).isEqualTo(UPDATED_REGISTRATION_DATE);
        assertThat(testRegistrationInformation.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testRegistrationInformation.getMobileNumber()).isEqualTo(UPDATED_MOBILE_NUMBER);
        assertThat(testRegistrationInformation.getEmailId()).isEqualTo(UPDATED_EMAIL_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingRegistrationInformation() throws Exception {
        int databaseSizeBeforeUpdate = registrationInformationRepository.findAll().size();

        // Create the RegistrationInformation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegistrationInformationMockMvc.perform(put("/api/registration-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registrationInformation)))
            .andExpect(status().isCreated());

        // Validate the RegistrationInformation in the database
        List<RegistrationInformation> registrationInformationList = registrationInformationRepository.findAll();
        assertThat(registrationInformationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegistrationInformation() throws Exception {
        // Initialize the database
        registrationInformationRepository.saveAndFlush(registrationInformation);
        int databaseSizeBeforeDelete = registrationInformationRepository.findAll().size();

        // Get the registrationInformation
        restRegistrationInformationMockMvc.perform(delete("/api/registration-informations/{id}", registrationInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RegistrationInformation> registrationInformationList = registrationInformationRepository.findAll();
        assertThat(registrationInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegistrationInformation.class);
        RegistrationInformation registrationInformation1 = new RegistrationInformation();
        registrationInformation1.setId(1L);
        RegistrationInformation registrationInformation2 = new RegistrationInformation();
        registrationInformation2.setId(registrationInformation1.getId());
        assertThat(registrationInformation1).isEqualTo(registrationInformation2);
        registrationInformation2.setId(2L);
        assertThat(registrationInformation1).isNotEqualTo(registrationInformation2);
        registrationInformation1.setId(null);
        assertThat(registrationInformation1).isNotEqualTo(registrationInformation2);
    }
}
