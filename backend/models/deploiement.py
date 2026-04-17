from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import datetime

from database import Base

class Deploiement(Base):
    __tablename__ = "deploiements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plateforme = Column(String)
    date_deploiement = Column(DateTime, default=datetime.datetime.utcnow)
    statut = Column(String)

    chatbot_id = Column(UUID(as_uuid=True), ForeignKey("chatbots.id"))

    chatbot = relationship("Chatbot", back_populates="deploiements")