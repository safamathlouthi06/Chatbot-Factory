from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class BaseConnaissance(Base):
    __tablename__ = "bases_connaissance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chatbot_id = Column(UUID(as_uuid=True), ForeignKey("chatbots.id"))

    chatbot = relationship("Chatbot", back_populates="base_connaissance")
    documents = relationship("Document", back_populates="base_connaissance")
    faqs = relationship("FAQ", back_populates="base_connaissance")