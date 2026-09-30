package com.example.demo.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDefaultUser() {
        return args -> {
            if (userRepository.findByEmail("thinh@gmail.com").isEmpty()) {
                User user = User.builder()
                        .fullName("Thái Doãn Thịnh")
                        .email("thinh@gmail.com")
                        .password(passwordEncoder.encode("123456"))
                        .images("https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg")
                        .build();

                userRepository.save(user);
                System.out.println(">>> Đã khởi tạo tài khoản mẫu thành công: thinh@gmail.com / 123456");
            }
        };
    }
}