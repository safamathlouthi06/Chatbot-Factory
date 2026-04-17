from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titre = Column(String)
    contenu = Column(Text)

    base_connaissance_id = Column(UUID(as_uuid=True), ForeignKey("bases_connaissance.id"))

    base_connaissance = relationship("BaseConnaissance", back_populates="documents")