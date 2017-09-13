package com.sys.org.web.rest;

import com.sys.org.Smartfca001App;

import com.sys.org.domain.PostOffice;
import com.sys.org.repository.PostOfficeRepository;
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
 * Test class for the PostOfficeResource REST controller.
 *
 * @see PostOfficeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartfca001App.class)
public class PostOfficeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PostOfficeRepository postOfficeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPostOfficeMockMvc;

    private PostOffice postOffice;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PostOfficeResource postOfficeResource = new PostOfficeResource(postOfficeRepository);
        this.restPostOfficeMockMvc = MockMvcBuilders.standaloneSetup(postOfficeResource)
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
    public static PostOffice createEntity(EntityManager em) {
        PostOffice postOffice = new PostOffice()
            .name(DEFAULT_NAME);
        return postOffice;
    }

    @Before
    public void initTest() {
        postOffice = createEntity(em);
    }

    @Test
    @Transactional
    public void createPostOffice() throws Exception {
        int databaseSizeBeforeCreate = postOfficeRepository.findAll().size();

        // Create the PostOffice
        restPostOfficeMockMvc.perform(post("/api/post-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postOffice)))
            .andExpect(status().isCreated());

        // Validate the PostOffice in the database
        List<PostOffice> postOfficeList = postOfficeRepository.findAll();
        assertThat(postOfficeList).hasSize(databaseSizeBeforeCreate + 1);
        PostOffice testPostOffice = postOfficeList.get(postOfficeList.size() - 1);
        assertThat(testPostOffice.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPostOfficeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = postOfficeRepository.findAll().size();

        // Create the PostOffice with an existing ID
        postOffice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostOfficeMockMvc.perform(post("/api/post-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postOffice)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<PostOffice> postOfficeList = postOfficeRepository.findAll();
        assertThat(postOfficeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPostOffices() throws Exception {
        // Initialize the database
        postOfficeRepository.saveAndFlush(postOffice);

        // Get all the postOfficeList
        restPostOfficeMockMvc.perform(get("/api/post-offices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(postOffice.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPostOffice() throws Exception {
        // Initialize the database
        postOfficeRepository.saveAndFlush(postOffice);

        // Get the postOffice
        restPostOfficeMockMvc.perform(get("/api/post-offices/{id}", postOffice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(postOffice.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPostOffice() throws Exception {
        // Get the postOffice
        restPostOfficeMockMvc.perform(get("/api/post-offices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePostOffice() throws Exception {
        // Initialize the database
        postOfficeRepository.saveAndFlush(postOffice);
        int databaseSizeBeforeUpdate = postOfficeRepository.findAll().size();

        // Update the postOffice
        PostOffice updatedPostOffice = postOfficeRepository.findOne(postOffice.getId());
        updatedPostOffice
            .name(UPDATED_NAME);

        restPostOfficeMockMvc.perform(put("/api/post-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPostOffice)))
            .andExpect(status().isOk());

        // Validate the PostOffice in the database
        List<PostOffice> postOfficeList = postOfficeRepository.findAll();
        assertThat(postOfficeList).hasSize(databaseSizeBeforeUpdate);
        PostOffice testPostOffice = postOfficeList.get(postOfficeList.size() - 1);
        assertThat(testPostOffice.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPostOffice() throws Exception {
        int databaseSizeBeforeUpdate = postOfficeRepository.findAll().size();

        // Create the PostOffice

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPostOfficeMockMvc.perform(put("/api/post-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postOffice)))
            .andExpect(status().isCreated());

        // Validate the PostOffice in the database
        List<PostOffice> postOfficeList = postOfficeRepository.findAll();
        assertThat(postOfficeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePostOffice() throws Exception {
        // Initialize the database
        postOfficeRepository.saveAndFlush(postOffice);
        int databaseSizeBeforeDelete = postOfficeRepository.findAll().size();

        // Get the postOffice
        restPostOfficeMockMvc.perform(delete("/api/post-offices/{id}", postOffice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PostOffice> postOfficeList = postOfficeRepository.findAll();
        assertThat(postOfficeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PostOffice.class);
        PostOffice postOffice1 = new PostOffice();
        postOffice1.setId(1L);
        PostOffice postOffice2 = new PostOffice();
        postOffice2.setId(postOffice1.getId());
        assertThat(postOffice1).isEqualTo(postOffice2);
        postOffice2.setId(2L);
        assertThat(postOffice1).isNotEqualTo(postOffice2);
        postOffice1.setId(null);
        assertThat(postOffice1).isNotEqualTo(postOffice2);
    }
}
