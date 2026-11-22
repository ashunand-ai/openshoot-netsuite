import importlib.util
from pathlib import Path
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "admin_readiness.py"
spec = importlib.util.spec_from_file_location("admin_readiness", SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

class AdminReadinessTests(unittest.TestCase):
    def test_endpoint_uses_correct_sandbox_domain(self):
        eps = mod.endpoints("1234567_SB1")
        self.assertTrue(eps["all_toolsets"].endswith("/all"))
        self.assertIn("1234567-sb1.", eps["standard_tools_only"])
    def test_blocked_by_default(self):
        r = mod.assess("1234567_SB1", "sandbox")
        self.assertEqual(r["release_gate"], "BLOCKED")
        self.assertFalse(r["connection_test_performed_by_openshoot"])
        self.assertEqual(len(r["outstanding"]), len(mod.CHECKS))
    def test_evidence_with_missing_references_does_not_pass(self):
        data = {key: {"status": "pass"} for key, _, _ in mod.CHECKS}
        r = mod.assess("1234567", "sandbox", data)
        self.assertEqual(r["release_gate"], "BLOCKED")
        self.assertTrue(r["missing_pass_references"])
    def test_complete_supplied_evidence_is_not_certification(self):
        data = {key: {"status": "pass", "reference": "administrator log 1"} for key, _, _ in mod.CHECKS}
        r = mod.assess("1234567", "sandbox", data)
        self.assertEqual(r["release_gate"], "EVIDENCE_COMPLETE_UNVERIFIED_EXTERNALLY")
    def test_na_cannot_bypass_security_controls(self):
        data = {key: {"status": "pass", "reference": "evidence"} for key, _, _ in mod.CHECKS}
        data["oauth_authorized"] = {"status": "not_applicable"}
        r = mod.assess("1234567", "sandbox", data)
        self.assertEqual(r["release_gate"], "BLOCKED")
    def test_not_applicable_requires_reference(self):
        data = {key: {"status": "pass", "reference": "documented"} for key, _, _ in mod.CHECKS}
        data["customization_reviewed"] = {"status": "not_applicable"}
        r = mod.assess("1234567", "sandbox", data)
        self.assertEqual(r["release_gate"], "BLOCKED")

    def test_reject_unknown_fields(self):
        import json, tempfile
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "evidence.json"
            p.write_text(json.dumps({"oauth_authorized": {"status": "pass", "token": "secret"}}))
            with self.assertRaises(ValueError):
                mod.load_evidence(p)
    def test_reject_embedded_secret(self):
        import json, tempfile
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "evidence.json"
            p.write_text(json.dumps({"oauth_authorized": {"status": "pass", "reference": "Bearer abc"}}))
            with self.assertRaises(ValueError):
                mod.load_evidence(p)
if __name__ == "__main__":
    unittest.main()
