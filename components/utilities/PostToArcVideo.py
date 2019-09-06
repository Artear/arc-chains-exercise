import requests
import json

def post_to_anglerfish(ans, url, auth_token):
        session = requests.session()        
        request_headers = {
            'Arc-Priority': 'ingestion',
            'Authorization': 'Bearer ' + auth_token,
            'Content Type': 'application/json'}
        ans_json = json.dumps(ans)
        resp = session.post(url,
                            files={'ans': ('', ans_json, 'application/json')},
                            headers=request_headers)
        resp.raise_for_status()
        obj = None
        try:
            obj = resp.json()
        except Exception:
            if resp.content:
                print(
                    f'Unable to decode response as JSON, content received is: {resp.content}, status code: {resp.status_code}, url: {resp.url}')
            else:
                print(
                    f'Unable to decode response as JSON, No content found, status code: {resp.status_code}, url: {resp.url}')

        if obj:
            print(f'Successfully posted {obj.get("type")} to Anglerfish as {obj.get("_id", "<unknown>")}')
        else:
            print(f'Problem with posting to Anglerfish')

base_url = "https://api.sandbox.lanacionar.arcpublishing.com"
endpoint = "/photo/api/v2/photos"
url = f"{base_url}{endpoint}"
auth_token = "<BearerToken>"
ans = {'additional_properties': {'originalName': 'Octocat.jpg',
'originalUrl': 'http://cameronmcefee.com/img/work/the-octocat/original.jpg',
'published': True,
'version': 1},
'owner': {'id': 'sandbox.lanacionar'},
'source': {'id': 'the-old-cms', 'source_id': '0001'},
'type': 'image'}

post_to_anglerfish(ans, url, auth_token)