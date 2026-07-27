package com.freshm.pvtapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshm.pvtapp.entity.LetterHead;

@Repository
public interface LetterHeadRepository extends JpaRepository<LetterHead, Long> {

}