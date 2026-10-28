export interface Application {
    id: number;
    label: string;
    applyDate: string;
    description: string | null;
    company: Company;
    offer: Offer | null;
}

export interface Company {
    id: number;
    name: string;
    city: string;
}

export interface Offer {
    id: number,
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

export interface StatusApplication {
    id: number,
    updateDate: Date,
    application: Application,
    status: Status
}
