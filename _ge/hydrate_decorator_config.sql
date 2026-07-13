CREATE TABLE IF NOT EXISTS button (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT button_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX idx_button_created_at ON button(created_at DESC);
CREATE INDEX idx_button_status ON button(status) WHERE status = 'active';
