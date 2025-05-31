-- Simple SQL script to seed the database with demo users
-- Clear existing users
DELETE FROM users;

-- Insert demo users with different roles
INSERT INTO users (email, password, role) VALUES 
('admin@pc-ghana.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'ADMIN'),
('reviewer@pc-ghana.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'COMPLIANCE_OFFICER'),
('officer@immigration.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'IMMIGRATION_OFFICER'),
('finance@pc-ghana.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'FINANCE_OFFICER'),
('jv-coordinator@pc-ghana.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'JV_COORDINATOR'),
('commission-admin@pc-ghana.gov.gh', '$2b$12$LQv3c1yqBwEHFuHAPiJlOeRSaHxVDQ3YqLl7rkpCnyg.f2OxMfHxK', 'COMMISSION_ADMIN');

-- Display the created users
SELECT id, email, role, created_at FROM users ORDER BY id;