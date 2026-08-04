CREATE TABLE IF NOT EXISTS schema (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT schema_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_schema_created_at ON schema(created_at DESC);
CREATE INDEX idx_schema_status ON schema(status) WHERE status = 'active';
