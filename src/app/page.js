'use client';
import { useState } from "react";

export default function Home() {
    return (
        <>
            <h1>Kolin63</h1>
            <div>
              <button><a href="https://www.youtube.com/@kolindev" target="_blank">YouTube</a></button>             
              <button><a href="https://www.github.com/Kolin63" target="_blank">GitHub</a></button>             
            </div>

            <div>
                <h2>Games</h2>
                <button><a href="/tic-tac-toe">Tic Tac Toe</a></button>
            </div>
        </>
    );
}
