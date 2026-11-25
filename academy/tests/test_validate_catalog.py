import importlib.util
import unittest
from pathlib import Path

P=Path(__file__).resolve().parents[1]/'scripts'/'validate_catalog.py'
spec=importlib.util.spec_from_file_location('validate_catalog',P)
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
BASE={'id':'mcp-connect','title':'Connect NetSuite MCP','audience':'admin','release':'2026.2','source_url':'https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/example','status':'scripted','readiness':'Confirm access and role before starting','risk':'configuration','video_script':'videos/mcp.md','lesson_path':'lessons/mcp.md','outcome':'connection readiness'}
class CatalogTests(unittest.TestCase):
    def test_valid(self):self.assertEqual(mod.validate([BASE]),[])
    def test_reject_unverified_source(self):
        x=dict(BASE,source_url='https://random.invalid')
        self.assertTrue(mod.validate([x]))
    def test_reject_duplicate(self):self.assertTrue(any('duplicate' in x for x in mod.validate([BASE,BASE])))
    def test_reject_unsupported_status(self):self.assertTrue(mod.validate([dict(BASE,status='enterprise-certified')]))
    def test_reject_traversal(self):
        x=dict(BASE,video_script='../secrets')
        self.assertTrue(mod.validate([x],Path('/tmp')))
if __name__=='__main__':unittest.main()
