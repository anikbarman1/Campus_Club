# Campus Club — Hostinger Production Package

This package is prepared for deployment as a Node.js application on Hostinger.

## Package structure

```text
Campus_Club_Hostinger_Production/
├── package.json
├── server.js
├── .gitignore
├── README.md
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Hostinger deployment

1. Create a Node.js application in Hostinger hPanel.
2. Upload/extract this package into the application's root directory.
3. Set the **Application startup file** to:

```text
server.js
```

4. Make sure the Node.js version is 18+ (20+ is also fine).
5. Set the application environment to **Production** if Hostinger provides that option.
6. Start/restart the Node.js application.
7. Open your domain.

The server automatically uses Hostinger's `PORT` environment variable. Do not hard-code a public port.

## Important

This is a production-ready frontend/server package, but the chat is currently browser-side demo functionality. Messages are not persisted between users or browsers.

For real WhatsApp-style communication, add:
- user authentication
- MySQL database
- persistent conversations/messages
- WebSocket/Socket.IO real-time messaging
- image/file uploads
- online/offline status
- notifications
- club/group permissions

## Health check

After deployment, this endpoint should return JSON:

```text
/health
```

Example:

```json
{"status":"ok","app":"Campus Club"}
```
