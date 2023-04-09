package com.medical.dto;

import com.medical.entity.Brand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Integer id;
    private String title;

    private String descriptions;

    private Integer originalPrice;

    private Integer promotionPrice;

    private Integer amount;
    private Brand brand;
    private CategoryDTO category;

    private List<ProductImagesDTO> productImages;

    @Data
    @NoArgsConstructor
    public static class CategoryDTO extends RepresentationModel<CategoryDTO> {
        private Integer id;
        private String name;
    }
    @Data
    @NoArgsConstructor
    static class ProductImagesDTO{
        private String imageUrl;
    }
}

