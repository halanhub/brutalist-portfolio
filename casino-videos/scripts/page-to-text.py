import json, sys, html, re
d = json.load(open(sys.argv[1]))
want = sys.argv[2]
for p in d:
    if p['slug'] == want:
        h = p['content']['rendered']
        h = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', h, flags=re.S)
        h = re.sub(r'<(h[1-6])[^>]*>', r'\n\n## ', h)
        h = re.sub(r'<(li)[^>]*>', '\n- ', h)
        h = re.sub(r'<(p|br|tr|div)[^>]*>', '\n', h)
        h = re.sub(r'<[^>]+>', ' ', h)
        h = html.unescape(h)
        h = re.sub(r'[ \t]+', ' ', h)
        h = re.sub(r'\n\s*\n+', '\n\n', h)
        print(h.strip())
