import { v4 } from "uuid";
import React, { Dispatch, SetStateAction } from "react";

export const studyContext = React.createContext<[study, Dispatch<SetStateAction<study>>]>([{
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
    ImageAnnotations: []
}, () => {}])
