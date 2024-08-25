import requests
import base64
import json
import os

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the access token and Instagram user ID
access_token = os.getenv('ACCESS_TOKEN')
ig_user_id = os.getenv('IG_ID')

print(access_token, ig_user_id)

response = requests.post(
        f'https://graph.instagram.com/v20.0/{ig_user_id}/media',
        headers={
            'Content-Type': 'application/json'
        },
        data={
            'image_url': 'https://raw.githubusercontent.com/TehreemFarooqi/whimnym/main/assets/images/nym_post.jpeg'
        }
    )

try:
    response_data = response.json()
    print(response_data)
except ValueError:
    print("Response is not in JSON format:", response.text)