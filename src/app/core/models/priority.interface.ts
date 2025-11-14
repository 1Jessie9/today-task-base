export type Priority = 'low' | 'medium' | 'high';

export interface PriorityInterface {
  level: Priority;
  label: string;
  color: string;
}

export enum PriorityEnum {
  'low' = 'baja',
  'medium' = 'media',
  'high' = 'alta',
}