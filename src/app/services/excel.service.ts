import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  generateEmptyMembreTemplate() {
    const ws = XLSX.utils.aoa_to_sheet([['cin', 'nom', 'prenom','role']]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Membres');
    XLSX.writeFile(wb, 'template_membres.xlsx');
  }

  async extractMembresFromFile(file: File): Promise<any[]> {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet); // Retourne un tableau d'objets { cin, nom, prenom }
  }
}
