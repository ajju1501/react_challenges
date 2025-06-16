import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import DeleteButton from "./DeleteButton";
import ConfirmationDialog from "./ConfirmationDialog";
import styles from "./BlogPostDetail.module.css";

function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePosts();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const post = getPost(id);

  const handleEdit = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [navigate, id]);

  const handleDelete = useCallback(() => {
    setError(null);
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deletePost(id);
      navigate("/");
    } catch (err) {
      setError("Failed to delete post. Please try again.");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  }, [deletePost, id, navigate]);

  const cancelDelete = useCallback(() => {
    setError(null);
    setShowDeleteConfirm(false);
  }, []);

  if (!post) {
    return <div className={styles.error}>Post not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className="button-group navigation">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to List
        </button>
        <div className="button-group controls">
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Post
          </button>
          <DeleteButton onClick={handleDelete} isDeleting={isDeleting} />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <article className="blog-detail">
        <h1>{post.title}</h1>
        <div className="blog-meta">
          <span>By {post.author}</span>
          <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
}

export default BlogPostDetail; 