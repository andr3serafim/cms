import { axios } from '@/lib/axios';
import React from 'react'


export default async function PagePostById({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const response = await axios.get(`/post/${id}`);
    console.log("Responseee: ", response.data.post);
    const data = response.data.post;

    return (

        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
        </div>
    )
}
