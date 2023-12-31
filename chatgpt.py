import openai
from decouple import config

openai.api_key = config('OPENAI_API_KEY') # your token goes here


def get_model_reply(query, context=[]):
    # combines the new question with a previous context
    context += [query]
    
    # given the most recent context (4096 characters)
    # continue the text up to 2048 tokens ~ 8192 charaters
    completion = openai.Completion.create(
        engine='text-davinci-002',
        prompt='\n\n'.join(context)[:4096],
        max_tokens = 2048,
        temperature = 0.4, # Lower values make responses more deterministic
    )
    
    # append response to context
    response = completion.choices[0].text.strip('\n')
    context += [response]
    
    # list of (user, bot) responses. We will use this format later
    responses = [(u,b) for u,b in zip(context[::2], context[1::2])]
    
    return responses, context

query = 'What is quantum computing?'
responses, context = get_model_reply(query, context=[])

print('<USER> ' + responses[-1][0])
print('<BOT> ' + responses[-1][1])

