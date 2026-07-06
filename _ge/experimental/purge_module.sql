CREATE TABLE IF NOT EXISTS api (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT api_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_api_created_at ON api(created_at DESC);
CREATE INDEX idx_api_status ON api(status) WHERE status = 'active';
