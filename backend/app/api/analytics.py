from fastapi import APIRouter
import random

router = APIRouter()


@router.get("/analytics")
def analytics():

    trend = []

    value = random.randint(60, 70)

    for _ in range(10):

        value += random.randint(-3, 5)

        value = max(40, min(value, 95))

        trend.append(value)

    prediction = (
        "Crowd expected to increase in the next 20 minutes."
        if trend[-1] > 80
        else "Crowd levels remain stable."
    )

    return {
        "trend": trend,
        "prediction": prediction
    }