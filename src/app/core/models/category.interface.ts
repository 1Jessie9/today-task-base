export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryWithCount extends Category {
  taskCount: number;
}