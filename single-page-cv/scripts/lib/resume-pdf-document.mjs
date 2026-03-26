import React from "react";
import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatResumeMonth } from "./pdf-copy.mjs";

const h = React.createElement;

function createStyles(fontFamily) {
  return StyleSheet.create({
    page: {
      paddingTop: 36,
      paddingRight: 36,
      paddingBottom: 40,
      paddingLeft: 36,
      fontFamily,
      fontSize: 10,
      lineHeight: 1.45,
      color: "#111827",
      backgroundColor: "#ffffff",
    },
    shell: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#cbd5e1",
      borderBottomStyle: "solid",
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
    },
    title: {
      fontSize: 12,
      color: "#334155",
    },
    summary: {
      fontSize: 10,
      color: "#1f2937",
    },
    contactRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      color: "#334155",
      fontSize: 9,
    },
    contactLink: {
      color: "#0f172a",
      textDecoration: "none",
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      gap: 18,
      alignItems: "flex-start",
    },
    mainColumn: {
      flexGrow: 1.55,
      flexBasis: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    sideColumn: {
      flexGrow: 1,
      flexBasis: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.9,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#d1d5db",
      borderBottomStyle: "solid",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      borderBottomStyle: "solid",
    },
    compactCard: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    cardHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10,
    },
    role: {
      fontSize: 11,
      fontWeight: 700,
    },
    company: {
      color: "#334155",
      fontSize: 10,
    },
    dateRange: {
      fontSize: 9,
      color: "#475569",
      textAlign: "right",
      minWidth: 92,
    },
    paragraph: {
      color: "#1f2937",
    },
    bulletList: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    bulletRow: {
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "flex-start",
    },
    bulletMark: {
      width: 8,
      fontSize: 9,
      marginTop: 1,
    },
    bulletText: {
      flexGrow: 1,
      flexBasis: 0,
      fontSize: 9.5,
    },
    tagRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    tag: {
      paddingTop: 2,
      paddingRight: 6,
      paddingBottom: 2,
      paddingLeft: 6,
      borderWidth: 1,
      borderColor: "#cbd5e1",
      borderStyle: "solid",
      borderRadius: 999,
      fontSize: 8.5,
      color: "#334155",
    },
    inlineLink: {
      color: "#0f172a",
      textDecoration: "none",
      fontSize: 9,
    },
    muted: {
      color: "#475569",
      fontSize: 9,
    },
    footer: {
      marginTop: 12,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      borderTopStyle: "solid",
      fontSize: 8.5,
      color: "#64748b",
    },
  });
}

function section(styles, title, children) {
  return h(
    View,
    { style: styles.section },
    h(Text, { style: styles.sectionTitle }, title),
    children,
  );
}

function bulletList(styles, items) {
  return h(
    View,
    { style: styles.bulletList },
    ...items.map((item, index) =>
      h(
        View,
        { key: `${item}-${index}`, style: styles.bulletRow },
        h(Text, { style: styles.bulletMark }, "\u2022"),
        h(Text, { style: styles.bulletText }, item),
      ),
    ),
  );
}

function tags(styles, items) {
  return h(
    View,
    { style: styles.tagRow },
    ...items.map((item) => h(Text, { key: item, style: styles.tag }, item)),
  );
}

function experienceSection(styles, copy, resume) {
  return section(
    styles,
    copy.experience,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 10 } },
      ...resume.experience.map((job) =>
        h(
          View,
          { key: `${job.company}-${job.start}`, style: styles.card, wrap: false },
          h(
            View,
            { style: styles.cardHeader },
            h(
              View,
              null,
              h(Text, { style: styles.role }, job.role),
              h(Text, { style: styles.company }, job.company),
            ),
            h(
              Text,
              { style: styles.dateRange },
              `${formatResumeMonth(job.start, resume.meta.locale)} - ${formatResumeMonth(job.end, resume.meta.locale)}`,
            ),
          ),
          bulletList(styles, job.highlights),
          job.technologies?.length ? tags(styles, job.technologies) : null,
        ),
      ),
    ),
  );
}

function projectsSection(styles, copy, resume) {
  return section(
    styles,
    copy.projects,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 10 } },
      ...resume.projects.map((project) =>
        h(
          View,
          { key: project.name, style: styles.card, wrap: false },
          h(
            View,
            { style: styles.cardHeader },
            h(Text, { style: styles.role }, project.name),
            project.repository
              ? h(Link, { src: project.repository, style: styles.inlineLink }, copy.repository)
              : null,
          ),
          h(Text, { style: styles.paragraph }, project.description),
          project.highlights?.length ? bulletList(styles, project.highlights) : null,
          project.technologies?.length ? tags(styles, project.technologies) : null,
        ),
      ),
    ),
  );
}

function skillsSection(styles, copy, resume) {
  return section(
    styles,
    copy.skills,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      ...resume.skills.map((group) =>
        h(
          View,
          { key: group.category, style: styles.compactCard, wrap: false },
          h(Text, { style: styles.role }, group.category),
          tags(styles, group.items),
        ),
      ),
    ),
  );
}

function educationSection(styles, copy, resume) {
  return section(
    styles,
    copy.education,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      ...resume.education.map((item) =>
        h(
          View,
          { key: `${item.school}-${item.start}`, style: styles.compactCard, wrap: false },
          h(Text, { style: styles.role }, item.degree),
          h(Text, { style: styles.company }, item.school),
          h(Text, { style: styles.muted }, `${item.start} - ${item.end}${item.location ? ` | ${item.location}` : ""}`),
        ),
      ),
    ),
  );
}

function certificationsSection(styles, copy, resume) {
  if (!resume.certifications?.length) {
    return null;
  }

  return section(
    styles,
    copy.certifications,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      ...resume.certifications.map((item) =>
        h(
          View,
          { key: item.name, style: styles.compactCard, wrap: false },
          h(Text, { style: styles.role }, item.name),
          h(Text, { style: styles.company }, item.issuer),
        ),
      ),
    ),
  );
}

function awardsSection(styles, copy, resume) {
  if (!resume.awards?.length) {
    return null;
  }

  return section(
    styles,
    copy.awards,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      ...resume.awards.map((item, index) =>
        h(
          View,
          { key: `${item.name ?? "award"}-${index}`, style: styles.compactCard, wrap: false },
          h(Text, { style: styles.role }, item.name ?? item.title ?? ""),
          item.issuer ? h(Text, { style: styles.company }, item.issuer) : null,
          item.year ? h(Text, { style: styles.muted }, `${item.year}`) : null,
        ),
      ),
    ),
  );
}

function linksSection(styles, copy, resume) {
  if (!resume.links?.length) {
    return null;
  }

  return section(
    styles,
    copy.links,
    h(
      View,
      { style: { display: "flex", flexDirection: "column", gap: 6 } },
      ...resume.links.map((item) =>
        h(
          View,
          { key: item.url, style: styles.compactCard, wrap: false },
          h(Link, { src: item.url, style: styles.inlineLink }, item.label),
        ),
      ),
    ),
  );
}

export function createResumePdfDocument({ resume, copy, fontFamily }) {
  const styles = createStyles(fontFamily);
  const { basics } = resume;

  return h(
    Document,
    {
      author: basics.name,
      title: `${basics.name} Resume`,
      subject: basics.title,
      language: resume.meta.locale === "zh" ? "zh-TW" : "en-US",
      keywords: "resume,cv,devops,sre,system engineer",
    },
    h(
      Page,
      { size: "A4", style: styles.page },
      h(
        View,
        { style: styles.shell },
        h(
          View,
          { style: styles.header },
          h(Text, { style: styles.name }, basics.name),
          h(Text, { style: styles.title }, basics.title),
          h(Text, { style: styles.summary }, resume.summary),
          h(
            View,
            { style: styles.contactRow },
            h(Link, { src: `mailto:${basics.email}`, style: styles.contactLink }, basics.email),
            basics.github ? h(Link, { src: basics.github, style: styles.contactLink }, basics.github) : null,
            basics.location ? h(Text, null, basics.location) : null,
          ),
        ),
        h(
          View,
          { style: styles.grid },
          h(
            View,
            { style: styles.mainColumn },
            experienceSection(styles, copy, resume),
            projectsSection(styles, copy, resume),
          ),
          h(
            View,
            { style: styles.sideColumn },
            skillsSection(styles, copy, resume),
            educationSection(styles, copy, resume),
            certificationsSection(styles, copy, resume),
            awardsSection(styles, copy, resume),
            linksSection(styles, copy, resume),
          ),
        ),
        h(Text, { style: styles.footer }, copy.generatedBy),
      ),
    ),
  );
}
