
-- Air Bharat Careers Portal Database Schema
-- This file contains all the SQL commands to set up the database structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data integrity
CREATE TYPE employment_type AS ENUM ('full-time', 'part-time', 'contract', 'seasonal');
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'approved', 'rejected', 'interview_scheduled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Applications table - stores all job application data
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(50) DEFAULT 'indian',
    
    -- Address Information
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    
    -- Job Preferences
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    preferred_location VARCHAR(100) NOT NULL,
    availability_date DATE NOT NULL,
    work_type employment_type NOT NULL,
    salary_expectation VARCHAR(50),
    
    -- Qualifications
    education VARCHAR(100) NOT NULL,
    certifications TEXT[], -- Array to store multiple certifications
    languages TEXT[], -- Array to store multiple languages
    medical_certificate BOOLEAN DEFAULT FALSE,
    background_check BOOLEAN DEFAULT FALSE,
    
    -- Experience
    total_experience VARCHAR(50),
    previous_employer VARCHAR(200),
    job_title VARCHAR(100),
    experience_description TEXT,
    reason TEXT,
    
    -- Documents
    resume_url TEXT, -- URL to stored resume file
    cover_letter TEXT,
    references TEXT,
    
    -- Application Status
    status application_status DEFAULT 'pending',
    notes TEXT, -- Admin notes
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table - stores payment information
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    
    -- Payment Details
    amount DECIMAL(10,2) NOT NULL DEFAULT 1000.00,
    currency VARCHAR(3) DEFAULT 'INR',
    utr_number VARCHAR(20) UNIQUE,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    
    -- Payment Status
    status payment_status DEFAULT 'pending',
    payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table - for admin dashboard access
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at);
CREATE INDEX idx_applications_position ON applications(position);
CREATE INDEX idx_applications_department ON applications(department);
CREATE INDEX idx_payments_application_id ON payments(application_id);
CREATE INDEX idx_payments_utr_number ON payments(utr_number);
CREATE INDEX idx_payments_status ON payments(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at column
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (you can change this later)
INSERT INTO admin_users (email, full_name, role) 
VALUES ('admin@airbharat.com', 'Air Bharat Admin', 'super_admin');

-- Row Level Security (RLS) Policies
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for applications - allow insert for anyone, select/update for admins only
CREATE POLICY "Anyone can insert applications" ON applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all applications" ON applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email' 
            AND admin_users.is_active = true
        )
    );

CREATE POLICY "Admins can update applications" ON applications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email' 
            AND admin_users.is_active = true
        )
    );

-- Policy for payments - allow insert for anyone, select/update for admins only
CREATE POLICY "Anyone can insert payments" ON payments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email' 
            AND admin_users.is_active = true
        )
    );

CREATE POLICY "Admins can update payments" ON payments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email' 
            AND admin_users.is_active = true
        )
    );

-- Policy for admin_users - only super_admin can manage
CREATE POLICY "Super admin can manage admin users" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email' 
            AND admin_users.role = 'super_admin'
            AND admin_users.is_active = true
        )
    );

-- Create views for better data access
CREATE VIEW application_summary AS
SELECT 
    a.id,
    a.first_name || ' ' || a.last_name as full_name,
    a.email,
    a.phone,
    a.position,
    a.department,
    a.preferred_location,
    a.status,
    p.status as payment_status,
    p.utr_number,
    a.created_at
FROM applications a
LEFT JOIN payments p ON a.id = p.application_id;

-- Create function to get application statistics
CREATE OR REPLACE FUNCTION get_application_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_applications', (SELECT COUNT(*) FROM applications),
        'pending_applications', (SELECT COUNT(*) FROM applications WHERE status = 'pending'),
        'approved_applications', (SELECT COUNT(*) FROM applications WHERE status = 'approved'),
        'rejected_applications', (SELECT COUNT(*) FROM applications WHERE status = 'rejected'),
        'completed_payments', (SELECT COUNT(*) FROM payments WHERE status = 'completed'),
        'pending_payments', (SELECT COUNT(*) FROM payments WHERE status = 'pending'),
        'total_revenue', (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'completed')
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON TABLE applications IS 'Stores all job application data from the Air Bharat careers portal';
COMMENT ON TABLE payments IS 'Stores payment information for application registration fees';
COMMENT ON TABLE admin_users IS 'Stores admin user information for dashboard access';
COMMENT ON VIEW application_summary IS 'Simplified view of applications with payment status';
COMMENT ON FUNCTION get_application_stats() IS 'Returns application and payment statistics for admin dashboard';
