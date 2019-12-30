package com.tracom.brt.domain.BM0301;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.tracom.brt.domain.SimpleJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "BM_CON_INFO")
@Comment(value = "계약신규정보")
@Alias("contract")
public class Contract extends SimpleJpaModel<String> {

	@Id
	@Column(name = "CON_ID", length = 7, nullable = false)
	@Comment(value = "계약ID")
	private String conId;

	@Column(name = "CON_NM", length = 50)
	@Comment(value = "계약명")
	private String conNm;

	@Column(name = "CONT_FST_DATE")
	@Comment(value = "최초계약일")
	private LocalDate contFstDate;

	@Column(name = "CON_ST_DATE")
	@Comment(value = "계약시작일")
	private LocalDate conStDate;

	@Column(name = "CON_ED_DATE")
	@Comment(value = "계약종료일")
	private LocalDate conEdDate;

	@Column(name = "CONFIRM_YN", length = 1)
	@Comment(value = "확정여부")
	private String confirmYn;

	@Column(name = "SUPP_AMT", precision = 11, scale = 0)
	@Comment(value = "공급가액")
	private BigDecimal suppAmt;

	@Column(name = "VAT_AMT", precision = 11, scale = 0)
	@Comment(value = "부가세")
	private BigDecimal vatAmt;

	@Column(name = "CUST_ID", length = 7)
	@Comment(value = "거래처ID")
	private String custId;

	@Column(name = "REMARK", length = 200)
	@Comment(value = "비고")
	private String remark;

	@Column(name = "CON_NO", length = 50)
	@Comment(value = "계약번호")
	private String conNo;


    @Override
    public String getId() {
        return conId;
    }
}