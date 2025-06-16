import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick}
      ref={overlayRef}
      role="presentation"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        aria-modal="true"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className={styles.title}>Confirm Deletion</h2>
        <p id="dialog-description" className={styles.description}>
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className={styles.buttons}>
          <button 
            className={styles.cancelButton}
            onClick={onClose}
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button 
            className={styles.confirmButton}
            onClick={onConfirm}
            aria-label="Confirm deletion"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 