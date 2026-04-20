from fastapi import APIRouter, HTTPException
from database import supabase

router = APIRouter(prefix="/base", tags=["base"])


# =========================
# GET FULL BASE
# =========================
@router.get("/{chatbot_id}")
def get_base(chatbot_id: str):

    # 🔥 1. récupérer base
    base_res = supabase.table("base_connaissance") \
        .select("*") \
        .eq("chatbot_id", chatbot_id) \
        .execute()

    if not base_res.data:
        return {
            "base": None,
            "documents": [],
            "faq": []
        }

    base = base_res.data[0]
    base_id = base["id"]

    # 🔥 2. récupérer documents
    documents_res = supabase.table("documents") \
        .select("*") \
        .eq("base_id", base_id) \
        .execute()

    # 🔥 3. récupérer FAQ
    faq_res = supabase.table("faq") \
        .select("*") \
        .eq("base_id", base_id) \
        .execute()

    return {
        "base": base,
        "documents": documents_res.data or [],
        "faq": faq_res.data or []
    }


# =========================
# CREATE BASE
# =========================
@router.post("/{chatbot_id}")
def create_base(chatbot_id: str):

    existing = supabase.table("base_connaissance") \
        .select("id") \
        .eq("chatbot_id", chatbot_id) \
        .execute()

    if existing.data:
        raise HTTPException(status_code=400, detail="Base existe déjà")

    new_base = supabase.table("base_connaissance") \
        .insert({"chatbot_id": chatbot_id}) \
        .execute()

    return new_base.data[0]

