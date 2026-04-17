from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class Configuration(Base):
    __tablename__ = "configurations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ton = Column(String)
    langue = Column(String)
    message_accueil = Column(String)
    niveau_detail = Column(String)

    chatbot_id = Column(UUID(as_uuid=True), ForeignKey("chatbots.id"))

    chatbot = relationship("Chatbot", back_populates="configuration")