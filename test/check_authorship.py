"""Validate actual nested author properties using mf2py, not CSS selectors."""
import json
import sys
from pathlib import Path
import mf2py

for folder in Path(sys.argv[1]).iterdir():
    expected = json.loads((folder / "expected.json").read_text())
    for path in folder.glob("*.html"):
        parsed = mf2py.parse(doc=path.read_text(encoding="utf-8"), url="https://example.com/" + path.name)
        def entries(items):
            for item in items:
                if "h-entry" in item["type"]:
                    yield item
                yield from entries(item.get("children", []))
        found = list(entries(parsed["items"]))
        assert found, path
        for entry in found:
            props = entry["properties"]
            key = props["name"][0]
            name, url = expected[key]
            assert len(props["author"]) == 1, (path, props)
            card = props["author"][0]
            assert "h-card" in card["type"], (path, card)
            assert card["properties"]["name"] == [name], (path, card)
            assert card["properties"].get("url", []) == ([url] if url else []), (path, card)
print("mf2py: site/guest names and URLs retained in every hidden page and listing entry.")
