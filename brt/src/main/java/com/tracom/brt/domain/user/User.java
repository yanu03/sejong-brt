package com.tracom.brt.domain.user;

import java.time.Instant;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.code.Types;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.tracom.brt.domain.BaseJpaModel;
import com.tracom.brt.domain.user.auth.UserAuth;
import com.tracom.brt.domain.user.role.UserRole;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "USER_M")
@Alias("user")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userCd")
public class User extends BaseJpaModel<String> {

    @Id
    @Column(name = "USER_CD", length = 100, nullable = false)
    @Comment(value = "사용자코드")
    private String userCd;

    @Column(name = "USER_NM", length = 30, nullable = false)
    @Comment(value = "사용자명")
    private String userNm;

    @Column(name = "USER_PS", length = 128, nullable = false)
    @Comment(value = "비밀번호")
    private String userPs;
    
    @Column(name = "SCD_PS", length = 128)
    @Comment(value = "2차비밀번호")
    private String scdPs;
    
    @Column(name = "EMAIL", length = 50)
    @Comment(value = "이메일")
    private String email;

    @Column(name = "HP_NO", length = 15)
    @Comment(value = "휴대폰")
    private String hpNo;

    @Column(name = "REMARK", length = 200)
    @Comment(value = "비고")
    private String remark;

    @Column(name = "LAST_LOGIN_DATE")
    @Comment(value = "마지막로그인일시")
    private Instant lastLoginDate;

    @Column(name = "PASSWORD_UPDATE_DATE")
    @Comment(value = "비밀번호변경일시")
    private Instant passwordUpdateDate;
    
    @Column(name = "SCD_PS_UPDATE_DATE")
    @Comment(value = "2차비밀번호 변경일시")
    private Instant scdPsUpdateDate;

    @Column(name = "USER_STATUS", length = 10)
    @Comment(value = "사용자 상태")
    @Type(type = "labelEnum")
    private Types.UserStatus userStatus = Types.UserStatus.NORMAL;

    @Column(name = "IP", length = 100)
    @Comment(value = "IP")
    private String ip;

    @Column(name = "LOCALE", length = 10)
    @Comment(value = "Locale")
    private String locale = "ko_KR";

    @Column(name = "MENU_GRP_CD", length = 100)
    @Comment(value = "메뉴그룹코드")
    private String menuGrpCd;
    
    @Column(name = "SCD_PS_USE_YN", length = 1)
    @Comment(value = "2차비밀번호")
    private AXBootTypes.Used scdPsUseYn = AXBootTypes.Used.NO;

    @Column(name = "USE_YN", length = 1, nullable = false)
    @Comment(value = "사용여부")
    @Type(type = "labelEnum")
    private AXBootTypes.Used useYn = AXBootTypes.Used.YES;

    @Column(name = "DEL_YN", length = 1)
    @Comment(value = "삭제여부")
    @Type(type = "labelEnum")
    private AXBootTypes.Deleted delYn = AXBootTypes.Deleted.NO;

    @Transient
    private List<UserRole> roleList;

    @Transient
    private List<UserAuth> authList;

    @Override
    public String getId() {
        return userCd;
    }
}
