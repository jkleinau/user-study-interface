interface study {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    submittedAt: Date;
    ImageAnnotations: Map<string, ImageAnnotations>;
}

interface ImageAnnotations {
    tool: string;
    points: Point[];
}

interface Point {
    x: number;
    y: number;
}
