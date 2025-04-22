# 🎬 Movies API

API REST construida con Node.js y Express para la gestión de una lista de películas. Permite consultar, agregar, actualizar y eliminar películas. Incluye validación de datos, middlewares personalizados y soporte para diferentes orígenes de datos.

> Proyecto realizado siguiendo el [Curso de Node.js de Midudev](https://github.com/midudev/curso-node-js)

---

## 🚀 Tecnologías usadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Zod](https://zod.dev/) para validación de datos
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- JSON como base de datos temporal
- MySQL (opcional, para persistencia)

---

## 📦 Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Configura variables de entorno en un archivo `.env` si usas base de datos MySQL.

---

## ▶️ Uso

- Para iniciar el servidor con base de datos local (JSON):
  ```bash
  node server-with-localhost.js
  ```
- Para iniciar el servidor con MySQL:
  ```bash
  node server-with-mysql.js
  ```

---

## 📂 Estructura del proyecto

---

## 🛠️ Funcionalidades implementadas

- CRUD completo de películas (GET, POST, PUT, DELETE)
- Validación de datos con Zod
- Middleware personalizado para CORS
- Separación de controladores, rutas y modelos
- Soporte para base de datos local (JSON) y MySQL
- Utilidades para cifrado de IDs
- Pruebas básicas incluidas en `/test`
- Vistas web simples en `/web`

---

## 📑 Endpoints principales

- `GET /movies` - Listar todas las películas
- `GET /movies/:id` - Obtener una película por ID
- `POST /movies` - Agregar una nueva película
- `PUT /movies/:id` - Actualizar una película existente
- `DELETE /movies/:id` - Eliminar una película

---

## 🔒 Notas de seguridad

- Archivos sensibles y de entorno están ignorados en `.gitignore` (por ejemplo: `.env`, `*.pem`, dumps, logs, etc.)
- No subas tus credenciales ni archivos privados al repositorio

---

## 📚 Créditos

Proyecto realizado como parte del curso de Node.js de Midudev.

