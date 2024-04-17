import "./login.css"
import Head from "next/head"

import { useState } from 'react'
import { useRouter } from 'react'

export default function Signin() {
    const router = useRouter()

    const [state, setState] = useState({
        username: "",
        password: ""
    })

    function fill(e) {
        const copy = { ...state }
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    async function handle() {
        localStorage.clear
        const res = await fetch('http://localhost:5252/auth',
            {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        if (!response.ok) {
            throw new Error('Ошибка запроса: ' + response.status);
        }
        const json = await res.text
        localStorage.setItem("token", json)
        console.log('Ответ от сервера:', localStorage.getItem("token"));
        router.push("/") 
    }

    return (
        <>
            <Head>
                <title>Логин</title>
            </Head>
            <div className={style.login}>
                <form className={login-screen}>
                    <div class="app-title">
                        <h1>Вход</h1>
                    </div>
                    <div className={style.login - form}>
                        <div class="control-group">
                            <input type="text" class="login-field" name="username" placeholder="ФИО" value={state.username} onChange={fiull} />
                            <label class="login-field-icon fui-user" for="login-name"></label>
                        </div>
                    </div>

                    <div class="control-group">
                        <input type="text" class="login-field" name="password" placeholder="Пароль" value={state.password} onChange={fill} />
                        <label class="login-field-icon fui-lock" for="login-password"></label>
                    </div>


                    <button onClick={handle} class="btn btn-primary btn-large btn-block">ВОЙТИ</button>
                    <div class="registration">
                        <a href="regist.html">Зарегистрироваться</a>
                    </div>
                </form>
            </div>
        </>
    );
}