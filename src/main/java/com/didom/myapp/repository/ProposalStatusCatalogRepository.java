package com.didom.myapp.repository;

import com.didom.myapp.domain.ProposalStatusCatalog;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ProposalStatusCatalog entity.
 */
@SuppressWarnings("unused")
public interface ProposalStatusCatalogRepository extends JpaRepository<ProposalStatusCatalog,Long> {

}
