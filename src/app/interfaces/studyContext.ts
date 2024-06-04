import { v4 } from "uuid";
import React, { Dispatch, SetStateAction } from "react";
import { study, Annotation, ImageSelection } from "@/app/interfaces/study";

export const studyContext = React.createContext<[study, Dispatch<SetStateAction<study>>]>([{
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
    ImageAnnotations: new Map<string, Annotation[]>(),
    ImageSelection: new Map<string, ImageSelection>(),
}, () => {}])
