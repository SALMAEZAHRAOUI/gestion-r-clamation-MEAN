import { Component ,OnInit} from '@angular/core';
import { CourrierService } from '../services/CourrierService ';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-courrier-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,  MatTableModule,MatButtonModule,MatFormFieldModule, BrowserModule,
  
    MatCardModule,
    MatListModule,], // Ajout du DatePipe pour le formatage de la date

  templateUrl: './courrier-dashboard.component.html',
  styleUrl: './courrier-dashboard.component.scss'
})
export class CourrierDashboardComponent implements OnInit {
 
   ngOnInit(): void {
     // Vous pouvez ajouter des actions ici pour initialiser des données
   }
}
