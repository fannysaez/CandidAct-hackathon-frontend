export interface Application {
    id: number;
    label: string;
    applyDate: string;
    description: string | null;
    company: Company;
    offer: Offer | null;
    applicationMethod: string | null;
    status: Status | null;
    reminders?: Reminder[];
    applicationStatus?: ApplicationStatus[];
}

export interface Company {
    id: number;
    name: string;
    city: string;
}

export interface Offer {
    id?: number,
    jobTitle: string,
    description: string,
    contractType: string,
    publicationDate: Date,
    expirationDate: Date,
    url: string
}

export interface Status {
    id: number,
    label: string
}

export interface ApplicationStatus {
    id: number,
    updateDate: Date,
    status: Status
}

export interface Reminder {
    id: number,
    label: string;
    date: Date,
}
