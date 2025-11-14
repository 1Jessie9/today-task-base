export const GET_CATEGORIES_WITH_TASK_COUNT = `
  SELECT c.id, c.name, c.color, c.icon,
        COUNT(t.id) AS taskCount
  FROM categories c
  LEFT JOIN tasks t ON t.category_id = c.id
  GROUP BY c.id, c.name, c.color, c.icon
  ORDER BY c.id DESC
`;

export const CREATE_CATEGORY = `
  INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)
`;

export const UPDATE_CATEGORY = `
  UPDATE categories SET name = ?, color = ?, icon = ? WHERE id = ?
`;

export const GET_CATEGORY_BY_ID = `
  SELECT c.id, c.name, c.color, c.icon,
        COUNT(t.id) AS taskCount
  FROM categories c
  LEFT JOIN tasks t ON t.category_id = c.id
  WHERE c.id = ?
  GROUP BY c.id, c.name, c.color, c.icon
`;