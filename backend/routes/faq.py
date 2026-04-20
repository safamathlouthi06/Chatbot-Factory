from fastapi import APIRouter, HTTPException
from database import supabase

router = APIRouter(prefix="/faq", tags=["faq"])


# =========================
# GET FAQ BY CHATBOT
# =========================
@router.get("/{chatbot_id}")
def get_faq(chatbot_id: str):

    # 1. récupérer la base
    base = supabase.table("base_connaissance") \
        .select("id") \
        .eq("chatbot_id", chatbot_id) \
        .execute()

    if not base.data:
        return []

    base_id = base.data[0]["id"]

    # 2. récupérer FAQ via base_id
    res = supabase.table("faq") \
        .select("*") \
        .eq("base_id", base_id) \
        .execute()

    return res.data or []


# =========================
# DELETE FAQ
# =========================
@router.delete("/{faq_id}")
def delete_faq(faq_id: str):

    res = supabase.table("faq") \
        .delete() \
        .eq("id", faq_id) \
        .execute()

    return {
        "message": "FAQ supprimée",
        "data": res.data
    }