package com.tracom.brt.domain.BM0101;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.chequer.axboot.core.annotations.Comment;
import com.tracom.brt.domain.BaseJpaModel;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "BM_CORP_INFO")
@Comment(value = "운수사정보")
@Alias("corporation")
public class CorpInfoVo extends BaseJpaModel<String> {
	@Id
	@Column(name = "CORP_ID", length = 7, nullable = false)
	@Comment(value = "운수사ID")
	private String corpId;

	@Column(name = "CORP_NM", length = 20, nullable = false)
	@Comment(value = "운수사명")
	private String corpNm;

	@Column(name = "CORP_NO", length = 10)
	@Comment(value = "사업자등록번호")
	private String corpNo;

	@Column(name = "EMAIL", length = 50)
	@Comment(value = "이메일")
	private String email;

	@Column(name = "PHONE", length = 11)
	@Comment(value = "전화번호")
	private String phone;

	@Column(name = "FAX", length = 11)
	@Comment(value = "팩스")
	private String fax;

	@Column(name = "ADDR1", length = 50)
	@Comment(value = "소재지")
	private String addr1;

	@Column(name = "ZIP_NO", length = 6)
	@Comment(value = "우편번호")
	private String zipNo;

	@Column(name = "ADDR2", length = 50)
	@Comment(value = "우편물수령지")
	private String addr2;

	@Column(name = "GARAGE", length = 50)
	@Comment(value = "차고지")
	private String garage;

	@Column(name = "REMARK", length = 200)
	@Comment(value = "비고")
	private String remark;

	@Override
	public String getId() {
		return corpId;
	}
}