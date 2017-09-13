package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.AddressFor;
import com.sys.org.repository.AddressForRepository;
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
 * Test class for the AddressForResource REST controller.
 *
 * @see AddressForResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class AddressForResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AddressForRepository addressForRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAddressForMockMvc;

    private AddressFor addressFor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AddressForResource addressForResource = new AddressForResource(addressForRepository);
        this.restAddressForMockMvc = MockMvcBuilders.standaloneSetup(addressForResource)
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
    public static AddressFor createEntity(EntityManager em) {
        AddressFor addressFor = new AddressFor()
            .name(DEFAULT_NAME);
        return addressFor;
    }

    @Before
    public void initTest() {
        addressFor = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddressFor() throws Exception {
        int databaseSizeBeforeCreate = addressForRepository.findAll().size();

        // Create the AddressFor
        restAddressForMockMvc.perform(post("/api/address-fors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressFor)))
            .andExpect(status().isCreated());

        // Validate the AddressFor in the database
        List<AddressFor> addressForList = addressForRepository.findAll();
        assertThat(addressForList).hasSize(databaseSizeBeforeCreate + 1);
        AddressFor testAddressFor = addressForList.get(addressForList.size() - 1);
        assertThat(testAddressFor.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAddressForWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressForRepository.findAll().size();

        // Create the AddressFor with an existing ID
        addressFor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressForMockMvc.perform(post("/api/address-fors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressFor)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AddressFor> addressForList = addressForRepository.findAll();
        assertThat(addressForList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAddressFors() throws Exception {
        // Initialize the database
        addressForRepository.saveAndFlush(addressFor);

        // Get all the addressForList
        restAddressForMockMvc.perform(get("/api/address-fors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressFor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getAddressFor() throws Exception {
        // Initialize the database
        addressForRepository.saveAndFlush(addressFor);

        // Get the addressFor
        restAddressForMockMvc.perform(get("/api/address-fors/{id}", addressFor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressFor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAddressFor() throws Exception {
        // Get the addressFor
        restAddressForMockMvc.perform(get("/api/address-fors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddressFor() throws Exception {
        // Initialize the database
        addressForRepository.saveAndFlush(addressFor);
        int databaseSizeBeforeUpdate = addressForRepository.findAll().size();

        // Update the addressFor
        AddressFor updatedAddressFor = addressForRepository.findOne(addressFor.getId());
        updatedAddressFor
            .name(UPDATED_NAME);

        restAddressForMockMvc.perform(put("/api/address-fors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddressFor)))
            .andExpect(status().isOk());

        // Validate the AddressFor in the database
        List<AddressFor> addressForList = addressForRepository.findAll();
        assertThat(addressForList).hasSize(databaseSizeBeforeUpdate);
        AddressFor testAddressFor = addressForList.get(addressForList.size() - 1);
        assertThat(testAddressFor.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAddressFor() throws Exception {
        int databaseSizeBeforeUpdate = addressForRepository.findAll().size();

        // Create the AddressFor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAddressForMockMvc.perform(put("/api/address-fors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressFor)))
            .andExpect(status().isCreated());

        // Validate the AddressFor in the database
        List<AddressFor> addressForList = addressForRepository.findAll();
        assertThat(addressForList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAddressFor() throws Exception {
        // Initialize the database
        addressForRepository.saveAndFlush(addressFor);
        int databaseSizeBeforeDelete = addressForRepository.findAll().size();

        // Get the addressFor
        restAddressForMockMvc.perform(delete("/api/address-fors/{id}", addressFor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AddressFor> addressForList = addressForRepository.findAll();
        assertThat(addressForList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressFor.class);
        AddressFor addressFor1 = new AddressFor();
        addressFor1.setId(1L);
        AddressFor addressFor2 = new AddressFor();
        addressFor2.setId(addressFor1.getId());
        assertThat(addressFor1).isEqualTo(addressFor2);
        addressFor2.setId(2L);
        assertThat(addressFor1).isNotEqualTo(addressFor2);
        addressFor1.setId(null);
        assertThat(addressFor1).isNotEqualTo(addressFor2);
    }
}
