import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "@/App";
import { projects } from "@/data/projects";

beforeAll(() => {
  // jsdom lacks these browser APIs used by the motion layer.
  window.scrollTo = () => {};
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error minimal stub
  window.IntersectionObserver = IO;
});

describe("homepage", () => {
  it("renders the core content and landmarks without animation", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /hampus lang/i })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    for (const id of ["work-title", "story-title", "toolkit-title", "contact-title"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("links every project to its live site in a new tab", () => {
    render(<App />);
    for (const p of projects.filter((p) => p.url)) {
      const article = screen.getByRole("article", { name: p.title });
      const link = within(article).getByRole("link", { name: new RegExp(p.linkLabel!.replace(/[.]/g, "\\.")) });
      expect(link).toHaveAttribute("href", p.url);
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("offers email and CV download", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /me@hampuslang\.com/ })[0]).toHaveAttribute("href", "mailto:me@hampuslang.com");
    expect(screen.getByRole("link", { name: /download cv/i })).toHaveAttribute("href", "/assets/Hampus-lang-CV.pdf");
  });
});
