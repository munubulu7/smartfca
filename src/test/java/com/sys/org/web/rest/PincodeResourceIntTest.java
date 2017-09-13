package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.Pincode;
import com.sys.org.repository.PincodeRepository;
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
 * Test class for the PincodeResource REST controller.
 *
 * @see PincodeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class PincodeResourceIntTest {

    private static final String DEFAULT_PINCODE = "AAAAAAAAAA";
    private static final String UPDATED_PINCODE = "BBBBBBBBBB";

    @Autowired
    private PincodeRepository pincodeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPincodeMockMvc;

    private Pincode pincode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PincodeResource pincodeResource = new PincodeResource(pincodeRepository);
        this.restPincodeMockMvc = MockMvcBuilders.standaloneSetup(pincodeResource)
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
    public static Pincode createEntity(EntityManager em) {
        Pincode pincode = new Pincode()
            .pincode(DEFAULT_PINCODE);
        return pincode;
    }

    @Before
    public void initTest() {
        pincode = createEntity(em);
    }

    @Test
    @Transactional
    public void createPincode() throws Exception {
        int databaseSizeBeforeCreate = pincodeRepository.findAll().size();

        // Create the Pincode
        restPincodeMockMvc.perform(post("/api/pincodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pincode)))
            .andExpect(status().isCreated());

        // Validate the Pincode in the database
        List<Pincode> pincodeList = pincodeRepository.findAll();
        assertThat(pincodeList).hasSize(databaseSizeBeforeCreate + 1);
        Pincode testPincode = pincodeList.get(pincodeList.size() - 1);
        assertThat(testPincode.getPincode()).isEqualTo(DEFAULT_PINCODE);
    }

    @Test
    @Transactional
    public void createPincodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pincodeRepository.findAll().size();

        // Create the Pincode with an existing ID
        pincode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPincodeMockMvc.perform(post("/api/pincodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pincode)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Pincode> pincodeList = pincodeRepository.findAll();
        assertThat(pincodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPincodes() throws Exception {
        // Initialize the database
        pincodeRepository.saveAndFlush(pincode);

        // Get all the pincodeList
        restPincodeMockMvc.perform(get("/api/pincodes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pincode.getId().intValue())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE.toString())));
    }

    @Test
    @Transactional
    public void getPincode() throws Exception {
        // Initialize the database
        pincodeRepository.saveAndFlush(pincode);

        // Get the pincode
        restPincodeMockMvc.perform(get("/api/pincodes/{id}", pincode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pincode.getId().intValue()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPincode() throws Exception {
        // Get the pincode
        restPincodeMockMvc.perform(get("/api/pincodes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePincode() throws Exception {
        // Initialize the database
        pincodeRepository.saveAndFlush(pincode);
        int databaseSizeBeforeUpdate = pincodeRepository.findAll().size();

        // Update the pincode
        Pincode updatedPincode = pincodeRepository.findOne(pincode.getId());
        updatedPincode
            .pincode(UPDATED_PINCODE);

        restPincodeMockMvc.perform(put("/api/pincodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPincode)))
            .andExpect(status().isOk());

        // Validate the Pincode in the database
        List<Pincode> pincodeList = pincodeRepository.findAll();
        assertThat(pincodeList).hasSize(databaseSizeBeforeUpdate);
        Pincode testPincode = pincodeList.get(pincodeList.size() - 1);
        assertThat(testPincode.getPincode()).isEqualTo(UPDATED_PINCODE);
    }

    @Test
    @Transactional
    public void updateNonExistingPincode() throws Exception {
        int databaseSizeBeforeUpdate = pincodeRepository.findAll().size();

        // Create the Pincode

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPincodeMockMvc.perform(put("/api/pincodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pincode)))
            .andExpect(status().isCreated());

        // Validate the Pincode in the database
        List<Pincode> pincodeList = pincodeRepository.findAll();
        assertThat(pincodeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePincode() throws Exception {
        // Initialize the database
        pincodeRepository.saveAndFlush(pincode);
        int databaseSizeBeforeDelete = pincodeRepository.findAll().size();

        // Get the pincode
        restPincodeMockMvc.perform(delete("/api/pincodes/{id}", pincode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pincode> pincodeList = pincodeRepository.findAll();
        assertThat(pincodeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pincode.class);
        Pincode pincode1 = new Pincode();
        pincode1.setId(1L);
        Pincode pincode2 = new Pincode();
        pincode2.setId(pincode1.getId());
        assertThat(pincode1).isEqualTo(pincode2);
        pincode2.setId(2L);
        assertThat(pincode1).isNotEqualTo(pincode2);
        pincode1.setId(null);
        assertThat(pincode1).isNotEqualTo(pincode2);
    }
}
