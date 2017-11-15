VAR birthday = ""
VAR age = 0

- <strong>Hello!</strong> How are you? # { "delay": 0 }
    + I'm fine. -> good_mood # { "sender": 1 }
    + I don't want to talk. -> bad_mood # { "sender": 1 }
    
= good_mood
- Cool. What's your birthday? # { "userInteraction": { "placeholder": "MM/DD/YYYY", "stateVar": "birthday", "type": "text", "handler": "birthdayToAge" } }
    + \ {birthday} # { "sender": 1 }
- So you are {age} years old. { age >= 40: Pretty old. }
-> END

= bad_mood
- Okay, I won't bother.
-> END