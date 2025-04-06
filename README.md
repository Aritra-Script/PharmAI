`<h1>`PharmAi `</h1>`

`<h2>`Execute the following commands in terminal :`</h2>`

<ul>
  <li>
    pip install torch==2.5.0
  </li>
  <li>
    pip install fastapi uvicorn admet_ai pydantic
  </li>
  <li>
    cd backend
  </li>
  <li>
    uvicorn admet_api:app --host 0.0.0.0 --port 8000 --reload
  </li>
</ul>
<h3> Project Structure : </h3>
<pre>
/project-root
│── /frontend (React)
│── /backend (Python)
│   ├── admet_api.py
│   ├── venv (optional, virtual environment)
│   ├── requirements.txt
│── package.json
│── README.md
</pre>
<h2>To run the WebPage</h2>
<ul>
  <li>
    npm install
  </li>
  <li>
    npm run dev
  </li>
  <li>
    get the host link e.g. http://localhost:5173/
  </li>
  <li>
    inside admet_api.py change the listening link to this e.g. http://localhost:5173/
  </li>
</ul>

<h2>Developers</h2>
<ul>
  <li>
    Aritra Chakraborty - Student @IIITK'28
  </li>
  <li>
    Fadhil Muhammed - Student @IIITK'28
  </li>
  <li>
    Shivkarthik Suresh - Student @IIITK@28
  </li>
  <li>
    Abhinav Jeansha - Student @IIITK@28
  </li>
</ul>
