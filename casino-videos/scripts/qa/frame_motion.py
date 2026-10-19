import glob, sys, numpy as np
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + "/f*.png"))
prev = None
out = []
for i, f in enumerate(fs):
    a = np.asarray(Image.open(f), dtype=np.float32)
    if prev is not None:
        d = np.abs(a - prev)
        out.append(f"{i}:{d.mean():.2f}/{(d > 8).mean() * 100:.1f}%")
    prev = a
print("  ".join(out))
