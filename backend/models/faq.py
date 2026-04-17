from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(String)
    reponse = Column(Text)

    base_connaissance_id = Column(UUID(as_uuid=True), ForeignKey("bases_connaissance.id"))

    base_connaissance = relationship("BaseConnaissance", back_populates="faqs")