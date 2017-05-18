package com.didom.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.didom.myapp.domain.Freelancer;
import com.didom.myapp.service.FreelancerService;
import com.didom.myapp.web.rest.util.HeaderUtil;
import com.didom.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Freelancer.
 */
@RestController
@RequestMapping("/api")
public class FreelancerResource {

    private final Logger log = LoggerFactory.getLogger(FreelancerResource.class);

    private static final String ENTITY_NAME = "freelancer";
        
    private final FreelancerService freelancerService;

    public FreelancerResource(FreelancerService freelancerService) {
        this.freelancerService = freelancerService;
    }

    /**
     * POST  /freelancers : Create a new freelancer.
     *
     * @param freelancer the freelancer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new freelancer, or with status 400 (Bad Request) if the freelancer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/freelancers")
    @Timed
    public ResponseEntity<Freelancer> createFreelancer(@RequestBody Freelancer freelancer) throws URISyntaxException {
        log.debug("REST request to save Freelancer : {}", freelancer);
        if (freelancer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new freelancer cannot already have an ID")).body(null);
        }
        Freelancer result = freelancerService.save(freelancer);
        return ResponseEntity.created(new URI("/api/freelancers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /freelancers : Updates an existing freelancer.
     *
     * @param freelancer the freelancer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated freelancer,
     * or with status 400 (Bad Request) if the freelancer is not valid,
     * or with status 500 (Internal Server Error) if the freelancer couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/freelancers")
    @Timed
    public ResponseEntity<Freelancer> updateFreelancer(@RequestBody Freelancer freelancer) throws URISyntaxException {
        log.debug("REST request to update Freelancer : {}", freelancer);
        if (freelancer.getId() == null) {
            return createFreelancer(freelancer);
        }
        Freelancer result = freelancerService.save(freelancer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, freelancer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /freelancers : get all the freelancers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of freelancers in body
     */
    @GetMapping("/freelancers")
    @Timed
    public ResponseEntity<List<Freelancer>> getAllFreelancers(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Freelancers");
        Page<Freelancer> page = freelancerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/freelancers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /freelancers/:id : get the "id" freelancer.
     *
     * @param id the id of the freelancer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the freelancer, or with status 404 (Not Found)
     */
    @GetMapping("/freelancers/{id}")
    @Timed
    public ResponseEntity<Freelancer> getFreelancer(@PathVariable Long id) {
        log.debug("REST request to get Freelancer : {}", id);
        Freelancer freelancer = freelancerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(freelancer));
    }

    /**
     * DELETE  /freelancers/:id : delete the "id" freelancer.
     *
     * @param id the id of the freelancer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/freelancers/{id}")
    @Timed
    public ResponseEntity<Void> deleteFreelancer(@PathVariable Long id) {
        log.debug("REST request to delete Freelancer : {}", id);
        freelancerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/freelancers?query=:query : search for the freelancer corresponding
     * to the query.
     *
     * @param query the query of the freelancer search 
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/freelancers")
    @Timed
    public ResponseEntity<List<Freelancer>> searchFreelancers(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Freelancers for query {}", query);
        Page<Freelancer> page = freelancerService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/freelancers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
