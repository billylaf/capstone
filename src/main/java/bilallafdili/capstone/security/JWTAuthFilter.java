package bilallafdili.capstone.security;

import bilallafdili.capstone.entities.User;
import bilallafdili.capstone.exceptions.UnauthorizedException;
import bilallafdili.capstone.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTTools jwtTools;
    private final UserService userService;

    public JWTAuthFilter(JWTTools jwtTools, UserService userService) {
        this.jwtTools = jwtTools;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Il token non è presente nell'header Authorization!");
        }

        String accessToken = authHeader.replace("Bearer ", "");

        jwtTools.verifyToken(accessToken);

        // Estrai l'ID dal token
        Long userId = jwtTools.extractIdFromToken(accessToken);

        // Recupera l'utente dal database
        User authenticatedUser = userService.findById(userId);

        // Crea l'autenticazione
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                authenticatedUser,
                null,
                authenticatedUser.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getMethod().equalsIgnoreCase("OPTIONS") ||
                new AntPathMatcher().match("/auth/**", request.getServletPath()) ||
                new AntPathMatcher().match("/prodotti/**", request.getServletPath()) ||
                (new AntPathMatcher().match("/richieste", request.getServletPath()) &&
                        request.getMethod().equalsIgnoreCase("POST"));
    }
}
