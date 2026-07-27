package com.freshm.pvtapp.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.entity.User;
import com.freshm.pvtapp.exception.UnauthorizedException;
import com.freshm.pvtapp.model.UserPrincipal;

@Component
public class SecurityUtil {

    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User is not authenticated.");
        }

    //     Object principal = authentication.getPrincipal();

    //     if (!(principal instanceof UserPrincipal userPrincipal)) {
    //         throw new UnauthorizedException("Invalid authenticated user.");
    //     }

    //     return userPrincipal.getUser();
    // }

    Object principal = authentication.getPrincipal();

System.out.println("================================");
System.out.println("Authentication Class : " + authentication.getClass().getName());
System.out.println("Principal Class      : " + principal.getClass().getName());
System.out.println("Principal            : " + principal);
System.out.println("Authorities          : " + authentication.getAuthorities());
System.out.println("================================");

if (!(principal instanceof UserPrincipal userPrincipal)) {
    throw new UnauthorizedException("Invalid authenticated user.");
}

return userPrincipal.getUser();
    }
    public Company getCurrentCompany() {

        User user = getCurrentUser();

        if (user.getCompany() == null) {
            throw new UnauthorizedException("No company assigned to the user.");
        }

        return user.getCompany();
    }

    public Long getCurrentCompanyId() {
        return getCurrentCompany().getId();
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public boolean hasRole(String role) {
        return getCurrentUser().getRole().name().equalsIgnoreCase(role);
    }

    public boolean isSuperAdmin() {
        return hasRole("SUPER_ADMIN");
    }

    public boolean isAdmin() {
        return hasRole("ADMIN");
    }

    public boolean isUser() {
        return hasRole("USER");
    }
}