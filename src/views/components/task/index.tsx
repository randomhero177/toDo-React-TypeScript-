import React, {useState, useCallback} from 'react';

import styles from './index.module.scss';

interface TaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdit: (id: string, title: string) => void;
    onDelete: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  onDone,
  onEdit,
  onDelete
}) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className={styles.task}>
          <label className={styles.taskLabel}>
              <input
                  type="checkbox"
                  checked={checked}
                  className={styles.taskCheckbox}
                  onChange={e => {
                    setChecked(e.target.checked);

                    if (e.target.checked) {
                        onDone(id);
                    }
                  }}
              />
              <h3 className={styles.taskTitle}>{ title }</h3>
          </label>
          <button
              aria-label="Edit"
              className={styles.taskEdit}
              onClick={() => {}}
          />
          <button
              aria-label="Remove"
              className={styles.taskRemove}
              onClick={() => {
                  if(confirm('You sure?')) {
                      onDelete(id);
                  }
              }}
          />
      </div>
    )
}
