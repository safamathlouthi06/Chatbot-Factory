from pydantic import BaseModel
from uuid import UUID



class Document(BaseModel):
    id: UUID
    base_id: UUID
    titre: str
    file: str

class DocumentCreate(BaseModel):
    base_id: str
    titre: str
    file:str




