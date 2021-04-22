export enum EStatus { Open, Started, Completed }

export interface IBracket {
  id: string;
  title: string;
  status: EStatus;
  bracketSubmissionDeadline: Date;
  completedDateTime: Date;
  winnerId: string;
}
