package com.didom.myapp.repository.search;

import com.didom.myapp.domain.Freelancer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Freelancer entity.
 */
public interface FreelancerSearchRepository extends ElasticsearchRepository<Freelancer, Long> {
}
