package com.medical.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.medical.constants.StatusOrderItem;
//import com.smartphoneshop.constants.StatusOrderItemConvert;
import com.medical.constants.StatusOrderItemConvert;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orderItems")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "created_Date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createdDate;

    @Column(name = "received_Date",columnDefinition = "null")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date receivedDate;


    @Column(name = "amount" ,  nullable = false)
    private Integer amount;


    @Column(name = "`status`",columnDefinition = "Processing")
    @Convert(converter = StatusOrderItemConvert.class)
    private StatusOrderItem status;


    @ManyToOne
    @JoinColumn(name = "order_Id")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_Id")
    @JsonManagedReference
    private Product product;


    @PrePersist
    public void PrePersist(){
        if(this.status == null)
            this.status = StatusOrderItem.Processing;
    }

    public OrderItem(Integer amount, Order order, Product product) {
        this.amount = amount;
        this.order = order;
        this.product = product;
    }
}
