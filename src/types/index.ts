export interface Link {
    name: string;
    url: string;
}

export interface ListWithDetailRow {
    primary: string;
    secondary: string;
    startDate: string;
    endDate: string;
    detail: string;
    image?: string;
    links?: Link[] | undefined;
}

export interface Experience {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    image?: string;
    links?: Link[];
}

export interface Project {
    name: string;
    secondary: string;
    startDate: string;
    endDate: string;
    description: string;
    image: string;
    links?: Link[];
}
export interface Education {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
    image?: string;
}