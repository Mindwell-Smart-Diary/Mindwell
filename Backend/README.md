# Mindwell backend

### Configuration

All of these variables can be configured using a `.env ` file. Default values exist in the `example.env`.

| Name                 | Description                                                                                                             | Default value      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `DATABASE_URL`       | Connection string to the DB                                                                                             |                    |
| `PORT`               | Port number for the server to use                                                                                       | 3000               |
| `LLM_API_KEY`        | Api key used to access the LLM api, you can generate an API key for Gemini here: https://aistudio.google.com/app/apikey | -                  |
| `LLM_MODEL`          | The specific LLM model which we will use. Current default value works with Gemini.                                      | `gemini-1.5-flash` |
| `JWT_SECRET`         | Secret for generating access token                                                                                      | -                  |
| `JWT_REFRESH_SECRET` | Secret for generating refresh tokne                                                                                     | -                  |
| `JWT_EXPIRATION`     | Expiration in ms for the access token                                                                                   | 600000             |

|
