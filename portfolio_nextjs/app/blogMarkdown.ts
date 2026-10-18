/** Adapt older pasted articles without rewriting the stored content.
 * Explicit Markdown documents are left untouched. */
export function prepareBlogMarkdown(source: string): string {
  const text = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  if (/^\s{0,3}(?:#{1,6}\s|`{3,}|~{3,})/m.test(text)) return text;
  // A spaced ordered list is valid Markdown too. Only infer editorial
  // headings when the document also contains unmistakable pasted structures.
  const editorial = (text.match(/^\d+(?:\.\d+)*\.\s+\S.{3,110}$/gm)?.length ?? 0) >= 2
    && (/^SELECT(?:\s|$)/m.test(text) || /^using System;/m.test(text) || /^.+\|.+\n.+\|.+/m.test(text));
  const lines = text.split("\n");
  const output: string[] = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    // Numbered editorial headings occur as standalone, separated lines.
    if (editorial && /^\d+(?:\.\d+)*\.\s+\S.{3,110}$/.test(line) && !lines[index - 1]?.trim() && !lines[index + 1]?.trim()) {
      output.push(`${/^\d+\.\d/.test(line) ? "###" : "##"} ${line}`);
      continue;
    }
    if (/^Adım \d+\s*:/i.test(line) && !lines[index - 1]?.trim() && !lines[index + 1]?.trim()) {
      output.push(`### ${line}`); continue;
    }
    // A run of pipe rows without a Markdown separator is a pasted table.
    if (line.includes("|") && !lines[index - 1]?.trim()) {
      const rows = [line];
      while (lines[index + 1]?.trim() && lines[index + 1].includes("|")) rows.push(lines[++index]);
      const cells = (row: string) => row.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|");
      const width = cells(rows[0]).length;
      if (rows.length > 1 && width > 1 && rows.every(row => cells(row).length === width)) {
        output.push(rows[0]);
        if (!cells(rows[1]).every(cell => /^\s*:?-{3,}:?\s*$/.test(cell))) output.push(Array(width).fill("---").join(" | "));
        output.push(...rows.slice(1)); continue;
      }
      output.push(...rows); continue;
    }
    if (/^SELECT(?:\s|$)/.test(line) && !lines[index - 1]?.trim()) {
      const code = [line];
      let end = index;
      while (!/;\s*$/.test(code[code.length - 1]) && end + 1 < lines.length && end - index < 60) code.push(lines[++end]);
      if (/;\s*$/.test(code[code.length - 1])) { output.push("```sql", ...code, "```"); index = end; continue; }
    }
    if (/^using System;\s*$/.test(line)) {
      let end = index;
      let balance = 0;
      let hasBrace = false;
      for (; end < lines.length && end - index < 100; end++) {
        for (const char of lines[end]) { if (char === "{") { balance++; hasBrace = true; } else if (char === "}") balance--; }
        if (hasBrace && balance === 0) break;
      }
      if (hasBrace && balance === 0) { output.push("```csharp", ...lines.slice(index, end + 1), "```"); index = end; continue; }
    }
    output.push(line);
  }
  return output.join("\n");
}
