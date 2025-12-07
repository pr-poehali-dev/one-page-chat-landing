CREATE TABLE IF NOT EXISTS t_p41703409_one_page_chat_landin.leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(255),
    address TEXT,
    object_type VARCHAR(255),
    object_type_other VARCHAR(255),
    area VARCHAR(50),
    rooms VARCHAR(10),
    services TEXT[],
    start_time VARCHAR(255),
    deadline VARCHAR(255),
    budget VARCHAR(255),
    materials_interest VARCHAR(255),
    consultation_type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_created_at ON t_p41703409_one_page_chat_landin.leads(created_at DESC);
CREATE INDEX idx_leads_phone ON t_p41703409_one_page_chat_landin.leads(phone);