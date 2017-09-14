package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.TicketStatus;
import com.sys.org.repository.TicketStatusRepository;
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
 * Test class for the TicketStatusResource REST controller.
 *
 * @see TicketStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class TicketStatusResourceIntTest {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private TicketStatusRepository ticketStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTicketStatusMockMvc;

    private TicketStatus ticketStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TicketStatusResource ticketStatusResource = new TicketStatusResource(ticketStatusRepository);
        this.restTicketStatusMockMvc = MockMvcBuilders.standaloneSetup(ticketStatusResource)
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
    public static TicketStatus createEntity(EntityManager em) {
        TicketStatus ticketStatus = new TicketStatus()
            .status(DEFAULT_STATUS);
        return ticketStatus;
    }

    @Before
    public void initTest() {
        ticketStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createTicketStatus() throws Exception {
        int databaseSizeBeforeCreate = ticketStatusRepository.findAll().size();

        // Create the TicketStatus
        restTicketStatusMockMvc.perform(post("/api/ticket-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticketStatus)))
            .andExpect(status().isCreated());

        // Validate the TicketStatus in the database
        List<TicketStatus> ticketStatusList = ticketStatusRepository.findAll();
        assertThat(ticketStatusList).hasSize(databaseSizeBeforeCreate + 1);
        TicketStatus testTicketStatus = ticketStatusList.get(ticketStatusList.size() - 1);
        assertThat(testTicketStatus.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createTicketStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ticketStatusRepository.findAll().size();

        // Create the TicketStatus with an existing ID
        ticketStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTicketStatusMockMvc.perform(post("/api/ticket-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticketStatus)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TicketStatus> ticketStatusList = ticketStatusRepository.findAll();
        assertThat(ticketStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTicketStatuses() throws Exception {
        // Initialize the database
        ticketStatusRepository.saveAndFlush(ticketStatus);

        // Get all the ticketStatusList
        restTicketStatusMockMvc.perform(get("/api/ticket-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ticketStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getTicketStatus() throws Exception {
        // Initialize the database
        ticketStatusRepository.saveAndFlush(ticketStatus);

        // Get the ticketStatus
        restTicketStatusMockMvc.perform(get("/api/ticket-statuses/{id}", ticketStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ticketStatus.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTicketStatus() throws Exception {
        // Get the ticketStatus
        restTicketStatusMockMvc.perform(get("/api/ticket-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTicketStatus() throws Exception {
        // Initialize the database
        ticketStatusRepository.saveAndFlush(ticketStatus);
        int databaseSizeBeforeUpdate = ticketStatusRepository.findAll().size();

        // Update the ticketStatus
        TicketStatus updatedTicketStatus = ticketStatusRepository.findOne(ticketStatus.getId());
        updatedTicketStatus
            .status(UPDATED_STATUS);

        restTicketStatusMockMvc.perform(put("/api/ticket-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTicketStatus)))
            .andExpect(status().isOk());

        // Validate the TicketStatus in the database
        List<TicketStatus> ticketStatusList = ticketStatusRepository.findAll();
        assertThat(ticketStatusList).hasSize(databaseSizeBeforeUpdate);
        TicketStatus testTicketStatus = ticketStatusList.get(ticketStatusList.size() - 1);
        assertThat(testTicketStatus.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingTicketStatus() throws Exception {
        int databaseSizeBeforeUpdate = ticketStatusRepository.findAll().size();

        // Create the TicketStatus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTicketStatusMockMvc.perform(put("/api/ticket-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticketStatus)))
            .andExpect(status().isCreated());

        // Validate the TicketStatus in the database
        List<TicketStatus> ticketStatusList = ticketStatusRepository.findAll();
        assertThat(ticketStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTicketStatus() throws Exception {
        // Initialize the database
        ticketStatusRepository.saveAndFlush(ticketStatus);
        int databaseSizeBeforeDelete = ticketStatusRepository.findAll().size();

        // Get the ticketStatus
        restTicketStatusMockMvc.perform(delete("/api/ticket-statuses/{id}", ticketStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TicketStatus> ticketStatusList = ticketStatusRepository.findAll();
        assertThat(ticketStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TicketStatus.class);
        TicketStatus ticketStatus1 = new TicketStatus();
        ticketStatus1.setId(1L);
        TicketStatus ticketStatus2 = new TicketStatus();
        ticketStatus2.setId(ticketStatus1.getId());
        assertThat(ticketStatus1).isEqualTo(ticketStatus2);
        ticketStatus2.setId(2L);
        assertThat(ticketStatus1).isNotEqualTo(ticketStatus2);
        ticketStatus1.setId(null);
        assertThat(ticketStatus1).isNotEqualTo(ticketStatus2);
    }
}
