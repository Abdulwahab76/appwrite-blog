import React, { useState, useEffect } from 'react';
import { Client, Databases, ID, Query } from "appwrite";
import conf from '../conf/conf';
import appwriteService from "../appwrite/config";

const Comment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const client = new Client();

    const databases = new Databases(client);

    client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

    useEffect(() => {
        const fetchComments = async () => {
            appwriteService.getCommentsOnPost(postId).then(response => {
                setComments(response.documents)
            })
        };
        fetchComments();
    }, [postId]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText !== '') {
            appwriteService.createCommentsOnPost(postId, commentText).then(response => {
                setComments([...comments, response]);
                setCommentText('');
            })
        }

    };
    const handleDeleteComment = async (commentId) => {
        appwriteService.deleteCommentOnPost(commentId).then(
            setComments(prev => prev.filter(item => item.$id !== commentId))
        )
    }

    return (
        <div>
            <h1>Comment Section</h1>
            {comments.length > 0 ? comments.map((comment) => (
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '40%', margin: '20px auto', alignItems: 'center' }} key={comment.$id}>
                    <p>{comment.text}</p>
                    <button onClick={() => handleDeleteComment(comment.$id)}>Delete</button>
                </div>
            )) : <h1>Add Comments</h1>}
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Comment;