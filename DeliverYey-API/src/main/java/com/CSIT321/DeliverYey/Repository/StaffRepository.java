package com.CSIT321.DeliverYey.Repository;

import com.CSIT321.DeliverYey.Entity.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<StaffEntity, Integer> {
}
