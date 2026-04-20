from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class BaseConnaissance(BaseModel):
    id: UUID
    chatbot_id: UUID

class BaseConnaissanceCreate(BaseModel):
    chatbot_id: UUID