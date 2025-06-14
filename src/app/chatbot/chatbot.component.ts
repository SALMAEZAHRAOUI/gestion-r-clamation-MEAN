import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  userInput = '';
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  isTyping = false;
  pdfUrl = '';
  recognition: any;
  isListening = false;
  lastInputSource: 'voice' | 'text' = 'text'; // 🆕

  communesSidiBennour = [
    'Sidi Bennour', 'Azraoula', 'Bouhmame', 'Kridid', 'Lâatattra',
    'Lmechrek', 'El Aounate', 'Saniat Berkik', 'Ghnadra',
    'Oulad Amrane', 'Oulad Boussaken', 'Oulad Si Bouhya',
    'Oulad Si Bouaziz', 'El Mechrek', 'Oulad Sbita'
  ];

  currentStep = 0;
  reclamationData = { type: '', description: '', commune: '' };

  faq = [
    { question: 'types', answer: `📋 Voici quelques types de réclamations :\n- Problème d'eau\n- Coupure d'électricité\n- Voirie\n- Déchets\n- Administration\n- Sécurité\n- Transport` },
    { question: 'droit', answer: `🧾 Tout citoyen peut :\n- Soumettre une réclamation\n- Recevoir un accusé de réception\n- Être informé du traitement\n- Obtenir une réponse dans un délai raisonnable\n\n➡️ Pour soumettre une réclamation, indiquez :\nType: ...\nDescription: ...\nCommune: ...` },
    { question: 'communes', answer: '📍 Voici les communes de la province de Sidi Bennour :\n' + this.communesSidiBennour.map(c => `- ${c}`).join('\n') }
  ];

  intents = {
    types: ['types', 'catégorie', 'genre', 'nature'],
    droits: ['droit', 'droits', 'privilège'],
    générer: ['générer', 'créer', 'faire', 'envoyer'],
    communes: ['commune', 'communes', 'ville', 'localité', 'liste des communes']
  };

  constructor(private router: Router) {}

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ text: message, sender: 'user' });
    this.userInput = '';
    this.isTyping = true;
    this.lastInputSource = this.lastInputSource || 'text'; // sécurité

    const botResponse = this.generateBotResponse(message);

    if (botResponse) {
      const useVoice = this.lastInputSource === 'voice';
      this.addBotMessage(botResponse, useVoice);
    }
  }

  generateBotResponse(message: string): string {
    if (this.currentStep > 0) {
      this.handleReclamationDialogue(message);
      return '';
    }

    const intent = this.detectIntent(message);
    if (intent) {
      switch (intent) {
        case 'types':
        case 'droits':
        case 'communes':
          return this.getFAQAnswer(intent);
        case 'générer':
          this.startReclamationDialogue();
          return '';
        default:
          return this.defaultReply();
      }
    } else {
      if (this.tryExtractReclamation(message)) {
        this.generateReclamationPDF(this.reclamationData);
        return '';
      } else {
        return this.defaultReply();
      }
    }
  }

  detectIntent(msg: string): string | null {
    const message = msg.toLowerCase();
    for (const intent in this.intents) {
      if (this.intents[intent as keyof typeof this.intents].some(k => message.includes(k))) {
        return intent;
      }
    }
    return null;
  }

  getFAQAnswer(keyword: string): string {
    const faqItem = this.faq.find(f => f.question === keyword);
    return faqItem ? faqItem.answer : '';
  }

  defaultReply(): string {
    return ` Bonjour ! Je suis votre assistant virtuel.\nVoici ce que je peux faire pour vous :\n
- Déposer une réclamation
- Connaître vos droits
- Voir les communes disponibles
- Générer un PDF de votre réclamation\n
Écrivez ce que vous souhaitez faire ou utilisez la voix 🎤.`;
  }

  startReclamationDialogue() {
    this.currentStep = 1;
    this.reclamationData = { type: '', description: '', commune: '' };
    this.addBotMessage('D’accord, commençons la création de votre réclamation.\nQuel est le type de réclamation ?', this.lastInputSource === 'voice');
  }

  handleReclamationDialogue(userMsg: string) {
    const useVoice = this.lastInputSource === 'voice';
    if (this.currentStep === 1) {
      this.reclamationData.type = userMsg;
      this.currentStep++;
      this.addBotMessage('Merci. Veuillez décrire la réclamation en détail.', useVoice);
    } else if (this.currentStep === 2) {
      this.reclamationData.description = userMsg;
      this.currentStep++;
      this.addBotMessage('Enfin, dans quelle commune se situe le problème ?', useVoice);
    } else if (this.currentStep === 3) {
      const commune = userMsg.trim();
      if (!this.communesSidiBennour.map(c => c.toLowerCase()).includes(commune.toLowerCase())) {
        this.addBotMessage(`Cette commune n'est pas dans la liste. Veuillez choisir parmi :\n${this.communesSidiBennour.join(', ')}`, useVoice);
        return;
      }
      this.reclamationData.commune = commune;
      this.currentStep = 0;
      this.generateReclamationPDF(this.reclamationData);
    }
  }

  tryExtractReclamation(message: string): boolean {
    const typeMatch = message.match(/type\s*:\s*([^\n\r]+)/i);
    const descriptionMatch = message.match(/description\s*:\s*([^\n\r]+)/i);
    const communeMatch = message.match(/commune\s*:\s*([^\n\r]+)/i);

    if (typeMatch && descriptionMatch && communeMatch) {
      this.reclamationData.type = typeMatch[1].trim();
      this.reclamationData.description = descriptionMatch[1].trim();
      this.reclamationData.commune = communeMatch[1].trim();

      if (!this.communesSidiBennour.some(c => c.toLowerCase() === this.reclamationData.commune.toLowerCase())) {
        this.addBotMessage(`La commune "${this.reclamationData.commune}" n'est pas reconnue. Veuillez utiliser une commune valide.`, this.lastInputSource === 'voice');
        return false;
      }
      return true;
    }
    return false;
  }

  addBotMessage(text: string, useSpeech: boolean = false) {
    this.messages.push({ text, sender: 'bot' });
    if (useSpeech) {
      this.speak(text);
    }
    this.isTyping = false;
  }

  speak(text: string) {
    if (!('speechSynthesis' in window)) {
      console.warn('Synthèse vocale non supportée');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  }

  startVoiceRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Reconnaissance vocale non supportée, essayez Chrome.');
      return;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput = transcript;
      this.lastInputSource = 'voice'; // 🆕
      this.sendMessage();
    };

    this.recognition.onerror = () => {
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
  }

  generateReclamationPDF(data: { type: string; description: string; commune: string }) {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();

    doc.setFontSize(16);
    doc.text('Réclamation - Province de Sidi Bennour', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date : ${dateStr}`, 20, 30);
    doc.text(`Commune : ${data.commune}`, 20, 40);
    doc.text(`Type : ${data.type}`, 20, 50);
    doc.text('Description :', 20, 60);
    doc.text(data.description, 20, 70, { maxWidth: 170 });

    const pdfDataUri = doc.output('datauristring');
    this.pdfUrl = pdfDataUri;
    const useVoice = this.lastInputSource === 'voice';

    this.addBotMessage('Votre réclamation a été générée en PDF. Vous pouvez la télécharger ci-dessous.', useVoice);
    this.addBotMessage('Merci pour votre confiance. N’hésitez pas à soumettre une nouvelle réclamation ou consulter vos droits.', useVoice);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  EnvoyerReclamation() {
    this.router.navigate(['/EnvoyerReclamation']);
  }

  home() {
    this.router.navigate(['/citoyen']);
  }

  chatbot() {
    this.router.navigate(['/chatbot']);
  }
}
