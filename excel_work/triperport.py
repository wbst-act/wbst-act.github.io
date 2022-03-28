import requests

id = '43121'


location_url = 'https://ebird.org/tripreport-internal/v1/locations/{}'
taxon_url = 'https://ebird.org/tripreport-internal/v1/taxon-list/{}'
detail_url = 'https://ebird.org/tripreport-internal/v1/taxon-detail/{}/{}'

location = requests.get(location_url.format(id))
print(location)