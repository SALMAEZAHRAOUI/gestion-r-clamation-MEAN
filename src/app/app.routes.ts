import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CitoyenDashboardComponent } from './citoyen-dashboard/citoyen-dashboard.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListColliersComponent } from './list-colliers/list-colliers.component';
import { AssignCollierComponent } from './assign-collier/assign-collier.component';
import { AddCollierComponent } from './add-collier/add-collier.component';
import { CourrierDashboardComponent } from './courrier-dashboard/courrier-dashboard.component';
import { DashboardAgentComponent } from './dashboard-agent/dashboard-agent.component';
import { EnvoyerReclamationComponent } from './envoyer-reclamation/envoyer-reclamation.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AssignationReclamationComponent } from './assignation-reclamation/assignation-reclamation.component';
import { RegisterAssociationComponent } from './register-association/register-association.component';
import { AssociationComponent } from './association/association.component';
import { EnvoyerReclmationParAssociationComponent } from './envoyer-reclmation-par-association/envoyer-reclmation-par-association.component';
import { ListeReclamationAssigneeComponent } from './liste-reclamation-assignee/liste-reclamation-assignee.component';
import { ListeReclamationAssociationComponent } from './liste-reclamation-association/liste-reclamation-association.component';
import { ReclamtionagentComponent } from './reclamtionagent/reclamtionagent.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'citoyen', component: CitoyenDashboardComponent },
  { path: 'responsable', component: ResponsableDashboardComponent},
  { path: 'adduser', component: AddUserComponent},//ListUsersComponent
  { path: 'ListUsers', component: ListUsersComponent},
  { path: 'Listcollier', component: ListColliersComponent},//DashboardAgentComponent
  { path: 'agent', component: DashboardAgentComponent},
  { path: 'assigncollier', component: AssignCollierComponent},
  { path: 'addcollier', component: AddCollierComponent},
  { path: 'dashboardcollier', component: CourrierDashboardComponent},//EnvoyerReclamationComponent 
  { path: 'EnvoyerReclamation', component: EnvoyerReclamationComponent },//ReclamationListComponent
  { path: 'listReclamation', component: ReclamationListComponent },//ChatbotComponent
  { path: 'chatbot', component: ChatbotComponent },//
  { path: 'assignation', component: AssignationReclamationComponent },//
  { path: 'registerAssociation', component: RegisterAssociationComponent},
  { path: 'association', component: AssociationComponent},//
  { path: 'envoyerrecassociation', component: EnvoyerReclmationParAssociationComponent},//ListeReclamationAssigneeComponent
  { path: 'listassignation', component: ListeReclamationAssigneeComponent},//
  { path: 'mes-reclamations-association', component: ListeReclamationAssociationComponent },
  {path: 'reclamationsagent', component: ReclamtionagentComponent }
];

