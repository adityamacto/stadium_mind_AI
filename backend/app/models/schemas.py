from pydantic import BaseModel, Field


class AssistantRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2_000)


class IncidentRequest(BaseModel):
    incident: str = Field(min_length=1, max_length=2_000)


class FanRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2_000)


class AnnouncementRequest(BaseModel):
    event: str = Field(min_length=1, max_length=2_000)
