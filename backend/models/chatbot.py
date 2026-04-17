from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class Chatbot(Base):
    __tablename__ = "chatbots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nom = Column(String, nullable=False)
    domaine = Column(String)
    statut = Column(String)

    # Relations
    configuration = relationship("Configuration", back_populates="chatbot", uselist=False)
    base_connaissance = relationship("BaseConnaissance", back_populates="chatbot", uselist=False)
    conversations = relationship("Conversation", back_populates="chatbot")
    statistique = relationship("Statistique", back_populates="chatbot", uselist=False)
    deploiements = relationship("Deploiement", back_populates="chatbot")