import React, { useState, useEffect } from 'react';
import { Client, Databases, ID, Query } from "appwrite";
import conf from '../conf/conf';

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
            const query = [Query.equal('postId', postId)]
            try {
                const response = await databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCommentCollectionId,
                    query
                );
                setComments(response.documents);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [postId]);
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(), {
                postId,
                text: commentText,
            });
            setComments([...comments, response]);
            setCommentText('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div>

            {comments.map((comment) => (
                <div key={comment.$id}>
                    <p>{comment.text}</p>
                </div>
            ))}
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