package com.CSIT321.DeliverYey.Service;

import com.CSIT321.DeliverYey.Entity.DeliveryEntity;
import com.CSIT321.DeliverYey.Repository.DeliveryRepository;
import com.CSIT321.DeliverYey.Repository.StudentRepository;
import com.CSIT321.DeliverYey.Entity.StudentEntity;
import com.CSIT321.DeliverYey.Entity.UserType;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DeliveryService {

    // Logger for the service class
    private static final Logger logger = LoggerFactory.getLogger(DeliveryService.class);

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private StudentRepository studentRepository;

    public DeliveryEntity insertDelivery(DeliveryEntity delivery) {
        try {
            // Save the delivery
            deliveryRepository.save(delivery);
            return delivery;
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // Return null or handle the error appropriately
            return null;
        }
    }

    public List<DeliveryEntity> getAllDelivery() {
        return deliveryRepository.findAll();
    }

    public DeliveryEntity updateDelivery(Long deliveryId, DeliveryEntity newDeliveryDetails) {
        DeliveryEntity delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new NoSuchElementException("Delivery with ID " + deliveryId + " not found."));

        delivery.setPhoneNumber(newDeliveryDetails.getPhoneNumber());
        delivery.setLocation(newDeliveryDetails.getLocation());
        delivery.setPaymentMethod(newDeliveryDetails.getPaymentMethod());
        delivery.setNotes(newDeliveryDetails.getNotes());

        return deliveryRepository.save(delivery);
    }

    public String deleteDelivery(Long deliveryId) {
        if (deliveryRepository.existsById(deliveryId)) {
            deliveryRepository.deleteById(deliveryId);
            return "Delivery with ID " + deliveryId + " has been deleted.";
        } else {
            throw new NoSuchElementException("Delivery with ID " + deliveryId + " not found.");
        }
    }
}
