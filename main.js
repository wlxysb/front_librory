import React from 'react';
import Head from Head
import styles from './main.css';
import { userEffect, useState } from 'react'

const Books = () => {
    const [userName, setUserName] = useState()
    const [item, setItem] = useState("")

    userEffect(() => {
        setItem(localStorage.getItem('token'))
        fetchContent()
    }, [])

    async function fetchContent() {
        const res = await fetch('htp://localhost:5252/books', {
            headers: {
                'Content-Type': 'application/json',
                'Authotization': 'Barer' + localStorage.getItem('token')
            }
        })
        if (res.ok) {
            const json = await res.text();
            setUserName(json)
        }
    }

    return (
        <>
            <Head>
                <title>Библиотека</title>
            </Head>
            <div>
                {
                    item != null ?
                    <p> {setUserName}</p>
                    : <p>UNAUTHORIZED</p>
                }
            </div>
        </>
    )
}
