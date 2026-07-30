CREATE TABLE IF NOT EXISTS metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT metrics_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_metrics_created_at ON metrics(created_at DESC);
CREATE INDEX idx_metrics_status ON metrics(status) WHERE status = 'active';
