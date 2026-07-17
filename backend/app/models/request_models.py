from pydantic import BaseModel


class AssistantRequest(BaseModel):
    stadium_data: dict
    question: str