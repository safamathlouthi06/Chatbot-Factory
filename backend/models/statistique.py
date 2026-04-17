from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class Statistique(Base):
    __tablename__ = "statistiques"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre_conversations = Column(Integer, default=0)
    taux_satisfaction = Column(Float, default=0.0)
    nombre_messages = Column(Integer, default=0)

    chatbot_id = Column(UUID(as_uuid=True), ForeignKey("chatbots.id"))

    chatbot = relationship("Chatbot", back_populates="statistique")