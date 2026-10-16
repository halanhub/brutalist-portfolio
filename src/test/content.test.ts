import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

const pub = (p: string) => path.resolve(__dirname, "../../public", p.replace(/^\//, ""));

describe("portfolio content", () => {
  it("keeps every original screenshot and the portrait in the repository", () => {
    for (const p of projects) expect(existsSync(pub(p.original)), p.original).toBe(true);
    expect(existsSync(pub(profile.portrait))).toBe(true);
    expect(existsSync(pub(profile.cv))).toBe(true);
  });

  it("has every optimized derivative the page requests", () => {
    for (const p of projects)
      for (const w of [800, 1400, 2200]) {
        const file = `/assets/optimized/${p.image}-${w}.webp`;
        expect(existsSync(pub(file)), file).toBe(true);
      }
  });

  it("has phone-size derivatives for every project flagged as mobile", () => {
    for (const p of projects.filter((p) => p.mobile))
      for (const w of [400, 800]) {
        const file = `/assets/optimized/${p.image}-mobile-${w}.webp`;
        expect(existsSync(pub(file)), file).toBe(true);
      }
  });

  it("gives each project a unique slug, an https link and alt text", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const p of projects) {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.alt.length).toBeGreaterThan(20);
    }
  });
});
