import { Injectable, computed, signal } from '@angular/core';
import { DatabaseService } from './database.service';
import { CategoryWithCount } from '../models/category.interface';
import { TaskTodo } from '../models/task.interface';
import { CREATE_CATEGORY, GET_CATEGORIES_WITH_TASK_COUNT, GET_CATEGORY_BY_ID, UPDATE_CATEGORY } from '../queries/categories.query';
import { CREATE_TASK, DELETE_TASK, GET_TASK_BY_CATEGORY, TASKS, TOGGLE_TASK_COMPLETED } from '../queries/tasks.query';

@Injectable({ providedIn: 'root' })
export class TodoStoreService {
  private categories = signal<CategoryWithCount[]>([]);
  private tasks = signal<TaskTodo[]>([]);
  public readonly categoriesSignal = computed(() => this.categories());
  public readonly tasksSignal = computed(() => this.tasks());

  constructor(private db: DatabaseService) {
    this.loadInitialData();
  }

  async loadInitialData() {
    await this.loadCategories();
    await this.loadTasks();
  }

  async loadCategories() {
    const rows = await this.db.query(GET_CATEGORIES_WITH_TASK_COUNT);

    this.categories.set(
      rows.map(row => ({
        id: row.id,
        name: row.name,
        color: row.color,
        icon: row.icon,
        taskCount: row.taskCount,
      })),
    );
  }

  async loadTasks() {
    const rows = await this.db.query(TASKS);

    this.tasks.set(
      rows.map(row => ({
        id: row.id,
        title: row.title,
        priority: row.priority,
        category: row.categoryName,
        icon: row.categoryIcon,
        completed: !!row.completed,
        categoryId: row.categoryId,
      })),
    );
  }

  async createCategory(payload: { name: string; color: string | null; icon: string | null }) {
    await this.db.execute(
      CREATE_CATEGORY,
      [payload.name, payload.color, payload.icon],
    );
    await this.loadCategories();
  }

  async updateCategory(id: number, payload: { name?: string; color?: string | null; icon?: string | null }) {
    await this.db.execute(
      UPDATE_CATEGORY,
      [payload.name, payload.color, payload.icon, id],
    );
    await this.loadCategories();
    await this.loadTasks();
  }

  async getCategoryById(id: number): Promise<CategoryWithCount | null> {
    const rows = await this.db.query(GET_CATEGORY_BY_ID, [id],);
    return rows[0] ?? null;
  }

  async createTask(payload: { title: string; priority: string; categoryId: number }) {
    await this.db.execute(CREATE_TASK, [payload.title, payload.priority, payload.categoryId, 0]);
    await this.loadTasks();
    await this.loadCategories();
  }

  async toggleTaskCompleted(taskId: number, completed: boolean) {
    await this.db.execute(TOGGLE_TASK_COMPLETED, [completed ? 1 : 0, taskId]);
    await this.loadTasks();
  }

  async deleteTask(taskId: number) {
    await this.db.execute(DELETE_TASK, [taskId]);
    await this.loadTasks();
    await this.loadCategories();
  }

  async getTasksByCategory(categoryId: number): Promise<TaskTodo[]> {
    const rows = await this.db.query(GET_TASK_BY_CATEGORY, [categoryId],
    );

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      priority: row.priority,
      category: row.categoryName,
      icon: row.categoryIcon,
      completed: !!row.completed,
      categoryId: row.categoryId,
    }));
  }
}
