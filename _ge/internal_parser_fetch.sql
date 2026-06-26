CREATE TABLE IF NOT EXISTS logger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT logger_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_logger_created_at ON logger(created_at DESC);
CREATE INDEX idx_logger_status ON logger(status) WHERE status = 'active';
