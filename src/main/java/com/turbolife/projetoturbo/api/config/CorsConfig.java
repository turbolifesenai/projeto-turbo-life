package com.turbolife.projetoturbo.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    // Configuração global de CORS
    // Aqui eu libero o acesso da aplicação frontend a todas as rotas da API
    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Liberando todas as rotas (/**)
                registry.addMapping("/**")

                        // Permitindo qualquer endereço de origem (frontend rodando fora do backend)
                        .allowedOrigins("*")

                        // Permitindo os métodos padrões que usamos
                        .allowedMethods("GET", "POST", "PUT", "DELETE")

                        // Permitindo o envio de informações no corpo da requisição
                        .allowedHeaders("*");
            }
        };
    }
}
