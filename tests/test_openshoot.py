import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from openshoot import build_report, validate_account_id

class TestReadiness(unittest.TestCase):
    def test_endpoint_and_offline_disclaimer(self):
        r = build_report("1234567_SB1", "sandbox")
        self.assertEqual(r["status"], "OFFLINE_PREPARATION_ONLY")
        self.assertFalse(r["live_connection_attempted"])
        self.assertIn("1234567_sb1.suitetalk.api.netsuite.com", r["candidate_standard_tools_mcp_endpoint"])

    def test_account_input_validation(self):
        for s in ["", "a", "https://example.test", "abc/path", "abc?token=x", "a\nInjected"]:
            with self.subTest(s=s), self.assertRaises(ValueError):
                validate_account_id(s)

    def test_checklist_and_unknowns(self):
        r = build_report("1234567")
        self.assertGreaterEqual(len(r["administrator_checklist"]), 8)
        self.assertFalse(r["role_permissions_verified"])
        self.assertTrue(r["unknown_without_live_connection"])

if __name__ == "__main__":
    unittest.main()
