const test = require('node:test')
const assert = require('node:assert/strict')
const { normalizeDoc, sortDocs } = require('../service/firestoreRepository')

test('normalizeDoc adds id and keeps other fields', () => {
  const snapshotDoc = {
    id: 'abc123',
    data: () => ({ title: 'Hello', createdAt: 1 })
  }

  const normalized = normalizeDoc(snapshotDoc)

  assert.deepEqual(normalized, { id: 'abc123', title: 'Hello', createdAt: 1 })
})

test('sortDocs orders descending by createdAt', () => {
  const docs = [
    { id: '1', createdAt: 10 },
    { id: '2', createdAt: 30 },
    { id: '3', createdAt: 20 }
  ]

  const sorted = sortDocs(docs, 'createdAt', 'desc')

  assert.deepEqual(sorted.map((item) => item.id), ['2', '3', '1'])
})
