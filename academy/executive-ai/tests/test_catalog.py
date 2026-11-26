"""Static release checks for Nand AI Academy's role/industry source catalog.
These complement, but do not replace, authenticated Hatchable integration tests.
"""
import json
import re
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
API=(ROOT/"hatchable/api/pathway.js").read_text(encoding="utf-8")
PAGE=(ROOT/"hatchable/public/pathway/index.html").read_text(encoding="utf-8")
CLIENT=(ROOT/"hatchable/public/pathway.js").read_text(encoding="utf-8")

def js_json(name,next_name):
    pattern=r"const "+re.escape(name)+r"=(\{[\s\S]*?\});\s*const "+re.escape(next_name)+r"="
    m=re.search(pattern,API)
    if not m: raise AssertionError("Unable to find "+name+" object in JS source")
    return json.loads(m.group(1))

class AcademyCatalogTests(unittest.TestCase):
    def test_thirteen_roles_each_ten_cases(self):
        roles=js_json("roles","sectors")
        self.assertEqual(13,len(roles))
        for role,record in roles.items():
            with self.subTest(role=role):
                self.assertEqual(10,len(record["cases"]))
                for case in record["cases"]:
                    self.assertTrue(all(case.get(k) for k in ("title","action","deliverable","metric")))
    def test_twelve_industries_with_ten_contexts(self):
        sectors=js_json("sectors","questions")
        self.assertEqual(12,len(sectors))
        for industry,record in sectors.items():
            with self.subTest(industry=industry):
                self.assertEqual(10,len(record["focus"]))
                self.assertTrue(record["data"] and record["risk"])
    def test_1560_contextual_combinations(self):
        self.assertEqual(1560,len(js_json("roles","sectors"))*len(js_json("sectors","questions"))*10)
    def test_private_routes_and_migration(self):
        self.assertIn('export const access="user"',API)
        self.assertIn("WHERE user_id=$1",API)
        self.assertIn("reviewed!==true",API)
        self.assertIn("Finish the preceding learning exercise",API)
        m=(ROOT/"hatchable/migrations/016_executive_pathways.sql").read_text()
        self.assertIn("user_id TEXT PRIMARY KEY",m)
        self.assertIn("PRIMARY KEY(user_id,usecase_key)",m)
    def test_html_preserves_shared_brand_stylesheet(self):
        self.assertIn('href="/style.css"',PAGE)
        self.assertIn('src="/pathway.js"',PAGE)
        self.assertIn("Basic, Beginner, Intermediate and Advanced",PAGE)
    def test_user_input_is_escaped(self):
        self.assertIn("const esc=v=>",CLIENT)
        self.assertIn('data-reviewed',CLIENT)

if __name__=="__main__":
    unittest.main()
