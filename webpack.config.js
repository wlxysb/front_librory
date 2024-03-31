import { resolve } from 'path';

export const entry = 'registration.js';
export const output = {
    path: resolve(__dirname, 'dist'),
    filename: 'registration.js',
};
export const module = {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
    ],
};