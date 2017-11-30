VAR age = 0
VAR birthday = "06/16/1989"
VAR validationError = 0

-> start

= start
- <strong>Hello!</strong> How are you?
    + I'm fine. -> good_mood # { "sender": 1 }
    + I don't want to talk. -> bad_mood # { "sender": 1 }
    
= good_mood
- What's your birthday? # { "userInteraction": { "placeholder": "MM/DD/YYYY", "stateVar": "birthday", "type": "text", "handler": "birthdayToAge", "validator": "date" } }
    + \ {birthday} # { "sender": 1 }
- {
    - validationError == 0: -> user_age
    - else: -> date_validation_error
}
-> DONE

= user_age
- So you are <strong>{age} years</strong> old.
- { 
    - age >= 18: -> aviation_recipe
    - else: -> capri_sun
}
-> DONE

= date_validation_error
- Please input the date as specified (MM/DD/YYYY).
-> good_mood

= bad_mood
- Okay, I won't bother.
-> END

= aviation_recipe
- Old enough for a great cocktail. 🍸 Here's the recipe for an <strong>Aviation</strong>:
- 5 cl gin<br> 1.5 cl lemon juice<br> 1 cl maraschino liqueur<br> 0.7 cl crème de violette
- Shake, stir, strain and enjoy.
-> start_over

= capri_sun
- That's pretty young. Want some Capri Sun?
- <img src="assets/images/capri-sun.png">
-> start_over

= start_over
- Want to start over?
    + Sure. -> start # { "sender": 1 }
    + No, thank you. # { "sender": 1 }
-> END