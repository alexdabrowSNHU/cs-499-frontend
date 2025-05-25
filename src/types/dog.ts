import type {Animal} from './animal';

type Dog = Animal & {
    breed?: string;
};

export type { Dog };