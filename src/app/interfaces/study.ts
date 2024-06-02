export interface study {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    submittedAt: Date;
    ImageAnnotations: Map<string, Annotation[]>;
}

export interface Annotation {
    tool: string;
    points: Point[];
}

export interface Point {
    x: number;
    y: number;
}
