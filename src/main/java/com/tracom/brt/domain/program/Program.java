package com.tracom.brt.domain.program;

import com.tracom.brt.domain.BaseJpaModel;
import com.chequer.axboot.core.annotations.ColumnPosition;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "PROG_M")
public class Program extends BaseJpaModel<String> {

    @Id
    @Column(name = "PROG_CD", length = 50)
    @ColumnPosition(1)
    private String progCd;

    @Column(name = "PROG_NM", length = 50)
    @ColumnPosition(2)
    @NonNull
    private String progNm;

    @Column(name = "PROG_PH", length = 100)
    @ColumnPosition(3)
    @NonNull
    private String progPh;

    @Column(name = "TARGET", length = 10)
    @ColumnPosition(4)
    private String target = "_self";

    @Column(name = "AUTH_CHECK", length = 1)
    @ColumnPosition(5)
    private String authCheck = "Y";

    @Column(name = "SCH_AH", length = 1)
    @ColumnPosition(6)
    private String schAh = "N";

    @Column(name = "SAV_AH", length = 1)
    @ColumnPosition(7)
    private String savAh = "N";

    @Column(name = "GEX_AH", length = 1)
    @ColumnPosition(8)
    private String gexAh = "N";
    
    @Column(name = "IEX_AH", length = 1)
    @ColumnPosition(8)
    private String iexAh = "N";
    
    @Column(name = "EXL_AH", length = 1)
    @ColumnPosition(8)
    private String exlAh = "N";

    @Column(name = "DEL_AH", length = 1)
    @ColumnPosition(9)
    private String delAh = "N";

    @Column(name = "FN1_AH", length = 1)
    @ColumnPosition(10)
    private String fn1Ah = "N";

    @Column(name = "FN2_AH", length = 1)
    @ColumnPosition(11)
    private String fn2Ah = "N";

    @Column(name = "FN3_AH", length = 1)
    @ColumnPosition(12)
    private String fn3Ah = "N";

    @Column(name = "FN4_AH", length = 1)
    @ColumnPosition(13)
    private String fn4Ah = "N";

    @Column(name = "FN5_AH", length = 1)
    @ColumnPosition(14)
    private String fn5Ah = "N";
    
    @Column(name = "FN6_AH", length = 1)
    @ColumnPosition(15)
    private String fn6Ah = "N";
    
    @Column(name = "FN7_AH", length = 1)
    @ColumnPosition(16)
    private String fn7Ah = "N";
    
    @Column(name = "HELP_AH", length = 1)
    @ColumnPosition(17)
    private String helpAh = "N";

    @Column(name = "SWP_AH", length = 1)
    @ColumnPosition(18)
    private String swpAh = "N";

    @Column(name = "REMARK", length = 200)
    @ColumnPosition(19)
    private String remark;
    

    @Override
    public String getId() {
        return progCd;
    }

    public static Program of(
    		String progCd, 
    		String progNm, 
    		String progPh, 
    		String target, 
    		String authCheck, 
    		String schAh, 
    		String savAh,
    		String gexAh,
    		String iexAh,
    		String exlAh, 
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
        Program program = new Program();
        program.setProgCd(progCd);
        program.setProgNm(progNm);
        program.setProgPh(progPh);
        program.setTarget(target);
        program.setAuthCheck(authCheck);
        program.setSchAh(schAh);
        program.setSavAh(savAh);
        program.setGexAh(gexAh);
        program.setIexAh(iexAh);
        program.setExlAh(exlAh);
        program.setDelAh(delAh);
        program.setFn1Ah(fn1Ah);
        program.setFn2Ah(fn2Ah);
        program.setFn3Ah(fn3Ah);
        program.setFn4Ah(fn4Ah);
        program.setFn5Ah(fn5Ah);
        program.setFn6Ah(fn6Ah);
        program.setFn7Ah(fn7Ah);
        program.setHelpAh(helpAh);
        program.setSwpAh(swpAh);
        return program;
    }
}
