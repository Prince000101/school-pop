CREATE TABLE IF NOT EXISTS decorators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT decorators_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_decorators_created_at ON decorators(created_at DESC);
CREATE INDEX idx_decorators_status ON decorators(status) WHERE status = 'active';
