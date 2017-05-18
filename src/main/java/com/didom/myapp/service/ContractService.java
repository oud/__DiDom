package com.didom.myapp.service;

import com.didom.myapp.domain.Contract;
import com.didom.myapp.repository.ContractRepository;
import com.didom.myapp.repository.search.ContractSearchRepository;
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
 * Service Implementation for managing Contract.
 */
@Service
@Transactional
public class ContractService {

    private final Logger log = LoggerFactory.getLogger(ContractService.class);
    
    private final ContractRepository contractRepository;

    private final ContractSearchRepository contractSearchRepository;

    public ContractService(ContractRepository contractRepository, ContractSearchRepository contractSearchRepository) {
        this.contractRepository = contractRepository;
        this.contractSearchRepository = contractSearchRepository;
    }

    /**
     * Save a contract.
     *
     * @param contract the entity to save
     * @return the persisted entity
     */
    public Contract save(Contract contract) {
        log.debug("Request to save Contract : {}", contract);
        Contract result = contractRepository.save(contract);
        contractSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the contracts.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Contract> findAll(Pageable pageable) {
        log.debug("Request to get all Contracts");
        Page<Contract> result = contractRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one contract by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Contract findOne(Long id) {
        log.debug("Request to get Contract : {}", id);
        Contract contract = contractRepository.findOne(id);
        return contract;
    }

    /**
     *  Delete the  contract by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Contract : {}", id);
        contractRepository.delete(id);
        contractSearchRepository.delete(id);
    }

    /**
     * Search for the contract corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Contract> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Contracts for query {}", query);
        Page<Contract> result = contractSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
