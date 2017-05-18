package com.didom.myapp.web.rest;

import com.didom.myapp.DiDomApp;

import com.didom.myapp.domain.Freelancer;
import com.didom.myapp.repository.FreelancerRepository;
import com.didom.myapp.service.FreelancerService;
import com.didom.myapp.repository.search.FreelancerSearchRepository;
import com.didom.myapp.web.rest.errors.ExceptionTranslator;

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
 * Test class for the FreelancerResource REST controller.
 *
 * @see FreelancerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DiDomApp.class)
public class FreelancerResourceIntTest {

    private static final String DEFAULT_OVERIEW = "AAAAAAAAAA";
    private static final String UPDATED_OVERIEW = "BBBBBBBBBB";

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private FreelancerService freelancerService;

    @Autowired
    private FreelancerSearchRepository freelancerSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFreelancerMockMvc;

    private Freelancer freelancer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        FreelancerResource freelancerResource = new FreelancerResource(freelancerService);
        this.restFreelancerMockMvc = MockMvcBuilders.standaloneSetup(freelancerResource)
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
    public static Freelancer createEntity(EntityManager em) {
        Freelancer freelancer = new Freelancer()
            .overiew(DEFAULT_OVERIEW);
        return freelancer;
    }

    @Before
    public void initTest() {
        freelancerSearchRepository.deleteAll();
        freelancer = createEntity(em);
    }

    @Test
    @Transactional
    public void createFreelancer() throws Exception {
        int databaseSizeBeforeCreate = freelancerRepository.findAll().size();

        // Create the Freelancer
        restFreelancerMockMvc.perform(post("/api/freelancers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelancer)))
            .andExpect(status().isCreated());

        // Validate the Freelancer in the database
        List<Freelancer> freelancerList = freelancerRepository.findAll();
        assertThat(freelancerList).hasSize(databaseSizeBeforeCreate + 1);
        Freelancer testFreelancer = freelancerList.get(freelancerList.size() - 1);
        assertThat(testFreelancer.getOveriew()).isEqualTo(DEFAULT_OVERIEW);

        // Validate the Freelancer in Elasticsearch
        Freelancer freelancerEs = freelancerSearchRepository.findOne(testFreelancer.getId());
        assertThat(freelancerEs).isEqualToComparingFieldByField(testFreelancer);
    }

    @Test
    @Transactional
    public void createFreelancerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = freelancerRepository.findAll().size();

        // Create the Freelancer with an existing ID
        freelancer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFreelancerMockMvc.perform(post("/api/freelancers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelancer)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Freelancer> freelancerList = freelancerRepository.findAll();
        assertThat(freelancerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFreelancers() throws Exception {
        // Initialize the database
        freelancerRepository.saveAndFlush(freelancer);

        // Get all the freelancerList
        restFreelancerMockMvc.perform(get("/api/freelancers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(freelancer.getId().intValue())))
            .andExpect(jsonPath("$.[*].overiew").value(hasItem(DEFAULT_OVERIEW.toString())));
    }

    @Test
    @Transactional
    public void getFreelancer() throws Exception {
        // Initialize the database
        freelancerRepository.saveAndFlush(freelancer);

        // Get the freelancer
        restFreelancerMockMvc.perform(get("/api/freelancers/{id}", freelancer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(freelancer.getId().intValue()))
            .andExpect(jsonPath("$.overiew").value(DEFAULT_OVERIEW.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFreelancer() throws Exception {
        // Get the freelancer
        restFreelancerMockMvc.perform(get("/api/freelancers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFreelancer() throws Exception {
        // Initialize the database
        freelancerService.save(freelancer);

        int databaseSizeBeforeUpdate = freelancerRepository.findAll().size();

        // Update the freelancer
        Freelancer updatedFreelancer = freelancerRepository.findOne(freelancer.getId());
        updatedFreelancer
            .overiew(UPDATED_OVERIEW);

        restFreelancerMockMvc.perform(put("/api/freelancers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFreelancer)))
            .andExpect(status().isOk());

        // Validate the Freelancer in the database
        List<Freelancer> freelancerList = freelancerRepository.findAll();
        assertThat(freelancerList).hasSize(databaseSizeBeforeUpdate);
        Freelancer testFreelancer = freelancerList.get(freelancerList.size() - 1);
        assertThat(testFreelancer.getOveriew()).isEqualTo(UPDATED_OVERIEW);

        // Validate the Freelancer in Elasticsearch
        Freelancer freelancerEs = freelancerSearchRepository.findOne(testFreelancer.getId());
        assertThat(freelancerEs).isEqualToComparingFieldByField(testFreelancer);
    }

    @Test
    @Transactional
    public void updateNonExistingFreelancer() throws Exception {
        int databaseSizeBeforeUpdate = freelancerRepository.findAll().size();

        // Create the Freelancer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFreelancerMockMvc.perform(put("/api/freelancers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelancer)))
            .andExpect(status().isCreated());

        // Validate the Freelancer in the database
        List<Freelancer> freelancerList = freelancerRepository.findAll();
        assertThat(freelancerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFreelancer() throws Exception {
        // Initialize the database
        freelancerService.save(freelancer);

        int databaseSizeBeforeDelete = freelancerRepository.findAll().size();

        // Get the freelancer
        restFreelancerMockMvc.perform(delete("/api/freelancers/{id}", freelancer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean freelancerExistsInEs = freelancerSearchRepository.exists(freelancer.getId());
        assertThat(freelancerExistsInEs).isFalse();

        // Validate the database is empty
        List<Freelancer> freelancerList = freelancerRepository.findAll();
        assertThat(freelancerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFreelancer() throws Exception {
        // Initialize the database
        freelancerService.save(freelancer);

        // Search the freelancer
        restFreelancerMockMvc.perform(get("/api/_search/freelancers?query=id:" + freelancer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(freelancer.getId().intValue())))
            .andExpect(jsonPath("$.[*].overiew").value(hasItem(DEFAULT_OVERIEW.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Freelancer.class);
    }
}
