ALTER TABLE executive_usecase_progress ADD COLUMN IF NOT EXISTS evidence_note TEXT NOT NULL DEFAULT '';
ALTER TABLE executive_usecase_progress ADD COLUMN IF NOT EXISTS metric_note TEXT NOT NULL DEFAULT '';
ALTER TABLE executive_usecase_progress ADD COLUMN IF NOT EXISTS reviewed_by_student BOOLEAN NOT NULL DEFAULT false;