package com.tracom.brt.domain.user.auth.menu;

import com.tracom.brt.domain.BaseJpaModel;
import com.tracom.brt.domain.program.Program;
import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import com.chequer.axboot.core.code.AXBootTypes;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "AUTH_GROUP_MAP_M")
@Comment(value = "권한그룹 맵")
@IdClass(AuthGroupMenu.AuthGroupMenuId.class)
public class AuthGroupMenu extends BaseJpaModel<AuthGroupMenu.AuthGroupMenuId> {

    @Id
    @Column(name = "GRP_AUTH_CD", length = 100, nullable = false)
    @Comment(value = "권한그룹코드")
    @ColumnPosition(1)
    private String grpAuthCd;

    @Id
    @Column(name = "MENU_ID", length = 50, nullable = false)
    @Comment(value = "메뉴 ID")
    @ColumnPosition(2)
    private Long menuId;

    @Column(name = "SCH_AH", length = 1)
    @Comment(value = "조회권한")
    @ColumnPosition(3)
    private String schAh = AXBootTypes.Used.NO.getLabel();

    @Column(name = "SAV_AH", length = 1)
    @Comment(value = "저장권한")
    @ColumnPosition(4)
    private String savAh = AXBootTypes.Used.NO.getLabel();

    @Column(name = "GEX_AH", length = 1)
    @Comment(value = "엑셀폼다운권한")
    @ColumnPosition(5)
    private String gexAh = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "EXL_AH", length = 1)
    @Comment(value = "엑셀권한")
    @ColumnPosition(6)
    private String exlAh = AXBootTypes.Used.NO.getLabel();

    @Column(name = "IEX_AH", length = 1)
    @Comment(value = "엑셀입력권한")
    @ColumnPosition(7)
    private String iexAh = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "DEL_AH", length = 1)
    @Comment(value = "삭제권한")
    @ColumnPosition(8)
    private String delAh = AXBootTypes.Used.NO.getLabel();

    @Column(name = "FN1_AH", length = 1)
    @Comment(value = "기능키1권한")
    @ColumnPosition(9)
    private String fn1Ah = AXBootTypes.Used.NO.getLabel();

    @Column(name = "FN2_AH", length = 1)
    @Comment(value = "기능키2권한")
    @ColumnPosition(10)
    private String fn2Ah = AXBootTypes.Used.NO.getLabel();

    @Column(name = "FN3_AH", length = 1)
    @Comment(value = "기능키3권한")
    @ColumnPosition(11)
    private String fn3Ah = AXBootTypes.Used.NO.getLabel();

    @Column(name = "FN4_AH", length = 1)
    @Comment(value = "기능키4권한")
    @ColumnPosition(12)
    private String fn4Ah = AXBootTypes.Used.NO.getLabel();

    @Column(name = "FN5_AH", length = 1)
    @Comment(value = "기능키5권한")
    @ColumnPosition(13)
    private String fn5Ah = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "FN6_AH", length = 1)
    @Comment(value = "기능키6권한")
    @ColumnPosition(14)
    private String fn6Ah = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "FN7_AH", length = 1)
    @Comment(value = "기능키7권한")
    @ColumnPosition(15)
    private String fn7Ah = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "HELP_AH", length = 1)
    @Comment(value = "도움말권한")
    @ColumnPosition(16)
    private String helpAh = AXBootTypes.Used.NO.getLabel();
    
    @Column(name = "SWP_AH", length = 1)
    @Comment(value = "정류장정리권한")
    @ColumnPosition(17)
    private String swpAh = AXBootTypes.Used.NO.getLabel();

    
    @Transient
    private AXBootTypes.Used useYn;

    public void updateAuthorization(AuthGroupMenu authGroupMenu) {
        this.schAh = positive(this.schAh, authGroupMenu.getSchAh());
        this.savAh = positive(this.savAh, authGroupMenu.getSavAh());
        this.gexAh = positive(this.gexAh, authGroupMenu.getGexAh());
        this.exlAh = positive(this.exlAh, authGroupMenu.getExlAh());
        this.iexAh = positive(this.iexAh, authGroupMenu.getIexAh());
        this.delAh = positive(this.delAh, authGroupMenu.getDelAh());
        this.fn1Ah = positive(this.fn1Ah, authGroupMenu.getFn1Ah());
        this.fn2Ah = positive(this.fn2Ah, authGroupMenu.getFn2Ah());
        this.fn3Ah = positive(this.fn3Ah, authGroupMenu.getFn3Ah());
        this.fn4Ah = positive(this.fn4Ah, authGroupMenu.getFn4Ah());
        this.fn5Ah = positive(this.fn5Ah, authGroupMenu.getFn5Ah());
        this.fn6Ah = positive(this.fn6Ah, authGroupMenu.getFn6Ah());
        this.fn7Ah = positive(this.fn7Ah, authGroupMenu.getFn7Ah());
        this.helpAh = positive(this.helpAh, authGroupMenu.getHelpAh());
        this.swpAh = positive(this.swpAh, authGroupMenu.getSwpAh());
    }

    public void updateAuthorization(Program program) {
        this.schAh = negative(this.schAh, program.getSchAh());
        this.savAh = negative(this.savAh, program.getSavAh());
        this.gexAh = negative(this.gexAh, program.getGexAh());
        this.exlAh = negative(this.exlAh, program.getExlAh());
        this.iexAh = negative(this.iexAh, program.getIexAh());
        this.delAh = negative(this.delAh, program.getDelAh());
        this.fn1Ah = negative(this.fn1Ah, program.getFn1Ah());
        this.fn2Ah = negative(this.fn2Ah, program.getFn2Ah());
        this.fn3Ah = negative(this.fn3Ah, program.getFn3Ah());
        this.fn4Ah = negative(this.fn4Ah, program.getFn4Ah());
        this.fn5Ah = negative(this.fn5Ah, program.getFn5Ah());
        this.fn6Ah = negative(this.fn6Ah, program.getFn6Ah());
        this.fn7Ah = negative(this.fn7Ah, program.getFn7Ah());
        this.helpAh = negative(this.helpAh, program.getHelpAh());
        this.swpAh = negative(this.swpAh, program.getSwpAh());
    }

    public String positive(String originValue, String newValue) {
        if (originValue != null && originValue.equals("Y"))
            return originValue;

        if (newValue != null && newValue.equals("Y"))
            return newValue;

        return "N";
    }

    public String negative(String originValue, String newValue) {
        if (originValue != null && originValue.equals("Y"))
            return newValue;

        return "N";
    }

    @Override
    public AuthGroupMenuId getId() {
        return AuthGroupMenuId.of(grpAuthCd, menuId);
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @RequiredArgsConstructor(staticName = "of")
    public static class AuthGroupMenuId implements Serializable {

        @NonNull
        private String grpAuthCd;

        @NonNull
        private Long menuId;
    }

    public static AuthGroupMenu of(
    		String grpAuthCd, 
    		Long menuId, 
    		String schAh, 
    		String savAh, 
    		String gexAh, 
    		String exlAh, 
    		String iexAh, 
    		String delAh, 
    		String fn1Ah, 
    		String fn2Ah, 
    		String fn3Ah, 
    		String fn4Ah, 
    		String fn5Ah, 
    		String fn6Ah, 
    		String fn7Ah, 
    		String helpAh,
    		String swpAh) {
        AuthGroupMenu authGroupMenu = new AuthGroupMenu();
        authGroupMenu.setGrpAuthCd(grpAuthCd);
        authGroupMenu.setMenuId(menuId);
        authGroupMenu.setSchAh(schAh);
        authGroupMenu.setSavAh(savAh);
        authGroupMenu.setGexAh(gexAh);
        authGroupMenu.setExlAh(exlAh);
        authGroupMenu.setIexAh(iexAh);
        authGroupMenu.setDelAh(delAh);
        authGroupMenu.setFn1Ah(fn1Ah);
        authGroupMenu.setFn2Ah(fn2Ah);
        authGroupMenu.setFn3Ah(fn3Ah);
        authGroupMenu.setFn4Ah(fn4Ah);
        authGroupMenu.setFn5Ah(fn5Ah);
        authGroupMenu.setFn6Ah(fn6Ah);
        authGroupMenu.setFn7Ah(fn7Ah);
        authGroupMenu.setHelpAh(helpAh);
        authGroupMenu.setSwpAh(swpAh);
        return authGroupMenu;
    }
}
