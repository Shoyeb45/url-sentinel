# How to run

1. Download `uv`package manager in python
2. Create .env file
3. Activate virtual environment, run from ./backend
```
(Windows)
.venv\Scripts\activate

(Mac/Linux)
source .venv\bin\activate
```
4. Generate prisma client by `prisma generate`
5. Run using `uv run src/main.py` (it will download all necessary dependencies and it will run)
