package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.BasicInformation;
import com.sys.org.repository.BasicInformationRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BasicInformationResource REST controller.
 *
 * @see BasicInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class BasicInformationResourceIntTest {

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_NO_OF_SON = 1;
    private static final Integer UPDATED_NO_OF_SON = 2;

    private static final Integer DEFAULT_NO_OF_DAUGHTER = 1;
    private static final Integer UPDATED_NO_OF_DAUGHTER = 2;

    private static final LocalDate DEFAULT_YEAR_OF_EMPLOYED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_YEAR_OF_EMPLOYED = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME_OF_ORGANISATION = "AAAAAAAAAA";
    private static final String UPDATED_NAME_OF_ORGANISATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ESTABLISHMENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ESTABLISHMENT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_COMMENCEMENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMMENCEMENT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BasicInformationRepository basicInformationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBasicInformationMockMvc;

    private BasicInformation basicInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BasicInformationResource basicInformationResource = new BasicInformationResource(basicInformationRepository);
        this.restBasicInformationMockMvc = MockMvcBuilders.standaloneSetup(basicInformationResource)
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
    public static BasicInformation createEntity(EntityManager em) {
        BasicInformation basicInformation = new BasicInformation()
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .noOfSon(DEFAULT_NO_OF_SON)
            .noOfDaughter(DEFAULT_NO_OF_DAUGHTER)
            .yearOfEmployed(DEFAULT_YEAR_OF_EMPLOYED)
            .nameOfOrganisation(DEFAULT_NAME_OF_ORGANISATION)
            .establishment(DEFAULT_ESTABLISHMENT)
            .commencement(DEFAULT_COMMENCEMENT);
        return basicInformation;
    }

    @Before
    public void initTest() {
        basicInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createBasicInformation() throws Exception {
        int databaseSizeBeforeCreate = basicInformationRepository.findAll().size();

        // Create the BasicInformation
        restBasicInformationMockMvc.perform(post("/api/basic-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicInformation)))
            .andExpect(status().isCreated());

        // Validate the BasicInformation in the database
        List<BasicInformation> basicInformationList = basicInformationRepository.findAll();
        assertThat(basicInformationList).hasSize(databaseSizeBeforeCreate + 1);
        BasicInformation testBasicInformation = basicInformationList.get(basicInformationList.size() - 1);
        assertThat(testBasicInformation.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testBasicInformation.getNoOfSon()).isEqualTo(DEFAULT_NO_OF_SON);
        assertThat(testBasicInformation.getNoOfDaughter()).isEqualTo(DEFAULT_NO_OF_DAUGHTER);
        assertThat(testBasicInformation.getYearOfEmployed()).isEqualTo(DEFAULT_YEAR_OF_EMPLOYED);
        assertThat(testBasicInformation.getNameOfOrganisation()).isEqualTo(DEFAULT_NAME_OF_ORGANISATION);
        assertThat(testBasicInformation.getEstablishment()).isEqualTo(DEFAULT_ESTABLISHMENT);
        assertThat(testBasicInformation.getCommencement()).isEqualTo(DEFAULT_COMMENCEMENT);
    }

    @Test
    @Transactional
    public void createBasicInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = basicInformationRepository.findAll().size();

        // Create the BasicInformation with an existing ID
        basicInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasicInformationMockMvc.perform(post("/api/basic-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicInformation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<BasicInformation> basicInformationList = basicInformationRepository.findAll();
        assertThat(basicInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBasicInformations() throws Exception {
        // Initialize the database
        basicInformationRepository.saveAndFlush(basicInformation);

        // Get all the basicInformationList
        restBasicInformationMockMvc.perform(get("/api/basic-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basicInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].noOfSon").value(hasItem(DEFAULT_NO_OF_SON)))
            .andExpect(jsonPath("$.[*].noOfDaughter").value(hasItem(DEFAULT_NO_OF_DAUGHTER)))
            .andExpect(jsonPath("$.[*].yearOfEmployed").value(hasItem(DEFAULT_YEAR_OF_EMPLOYED.toString())))
            .andExpect(jsonPath("$.[*].nameOfOrganisation").value(hasItem(DEFAULT_NAME_OF_ORGANISATION.toString())))
            .andExpect(jsonPath("$.[*].establishment").value(hasItem(DEFAULT_ESTABLISHMENT.toString())))
            .andExpect(jsonPath("$.[*].commencement").value(hasItem(DEFAULT_COMMENCEMENT.toString())));
    }

    @Test
    @Transactional
    public void getBasicInformation() throws Exception {
        // Initialize the database
        basicInformationRepository.saveAndFlush(basicInformation);

        // Get the basicInformation
        restBasicInformationMockMvc.perform(get("/api/basic-informations/{id}", basicInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(basicInformation.getId().intValue()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.noOfSon").value(DEFAULT_NO_OF_SON))
            .andExpect(jsonPath("$.noOfDaughter").value(DEFAULT_NO_OF_DAUGHTER))
            .andExpect(jsonPath("$.yearOfEmployed").value(DEFAULT_YEAR_OF_EMPLOYED.toString()))
            .andExpect(jsonPath("$.nameOfOrganisation").value(DEFAULT_NAME_OF_ORGANISATION.toString()))
            .andExpect(jsonPath("$.establishment").value(DEFAULT_ESTABLISHMENT.toString()))
            .andExpect(jsonPath("$.commencement").value(DEFAULT_COMMENCEMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBasicInformation() throws Exception {
        // Get the basicInformation
        restBasicInformationMockMvc.perform(get("/api/basic-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBasicInformation() throws Exception {
        // Initialize the database
        basicInformationRepository.saveAndFlush(basicInformation);
        int databaseSizeBeforeUpdate = basicInformationRepository.findAll().size();

        // Update the basicInformation
        BasicInformation updatedBasicInformation = basicInformationRepository.findOne(basicInformation.getId());
        updatedBasicInformation
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .noOfSon(UPDATED_NO_OF_SON)
            .noOfDaughter(UPDATED_NO_OF_DAUGHTER)
            .yearOfEmployed(UPDATED_YEAR_OF_EMPLOYED)
            .nameOfOrganisation(UPDATED_NAME_OF_ORGANISATION)
            .establishment(UPDATED_ESTABLISHMENT)
            .commencement(UPDATED_COMMENCEMENT);

        restBasicInformationMockMvc.perform(put("/api/basic-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBasicInformation)))
            .andExpect(status().isOk());

        // Validate the BasicInformation in the database
        List<BasicInformation> basicInformationList = basicInformationRepository.findAll();
        assertThat(basicInformationList).hasSize(databaseSizeBeforeUpdate);
        BasicInformation testBasicInformation = basicInformationList.get(basicInformationList.size() - 1);
        assertThat(testBasicInformation.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testBasicInformation.getNoOfSon()).isEqualTo(UPDATED_NO_OF_SON);
        assertThat(testBasicInformation.getNoOfDaughter()).isEqualTo(UPDATED_NO_OF_DAUGHTER);
        assertThat(testBasicInformation.getYearOfEmployed()).isEqualTo(UPDATED_YEAR_OF_EMPLOYED);
        assertThat(testBasicInformation.getNameOfOrganisation()).isEqualTo(UPDATED_NAME_OF_ORGANISATION);
        assertThat(testBasicInformation.getEstablishment()).isEqualTo(UPDATED_ESTABLISHMENT);
        assertThat(testBasicInformation.getCommencement()).isEqualTo(UPDATED_COMMENCEMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingBasicInformation() throws Exception {
        int databaseSizeBeforeUpdate = basicInformationRepository.findAll().size();

        // Create the BasicInformation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBasicInformationMockMvc.perform(put("/api/basic-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicInformation)))
            .andExpect(status().isCreated());

        // Validate the BasicInformation in the database
        List<BasicInformation> basicInformationList = basicInformationRepository.findAll();
        assertThat(basicInformationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBasicInformation() throws Exception {
        // Initialize the database
        basicInformationRepository.saveAndFlush(basicInformation);
        int databaseSizeBeforeDelete = basicInformationRepository.findAll().size();

        // Get the basicInformation
        restBasicInformationMockMvc.perform(delete("/api/basic-informations/{id}", basicInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BasicInformation> basicInformationList = basicInformationRepository.findAll();
        assertThat(basicInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BasicInformation.class);
        BasicInformation basicInformation1 = new BasicInformation();
        basicInformation1.setId(1L);
        BasicInformation basicInformation2 = new BasicInformation();
        basicInformation2.setId(basicInformation1.getId());
        assertThat(basicInformation1).isEqualTo(basicInformation2);
        basicInformation2.setId(2L);
        assertThat(basicInformation1).isNotEqualTo(basicInformation2);
        basicInformation1.setId(null);
        assertThat(basicInformation1).isNotEqualTo(basicInformation2);
    }
}
