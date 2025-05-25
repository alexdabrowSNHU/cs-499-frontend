import type {Animal} from './animal';

type Monkey = Animal & {
    species?: string;
    tailLength?: string;
    height?: string;
    bodyLength?: string;
};

export type { Monkey };