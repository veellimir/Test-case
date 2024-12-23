# Docs

<h3>Запуск Backend</h3>

<p>Перейти в нужную директорию</p>
для Linux/Mac:

    cd backend
    source venv/bin/activate

для Windows:
  
    cd .\backend\
    .\.venv\Scripts\activate  

Установить зависимости через Poetry:

    poetry install

Или через pip3 (для Windows, просто - pip):

    pip3 install -r requirements.txt
  
Запустите Backend и PostgreSQL с помощью Docker:

    docker-compose up --build -d


Swagger backend:
    
    http://127.0.0.1:8000/swagger/
    

<hr>

Далее перейти в директорию frontend, установить пакеты

для Linux/Mac:
    
    cd frontend
    npm i

для Windows:

    cd .\frontend\
    npm install

Запустите сервер:

    npm run dev

frontend:

    http://localhost:5173/

Мой телеграм:

    https://t.me/Pa_0tel