from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from admet_ai import ADMETModel

app = FastAPI()
model = ADMETModel()

class SMILESInput(BaseModel):
    smiles: str

# ✅ Properly configured CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://aritra-script.github.io"],  # No trailing slash in GitHub Pages URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods, including OPTIONS
    allow_headers=["*"],  # Allow all headers
)

@app.post("/predict_admet/")
async def predict_admet(data: SMILESInput, response: Response):
    # ✅ Explicitly set CORS headers in response
    response.headers["Access-Control-Allow-Origin"] = "https://aritra-script.github.io"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"

    try:
        predictions = model.predict(data.smiles)
        return {"smiles": data.smiles, "admet_properties": predictions}
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "CORS is enabled!"}