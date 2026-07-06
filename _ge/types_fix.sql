CREATE TABLE IF NOT EXISTS utils (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT utils_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_utils_created_at ON utils(created_at DESC);
CREATE INDEX idx_utils_status ON utils(status) WHERE status = 'active';
