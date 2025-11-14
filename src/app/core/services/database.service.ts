import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db: SQLiteObject | null = null;
  private dbReady: Promise<void>;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
  ) {
    this.dbReady = this.init();
  }

  private async init(): Promise<void> {
    await this.platform.ready();

    try {
      this.db = await this.sqlite.create({
        name: 'today_task_app.db',
        location: 'default',
      });

      await this.createTables();
    } catch (err) {
      console.error('[DB] Error inicializando SQLite', err);
      this.db = null;
    }
  }

  private ensureDb(): SQLiteObject {
    if (!this.db) {
      throw new Error(
        'Database not initialized. ¿Estás corriendo en device/emulador con el plugin cordova-sqlite-storage instalado?'
      );
    }
    return this.db;
  }

  private async createTables() {
    const db = this.ensureDb();

    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT,
        icon TEXT
      );`,
      [],
    );

    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        priority TEXT NOT NULL,
        category_id INTEGER,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      );`,
      [],
    );
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    await this.dbReady;

    const db = this.ensureDb();
    const result = await db.executeSql(sql, params);
    const items: any[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      items.push(result.rows.item(i));
    }

    return items;
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    await this.dbReady;
    const db = this.ensureDb();
    await db.executeSql(sql, params);
  }
}
