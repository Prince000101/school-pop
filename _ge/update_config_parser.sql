CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT profile_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_profile_created_at ON profile(created_at DESC);
CREATE INDEX idx_profile_status ON profile(status) WHERE status = 'active';
