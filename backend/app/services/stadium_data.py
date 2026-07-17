import random


def get_live_data():

    health = random.randint(92, 98)
    crowd = random.randint(55, 95)

    weather = random.choice(
        [
            "Sunny",
            "Cloudy",
            "Rain Expected"
        ]
    )

    transport = random.choice(
        [
            "Normal",
            "Metro Delay",
            "Heavy Traffic"
        ]
    )

    zones = {
        "North Stand": random.randint(20, 70),
        "South Stand": random.randint(70, 95),
        "East Gate": random.randint(30, 80),
        "West Gate": random.randint(20, 60),
        "Food Court": random.randint(60, 95),
        "VIP": random.randint(5, 35)
    }

    recommendation = ""

    if crowd > 85:
        recommendation += (
            "Crowd is reaching critical capacity. "
            "Deploy volunteers to South Stand and "
            "redirect fans through Gate 2. "
        )

    if weather == "Rain Expected":
        recommendation += (
            "Prepare rain shelters and notify visitors. "
        )

    if transport == "Metro Delay":
        recommendation += (
            "Increase shuttle buses."
        )

    return {
        "health": health,
        "crowd": crowd,
        "weather": weather,
        "transport": transport,
        "zones": zones,
        "recommendation": recommendation
    }