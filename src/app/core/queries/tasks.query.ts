export const CREATE_TASK = `
  INSERT INTO tasks (title, priority, category_id, completed) VALUES (?, ?, ?, ?)
`;

export const UPDATE_TASK = `
  UPDATE tasks SET title = ?, priority = ?, category_id = ?, completed = ? WHERE id = ?
`;

export const DELETE_TASK = `
  DELETE FROM tasks WHERE id = ?
`;

export const TOGGLE_TASK_COMPLETED = `
  UPDATE tasks SET completed = ? WHERE id = ?
`;

export const GET_TASK_BY_CATEGORY = `
  SELECT
    t.id,
    t.title,
    t.priority,
    t.category_id as categoryId,
    t.completed,
    c.name as categoryName,
    c.icon as categoryIcon
  FROM tasks t
  LEFT JOIN categories c ON c.id = t.category_id
  WHERE t.category_id = ?
  ORDER BY t.id DESC
`;

export const TASKS = `
  SELECT
      t.id,
      t.title,
      t.priority,
      t.category_id as categoryId,
      t.completed,
      c.name as categoryName,
      c.icon as categoryIcon
    FROM tasks t
    LEFT JOIN categories c ON c.id = t.category_id
    ORDER BY t.id DESC
`;