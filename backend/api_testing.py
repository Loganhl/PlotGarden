import httpx
import asyncio

soil_type = ''
garden_size = [0,0]
zipcode = '65201' 
crops = ["test1", "test2"]

async def get_zone_number(zipcode):
    url = f"https://phzmapi.org/{zipcode}.json"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        
        if response.status_code == 200:
            data = response.json()
            zone = data['zone']
            zone_number = int(zone[:-1])
            return zone_number
        else:
            print(f"Failed to get data: {response.status_code}")
            return None

data = asyncio.run(get_zone_number(zipcode))

if data:
    print(data)
