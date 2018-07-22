package de.gemorra.camunda;

import org.h2.jdbcx.JdbcDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;


@SpringBootApplication
public class CamundaStarter {
    public static void main(String... args) {
        SpringApplication.run(CamundaStarter.class, args);
    }
    @Bean
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("org.h2.Driver")
                .type(JdbcDataSource.class)
                .url("jdbc:h2:./process-engine;MVCC=TRUE;TRACE_LEVEL_FILE=0").build();
    }
}