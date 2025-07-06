import { Server } from 'http';
import app from './app';
import config from './app/config';

async function bootstrap() {
    // This variable will hold our server instance
    let server: Server;

    // Start the server
    server = app.listen(config.port, () => {
        console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });


    // Function to gracefully shut down the server
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed gracefully.');
                process.exit(1); // Exit with a failure code
            });
        } else {
            process.exit(1);
        }
    };

    // --- Listen for Unhandled Errors ---

    // For asynchronous promise rejections that are not caught
    process.on('unhandledRejection', (error) => {
        console.error('💥 Unhandled Rejection! Shutting down...', error);
        exitHandler();
    });

    // For synchronous errors that are not caught
    process.on('uncaughtException', (error) => {
        console.error('💥 Uncaught Exception! Shutting down...', error);
        exitHandler();
    });
}

// Start the server by calling our bootstrap function
bootstrap();