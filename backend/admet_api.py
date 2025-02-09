from fastapi import FastAPI
from pydantic import BaseModel
from admet_ai import ADMETModel

app = FastAPI()
model = ADMETModel()

class SMILESInput(BaseModel):
    smiles: str

@app.post("/predict_admet/")
async def predict_admet(data: SMILESInput):
    try:
        predictions = model.predict(data.smiles)
        return {"smiles": data.smiles, "admet_properties": predictions}
    except Exception as e:
        return {"error": str(e)}
    

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/")
def read_root():
    return {"message": "CORS is enabled!"}
