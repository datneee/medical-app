package com.medical.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "orders")
public class Order implements Serializable {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "user_Id",nullable = false)
    private User user;


    @Column(name = "amount")
    private Integer amount;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;

}
