CREATE TABLE IF NOT EXISTS table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT table_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_table_created_at ON table(created_at DESC);
CREATE INDEX idx_table_status ON table(status) WHERE status = 'active';
