package com.didom.myapp.repository;

import com.didom.myapp.domain.Attachment;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Attachment entity.
 */
@SuppressWarnings("unused")
public interface AttachmentRepository extends JpaRepository<Attachment,Long> {

}
