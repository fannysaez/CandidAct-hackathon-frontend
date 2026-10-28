export interface Application {
    id: number;
    label: string;
    applyDate: string;
    description: string | null;
    company: Company;
    offer: Offer | null;
    applicationMethod: string | null;
    status: string | null;
    reminders?: Reminder[];
    applicationsStatus?: ApplicationStatus[];
}

export interface Company {
    id: number;
    name: string;
    city: string;
}

export interface Offer {
    id?: number;
    jobTitle: string;
    description: string;
    contractType: string | null;
    publicationDate: string;
    expirationDate: string | null;
    url?: string | null;
}

export interface Reminder {
    id: number;
    label: string;
    date: string;
}

export interface ApplicationStatus {
    id: number;
    updateDate: string;
    status: { label: string };
}

export interface ApplicationMethod {
    id: number;
    label: string;
}