import requests
import base64
import json
import os

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the access token and Instagram user ID
access_token = os.getenv('ACCESS_TOKEN')
# ig_user_id = os.getenv('IG_ID')

print(access_token)

# response = requests.post(
#   f'https://graph.instagram.com/v20.0/{ig_user_id}/media',
#   headers={
#       'Content-Type': 'application/json'
#   },
#   data={
#       'image_url': 'https://raw.githubusercontent.com/TehreemFarooqi/whimnym/main/assets/images/nym_post.jpeg'
#   }
# )

me = requests.get(
    'https://graph.facebook.com/v20.0/me',
    params={
    'fields': 'id',
    'access_token': access_token
    }
)

print(me.json())