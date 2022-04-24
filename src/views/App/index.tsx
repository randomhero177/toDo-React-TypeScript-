
import React, {useEffect} from 'react';

import { useToDoStore } from '../../data/store/useToDoStore';

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

    useEffect(() => {
        createTask('set teask');
    }, [])

    console.log(tasks);

    return (
      <article className={styles.article}>
          <h1 className={styles.articleTitle}>To Do App</h1>
          <section className={styles.articleSection}></section>
      </article>
    )
}
