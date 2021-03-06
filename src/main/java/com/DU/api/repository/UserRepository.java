package com.DU.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

import com.DU.api.model.User;
import com.DU.api.model.staff;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(String userId);

    @Query("SELECT u FROM User u WHERE u.email=?1")
    User findByEmailAddress(String emailAddress);

    @Query("SELECT status FROM User u WHERE u.email=?1")
    Integer findstatusbyemail(String emailAddress);

    @Query("SELECT COUNT(u) FROM User u WHERE u.email=?1")
    long getCountByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.status = ?1 where u.email = ?2")
    void setStatusForUser(Integer status, String email);

    // @Query("SELECT u FROM User u WHERE u.user_Id=?1")
    // User findByUserId(Integer userId);
}
