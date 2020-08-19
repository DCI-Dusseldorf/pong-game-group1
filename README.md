# pong-game-group1

# Pong Game Logics

## Elements
1. **Field** - always 100% of view height and width.
2. **Ball** - the default position of its center after game start (or after each score): center of the field by both X and Y axes.
3. **Left paddle** - the default position of its center after game start (or after each score): center of the field by Y-axis.
4. **Right paddle** - the default position of its center after game start (or after each score): center of the field by Y-axis.
5. **Score counter** - initially set to 0:0.

## Input keys
1. **ENTER** - to start or restart the game (with initial score 0:0).
1. **SPACE** - to pause, and unpause the game. Holding this key does nothing.
2. **W** - to move the *left* paddle (goalkeeper) *up* along the Y-axis. Holding this key produces a constant smooth movement of the *left* paddle, until its *top* edge reaches the *top* edge of the field.
3. **S** - to move the *left* paddle (goalkeeper) *down* along the Y-axis. Holding this key produces a constant smooth movement of the *left* paddle, until its *bottom* edge reaches the *bottom* edge of the field.
4. **UP arrow** - to move the *right* paddle (goalkeeper) *up* along the Y-axis. Holding this key produces a constant smooth movement of the *right* paddle, until its *top* edge reaches the *top* edge of the field.
5. **DOWN arrow** - to move the *right* paddle (goalkeeper) *down* along the Y-axis. Holding this key produces a constant smooth movement of the *right* paddle, until its *bottom* edge reaches the *bottom* edge of the field.

## Ball physics
- At the game start (or after each score) ball starts to move at a constant initial speed.
- After any edge of the ball touches **top** or **bottom** edge of the field, the ball movement reverses its direction by the **same reflected angle**. Speed of the ball movement remains the same.
- After any edge of the ball touches a **central part** of any paddle (**40%** of a paddle length: 20% above + 20% below its Y-axis center), the ball movement reverses its direction by the **same reflected angle**. And each time speed of the ball movement **increases by 2%**.
- After any edge of the ball touches an **edge part** of any paddle (**30%** of a paddle length **from the both sides** of a paddle), the ball movement reverses its direction by the **same angle**, but **NOT reflected**. I.e. after bouncing the ball returns to the same direction where it came from. And each time speed of the ball movement **increases by 2%**.

## Game flow
1. After pressing **ENTER**, game starts with the ball being positioned at its default position and with started movement at initial speed strictly to the **right** (parallel to the X-axis). Score counter is set to 0:0.
2. After any edge of the ball touches **left** edge of the field, score counter adds **1 point** to the **right** "player". And the game resumes with the ball being positioned at its default position and with started movement at initial speed strictly to the **right** (parallel to the X-axis).
3. Same but vice versa. After any edge of the ball touches **right** edge of the field, score counter adds **1 point** to the **left** "player". And the game resumes with the ball being positioned at its default position and with started movement at initial speed strictly to the **left** (parallel to the X-axis).
4. OPTIONAL: We can limit the duration of one game by setting maximum score. For example: up to 10 points, after which we'll see something like "LEFT/RIGHT player won!".