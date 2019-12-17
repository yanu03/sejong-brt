package com.tracom.brt.domain.user.auth.menu;

import com.tracom.brt.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
