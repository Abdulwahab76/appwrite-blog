import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux'
function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        try {
            appwriteService.getCurrentUserPosts(auth.userData.$id).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
                setLoading(true)
            })

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])


    return (
        <div className='w-full py-8'>
            <Container>
                {!loading ? 'loading..' : <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>}
            </Container>
        </div>
    )
}

export default AllPosts