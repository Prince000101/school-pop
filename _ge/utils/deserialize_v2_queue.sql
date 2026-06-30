CREATE TABLE IF NOT EXISTS register (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT register_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_register_created_at ON register(created_at DESC);
CREATE INDEX idx_register_status ON register(status) WHERE status = 'active';
