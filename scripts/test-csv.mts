// Test simple del parser de CSV: node scripts/test-csv.mjs
import assert from 'node:assert'
import { parseCSV, csvAObjetos } from '../src/lib/csv.ts'

const csv = `referencia,titulo,precio,descripcion
PS-200,"Casa con ""vista al lago""",120000,"Living, cocina y patio"
PS-201,Casa simple,80000,"Sin comillas ni comas"`

const filas = parseCSV(csv)
assert.strictEqual(filas.length, 3, 'debe haber 3 filas (encabezado + 2)')
assert.strictEqual(filas[1][1], 'Casa con "vista al lago"', 'comillas escapadas')
assert.strictEqual(filas[1][3], 'Living, cocina y patio', 'coma dentro de campo entre comillas')

const objetos = csvAObjetos(csv)
assert.strictEqual(objetos.length, 2)
assert.strictEqual(objetos[0].referencia, 'PS-200')
assert.strictEqual(objetos[1].precio, '80000')

console.log('OK: parser de CSV pasa los tests (comillas, comas, filas simples).')
