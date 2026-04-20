from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from database import supabase
import uuid
import os

router = APIRouter(prefix="/documents", tags=["documents"])


# =========================
# CREATE DOCUMENT
# =========================
@router.post("/")
async def create_document(
    chatbot_id: str = Form(...),
    titre: str = Form(...),
    file: UploadFile = File(...)
):

    os.makedirs("files", exist_ok=True)

    # 1. récupérer ou créer base
    base = supabase.table("base_connaissance") \
        .select("id") \
        .eq("chatbot_id", chatbot_id) \
        .execute()

    if not base.data:
        base = supabase.table("base_connaissance") \
            .insert({"chatbot_id": chatbot_id}) \
            .execute()

    base_id = base.data[0]["id"]

    # 2. save file local
    file_id = str(uuid.uuid4())
    filename = file.filename.replace(" ", "_")
    path = f"files/{file_id}_{filename}"

    content = await file.read()

    with open(path, "wb") as f:
        f.write(content)

    # 3. insert DB avec base_id
    res = supabase.table("documents").insert({
        "base_id": base_id,
        "titre": titre,
        "file": path
    }).execute()

    return res.data


# =========================
# GET DOCUMENTS BY CHATBOT
# =========================
@router.get("/{chatbot_id}")
def get_documents(chatbot_id: str):

    base = supabase.table("base_connaissance") \
        .select("id") \
        .eq("chatbot_id", chatbot_id) \
        .execute()

    if not base.data:
        return []

    base_id = base.data[0]["id"]

    res = supabase.table("documents") \
        .select("*") \
        .eq("base_id", base_id) \
        .execute()

    return res.data or []


# =========================
# DELETE DOCUMENT
# =========================
@router.delete("/{doc_id}")
def delete_document(doc_id: str):

    supabase.table("documents") \
        .delete() \
        .eq("id", doc_id) \
        .execute()

    return {"message": "Document supprimé"}