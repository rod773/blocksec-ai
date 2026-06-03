import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL ?? "")

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS scans (
      id SERIAL PRIMARY KEY,
      address TEXT NOT NULL,
      name TEXT,
      symbol TEXT,
      results JSONB NOT NULL DEFAULT '[]',
      passed INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      hash TEXT NOT NULL UNIQUE,
      block_number BIGINT,
      status TEXT,
      gas_used TEXT,
      from_addr TEXT,
      to_addr TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function saveScan(data: {
  address: string
  name: string | null
  symbol: string | null
  results: unknown[]
  passed: number
  total: number
}) {
  const [row] = await sql`
    INSERT INTO scans (address, name, symbol, results, passed, total)
    VALUES (${data.address}, ${data.name}, ${data.symbol}, ${JSON.stringify(data.results)}, ${data.passed}, ${data.total})
    RETURNING id, created_at
  `
  return row
}

export async function saveTransaction(data: {
  hash: string
  blockNumber: string
  status: string
  gasUsed: string
  from: string
  to: string | null
}) {
  const [row] = await sql`
    INSERT INTO transactions (hash, block_number, status, gas_used, from_addr, to_addr)
    VALUES (${data.hash}, ${BigInt(data.blockNumber)}, ${data.status}, ${data.gasUsed}, ${data.from}, ${data.to})
    ON CONFLICT (hash) DO NOTHING
    RETURNING id, created_at
  `
  return row
}

export async function getRecentScans(limit = 10) {
  return sql`
    SELECT * FROM scans ORDER BY created_at DESC LIMIT ${limit}
  `
}

export async function getRecentTransactions(limit = 10) {
  return sql`
    SELECT * FROM transactions ORDER BY created_at DESC LIMIT ${limit}
  `
}

export { sql }
