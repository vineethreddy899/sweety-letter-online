export type Letter={id:string;toName?:string;fromName?:string;body:string;passwordHash?:string;sealed:boolean;createdAt:string};
export type LetterMetadata={id:string;toName?:string;fromName?:string;hasPassword:boolean;sealed:boolean;createdAt:string};
export type UnlockedLetter={body:string;toName?:string;fromName?:string};
export type CreateLetterInput={toName?:string;fromName?:string;body:string;password?:string};
export const MAX_BODY_LENGTH=10000; export const MAX_NAME_LENGTH=100;
