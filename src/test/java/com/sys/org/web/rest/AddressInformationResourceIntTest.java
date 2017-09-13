package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.AddressInformation;
import com.sys.org.repository.AddressInformationRepository;
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
 * Test class for the AddressInformationResource REST controller.
 *
 * @see AddressInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class AddressInformationResourceIntTest {

    private static final String DEFAULT_LANDMARK = "AAAAAAAAAA";
    private static final String UPDATED_LANDMARK = "BBBBBBBBBB";

    @Autowired
    private AddressInformationRepository addressInformationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAddressInformationMockMvc;

    private AddressInformation addressInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AddressInformationResource addressInformationResource = new AddressInformationResource(addressInformationRepository);
        this.restAddressInformationMockMvc = MockMvcBuilders.standaloneSetup(addressInformationResource)
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
    public static AddressInformation createEntity(EntityManager em) {
        AddressInformation addressInformation = new AddressInformation()
            .landmark(DEFAULT_LANDMARK);
        return addressInformation;
    }

    @Before
    public void initTest() {
        addressInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddressInformation() throws Exception {
        int databaseSizeBeforeCreate = addressInformationRepository.findAll().size();

        // Create the AddressInformation
        restAddressInformationMockMvc.perform(post("/api/address-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInformation)))
            .andExpect(status().isCreated());

        // Validate the AddressInformation in the database
        List<AddressInformation> addressInformationList = addressInformationRepository.findAll();
        assertThat(addressInformationList).hasSize(databaseSizeBeforeCreate + 1);
        AddressInformation testAddressInformation = addressInformationList.get(addressInformationList.size() - 1);
        assertThat(testAddressInformation.getLandmark()).isEqualTo(DEFAULT_LANDMARK);
    }

    @Test
    @Transactional
    public void createAddressInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressInformationRepository.findAll().size();

        // Create the AddressInformation with an existing ID
        addressInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressInformationMockMvc.perform(post("/api/address-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInformation)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AddressInformation> addressInformationList = addressInformationRepository.findAll();
        assertThat(addressInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAddressInformations() throws Exception {
        // Initialize the database
        addressInformationRepository.saveAndFlush(addressInformation);

        // Get all the addressInformationList
        restAddressInformationMockMvc.perform(get("/api/address-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].landmark").value(hasItem(DEFAULT_LANDMARK.toString())));
    }

    @Test
    @Transactional
    public void getAddressInformation() throws Exception {
        // Initialize the database
        addressInformationRepository.saveAndFlush(addressInformation);

        // Get the addressInformation
        restAddressInformationMockMvc.perform(get("/api/address-informations/{id}", addressInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressInformation.getId().intValue()))
            .andExpect(jsonPath("$.landmark").value(DEFAULT_LANDMARK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAddressInformation() throws Exception {
        // Get the addressInformation
        restAddressInformationMockMvc.perform(get("/api/address-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddressInformation() throws Exception {
        // Initialize the database
        addressInformationRepository.saveAndFlush(addressInformation);
        int databaseSizeBeforeUpdate = addressInformationRepository.findAll().size();

        // Update the addressInformation
        AddressInformation updatedAddressInformation = addressInformationRepository.findOne(addressInformation.getId());
        updatedAddressInformation
            .landmark(UPDATED_LANDMARK);

        restAddressInformationMockMvc.perform(put("/api/address-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddressInformation)))
            .andExpect(status().isOk());

        // Validate the AddressInformation in the database
        List<AddressInformation> addressInformationList = addressInformationRepository.findAll();
        assertThat(addressInformationList).hasSize(databaseSizeBeforeUpdate);
        AddressInformation testAddressInformation = addressInformationList.get(addressInformationList.size() - 1);
        assertThat(testAddressInformation.getLandmark()).isEqualTo(UPDATED_LANDMARK);
    }

    @Test
    @Transactional
    public void updateNonExistingAddressInformation() throws Exception {
        int databaseSizeBeforeUpdate = addressInformationRepository.findAll().size();

        // Create the AddressInformation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAddressInformationMockMvc.perform(put("/api/address-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInformation)))
            .andExpect(status().isCreated());

        // Validate the AddressInformation in the database
        List<AddressInformation> addressInformationList = addressInformationRepository.findAll();
        assertThat(addressInformationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAddressInformation() throws Exception {
        // Initialize the database
        addressInformationRepository.saveAndFlush(addressInformation);
        int databaseSizeBeforeDelete = addressInformationRepository.findAll().size();

        // Get the addressInformation
        restAddressInformationMockMvc.perform(delete("/api/address-informations/{id}", addressInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AddressInformation> addressInformationList = addressInformationRepository.findAll();
        assertThat(addressInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressInformation.class);
        AddressInformation addressInformation1 = new AddressInformation();
        addressInformation1.setId(1L);
        AddressInformation addressInformation2 = new AddressInformation();
        addressInformation2.setId(addressInformation1.getId());
        assertThat(addressInformation1).isEqualTo(addressInformation2);
        addressInformation2.setId(2L);
        assertThat(addressInformation1).isNotEqualTo(addressInformation2);
        addressInformation1.setId(null);
        assertThat(addressInformation1).isNotEqualTo(addressInformation2);
    }
}
