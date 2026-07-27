CREATE TABLE IF NOT EXISTS model (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT model_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_model_created_at ON model(created_at DESC);
CREATE INDEX idx_model_status ON model(status) WHERE status = 'active';
