package com.tracom.brt.domain.prdt;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.tracom.brt.domain.SimpleJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "PRDT_BASE")
@Comment(value = "")
@Alias("product")
public class Product extends SimpleJpaModel<String> {

	@Id
	@Column(name = "prdt_cd", length = 50, nullable = false)
	@NotNull(message = "제품코드를 입력하세요")
	@Comment(value = "제품코드")
	private String prdtCd;

	@Column(name = "prdt_nm", length = 50, nullable = false)
	@Comment(value = "제품명")
	private String prdtNm;

	@Column(name = "origin", length = 50, nullable = false)
	@Comment(value = "원산지")
	private String origin;

	@Column(name = "purchase_price", precision = 10, nullable = false)
	@Comment(value = "매입가격")
	private Integer purchasePrice;

	@Column(name = "sales_price", precision = 10, nullable = false)
	@Comment(value = "판매가격")
	private Integer salesPrice;


    @Override
    public String getId() {
        return prdtCd;
    }
}