type Animal = {
    id: string | number;
    name?: string;
    type?: 'dog' | 'monkey' | string;
    gender?: string;
    age?: string;
    weight?: string;
    aquisitionDate?: string;
    inServiceCountry?: string;
    trainingStatus?: string;
    reserved?: boolean;
    acquisitionCountry?: string;
};

export type { Animal };