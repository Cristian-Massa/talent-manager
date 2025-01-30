import fs from "fs";
import path from "path";
export function getMailTemplates(file: string) {
  const fileRaw = path.join(process.cwd(), "public", "mail-templates", file);

  if (!fileRaw) throw new Error("File doesnt exists");

  const htmlContent = fs.readFileSync(fileRaw, "utf8");

  return htmlContent;
}
