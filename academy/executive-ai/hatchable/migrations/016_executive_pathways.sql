CREATE TABLE executive_learning_profiles (
 user_id TEXT PRIMARY KEY,
 industry_key TEXT NOT NULL,
 role_key TEXT NOT NULL,
 self_level TEXT NOT NULL,
 assessed_level TEXT NOT NULL,
 starting_level TEXT NOT NULL,
 objective TEXT NOT NULL,
 experience_hours INTEGER NOT NULL DEFAULT 0,
 answers JSONB NOT NULL,
 score INTEGER NOT NULL,
 assessed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE executive_usecase_progress (
 user_id TEXT NOT NULL,
 usecase_key TEXT NOT NULL,
 completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 PRIMARY KEY(user_id,usecase_key)
);
CREATE INDEX executive_profiles_role_industry_idx ON executive_learning_profiles(industry_key,role_key);