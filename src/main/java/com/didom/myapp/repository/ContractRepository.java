package com.didom.myapp.repository;

import com.didom.myapp.domain.Contract;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Contract entity.
 */
@SuppressWarnings("unused")
public interface ContractRepository extends JpaRepository<Contract,Long> {

}
