
import React, {useEffect} from 'react';

import { useToDoStore } from '../../data/store/useToDoStore';
import { InputPlus } from '../components/input';
import { Task } from '../components/task';

import styles from './index.module.scss';

export const App: React.FC = () => {
    console.log(useToDoStore);
    const [
      tasks,
      createTask,
      updateTask,
      removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    /*
    useEffect(() => {
        createTask('set teask');
    }, [])
    */
    console.log(tasks);

    return (
      <article className={styles.article}>
          <h1 className={styles.articleTitle}>To Do App</h1>
          <section className={styles.articleSection}></section>
          <div>
              <InputPlus
                  onAdd={(title) => {
                      if(title) {
                          createTask(title);
                      }
                  }}
              />
          </div>
          <section className={styles.articleText}>
              {!tasks.length && (
                  <p>There is no tasks</p>
              )}
              {tasks.map(task => (
                  <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      onDone={removeTask}
                      onEdit={updateTask}
                      onDelete={removeTask}
                  />
              ))}
          </section>
      </article>
    )
}
