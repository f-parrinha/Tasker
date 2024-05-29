package tasker.api.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;

public class Utils {
    public static final long TOKEN_EXPIRATION_TIME = 1200000;   // 20min in milliseconds

    public static boolean isStringNull (String string) {
        return string == null || string.isBlank();
    }

    public static boolean validateAuthToken(String token, String tokenSecret, String subject) {
        String finalToken = token.replace("Bearer ", "");

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(tokenSecret)
                    .build()
                    .parseClaimsJws(finalToken);

            // Validate
            Date expiration = claims.getBody().getExpiration();
            boolean expired = expiration.before(new Date());
            boolean differentSubject = !subject.equals(claims.getBody().getSubject());
            if (expired || differentSubject) {
                return false;
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static String createAuthToken(String username, String key) {
        long timestamp = System.currentTimeMillis();
        Date now = new Date(timestamp);
        Date exp = new Date(timestamp + TOKEN_EXPIRATION_TIME); // 20 minutes in milliseconds

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}
