package com.didom.myapp.repository;

import com.didom.myapp.domain.Freelancer;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Freelancer entity.
 */
@SuppressWarnings("unused")
public interface FreelancerRepository extends JpaRepository<Freelancer,Long> {

    @Query("select distinct freelancer from Freelancer freelancer left join fetch freelancer.skills")
    List<Freelancer> findAllWithEagerRelationships();

    @Query("select freelancer from Freelancer freelancer left join fetch freelancer.skills where freelancer.id =:id")
    Freelancer findOneWithEagerRelationships(@Param("id") Long id);

}
