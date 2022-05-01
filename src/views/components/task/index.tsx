import React, {useState, useRef, useEffect} from 'react';

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
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
      <div className={styles.task}>
          <div className={styles.taskLabel}>
              <input
                  type="checkbox"
                  disabled={isEditMode}
                  checked={checked}
                  className={styles.taskCheckbox}
                  onChange={e => {
                    setChecked(e.target.checked);

                    if (e.target.checked && confirm('Done with this task?')) {
                        setTimeout(() => {
                            onDone(id);
                        }, 200);
                    }
                  }}
              />
              { isEditMode ? (
                  <input
                      type="text"
                      ref={editTitleInputRef}
                      value={inputValue}
                      onChange={(e) => {
                          setInputValue(e.target.value);
                      }}
                      onKeyDown={e => {
                          if (e.key === 'Enter') {
                              onEdit(id, inputValue);
                              setIsEditMode(false);
                          }
                      }}
                      className={styles.taskInputEdit}
                  />
              ) : (
                    <h3 className={styles.taskTitle}>{ title }</h3>
              )}

          </div>

          { isEditMode ? (
              <div className={styles.taskFlex}>
                  <span
                      className={styles.taskCancel}
                      onClick={() => {
                          setIsEditMode(false);
                      }}
                  ></span>
                  <button
                      aria-label="Save"
                      className={styles.taskSave}
                      onClick={() => {
                          onEdit(id, inputValue);
                          setIsEditMode(false);
                      }}
                  />
              </div>
          ):(

              <button
                  aria-label="Edit"
                  className={styles.taskEdit}
                  onClick={() => {
                      setIsEditMode(true);
                  }}
              />
          )}

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
