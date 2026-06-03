import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

let sql: NeonQueryFunction<false, false> | null = null

function assertDatabaseConfigured() {
  const url = process.env.DATABASE_URL
  if (!url) {
    // Important: do not fail during module evaluation/build in non-API contexts.
    // Throw only when DB functions are invoked.
    throw new Error(
      "DATABASE_URL environment variable is not set. Please configure a Neon database (e.g., via Vercel integration)."
    )
  }
  return url
}

function getSql() {
  if (!sql) {
    const url = assertDatabaseConfigured()
    sql = neon(url)
  }
  return sql
}

export async function initDatabase() {
  const db = getSql()
  await db`
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

  await db`
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
  const db = getSql()
  const [row] = await db`
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
  const db = getSql()
  const [row] = await db`
    INSERT INTO transactions (hash, block_number, status, gas_used, from_addr, to_addr)
    VALUES (${data.hash}, ${BigInt(data.blockNumber)}, ${data.status}, ${data.gasUsed}, ${data.from}, ${data.to})
    ON CONFLICT (hash) DO NOTHING
    RETURNING id, created_at
  `
  return row
}

export async function getRecentScans(limit = 10) {
  const db = getSql()
  return db`
    SELECT * FROM scans ORDER BY created_at DESC LIMIT ${limit}
  `
}

export async function getRecentTransactions(limit = 10) {
  const db = getSql()
  return db`
    SELECT * FROM transactions ORDER BY created_at DESC LIMIT ${limit}
  `
}
