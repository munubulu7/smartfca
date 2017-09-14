package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.ConfigParameter;
import com.sys.org.repository.ConfigParameterRepository;
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
 * Test class for the ConfigParameterResource REST controller.
 *
 * @see ConfigParameterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class ConfigParameterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private ConfigParameterRepository configParameterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConfigParameterMockMvc;

    private ConfigParameter configParameter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ConfigParameterResource configParameterResource = new ConfigParameterResource(configParameterRepository);
        this.restConfigParameterMockMvc = MockMvcBuilders.standaloneSetup(configParameterResource)
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
    public static ConfigParameter createEntity(EntityManager em) {
        ConfigParameter configParameter = new ConfigParameter()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .value(DEFAULT_VALUE);
        return configParameter;
    }

    @Before
    public void initTest() {
        configParameter = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfigParameter() throws Exception {
        int databaseSizeBeforeCreate = configParameterRepository.findAll().size();

        // Create the ConfigParameter
        restConfigParameterMockMvc.perform(post("/api/config-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configParameter)))
            .andExpect(status().isCreated());

        // Validate the ConfigParameter in the database
        List<ConfigParameter> configParameterList = configParameterRepository.findAll();
        assertThat(configParameterList).hasSize(databaseSizeBeforeCreate + 1);
        ConfigParameter testConfigParameter = configParameterList.get(configParameterList.size() - 1);
        assertThat(testConfigParameter.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testConfigParameter.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testConfigParameter.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createConfigParameterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configParameterRepository.findAll().size();

        // Create the ConfigParameter with an existing ID
        configParameter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfigParameterMockMvc.perform(post("/api/config-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configParameter)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ConfigParameter> configParameterList = configParameterRepository.findAll();
        assertThat(configParameterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConfigParameters() throws Exception {
        // Initialize the database
        configParameterRepository.saveAndFlush(configParameter);

        // Get all the configParameterList
        restConfigParameterMockMvc.perform(get("/api/config-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configParameter.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getConfigParameter() throws Exception {
        // Initialize the database
        configParameterRepository.saveAndFlush(configParameter);

        // Get the configParameter
        restConfigParameterMockMvc.perform(get("/api/config-parameters/{id}", configParameter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(configParameter.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConfigParameter() throws Exception {
        // Get the configParameter
        restConfigParameterMockMvc.perform(get("/api/config-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfigParameter() throws Exception {
        // Initialize the database
        configParameterRepository.saveAndFlush(configParameter);
        int databaseSizeBeforeUpdate = configParameterRepository.findAll().size();

        // Update the configParameter
        ConfigParameter updatedConfigParameter = configParameterRepository.findOne(configParameter.getId());
        updatedConfigParameter
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .value(UPDATED_VALUE);

        restConfigParameterMockMvc.perform(put("/api/config-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConfigParameter)))
            .andExpect(status().isOk());

        // Validate the ConfigParameter in the database
        List<ConfigParameter> configParameterList = configParameterRepository.findAll();
        assertThat(configParameterList).hasSize(databaseSizeBeforeUpdate);
        ConfigParameter testConfigParameter = configParameterList.get(configParameterList.size() - 1);
        assertThat(testConfigParameter.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testConfigParameter.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testConfigParameter.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingConfigParameter() throws Exception {
        int databaseSizeBeforeUpdate = configParameterRepository.findAll().size();

        // Create the ConfigParameter

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConfigParameterMockMvc.perform(put("/api/config-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configParameter)))
            .andExpect(status().isCreated());

        // Validate the ConfigParameter in the database
        List<ConfigParameter> configParameterList = configParameterRepository.findAll();
        assertThat(configParameterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConfigParameter() throws Exception {
        // Initialize the database
        configParameterRepository.saveAndFlush(configParameter);
        int databaseSizeBeforeDelete = configParameterRepository.findAll().size();

        // Get the configParameter
        restConfigParameterMockMvc.perform(delete("/api/config-parameters/{id}", configParameter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ConfigParameter> configParameterList = configParameterRepository.findAll();
        assertThat(configParameterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConfigParameter.class);
        ConfigParameter configParameter1 = new ConfigParameter();
        configParameter1.setId(1L);
        ConfigParameter configParameter2 = new ConfigParameter();
        configParameter2.setId(configParameter1.getId());
        assertThat(configParameter1).isEqualTo(configParameter2);
        configParameter2.setId(2L);
        assertThat(configParameter1).isNotEqualTo(configParameter2);
        configParameter1.setId(null);
        assertThat(configParameter1).isNotEqualTo(configParameter2);
    }
}
