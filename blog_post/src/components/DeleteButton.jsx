import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick, isDeleting }) => {
  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={onClick}
      disabled={isDeleting}
      aria-label="Delete post"
      aria-busy={isDeleting}
      title="Delete this post"
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  );
};

export default DeleteButton; 