CREATE TABLE IF NOT EXISTS serializer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT serializer_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_serializer_created_at ON serializer(created_at DESC);
CREATE INDEX idx_serializer_status ON serializer(status) WHERE status = 'active';
