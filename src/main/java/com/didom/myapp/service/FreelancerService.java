package com.didom.myapp.service;

import com.didom.myapp.domain.Freelancer;
import com.didom.myapp.repository.FreelancerRepository;
import com.didom.myapp.repository.search.FreelancerSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Freelancer.
 */
@Service
@Transactional
public class FreelancerService {

    private final Logger log = LoggerFactory.getLogger(FreelancerService.class);
    
    private final FreelancerRepository freelancerRepository;

    private final FreelancerSearchRepository freelancerSearchRepository;

    public FreelancerService(FreelancerRepository freelancerRepository, FreelancerSearchRepository freelancerSearchRepository) {
        this.freelancerRepository = freelancerRepository;
        this.freelancerSearchRepository = freelancerSearchRepository;
    }

    /**
     * Save a freelancer.
     *
     * @param freelancer the entity to save
     * @return the persisted entity
     */
    public Freelancer save(Freelancer freelancer) {
        log.debug("Request to save Freelancer : {}", freelancer);
        Freelancer result = freelancerRepository.save(freelancer);
        freelancerSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the freelancers.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Freelancer> findAll(Pageable pageable) {
        log.debug("Request to get all Freelancers");
        Page<Freelancer> result = freelancerRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one freelancer by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Freelancer findOne(Long id) {
        log.debug("Request to get Freelancer : {}", id);
        Freelancer freelancer = freelancerRepository.findOneWithEagerRelationships(id);
        return freelancer;
    }

    /**
     *  Delete the  freelancer by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Freelancer : {}", id);
        freelancerRepository.delete(id);
        freelancerSearchRepository.delete(id);
    }

    /**
     * Search for the freelancer corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Freelancer> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Freelancers for query {}", query);
        Page<Freelancer> result = freelancerSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
