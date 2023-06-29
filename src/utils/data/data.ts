import { capitalizeWords } from "../strings"
import { EnrollStats, Structure, TableData } from "../types"

function tableToFloat(v: string | number) {
  const s = v.toString().replace(",", ".")
  const parsed = parseFloat(s)
  return parsed
}

export default class Store {
  _data: Structure
  constructor(data: Structure) {
    this._data = data
    this.fixLetterCase()
  }

  get data() {
    return this._data
  }

  protected fixLetterCase(): void {
    this._data.forEach(school => {
      school.years.forEach(year => {
        year.phases.forEach(phase => {
          phase.courses.forEach(course => {
            course.name = capitalizeWords(course.name)
          })
        })
      })
    })
  }

  public static getEnrollStats(table: TableData): EnrollStats {
    // check if table is ABS_ORDER
    if (!table.length || table[0].length <= 5) return null

    const candidates = table.length
    const firstNo = table.findIndex(row => row[2].toString().startsWith("No"))
    if (firstNo === 0) {
      // no candidates allowed
      return {
        candidates,
        allowed: 0,
        allowedPct: "0%",
        minScoreToPass: 0
      }
    } else if (firstNo === -1) {
      // all candidates allowed
      return {
        candidates,
        allowed: candidates,
        allowedPct: "100%",
        minScoreToPass: tableToFloat(table[candidates - 1][3])
      }
    } else {
      // some candidates allowed
      const lastYes = firstNo === -1 ? candidates - 1 : firstNo - 1
      const allowed = firstNo === -1 ? candidates : firstNo
      const allowedPct = firstNo === -1 ? 100 : (allowed * 100) / candidates
      const minScoreToPass =
        table[lastYes].length > 3 ? tableToFloat(table[lastYes][3]) : 0

      return {
        candidates,
        allowed,
        allowedPct: allowedPct.toFixed(1) + "%",
        minScoreToPass
      }
    }
  }


  static tableToCsv(table: TableData, header?: string[]): string {
    let s = ""
    if (header) {
      for (let i = 0; i < header.length; i++) {
        s += header[i]
        s += ";"
      }
      s += "\n"
    }
    for (let i = 0; i < table.length; i++) {
      const row = table[i]
      for (let j = 0; j < row.length; j++) {
        s += row[j].toString().replace(",", ".")
        s += ";"
      }
      s += "\n"
    }
    return s

  }
}
