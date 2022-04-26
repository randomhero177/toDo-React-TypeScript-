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

    return (
      <div className={styles.task}>
          <div>{title}
          </div>
      </div>
    )
}
