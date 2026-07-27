package com.freshm.pvtapp.repository;

import com.freshm.pvtapp.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    /*
     * FIX: LEFT JOIN FETCH (was JOIN FETCH).
     * An inner JOIN FETCH excluded users with no company — i.e. the
     * SUPER_ADMIN — so that account couldn't even authenticate.
     * LEFT JOIN FETCH loads the company eagerly when present and still
     * returns company-less users, and because the company is fetched in
     * the same query there's no LazyInitializationException later.
     */
    @Query("""
            SELECT u
            FROM User u
            LEFT JOIN FETCH u.company
            WHERE u.email = :email
            """)
    Optional<User> findByEmailWithCompany(@Param("email") String email);

    boolean existsByEmail(String email);

    List<User> findByCompanyId(Long companyId);

    Optional<User> findByIdAndCompanyId(
            Long id,
            Long companyId
    );
}
