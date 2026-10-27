import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Application } from './application';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  getAll(): Observable<Application[]> {
    const list: Application[] = [
      { id: 1, company: 'Techwave Studio', jobTitle: 'Développeur Front-end', status: 'sent', applyDate: '2026-10-20' },
      { id: 2, company: 'Limagrain', jobTitle: 'Développeur Symfony', status: 'waiting', applyDate: '2026-10-18' },
      { id: 3, company: 'Sopra Steria', jobTitle: 'Développeur Full Stack', status: 'to_follow_up', applyDate: '2026-10-15' },
      { id: 4, company: 'Capgemini', jobTitle: 'Concepteur Développeur', status: 'interview', applyDate: '2026-10-12' },
      { id: 5, company: 'Orange', jobTitle: 'Développeur Web', status: 'accepted', applyDate: '2026-10-10' },
      { id: 6, company: 'Thales', jobTitle: 'Développeur PHP', status: 'refused', applyDate: '2026-10-05' },
      { id: 7, company: 'Airbus', jobTitle: 'Développeur Front', status: 'waiting', applyDate: '2026-10-01' },
    ];
    return of(list).pipe(delay(500));
  }
}