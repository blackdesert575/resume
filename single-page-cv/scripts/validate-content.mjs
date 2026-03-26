import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const REQUIRED_TOP_LEVEL_KEYS = [
  "meta",
  "basics",
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "awards",
  "links",
];

const rootDir = path.resolve(import.meta.dirname, "..", "..");
const contentDir = path.join(rootDir, "content");

function fail(message) {
  throw new Error(message);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function assertString(value, message) {
  assert(typeof value === "string", message);
}

function assertArray(value, message) {
  assert(Array.isArray(value), message);
}

function validateDate(value, pattern, message) {
  assert(pattern.test(value), message);
}

function validateTopLevelShape(data, fileName) {
  for (const key of REQUIRED_TOP_LEVEL_KEYS) {
    assert(key in data, `Missing required top-level key '${key}' in ${fileName}`);
  }

  assert(isObject(data.meta), `Field 'meta' must be an object in ${fileName}`);
  assert(isObject(data.basics), `Field 'basics' must be an object in ${fileName}`);
  assertString(data.summary, `Field 'summary' must be a string in ${fileName}`);
  assertArray(data.skills, `Field 'skills' must be an array in ${fileName}`);
  assertArray(data.experience, `Field 'experience' must be an array in ${fileName}`);
  assertArray(data.projects, `Field 'projects' must be an array in ${fileName}`);
  assertArray(data.education, `Field 'education' must be an array in ${fileName}`);
  assertArray(data.certifications, `Field 'certifications' must be an array in ${fileName}`);
  assertArray(data.awards, `Field 'awards' must be an array in ${fileName}`);
  assertArray(data.links, `Field 'links' must be an array in ${fileName}`);
}

function validateMetaAndBasics(data, fileName) {
  assertString(data.meta.locale, `Field 'meta.locale' must be a string in ${fileName}`);
  assert(
    data.meta.locale === "en" || data.meta.locale === "zh",
    `Field 'meta.locale' must be 'en' or 'zh' in ${fileName}`,
  );
  assertString(data.meta.updatedAt, `Field 'meta.updatedAt' must be a string in ${fileName}`);
  validateDate(
    data.meta.updatedAt,
    /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
    `Field 'meta.updatedAt' must match YYYY-MM-DD in ${fileName}`,
  );
  assertString(data.basics.name, `Field 'basics.name' must be a string in ${fileName}`);
  assertString(data.basics.title, `Field 'basics.title' must be a string in ${fileName}`);
}

function validateSkills(data, fileName) {
  for (const [index, group] of data.skills.entries()) {
    assert(
      isObject(group),
      `Each skills entry must be an object in ${fileName} at index ${index}`,
    );
    assertString(
      group.category,
      `Each skills entry must contain string 'category' in ${fileName} at index ${index}`,
    );
    assertArray(
      group.items,
      `Each skills entry must contain array 'items' in ${fileName} at index ${index}`,
    );
    for (const [itemIndex, item] of group.items.entries()) {
      assertString(
        item,
        `Each skills.items entry must be a string in ${fileName} at index ${index}.${itemIndex}`,
      );
    }
  }
}

function validateExperience(data, fileName) {
  for (const [index, item] of data.experience.entries()) {
    assert(
      isObject(item),
      `Each experience entry must be an object in ${fileName} at index ${index}`,
    );
    assertString(
      item.company,
      `Each experience entry must contain string 'company' in ${fileName} at index ${index}`,
    );
    assertString(
      item.role,
      `Each experience entry must contain string 'role' in ${fileName} at index ${index}`,
    );
    assertString(
      item.start,
      `Each experience entry must contain string 'start' in ${fileName} at index ${index}`,
    );
    assertString(
      item.end,
      `Each experience entry must contain string 'end' in ${fileName} at index ${index}`,
    );
    validateDate(
      item.start,
      /^[0-9]{4}-[0-9]{2}$/,
      `Each experience.start must match YYYY-MM in ${fileName} at index ${index}`,
    );
    assert(
      item.end === "present" || /^[0-9]{4}-[0-9]{2}$/.test(item.end),
      `Each experience.end must match YYYY-MM or be 'present' in ${fileName} at index ${index}`,
    );
  }
}

async function validateFile(filePath) {
  const fileName = path.basename(filePath);
  console.log(`Validating JSON: ${filePath}`);
  const content = await readFile(filePath, "utf8");
  const data = JSON.parse(content);

  validateTopLevelShape(data, fileName);
  validateMetaAndBasics(data, fileName);
  validateSkills(data, fileName);
  validateExperience(data, fileName);
}

async function main() {
  const files = (await readdir(contentDir))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => path.join(contentDir, name));

  assert(files.length > 0, `No JSON files found in ${contentDir}`);

  for (const file of files) {
    await validateFile(file);
  }

  console.log("All content JSON files are valid, contain required top-level keys, and pass Node.js validator checks.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
