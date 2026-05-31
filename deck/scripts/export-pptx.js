import PptxGenJS from "pptxgenjs";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SLIDES_DIR = resolve(__dirname, "../slides");
const ASSETS_DIR = resolve(__dirname, "../assets");
const OUT_DIR = resolve(__dirname, "../dist");

const RH_RED = "EE0000";
const RH_DARK = "292929";
const RH_WHITE = "FFFFFF";
const RH_GRAY = "F0F0F0";
const RH_TEXT = "151515";
const RH_MUTED = "6A6E73";
const FONT = "Red Hat Text";
const FONT_MONO = "Red Hat Mono";

function imageData(filename) {
  const p = resolve(ASSETS_DIR, filename);
  if (!existsSync(p)) return null;
  const buf = readFileSync(p);
  const ext = filename.split(".").pop().toLowerCase();
  return `data:image/${ext === "jpg" ? "jpeg" : ext};base64,${buf.toString("base64")}`;
}

const LOGOS = {
  white: imageData("redhat-logo-white.png"),
  color: imageData("redhat-logo-color.png"),
  aapWhite: imageData("aap-logo-white.png"),
};

function parseSlides(mdFile) {
  const raw = readFileSync(resolve(SLIDES_DIR, mdFile), "utf-8");
  const sections = raw.split(/^---$/m);
  return sections.map((section) => {
    const trimmed = section.trim();
    if (!trimmed) return null;

    const slide = {
      type: "content-light",
      bgColor: RH_WHITE,
      sectionMarker: "",
      title: "",
      bullets: [],
      notes: "",
      subContent: [],
      hasMermaid: false,
      mermaidType: "",
      rawHtml: "",
    };

    const classMatch = trimmed.match(/class="([^"]+)"/);
    if (classMatch) slide.type = classMatch[1].split(" ")[0];

    const bgMatch = trimmed.match(/data-background-color="([^"]+)"/);
    if (bgMatch) slide.bgColor = bgMatch[1].replace("#", "");

    const noteMatch = trimmed.match(/^Note:\s*(.+(?:\n(?!---).+)*)/m);
    if (noteMatch) slide.notes = noteMatch[1].trim();

    const markerMatch = trimmed.match(
      /<p class="section-marker">([^<]+)<\/p>/
    );
    if (markerMatch) slide.sectionMarker = markerMatch[1];

    const lines = trimmed.split("\n");
    for (const line of lines) {
      const h1 = line.match(/^# (.+)/);
      if (h1 && !line.startsWith("##")) {
        slide.title = h1[1].trim();
        continue;
      }
      const h2 = line.match(/^## (.+)/);
      if (h2) {
        let t = h2[1]
          .replace(/<!-- .element:.*?-->/g, "")
          .replace(/<br\/?>/g, " ")
          .trim();
        slide.title = t;
        continue;
      }
      const h3 = line.match(/^### (.+)/);
      if (h3) {
        slide.subContent.push({ type: "heading", text: h3[1].trim() });
        continue;
      }
      const bullet = line.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
      if (bullet) {
        slide.bullets.push({
          bold: bullet[1].replace(/:/g, "").trim(),
          text: bullet[2].trim(),
        });
        continue;
      }
      const simpleBullet = line.match(/^- (.+)/);
      if (simpleBullet) {
        slide.bullets.push({ text: simpleBullet[1].trim() });
        continue;
      }
      if (line.includes('<div class="mermaid">')) {
        slide.hasMermaid = true;
      }
      if (line.match(/^(timeline|graph\s)/)) {
        slide.mermaidType = line.trim().split(/\s/)[0];
      }
    }

    const toolGridMatch = trimmed.match(
      /<div class="tool-grid">([\s\S]*?)<\/div>\s*<\/div>/
    );
    if (toolGridMatch) slide.rawHtml = "tool-grid";

    const maturityMatch = trimmed.match(
      /<div class="maturity-grid">([\s\S]*?)<\/div>/
    );
    if (maturityMatch) slide.rawHtml = "maturity-grid";

    const stepsMatch = trimmed.match(
      /<div class="steps-list">([\s\S]*?)<\/div>\s*<\/div>/
    );
    if (stepsMatch) slide.rawHtml = "steps-list";

    const mcpMatch = trimmed.match(
      /<div class="mcp-layout">([\s\S]*?)<\/div>\s*<\/div>/
    );
    if (mcpMatch) slide.rawHtml = "mcp-layout";

    return slide;
  }).filter(Boolean);
}

function addFooter(slide, dark) {
  const logo = dark ? LOGOS.white : LOGOS.color;
  if (logo) {
    slide.addImage({
      data: logo,
      x: 0.4,
      y: 6.85,
      h: 0.35,
      w: 1.5,
      sizing: { type: "contain", w: 1.5, h: 0.35 },
    });
  }
}

function addAccentBar(slide) {
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.34,
    h: 0.06,
    fill: { color: RH_RED },
  });
}

function renderTitleRedSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { color: RH_RED };
  if (data.notes) slide.addNotes(data.notes);

  if (LOGOS.aapWhite) {
    slide.addImage({
      data: LOGOS.aapWhite,
      x: 0.8,
      y: 0.8,
      w: 3.5,
      h: 0.7,
      sizing: { type: "contain", w: 3.5, h: 0.7 },
    });
  }

  slide.addText(data.title || "The Ansible Developer Experience", {
    x: 0.8,
    y: 2.0,
    w: 8,
    h: 1.5,
    fontSize: 36,
    bold: true,
    color: RH_WHITE,
    fontFace: FONT,
  });

  const subtitle = data.bullets.length
    ? data.bullets[0].text
    : "From individual setup to enterprise workspace";
  slide.addText(subtitle, {
    x: 0.8,
    y: 3.5,
    w: 8,
    h: 0.6,
    fontSize: 18,
    color: RH_WHITE,
    fontFace: FONT,
  });

  slide.addText("Presenter Name — Title", {
    x: 0.8,
    y: 4.5,
    w: 8,
    h: 0.5,
    fontSize: 14,
    color: RH_WHITE,
    fontFace: FONT,
    italic: true,
  });

  addFooter(slide, true);
  return slide;
}

function renderDividerSlide(pptx, data) {
  const dark = data.type.includes("dark");
  const bgColor = dark ? RH_DARK : RH_RED;
  const slide = pptx.addSlide();
  slide.background = { color: bgColor };
  if (data.notes) slide.addNotes(data.notes);

  if (data.sectionMarker) {
    slide.addText(data.sectionMarker, {
      x: 0.8,
      y: 1.0,
      w: 10,
      h: 0.5,
      fontSize: 14,
      color: RH_WHITE,
      fontFace: FONT,
      bold: true,
      letterSpacing: 2,
    });
  }

  slide.addText(data.title, {
    x: 0.8,
    y: 2.0,
    w: 10,
    h: 2.5,
    fontSize: 40,
    bold: true,
    color: RH_WHITE,
    fontFace: FONT,
    valign: "middle",
  });

  addFooter(slide, true);
  return slide;
}

function renderThankYouSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { color: RH_RED };
  if (data.notes) slide.addNotes(data.notes);

  slide.addText("Thank you", {
    x: 0.8,
    y: 1.0,
    w: 5,
    h: 1.2,
    fontSize: 44,
    bold: true,
    color: RH_WHITE,
    fontFace: FONT,
  });

  slide.addText(
    "Red Hat is the world's leading provider of enterprise open source software solutions, using a community-powered approach to deliver high-performing Linux, cloud, container, and Kubernetes technologies.",
    {
      x: 0.8,
      y: 2.5,
      w: 5.5,
      h: 2.5,
      fontSize: 13,
      color: RH_WHITE,
      fontFace: FONT,
    }
  );

  const socials = [
    "linkedin.com/company/red-hat",
    "youtube.com/user/RedHatVideos",
    "facebook.com/redhatinc",
  ];
  socials.forEach((s, i) => {
    slide.addText(s, {
      x: 7.5,
      y: 2.5 + i * 0.6,
      w: 4.5,
      h: 0.5,
      fontSize: 12,
      color: RH_WHITE,
      fontFace: FONT,
    });
  });

  addFooter(slide, true);
  return slide;
}

function renderContentSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { color: data.bgColor };
  if (data.notes) slide.addNotes(data.notes);

  addAccentBar(slide);

  let yPos = 0.3;

  if (data.sectionMarker) {
    slide.addText(data.sectionMarker, {
      x: 0.8,
      y: yPos,
      w: 10,
      h: 0.4,
      fontSize: 11,
      color: RH_RED,
      fontFace: FONT,
      bold: true,
      letterSpacing: 1,
    });
    yPos += 0.45;
  }

  if (data.title) {
    slide.addText(data.title, {
      x: 0.8,
      y: yPos,
      w: 11,
      h: 0.8,
      fontSize: 28,
      bold: true,
      color: RH_TEXT,
      fontFace: FONT,
    });
    yPos += 1.0;
  }

  if (data.rawHtml === "tool-grid") {
    const groups = [
      {
        title: "Create",
        items: ["ansible-creator", "ansible-dev-environment", "ansible-core"],
      },
      {
        title: "Test",
        items: ["ansible-lint", "molecule", "pytest-ansible", "tox-ansible"],
      },
      {
        title: "Deploy",
        items: ["ansible-builder", "ansible-navigator", "ansible-sign"],
      },
    ];
    groups.forEach((g, i) => {
      const xOff = 0.8 + i * 3.8;
      slide.addShape("roundRect", {
        x: xOff,
        y: yPos,
        w: 3.4,
        h: 3.2,
        fill: { color: RH_GRAY },
        rectRadius: 0.1,
      });
      slide.addText(g.title, {
        x: xOff + 0.2,
        y: yPos + 0.15,
        w: 3,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: RH_RED,
        fontFace: FONT,
      });
      g.items.forEach((item, j) => {
        slide.addText(item, {
          x: xOff + 0.4,
          y: yPos + 0.7 + j * 0.5,
          w: 2.8,
          h: 0.4,
          fontSize: 13,
          color: RH_TEXT,
          fontFace: FONT_MONO,
          bullet: { code: "25B8", color: RH_RED },
        });
      });
    });
    yPos += 3.5;
  } else if (data.rawHtml === "maturity-grid") {
    const stages = [
      {
        title: "Crawl",
        method: "pip / uv",
        time: "~30 min",
        level: "Low consistency",
      },
      {
        title: "Walk",
        method: "RPM",
        time: "~15 min",
        level: "Medium consistency",
      },
      {
        title: "Run",
        method: "Dev Container",
        time: "~10 min",
        level: "High consistency",
      },
      {
        title: "Fly",
        method: "Dev Spaces",
        time: "~5 min",
        level: "Highest consistency",
      },
    ];
    stages.forEach((s, i) => {
      const xOff = 0.8 + i * 2.9;
      slide.addShape("roundRect", {
        x: xOff,
        y: yPos,
        w: 2.6,
        h: 2.8,
        fill: { color: i < 2 ? RH_GRAY : RH_RED },
        rectRadius: 0.1,
      });
      slide.addText(s.title, {
        x: xOff + 0.1,
        y: yPos + 0.1,
        w: 2.4,
        h: 0.5,
        fontSize: 20,
        bold: true,
        color: i < 2 ? RH_TEXT : RH_WHITE,
        fontFace: FONT,
        align: "center",
      });
      slide.addText(s.method, {
        x: xOff + 0.1,
        y: yPos + 0.7,
        w: 2.4,
        h: 0.4,
        fontSize: 14,
        color: i < 2 ? RH_TEXT : RH_WHITE,
        fontFace: FONT,
        align: "center",
      });
      slide.addText(s.time, {
        x: xOff + 0.1,
        y: yPos + 1.3,
        w: 2.4,
        h: 0.5,
        fontSize: 22,
        bold: true,
        color: i < 2 ? RH_RED : RH_WHITE,
        fontFace: FONT,
        align: "center",
      });
      slide.addText(s.level, {
        x: xOff + 0.1,
        y: yPos + 2.0,
        w: 2.4,
        h: 0.4,
        fontSize: 11,
        color: i < 2 ? RH_MUTED : RH_WHITE,
        fontFace: FONT,
        align: "center",
      });
    });
    slide.addText("← Less governed                          More governed →", {
      x: 0.8,
      y: yPos + 3.0,
      w: 11,
      h: 0.4,
      fontSize: 11,
      color: RH_MUTED,
      fontFace: FONT,
      align: "center",
    });
    yPos += 3.8;
  } else if (data.rawHtml === "steps-list") {
    const steps = [
      {
        n: "1",
        title: "Development Assessment",
        desc: "1-day workshop: map current state, identify gaps, define target maturity",
      },
      {
        n: "2",
        title: "Proof of Concept",
        desc: "Red Hat deploys ADT + Dev Container/Spaces for one pilot team",
      },
      {
        n: "3",
        title: "Implementation & Onboarding",
        desc: "Roll out tooling org-wide, customize images per domain",
      },
      {
        n: "4",
        title: "Data-Driven Improvement",
        desc: "Grafana dashboards: build times, lint violations, test coverage trends",
      },
    ];
    steps.forEach((s, i) => {
      const yOff = yPos + i * 1.1;
      slide.addShape("ellipse", {
        x: 0.8,
        y: yOff,
        w: 0.6,
        h: 0.6,
        fill: { color: RH_RED },
      });
      slide.addText(s.n, {
        x: 0.8,
        y: yOff,
        w: 0.6,
        h: 0.6,
        fontSize: 18,
        bold: true,
        color: RH_WHITE,
        fontFace: FONT,
        align: "center",
        valign: "middle",
      });
      slide.addText(s.title, {
        x: 1.7,
        y: yOff,
        w: 9,
        h: 0.35,
        fontSize: 16,
        bold: true,
        color: RH_TEXT,
        fontFace: FONT,
      });
      slide.addText(s.desc, {
        x: 1.7,
        y: yOff + 0.35,
        w: 9,
        h: 0.35,
        fontSize: 12,
        color: RH_MUTED,
        fontFace: FONT,
      });
    });
    yPos += 4.6;
  } else if (data.rawHtml === "mcp-layout") {
    const cards = [
      {
        title: "Ansible Devtools MCP",
        items: [
          "Lint & auto-fix",
          "Scaffold projects",
          "Navigate collections",
          "Build execution environments",
        ],
      },
      {
        title: "AAP MCP",
        items: [
          "Job management",
          "Inventory queries",
          "System monitoring",
          "Gateway endpoints",
        ],
      },
    ];
    cards.forEach((c, i) => {
      const xOff = 0.8 + i * 5.8;
      slide.addShape("roundRect", {
        x: xOff,
        y: yPos,
        w: 5.2,
        h: 3.0,
        fill: { color: RH_GRAY },
        rectRadius: 0.1,
        line: { color: RH_RED, width: 1.5 },
      });
      slide.addText(c.title, {
        x: xOff + 0.3,
        y: yPos + 0.15,
        w: 4.6,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: RH_RED,
        fontFace: FONT,
      });
      c.items.forEach((item, j) => {
        slide.addText(item, {
          x: xOff + 0.5,
          y: yPos + 0.7 + j * 0.5,
          w: 4.2,
          h: 0.4,
          fontSize: 13,
          color: RH_TEXT,
          fontFace: FONT,
          bullet: { code: "25B8", color: RH_RED },
        });
      });
    });
    yPos += 3.3;
  } else {
    for (const sub of data.subContent) {
      if (sub.type === "heading") {
        slide.addText(sub.text, {
          x: 0.8,
          y: yPos,
          w: 11,
          h: 0.5,
          fontSize: 18,
          bold: true,
          color: RH_TEXT,
          fontFace: FONT,
        });
        yPos += 0.55;
      }
    }

    if (data.bullets.length > 0) {
      const bulletTexts = data.bullets.map((b) => {
        const opts = {
          fontSize: 15,
          color: RH_TEXT,
          fontFace: FONT,
          bullet: { code: "25B8", color: RH_RED },
          paraSpaceAfter: 6,
          breakLine: true,
        };
        if (b.bold) {
          return [
            { text: `${b.bold}: `, options: { ...opts, bold: true } },
            { text: b.text, options: { ...opts, bullet: false } },
          ];
        }
        return { text: b.text, options: opts };
      });

      slide.addText(bulletTexts.flat(), {
        x: 0.8,
        y: yPos,
        w: 11,
        h: 5.5 - yPos,
        valign: "top",
        lineSpacingMultiple: 1.3,
      });
    }

    if (data.hasMermaid && data.bullets.length === 0) {
      slide.addText(
        `[Diagram: ${data.mermaidType || "flowchart"} — recreate in Google Slides]`,
        {
          x: 1.5,
          y: 2.5,
          w: 10,
          h: 2.0,
          fontSize: 16,
          color: RH_MUTED,
          fontFace: FONT,
          align: "center",
          valign: "middle",
          italic: true,
          fill: { color: RH_GRAY },
          shape: "roundRect",
          rectRadius: 0.1,
        }
      );
    }
  }

  addFooter(slide, false);
  return slide;
}

function renderSlide(pptx, data) {
  if (data.type === "title-red") return renderTitleRedSlide(pptx, data);
  if (data.type === "thank-you") return renderThankYouSlide(pptx, data);
  if (data.type.startsWith("divider")) return renderDividerSlide(pptx, data);
  return renderContentSlide(pptx, data);
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.title = "The Ansible Developer Experience";
  pptx.subject = "From individual setup to enterprise workspace";
  pptx.company = "Red Hat";
  pptx.author = "Red Hat Ansible Team";
  pptx.layout = "LAYOUT_WIDE";

  const files = [
    "core.md",
    "module-a-adt.md",
    "module-b-ai.md",
    "module-c-devspaces.md",
    "module-d-cicd.md",
    "module-e-migration.md",
  ];

  let totalSlides = 0;

  for (const file of files) {
    const slides = parseSlides(file);
    for (const data of slides) {
      renderSlide(pptx, data);
      totalSlides++;
    }
  }

  const { mkdirSync } = await import("fs");
  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = resolve(OUT_DIR, "ansible-devex.pptx");
  await pptx.writeFile({ fileName: outPath });
  console.log(`Generated ${totalSlides} slides → ${outPath}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
