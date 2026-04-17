from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import datetime

from database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contenu = Column(String)
    date_envoi = Column(DateTime, default=datetime.datetime.utcnow)
    type = Column(String)  # user / bot

    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"))

    conversation = relationship("Conversation", back_populates="messages")