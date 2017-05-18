package com.didom.myapp.repository.search;

import com.didom.myapp.domain.Contract;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contract entity.
 */
public interface ContractSearchRepository extends ElasticsearchRepository<Contract, Long> {
}
