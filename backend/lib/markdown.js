"use client";

import React, { useState } from "react";

// Interactive Code Block with copy feedback
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-xl group">
      <div className="flex justify-between items-center px-5 py-2.5 bg-white/[0.02] border-b border-white/5 text-xs text-gray-500 font-mono">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Inline Markdown formatting parser
export function parseInline(text) {
  if (!text) return "";

  let tokens = [{ type: "text", content: text }];

  // 1. Parse Links: [text](url)
  tokens = tokens.flatMap((token) => {
    if (token.type !== "text") return token;
    const parts = [];
    let remaining = token.content;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;

    while ((match = linkRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: remaining.slice(lastIndex, match.index) });
      }
      parts.push({ type: "link", text: match[1], url: match[2] });
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push({ type: "text", content: remaining.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : token;
  });

  // 2. Parse Bold: **text** or __text__
  tokens = tokens.flatMap((token) => {
    if (token.type !== "text") return token;
    const parts = [];
    let remaining = token.content;
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: remaining.slice(lastIndex, match.index) });
      }
      parts.push({ type: "bold", content: match[2] });
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push({ type: "text", content: remaining.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : token;
  });

  // 3. Parse Italic: *text* or _text_ (excluding bullet asterisks)
  tokens = tokens.flatMap((token) => {
    if (token.type !== "text") return token;
    const parts = [];
    let remaining = token.content;
    const italicRegex = /(\*|_)(.*?)\1/g;
    let match;
    let lastIndex = 0;

    while ((match = italicRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: remaining.slice(lastIndex, match.index) });
      }
      parts.push({ type: "italic", content: match[2] });
      lastIndex = italicRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push({ type: "text", content: remaining.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : token;
  });

  // 4. Parse Inline Code: `code`
  tokens = tokens.flatMap((token) => {
    if (token.type !== "text") return token;
    const parts = [];
    let remaining = token.content;
    const codeRegex = /`([^`]+)`/g;
    let match;
    let lastIndex = 0;

    while ((match = codeRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: remaining.slice(lastIndex, match.index) });
      }
      parts.push({ type: "code", content: match[1] });
      lastIndex = codeRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push({ type: "text", content: remaining.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : token;
  });

  // Map tokens to React JSX nodes
  return tokens.map((token, index) => {
    switch (token.type) {
      case "bold":
        return (
          <strong key={index} className="font-extrabold text-white">
            {parseInline(token.content)}
          </strong>
        );
      case "italic":
        return (
          <em key={index} className="italic text-gray-200">
            {parseInline(token.content)}
          </em>
        );
      case "code":
        return (
          <code key={index} className="bg-zinc-900 border border-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm">
            {token.content}
          </code>
        );
      case "link":
        return (
          <a
            key={index}
            href={token.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors duration-200"
          >
            {token.text}
          </a>
        );
      case "text":
      default:
        return token.content;
    }
  });
}

// Block-Level Markdown parser to JSX
export function parseMarkdownToJSX(content) {
  if (!content) return null;

  const contentStr = typeof content === "string" ? content : "";
  // Normalize Windows line endings
  const lines = contentStr.replace(/\r\n/g, "\n").split("\n");

  const blocks = [];
  let currentCodeBlock = null;
  let currentListBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // 1. Handle Fenced Code Blocks
    if (trimmedLine.startsWith("```")) {
      if (currentCodeBlock !== null) {
        // End of code block
        blocks.push({
          type: "code-block",
          language: currentCodeBlock.language,
          code: currentCodeBlock.lines.join("\n"),
        });
        currentCodeBlock = null;
      } else {
        // Start of code block
        const lang = trimmedLine.slice(3).trim();
        currentCodeBlock = { language: lang, lines: [] };
      }
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      continue;
    }

    if (currentCodeBlock !== null) {
      currentCodeBlock.lines.push(line);
      continue;
    }

    // 2. Handle Headings
    if (trimmedLine.startsWith("# ")) {
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      blocks.push({ type: "h1", content: trimmedLine.slice(2).trim() });
      continue;
    }
    if (trimmedLine.startsWith("## ")) {
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      blocks.push({ type: "h2", content: trimmedLine.slice(3).trim() });
      continue;
    }
    if (trimmedLine.startsWith("### ")) {
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      blocks.push({ type: "h3", content: trimmedLine.slice(4).trim() });
      continue;
    }
    if (trimmedLine.startsWith("#### ")) {
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      blocks.push({ type: "h4", content: trimmedLine.slice(5).trim() });
      continue;
    }

    // 3. Handle Lists (Starts with "* " or "- ")
    const isBulletItem = trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ");
    if (isBulletItem) {
      const listContent = trimmedLine.slice(2).trim();

      // Support inline list separation in single line (e.g. "* item 1 * item 2")
      // Check if line contains " * " or " - " after stripping initial marker
      const marker = trimmedLine.startsWith("* ") ? " * " : " - ";
      let items = [];
      if (listContent.includes(marker)) {
        items = listContent.split(marker).map((item) => item.trim()).filter(Boolean);
      } else {
        items = [listContent];
      }

      if (!currentListBlock) {
        currentListBlock = { type: "list", items: [] };
      }
      currentListBlock.items.push(...items);
      continue;
    }

    // 4. Handle Blank Lines
    if (trimmedLine === "") {
      if (currentListBlock) {
        blocks.push(currentListBlock);
        currentListBlock = null;
      }
      continue;
    }

    // 5. Handle Paragraphs (Normal text)
    if (currentListBlock) {
      blocks.push(currentListBlock);
      currentListBlock = null;
    }

    // Append standard line to previous paragraph if applicable
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock && lastBlock.type === "paragraph") {
      lastBlock.content += "\n" + line;
    } else {
      blocks.push({ type: "paragraph", content: line });
    }
  }

  // Push remaining blocks
  if (currentListBlock) {
    blocks.push(currentListBlock);
  }
  if (currentCodeBlock) {
    blocks.push({
      type: "code-block",
      language: currentCodeBlock.language,
      code: currentCodeBlock.lines.join("\n"),
    });
  }

  // Render to React JSX elements
  return blocks.map((block, index) => {
    switch (block.type) {
      case "h1":
        return (
          <h1 key={index} className="text-3xl sm:text-4xl font-extrabold text-white mt-8 mb-4 tracking-tight leading-snug">
            {parseInline(block.content)}
          </h1>
        );
      case "h2":
        return (
          <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight leading-normal border-b border-white/5 pb-2">
            {parseInline(block.content)}
          </h2>
        );
      case "h3":
        return (
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 tracking-tight">
            {parseInline(block.content)}
          </h3>
        );
      case "h4":
        return (
          <h4 key={index} className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2 tracking-tight">
            {parseInline(block.content)}
          </h4>
        );
      case "list":
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2 text-[#a0a0a0]">
            {block.items.map((item, idx) => (
              <li key={idx} className="text-base font-light leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
      case "code-block":
        return <CodeBlock key={index} code={block.code} language={block.language} />;
      case "paragraph":
      default:
        // Handle double newlines inside the paragraph if they exist
        const subParagraphs = block.content.split(/\n{2,}/).filter(Boolean);
        return subParagraphs.map((subText, subIdx) => (
          <p key={`${index}-${subIdx}`} className="text-[#a0a0a0] text-base leading-relaxed font-light mb-5">
            {parseInline(subText.trim())}
          </p>
        ));
    }
  });
}

// Strips markdown characters and returns clean plain text for snippets
export function stripMarkdown(content) {
  if (!content) return "";
  let text = typeof content === "string" ? content : "";
  
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  // Remove headings
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Remove bold / italic markers
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");
  // Remove inline code
  text = text.replace(/`([^`]+)`/g, "$1");
  // Remove links: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  // Clean extra spaces and newlines
  text = text.replace(/\s+/g, " ").trim();
  
  return text;
}

