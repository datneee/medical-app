package com.medical.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.medical.constants.IsHotProductEnum;
import com.medical.constants.StatusCodeProductEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "products")
public class Product implements Serializable {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`title`",length = 255,nullable = false)
    private String title;

    @Column(name = "`descriptions`",length = 1000,nullable = false)
    private String descriptions;

    @Column(name = "originalPrice",nullable = false)
    private Integer originalPrice;

    @Column(name = "promotionPrice",nullable = false)
    private Integer promotionPrice;

    @Column(name = "`created_Date`")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdDate;
    @Column(name = "currentAmount",nullable = false)
    private Integer currentAmount;
    @Column(name = "amount",nullable = false)
    private Integer amount;

    @Column(name = "`isHot`", columnDefinition = "0")
    private IsHotProductEnum isHot;
    @Column(name = "`status`" , columnDefinition = "1")
    private StatusCodeProductEnum status;

    public Product(String title, String descriptions, int originalPrice, int promotionPrice,Integer currentAmount, Integer amount) {
        this.title = title;
        this.descriptions = descriptions;
        this.originalPrice = originalPrice;
        this.promotionPrice = promotionPrice;
        this.currentAmount = currentAmount;
        this.amount = amount;
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "categoryId",nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product")
    @Cascade(value = {org.hibernate.annotations.CascadeType.REMOVE, org.hibernate.annotations.CascadeType.SAVE_UPDATE})
    private List<ProductImages> productImages;

    @OneToMany(mappedBy = "product")
    @Cascade(value = {org.hibernate.annotations.CascadeType.REMOVE, org.hibernate.annotations.CascadeType.SAVE_UPDATE})
    private List<Rating> productRatesList;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @Cascade(value = {org.hibernate.annotations.CascadeType.REMOVE, org.hibernate.annotations.CascadeType.SAVE_UPDATE})
    private List<CartItem> cartItemList;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @Cascade(value = {org.hibernate.annotations.CascadeType.REMOVE, org.hibernate.annotations.CascadeType.SAVE_UPDATE})
    private List<OrderItem> orderItems;

    @PrePersist
    public void PrePersist(){
        if(this.status == null)
            this.status = StatusCodeProductEnum.OPENING;
        if(this.promotionPrice == null)
            this.promotionPrice = originalPrice;
    }

}
