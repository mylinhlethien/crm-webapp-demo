import sys
import simplejson as json
from kafka import KafkaProducer


def main(dict):

    x = {
        'input': {
            'message_type': 'text',
            'options': {'return_context': 'true', 'suggestion_only': 'false'},
            'source': {'id': '9ff8cbe4a87d5f6ab01db996cfae5fe6', 'type': 'user'},
            'text': 'caller_hangup'
        }
    }
    message = json.dumps(x)

    # load the json to a string
    resp = json.loads(message)

    # extract an element in the response
    producer = KafkaProducer(security_protocol="SASL_SSL", sasl_mechanism="PLAIN", sasl_plain_username="token", sasl_plain_password="<INSERT YOUR EVENT STREAMS PASSWWORD>", client_id='soe-voiceagent-assistant-producer', bootstrap_servers=[
                             "<INSERT YOUR EVENT STREAMS BROKER>", "<INSERT YOUR EVENT STREAMS BROKER>", "<INSERT YOUR EVENT STREAMS BROKER>", "<INSERT YOUR EVENT STREAMS BROKER>", "<INSERT YOUR EVENT STREAMS BROKER>", "<INSERT YOUR EVENT STREAMS BROKER>"])

    # Asynchronous by default
    producer.send('watson-messages',
                  json.dumps(resp).encode('utf-8'))

    # configure multiple retries
    #producer = KafkaProducer(retries=1)
    return {'message': resp}
