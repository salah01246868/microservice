package com.irrigation.gateway.config;

import org.springframework.context.annotation.Configuration;

/**
 * CORS is now configured via application.properties to avoid duplication
 * and ensure seamless integration with Spring Cloud Gateway's default filters.
 */
@Configuration
public class CorsConfig {
    // Bean-based configuration removed to favor property-based config in
    // application.properties
}
