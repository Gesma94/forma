'use server';

import { isNil } from 'es-toolkit';

export async function postDiscord(message: string, data: Record<string, unknown>): Promise<void> {
  if (isNil(process.env.DISCORD_WEBHOOK)) {
    return;
  }

  const computedContent = [`**${message}**`, '', ...formatData(data)].join('\n');

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: computedContent })
  });
}

function formatData(data: Record<string, unknown>, indent = ''): string[] {
  return Object.entries(data).flatMap(([key, value]) => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return [`${indent}**${key}**:`, ...formatData(value as Record<string, unknown>, `${indent}    `)];
    }

    if (Array.isArray(value)) {
      return [
        `${indent}**${key}**:`,
        ...value.map((v, i) =>
          typeof v === 'object' ? `${indent}  [${i}]: ${JSON.stringify(v)}` : `${indent}  [${i}]: ${v}`
        )
      ];
    }

    return [`${indent}**${key}**: ${value}`];
  });
}
