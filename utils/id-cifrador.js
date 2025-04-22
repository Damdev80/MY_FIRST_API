import { parse } from 'uuid'

export function uuidToBin(uuid) {
  return Buffer.from(parse(uuid)) // convierte UUID (string) a BINARY(16)
}