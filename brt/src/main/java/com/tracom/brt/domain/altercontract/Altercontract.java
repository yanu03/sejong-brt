package com.tracom.brt.domain.altercontract;


import com.chequer.axboot.core.annotations.ColumnPosition;
import com.tracom.brt.domain.SimpleJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.math.BigDecimal;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "BM_CON_ALT_INFO")
@Comment(value = "계약변경정보")
@IdClass(Altercontract.AltercontractId.class)
@Alias("altercontract")
public class Altercontract extends SimpleJpaModel<Altercontract.AltercontractId> {

	@Id
	@Column(name = "CON_ID", length = 7, nullable = false)
	@Comment(value = "계약ID")
	private String conId;

	@Id
	@Column(name = "SEQ", precision = 10, nullable = false)
	@Comment(value = "순번")
	private Integer seq;

	@Column(name = "ALT_DIV", length = 5)
	@Comment(value = "변경구분")
	private String altDiv;

	@Column(name = "ALT_CON_DATE")
	@Comment(value = "변경계약일")
	private LocalDate altConDate;

	@Column(name = "CON_ST_DATE")
	@Comment(value = "계약시작일")
	private LocalDate conStDate;

	@Column(name = "CON_ED_DATE")
	@Comment(value = "계약종료일")
	private LocalDate conEdDate;

	@Column(name = "SUPP_AMT", precision = 11, scale = 0)
	@Comment(value = "공급가액")
	private BigDecimal suppAmt;

	@Column(name = "VAT_AMT", precision = 11, scale = 0)
	@Comment(value = "부가세")
	private BigDecimal vatAmt;

	@Column(name = "REMARK", length = 200)
	@Comment(value = "비고")
	private String remark;

	@Column(name = "CONFIRM_YN", length = 1)
	@Comment(value = "확정여부")
	private String confirmYn;

	@Column(name = "CON_NO", length = 50)
	@Comment(value = "계약번호")
	private String conNo;


@Override
public AltercontractId getId() {
return AltercontractId.of(conId, seq);
}

@Embeddable
@Data
@NoArgsConstructor
@RequiredArgsConstructor(staticName = "of")
public static class AltercontractId implements Serializable {

		@NonNull
		private String conId;

		@NonNull
		private Integer seq;

}
}