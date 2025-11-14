export interface TaskTodo {
  id: number;
  title: string;
  category: string;
  icon: string;
  priority: 'low' | 'medium' | 'high';
}