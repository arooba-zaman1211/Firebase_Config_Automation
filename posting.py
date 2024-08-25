import requests
import base64
import json

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
    
access_token = 'IGQWRQRFFtOWxkdXQxMVVDNVRDYzBWMThOT0RZAa21YSVF6ckItNU5zUExLM0ZAMX3Bwb191cEdITkVkQVUxUWZAHZA3EtOER1VlBaY2o1bHFUOW50bm1kcWo3YU1GQmlnOG1BUWI0XzZAadGZAxVGcwRWxNTW9SYmRKblkZD'
ig_user_id = '17841461327152176'

image_data = encode_image_to_base64('assets/images/nym_post.jpeg')

response = requests.post(
        f'https://graph.instagram.com/v20.0/{ig_user_id}/media',
        headers={
            'Content-Type': 'application/json'
        },
        data=json.dumps({
            'media_type': 'IMAGE',
            'file': image_data,
            'access_token': access_token
        })
    )

print(response.json())