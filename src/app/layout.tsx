// src/app/layout.tsx
"use client";

import React from 'react';
import '../../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Full-Stack App</title>
      </head>
      <body>
        {/* This is where your page content will go */}
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
