package com.app.springbootlearn.repo;

import com.app.springbootlearn.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobRepo extends JpaRepository<JobPost, Integer> {

    @Query(
            value = """
                    SELECT * FROM job_post j
                    WHERE LOWER(j.post_profile) LIKE LOWER(CONCAT('%', :keyword, '%'))
                       OR LOWER(j.post_desc) LIKE LOWER(CONCAT('%', :keyword, '%'))
                       OR CAST(j.req_experience AS TEXT) LIKE CONCAT('%', :keyword, '%')
                       OR EXISTS (
                           SELECT 1
                           FROM unnest(j.post_tech_stack) AS tech
                           WHERE LOWER(tech) LIKE LOWER(CONCAT('%', :keyword, '%'))
                       )
                    """,
            nativeQuery = true
    )
    List<JobPost> searchAllFields(String keyword);


}
