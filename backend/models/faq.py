from pydantic import BaseModel
from uuid import UUID

class FAQ(BaseModel):
    id: UUID
    base_id: UUID
    question: str
    reponse: str

class FAQCreate(BaseModel):
    base_id: UUID
    question: str
    reponse: str