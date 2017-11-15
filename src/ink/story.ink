VAR age = 0
VAR birthday = "06/16/1989"
VAR validationError = 0

- <strong>Hello!</strong> How are you? # { "delay": 0 }
    + I'm fine. -> good_mood # { "sender": 1 }
    + I don't want to talk. -> bad_mood # { "sender": 1 }
    
= good_mood
- What's your birthday? # { "userInteraction": { "placeholder": "MM/DD/YYYY", "stateVar": "birthday", "type": "text", "handler": "birthdayToAge", "validator": "date" } }
    + \ {birthday} # { "sender": 1 }
- {
    - validationError == 0: -> user_age
    - else: -> date_validation_error
}
-> END

= bad_mood
- Okay, I won't bother.
-> END

= user_age
- So you are <strong>{age} years</strong> old. { age >= 40: Pretty old. }
-> DONE

= date_validation_error
- Please input the date as specified (MM/DD/YYYY).
-> good_mood
-> DONE