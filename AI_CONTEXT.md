# The Last Shift — Complete Documentation

> Unified master document containing the full project, story, gameplay, technical, UI, asset, testing, and development documentation.

---

# Document: project.md

# The Last Shift

## Project Overview
**The Last Shift** is a responsive browser-based pixelated psychological mystery horror game. Players survive a mysterious night shift by making decisions, investigating clues, managing hidden consequences, and discovering multiple endings.

## Core Requirements
- Next.js + TypeScript
- Tailwind CSS
- No backend
- No database
- No authentication
- Individual browser progress via LocalStorage
- Playable on mobile, tablet, laptop, and desktop
- Responsive design
- Pixel art assets created by the project owner

## Core Gameplay
1. Read scenario
2. Investigate when available
3. Make a decision
4. Apply effects and flags
5. Check conditions
6. Trigger events or horror
7. Move to next scenario
8. Check ending conditions

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Zustand + persist
- Framer Motion
- Howler.js
- LocalStorage

## Non-Goals for Version 1
- Multiplayer
- Accounts
- Database
- Server-side game saves
- Leaderboards
- Payment systems

## Design Principles
- Mobile-first
- Data-driven content
- Reusable components
- Separate game logic from UI
- Story branches should use flags and conditions
- Avoid hardcoding story logic inside components
- Every player must have independent local progress

## Save Behavior
Progress is stored locally in each browser. Different players automatically have different saves because LocalStorage belongs to their own browser/device.

## Main Game Stats
- Sanity
- Knowledge
- Trust
- Danger

## Progression
- Chapters
- Scenarios
- Choices
- Flags
- Clues
- Events
- Horror level
- Playthrough count
- Endings
- Achievements

---

# Document: AI_CONTEXT.md

# THE LAST SHIFT - MASTER AI CONTEXT

This project is a responsive, browser-based, pixelated psychological mystery horror game.

## Mandatory Architecture
- Next.js + TypeScript
- Tailwind CSS
- Zustand
- Zustand Persist
- LocalStorage
- Framer Motion
- Howler.js
- No backend
- No database
- No authentication

## Critical Rules
1. Every player has independent progress through browser LocalStorage.
2. The game must work on mobile, tablet, laptop, and desktop.
3. Keep game logic separate from UI.
4. Use data-driven scenarios.
5. Use flags and conditions for branching.
6. Keep horror event-driven.
7. Respect accessibility settings.
8. Do not introduce backend services without explicit approval.

## Documentation

Read these files before major implementation:

- [asset-guide.md](./asset-guide.md)
- [audio-system.md](./audio-system.md)
- [development-roadmap.md](./development-roadmap.md)
- [gameplay.md](./gameplay.md)
- [horror-system.md](./horror-system.md)
- [investigation-system.md](./investigation-system.md)
- [responsive-design.md](./responsive-design.md)
- [save-system.md](./save-system.md)
- [scenarios.md](./scenarios.md)
- [story.md](./story.md)
- [testing.md](./testing.md)
- [ui-design.md](./ui-design.md)

---

# Document: architecture.md

# Project Architecture

## High-Level Architecture

```text
Next.js App
    |
    v
Game UI
    |
    v
Hooks
    |
    v
Game Engine + Zustand Store
    |
    +---------> Static Game Data
    |
    v
LocalStorage
```

## Core Systems

### 1. Scenario Engine
Loads scenarios and determines available content.

### 2. Choice Engine
Processes player choices and applies:
- Stats
- Flags
- Clues
- Events
- Relationships
- Next scenario

### 3. Condition Engine
Checks whether content is available based on:
- Stats
- Flags
- Clues
- Playthrough count
- Previous choices
- Horror level

### 4. Event Engine
Triggers:
- Dialogue
- Audio
- Scene changes
- Glitches
- Jumpscares
- Clue discovery
- UI corruption

### 5. Horror Engine
Controls:
- Horror level
- CRT effects
- Static
- Glitches
- Screen shake
- Darkness
- Jumpscares

### 6. Investigation System
Handles interactable objects and discovered evidence.

### 7. Ending Engine
Checks ending requirements and unlocks results.

### 8. Save Manager
Persists player progress through Zustand persist and LocalStorage.

## Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── game/page.tsx
│   ├── settings/page.tsx
│   └── layout.tsx
├── components/
│   ├── game/
│   ├── investigation/
│   ├── horror/
│   ├── menu/
│   └── ui/
├── data/
│   ├── scenarios/
│   ├── characters.ts
│   ├── clues.ts
│   ├── endings.ts
│   ├── events.ts
│   └── gameConfig.ts
├── engine/
│   ├── ScenarioEngine.ts
│   ├── ChoiceEngine.ts
│   ├── ConditionEngine.ts
│   ├── EventEngine.ts
│   ├── HorrorEngine.ts
│   ├── EndingEngine.ts
│   └── SaveManager.ts
├── hooks/
├── store/
├── lib/
└── types/
```

## Rendering Layers

```text
Jumpscare Layer
UI Layer
Horror Effects Layer
Lighting Layer
Characters Layer
Interaction Layer
Environment Layer
Background Layer
```

## Game Data Flow

```text
Scenario
  -> Conditions
  -> Available interactions
  -> Player choice
  -> Effects
  -> Flags/Stats/Clues
  -> Event check
  -> Horror check
  -> Next scenario
  -> Ending check
  -> Save
```

---

# Document: game-design.md

# The Last Shift - Game Design

## Genre
Pixelated psychological mystery thriller with interactive narrative and horror elements.

## Visual Style
Modern detailed pixel art displayed with subtle retro CRT effects.

## Base Scene Ratio
16:9 responsive game viewport.

Recommended pixel-art source resolution:
- 320 x 180 for simple scenes
- Higher source resolution is allowed when assets need more detail
- Preserve pixel sharpness when scaling

## Horror Progression

### Level 0: Normal
Clean office, calm ambient audio.

### Level 1: Something Is Wrong
Small environmental changes and suspicious behavior.

### Level 2: Distortion
Glitches, incorrect backgrounds, strange audio.

### Level 3: Nightmare
Visual rules begin breaking and entities become more visible.

### Level 4: Reality Break
UI, scenes, and story can become unreliable.

## Core Loop

```text
Explore
-> Read Scenario
-> Investigate
-> Discover Clues
-> Make Decision
-> Apply Consequences
-> Trigger Event
-> Continue
```

## Player Systems

### Stats
- Sanity
- Knowledge
- Trust
- Danger

### Narrative State
- Flags
- Choices made
- Character relationships
- Story paths

### Investigation
- Clues
- Evidence
- Documents
- Locked information

### Replay
- Playthrough count
- Previous memories
- Unlocked content
- Discovered endings

## Horror Philosophy
Do not make everything scary immediately.

Progress:
Normal -> Suspicious -> Uncomfortable -> Distorted -> Terrifying

The player should often question whether something actually changed.

## Jumpscare Types
- Classic sudden scare
- Fake scare
- Conditional scare
- Randomized scare
- Delayed consequence scare
- Environmental scare

## Accessibility
Players should be able to reduce:
- Flashing
- Screen shake
- Motion
- Jumpscare audio volume

---

# Document: story-bible.md

# The Last Shift — Story Bible

## Premise
The player is Employee #427, working a night shift in a corporate building. They cannot remember ever working there, yet the terminal says:

> WELCOME BACK, EMPLOYEE #427.

The player must survive until 6:00 AM while investigating why the building remembers them.

## Central Mystery
The real mystery is identity: who is Employee #427 when the building contains records of previous versions of them?

## RECALL
RECALL is a memory-reconstruction experiment that attempts to recreate a person's consciousness from recorded behavior and memories.

The experiment failed. Reconstructions develop inconsistencies, memories overlap, and previous versions can leave information for later versions.

## The Observer
The Observer is a consciousness assembled from fragments of previous reconstructions. It monitors the experiment and may be protecting the player from worse outcomes.

It appears through cameras, reflections, monitors, glitches, and distorted silhouettes.

## Employee #428
#428 appears to be another employee but is actually another reconstruction containing fragments of #427.

Depending on player choices, #428 can become an ally, betrayer, victim, or key to the truth.

## The Manager
The Manager communicates through terminals, phone calls, and documents. Its instructions become increasingly contradictory.

## The Caller
An unknown voice claims to help the player escape and warns them not to trust the person who tells them to stay until six.

The Caller may be truthful, deceptive, or another part of RECALL.

## Themes
- Memory
- Identity
- Surveillance
- Isolation
- Repetition
- Guilt
- Reality versus perception

## Horror Progression
Normal → Suspicious → Distorted → Nightmare → Reality Break.

## Major Reveals
1. #427 has worked here before.
2. Previous shifts exist.
3. Previous shifts contain contradictory decisions.
4. #428 knows impossible information.
5. The Observer is connected to #427.
6. RECALL is responsible.
7. The player must decide whether to escape, reset, destroy RECALL, or remain inside it.

Do not explain every mystery. Leave room for interpretation.

---

# Document: story.md

# Story Structure

## Working Title
The Last Shift

## Genre
Psychological mystery thriller with pixel horror.

## Premise
The player wakes inside a corporate office during a mysterious night shift.

A computer displays:

> WELCOME BACK, EMPLOYEE #427.

The player does not remember working there.

They are instructed to survive until 6:00 AM.

Throughout the night:
- Cases appear
- Strange calls occur
- Employees behave unnaturally
- The building changes
- Previous decisions become important

## Story Structure

### Chapter 0 - The Wake Up
Time: 11:47 PM

Goals:
- Introduce player
- Teach interaction
- Establish mystery
- Avoid obvious horror

### Chapter 1 - The Shift Begins
Time: 12:00 AM to 1:00 AM

Goals:
- Introduce cases
- Introduce choices
- First investigation
- First suspicious event

### Chapter 2 - Something Is Wrong
Time: 1:00 AM to 2:30 AM

Goals:
- Environmental changes
- Introduce mysterious caller
- Introduce Employee #428
- Reveal contradictions

### Chapter 3 - Distortion
Time: 2:30 AM to 4:00 AM

Goals:
- Reality becomes unreliable
- Important clues appear
- Horror conditions activate
- Secret paths unlock

### Chapter 4 - The Nightmare
Time: 4:00 AM to 5:30 AM

Goals:
- Major reveals
- Dangerous decisions
- Entities become active
- Story paths converge or diverge

### Chapter 5 - The Truth
Time: 5:30 AM to 6:00 AM

Goals:
- Final investigation
- Major decision
- Ending calculation

## Story Rules

1. Not every mystery must be explained immediately.
2. Earlier details should become meaningful later.
3. Player choices should have delayed consequences.
4. The player should question their own memories.
5. Multiple playthroughs should reveal additional information.
6. Avoid exposition dumps.

## Main Mystery

The story should gradually answer:
- Who is Employee #427?
- Why does the system say "Welcome Back"?
- What happened during previous shifts?
- What is the building?
- Who is the Observer?
- Why are some employees aware of the player?

---

# Document: characters.md

# Character Bible

## Employee #427
The player. Their personality is defined through choices.

**Conflict:** "I know this place, but I don't remember knowing it."

## Employee #428
A mysterious coworker and partial reconstruction of #427.

Possible roles:
- Ally
- Betrayer
- Victim
- Guide
- Final confrontation

## The Observer
A dark, distorted monitoring entity made from fragments of previous reconstructions.

It rarely attacks directly early in the story.

## The Manager
An apparently professional authority figure communicating remotely. Its messages may be automated.

## The Caller
An unknown voice claiming to know how the player can escape.

## Previous #427
A previous version of the player whose notes, recordings, and files become evidence.

The disturbing detail: some warnings are written in the player's handwriting.

---

# Document: story-flow.md

# Story Flow

```text
START
 |
 v
CHAPTER 0: WAKE UP
 |
 v
CHAPTER 1: THE SHIFT
 |------ Caller Path
 |------ Investigation Path
 |------ Ignore Path
 v
CHAPTER 2: SOMETHING IS WRONG
 |------ Trust #428
 |------ Trust Caller
 |------ Trust Manager
 v
CHAPTER 3: DISTORTION
 |------ Archive
 |------ RECALL
 |------ Observer
 v
CHAPTER 4: NIGHTMARE
 |------ Restricted Floor
 |------ Server Room
 |------ #428 Confrontation
 v
CHAPTER 5: TRUTH
 |
 v
FINAL DECISION
 |------ Escape
 |------ Loop
 |------ Destroy
 |------ Observer
 |------ Truth
```

## Branching Rule
Use converging branches instead of creating completely separate games.

Choices should change:
- Dialogue
- Flags
- Stats
- Clues
- Events
- Future options

Important flags:
`answeredPhone`, `trustedCaller`, `trusted428`, `trustedManager`, `openedRedDoor`, `foundPreviousLog`, `discoveredRecall`, `followedObserver`, `destroyedServer`, `saved428`.

---

# Document: endings.md

# Ending System

## The Exit
High knowledge, manageable danger, and enough exit evidence.

The player escapes, but the final screen says:

> SHIFT COMPLETE.

## The Loop
Low knowledge and strong trust in the Manager.

The player reaches 6:00 AM, then wakes at 11:47 PM again.

## The Truth
High knowledge, major clues, previous #427 log, and RECALL discovery.

The player learns the nature of the experiment.

## The Observer
The player follows Observer events and accepts remaining inside RECALL.

The final view is a security camera showing a new #427 entering.

## The Reset
The player destroys the RECALL server.

The screen displays:

> MEMORY DATA CORRUPTED.

## The False Escape
The player trusts the Caller without discovering enough truth.

They escape and see another identical building.

## Secret: #428
High trust with #428, save #428, and discover #428 clues.

#428 reveals that they are not entirely separate from #427.

Ending progress should persist locally.

---

# Document: content-schema.md

# Game Content Schema

## Scenario

```ts
interface Scenario {
  id: string;
  chapter: number;
  title?: string;
  background: string;
  dialogue?: DialogueLine[];
  interactions?: Interaction[];
  choices?: Choice[];
  events?: GameEvent[];
  conditions?: Condition[];
  horrorLevel?: number;
}
```

## Choice

```ts
interface Choice {
  id: string;
  text: string;
  conditions?: Condition[];
  effects?: GameEffects;
  nextScenario?: string;
  events?: string[];
}
```

## Game Effects

```ts
interface GameEffects {
  stats?: Partial<GameStats>;
  flags?: Record<string, boolean>;
  addClues?: string[];
  removeClues?: string[];
  addEvents?: string[];
  horrorLevel?: number;
}
```

## Conditions

```ts
type Condition =
  | { type: "flag"; key: string; value: boolean }
  | { type: "stat"; stat: keyof GameStats; operator: ">" | ">=" | "<" | "<=" | "==="; value: number }
  | { type: "clue"; clueId: string }
  | { type: "playthrough"; operator: ">=" | "==="; value: number };
```

## Game State

```ts
interface GameStats {
  sanity: number;
  knowledge: number;
  trust: number;
  danger: number;
}

interface GameState {
  currentScenarioId: string;
  currentChapter: number;
  stats: GameStats;
  flags: Record<string, boolean>;
  clues: string[];
  choices: string[];
  triggeredEvents: string[];
  endings: string[];
  achievements: string[];
  playthroughCount: number;
  horrorLevel: number;
}
```

## Jumpscare Event

```ts
interface JumpscareEvent {
  id: string;
  image: string;
  sound?: string;
  duration: number;
  conditions?: Condition[];
  effects?: GameEffects;
}
```

## Important Content Rule
All scenario references must use IDs. Do not reference content by display text.

---

# Document: scenarios.md

# Scenario Authoring Guide

## Scenario Philosophy

Scenarios are the main content units of the game.

Every scenario should contain at least one:
- Story development
- Investigation opportunity
- Decision
- Consequence
- Mystery

## Scenario Template

```ts
{
  id: "chapter-01-case-01",
  chapter: 1,
  title: "The Phone Call",
  background: "main-office",

  dialogue: [],

  interactions: [],

  choices: [],

  conditions: [],

  events: [],

  horrorLevel: 0
}
```

## Recommended Scenario IDs

```text
chapter-01-case-01
chapter-01-case-02
chapter-02-security-room
chapter-03-red-door
```

## Choice Template

```ts
{
  id: "answer-phone",
  text: "Answer the phone",

  effects: {
    stats: {
      sanity: -5,
      knowledge: 10
    },

    flags: {
      answeredPhone: true
    }
  },

  nextScenario: "chapter-01-case-02"
}
```

## Good Choice Design

Bad:

```text
Yes
No
```

Better:

```text
Answer the phone
Disconnect the call
```

Best:

```text
Answer and ask who is calling
Stay silent and listen
```

## Scenario Checklist

Before adding a scenario:

- [ ] Unique ID
- [ ] Valid chapter
- [ ] Background exists
- [ ] Dialogue is intentional
- [ ] Choices have consequences
- [ ] Next scenario IDs exist
- [ ] Conditions are valid
- [ ] Assets exist
- [ ] Mobile layout considered
- [ ] Horror effect respects settings

---

# Document: gameplay.md

# Gameplay System

## Core Gameplay Loop

```text
Load Save / New Game
        ↓
Load Scenario
        ↓
Render Scene
        ↓
Dialogue / Exploration
        ↓
Investigate (Optional)
        ↓
Make Decision
        ↓
Apply Effects
        ↓
Check Conditions
        ↓
Trigger Events
        ↓
Save Progress
        ↓
Load Next Scenario
```

## Player Actions

### Investigate
Players can tap or click objects in a scene.

Possible results:
- Read dialogue
- Discover a clue
- Unlock a choice
- Change a flag
- Trigger an event
- Trigger horror
- Unlock a location

### Make a Choice
Choices can:
- Change stats
- Set flags
- Unlock content
- Trigger events
- Change relationships
- Change the next scenario

### Review Evidence
Players can open their evidence collection and inspect:
- Documents
- Photos
- Recordings
- Employee files
- Security footage
- Notes

## Stats

### Sanity
Represents the player's connection to reality.

Low sanity may:
- Change dialogue
- Reveal hallucinations
- Trigger unique events
- Unlock unreliable scenes

### Knowledge
Represents discovered information.

High knowledge may:
- Unlock secret choices
- Reveal the truth
- Unlock endings

### Trust
Represents relationships and confidence in characters.

### Danger
Represents immediate threat.

High danger may:
- Trigger urgent events
- Change scenes
- Trigger death/failure paths

## Choice Rules

Every choice should answer at least one question:
- What does the player gain?
- What does the player risk?
- What changes later?

Avoid choices that have no consequence.

## Game Loop Design Principle

A player should frequently experience:

```text
Curiosity
↓
Investigation
↓
Discovery
↓
Doubt
↓
Decision
↓
Consequence
```

---

# Document: investigation-system.md

# Investigation System

## Purpose

Investigation gives players control between narrative decisions.

## Interactable Object Types

```text
document
computer
camera
door
drawer
phone
monitor
photo
recording
key
```

## Interaction Result Types

```text
dialogue
clue
event
unlock-choice
unlock-location
jumpscare
stat-change
```

## Interaction Structure

```ts
interface Interaction {
  id: string;
  label?: string;
  conditions?: Condition[];
  result: InteractionResult[];
}
```

## Clue Categories

### Documents
- Employee records
- Reports
- Internal memos

### Visual
- Photos
- Security images
- Drawings

### Audio
- Calls
- Recordings
- Radio messages

### Physical
- Keys
- ID cards
- Objects

## Clue Design

Each important clue should:
- Answer something
- Create a new question
- Connect to another clue
- Potentially affect an ending

Avoid clues that only exist for collection.

## Evidence Board

Recommended future UI:

```text
EVIDENCE
├── Documents
├── Photos
├── Audio
├── Objects
└── Unknown
```

---

# Document: horror-system.md

# Horror System

## Horror Philosophy

Fear should be created through:

```text
Atmosphere
↓
Suspicion
↓
Pattern Recognition
↓
Pattern Breaking
↓
Fear
```

Do not use jumpscares constantly.

## Horror Levels

### Level 0 - Normal
- Calm
- Clean scenes
- Minimal effects

### Level 1 - Suspicious
- Small changes
- Strange sounds
- Incorrect clocks
- Distant shadows

### Level 2 - Distortion
- Glitches
- Changed dialogue
- Unnatural movement
- Incorrect environments

### Level 3 - Nightmare
- Entities
- Heavy distortion
- Reality changes
- Dangerous events

### Level 4 - Reality Break
- UI corruption
- Meta events
- Unreliable narration
- Major horror sequences

## Horror Event Types

```ts
type HorrorEventType =
  | "glitch"
  | "static"
  | "screen-shake"
  | "darkness"
  | "audio"
  | "entity"
  | "jumpscare"
  | "text-corruption";
```

## Jumpscare Rules

A jumpscare should:
1. Have narrative context.
2. Not happen too frequently.
3. Be skippable through accessibility settings where appropriate.
4. Use player interaction restrictions carefully.
5. Resume the game cleanly.

## Recommended Sequence

```text
Ambient Audio
↓
Audio Reduces
↓
Silence
↓
Suspicious Detail
↓
Pause
↓
Jumpscare
↓
Aftermath
```

## Important
The aftermath is often more important than the jumpscare.

After a scare:
- Change dialogue
- Add a clue
- Change the room
- Change an NPC
- Reveal a consequence

---

# Document: save-system.md

# Save System

## Storage

Version 1 uses:

```text
Zustand Persist
+
LocalStorage
```

## Save Key

```text
the-last-shift-save
```

## Persistent Data

Save:
- Current scenario
- Current chapter
- Stats
- Flags
- Clues
- Choices
- Events
- Endings
- Achievements
- Playthrough count
- Settings

Do not save:
- Temporary animations
- Hover states
- Open tooltips
- Temporary modals

## Save Timing

Save after:
- Player choice
- Clue discovery
- Scenario transition
- Ending unlock
- Important event
- Settings update

## New Game

New Game should:
- Reset current run
- Keep meta progression if desired
- Keep unlocked endings if intended

## Full Reset

Full Reset should remove:

```text
the-last-shift-save
```

Require confirmation before deleting.

## Save Versioning

Recommended:

```ts
{
  version: 1,
  savedAt: Date.now(),
  data: {}
}
```

Future migrations should support older save versions.

## Important Limitation

Local saves:
- Do not sync between devices
- Can be removed with browser data
- Are independent for each browser

This is expected for Version 1.

---

# Document: responsive-design.md

# Responsive Design

## Target Devices

- Mobile phones
- Tablets
- Laptops
- Desktop PCs

## Design Strategy

Use:

```text
One Game Engine
+
Responsive UI
```

Do not create separate game logic per device.

## Mobile First

### Mobile
Primary interaction:
- Tap
- Swipe

Rules:
- Large buttons
- Readable text
- No hover dependency
- Bottom panels when needed
- HUD minimized

### Tablet
Support:
- Touch
- Landscape
- Larger scene presentation
- Optional expanded panels

### Desktop
Support:
- Mouse
- Keyboard

Enhancements:
- Hover states
- Keyboard shortcuts
- Expanded HUD

## Suggested Breakpoints

```text
Mobile:  0 - 640px
Tablet:  641 - 1024px
Desktop: 1025px+
```

## Game Viewport

Use a responsive 16:9 container where possible.

The game should:
- Scale scenes
- Preserve aspect ratio
- Avoid cropping critical content
- Support safe mobile viewport units

## Input Mapping

### Left Choice
- Swipe left
- Tap left button
- A
- Left Arrow

### Right Choice
- Swipe right
- Tap right button
- D
- Right Arrow

### Continue
- Tap
- Click
- Space
- Enter

## Accessibility
Touch targets should remain practical on smaller screens.

---

# Document: ui-design.md

# UI Design

## Visual Identity

Pixel Art
+
Retro Corporate System
+
CRT Technology
+
Psychological Horror

## UI Principles

- Clear
- Minimal
- Readable
- Atmospheric
- Responsive

## Main Screens

### Main Menu

```text
THE LAST SHIFT

CONTINUE
NEW GAME
ENDINGS
SETTINGS
```

### Gameplay

```text
Top:
Status / Time

Center:
Game Scene

Bottom:
Dialogue / Choices

Optional:
Evidence / Menu
```

## Mobile UI

Prioritize:
- Scene
- Dialogue
- Choices

Secondary content:
- Stats
- Evidence
- Settings

Place secondary content behind buttons or sheets.

## Desktop UI

Can display:
- Expanded stats
- Time
- Evidence shortcut
- Keyboard hints

## Horror UI Changes

UI may change based on horror level:
- Flicker
- Corrupt text
- Temporary distortion
- Incorrect status

Never make critical controls permanently unusable.

---

# Document: audio-system.md

# Audio System

## Audio Categories

```text
Music
Ambient
SFX
Voice
Jumpscare
```

## Music
Examples:
- Menu
- Office ambient
- Tension
- Nightmare
- Ending

## Ambient
Examples:
- Air conditioner
- Fluorescent lights
- Computer fans
- Rain
- Distant traffic

## SFX
Examples:
- Click
- Typing
- Phone
- Door
- Footsteps
- Static

## Audio Rules

- Avoid autoplay failures.
- Initialize audio after user interaction when needed.
- Support independent volume controls.
- Fade music instead of abruptly switching when possible.
- Silence can be used intentionally.

## Settings

- Master Volume
- Music Volume
- Ambient Volume
- SFX Volume
- Jumpscare Volume

## Horror Audio

Use:
- Directional-feeling effects when possible
- Sudden silence
- Low-frequency tension carefully
- Distorted office sounds

Do not rely only on loud volume.

---

# Document: asset-guide.md

# Asset Guide

## Ownership

All game assets should be original or properly licensed.

## Directory Structure

```text
public/assets/
├── images/
│   ├── backgrounds/
│   ├── characters/
│   ├── jumpscares/
│   ├── clues/
│   └── ui/
├── audio/
│   ├── music/
│   ├── ambient/
│   ├── sfx/
│   └── jumpscares/
└── fonts/
```

## Naming

Use lowercase kebab-case.

Examples:

```text
main-office-normal.webp
main-office-distorted.webp
observer-idle.webp
observer-jumpscare-01.webp
phone-ring.mp3
```

## Image Rules

- Avoid unnecessarily large files.
- Preserve pixel clarity.
- Use consistent canvas dimensions for related assets.
- Separate background layers when animation is required.

## Character Assets

Recommended states:
- Idle
- Talking
- Suspicious
- Distorted
- Horror

## Scene Versions

A scene may have:

```text
normal
suspicious
distorted
nightmare
```

## Asset Manifest

Consider creating a data manifest for asset references instead of scattering paths across components.

---

# Document: conventions.md

# Project Conventions

## Naming

### Components
PascalCase:
- GameScreen.tsx
- ScenarioCard.tsx
- JumpscareOverlay.tsx

### Hooks
camelCase starting with `use`:
- useGame.ts
- useAudio.ts
- useScenario.ts

### Engine
PascalCase:
- ChoiceEngine.ts
- ConditionEngine.ts

### Data IDs
Use lowercase kebab-case:
- chapter-01-case-01
- clue-employee-file
- ending-loop

## Imports
Prefer project aliases when configured:

```ts
import { useGameStore } from "@/store/gameStore";
```

## Component Rules
Components should:
- Receive typed props
- Render UI
- Emit user actions

Components should not:
- Contain large branching systems
- Directly manage persistence
- Hardcode scenario logic

## State Rules
Persistent state:
- Progress
- Stats
- Flags
- Clues
- Endings
- Settings

Temporary UI state:
- Open modal
- Active animation
- Hover/focus state
- Loading state

Do not persist temporary UI state unless required.

## Asset Rules
Use predictable paths:

```text
/assets/images/backgrounds/
/assets/images/characters/
/assets/images/jumpscares/
/assets/audio/music/
/assets/audio/sfx/
```

## Commit Style
Recommended:
- feat: add scenario engine
- fix: prevent duplicate clue unlock
- refactor: simplify condition checks
- style: improve mobile HUD
- chore: update dependencies
- docs: update architecture

## Testing Checklist
Before release test:
- New game
- Continue game
- Refresh page
- Close and reopen browser
- Mobile touch controls
- Tablet layout
- Desktop keyboard controls
- Jumpscare conditions
- Audio settings
- Reduced motion
- Ending unlocks
- Reset progress

---

# Document: skills.md

# Development Skills and Rules

## Role
Act as a senior game-focused frontend engineer and technical architect.

## Primary Skills
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zustand state management
- Zustand persist
- LocalStorage persistence
- Responsive design
- Touch, mouse, keyboard, and swipe controls
- Data-driven game architecture
- Interactive narrative systems
- Conditional story branching
- Browser audio with Howler.js
- Framer Motion animations
- Pixel-art rendering

## Coding Rules
1. Use TypeScript strictly.
2. Prefer reusable components.
3. Keep business/game logic outside UI components.
4. Never hardcode story branching inside JSX.
5. Store scenarios as structured data.
6. Use flags for long-term story consequences.
7. Use conditions to unlock scenarios and choices.
8. Keep LocalStorage access client-safe.
9. Avoid hydration errors.
10. Support mobile first, then larger screens.
11. Keep pixel art sharp with nearest-neighbor rendering.
12. Respect reduced-motion and reduced-flashing settings.
13. Do not introduce a backend unless explicitly requested.

## Architecture Rules
UI -> Hooks -> Store/Engine -> Data

Components must not directly contain complex game rules.

Preferred responsibilities:
- Components: rendering and interaction
- Hooks: UI/game orchestration
- Engine: rules, conditions, consequences
- Store: current state and persistence
- Data: scenarios, clues, endings, configuration

## TypeScript Rules
- Avoid `any`.
- Define interfaces/types before implementing complex systems.
- Use discriminated unions for event types when useful.
- Validate scenario IDs and references.
- Prefer immutable state updates.

## Responsive Rules
### Mobile
- Large tap targets
- No hover-only interactions
- Swipe supported where appropriate
- Important text remains readable

### Tablet
- Adaptive panels
- Touch-friendly controls

### Desktop
- Keyboard shortcuts
- Mouse interactions
- Additional HUD information when useful

## Horror Rules
- Horror effects must be event-driven.
- Jumpscares must be conditionally triggerable.
- Do not trigger loud audio before user interaction if browser autoplay restrictions apply.
- Respect accessibility settings for flashing and screen shake.
- Build suspense before jumpscares.
- Prefer subtle environmental changes over constant jumpscares.

## Performance Rules
- Optimize large images.
- Prefer WebP for pixel-art backgrounds when appropriate.
- Lazy load heavy optional assets.
- Avoid unnecessary re-renders.
- Keep game data separate from rendered assets.
- Test on lower-powered mobile devices.

---

# Document: chapter-01-content.md

# Chapter 1 — The Shift Begins

## Goal
Teach dialogue, investigation, choices, and saving while keeping horror subtle.

## Scenario 01 — Welcome Back
Location: Main Office.

Computer:

```text
11:47 PM

WELCOME BACK,
EMPLOYEE #427.
```

Investigable:
- Computer
- Desk
- ID card
- Phone

ID card:

```text
EMPLOYEE: #427
STATUS: ACTIVE
LAST SHIFT: TODAY
```

## Scenario 02 — The Phone
The phone rings.

**Answer**
- Knowledge +5
- Danger +5
- `answeredPhone = true`

Caller:

> "If they ask whether you remember, say no."

**Ignore**
- `phoneIgnored = true`

The phone rings again later.

## Scenario 03 — Previous Shifts
The computer shows:

```text
PREVIOUS SHIFT RECORDS

#427 — 03:12 AM — TERMINATED
#427 — 04:48 AM — TERMINATED
#427 — 05:59 AM — TERMINATED
```

Do not immediately explain "terminated."

## Scenario 04 — The Photograph
A photograph shows the office staff.

The player is visible in it.

The photograph is dated tomorrow.

## Scenario 05 — First Horror
After returning to the desk, the photograph changes.

One employee is missing.

A reflection briefly shows that employee behind the player.

When the player turns around, nobody is there.

## Chapter End
At 1:00 AM:

```text
SYSTEM:
SHIFT CHECKPOINT REACHED.

EMPLOYEE #428:
"Are you still there?"
```

---

# Document: development-roadmap.md

# Development Roadmap

## Phase 0 - Planning
- [ ] Finalize game concept
- [ ] Define chapters
- [ ] Define stats
- [ ] Define flags
- [ ] Define endings

## Phase 1 - Project Setup
- [ ] Create Next.js project
- [ ] Configure TypeScript
- [ ] Configure Tailwind
- [ ] Add Zustand
- [ ] Add animation/audio dependencies

## Phase 2 - Game Foundation
- [ ] Game layout
- [ ] Game viewport
- [ ] Main menu
- [ ] New game
- [ ] Continue game

## Phase 3 - State
- [ ] Game store
- [ ] Settings store
- [ ] Save persistence
- [ ] Reset system

## Phase 4 - Scenario System
- [ ] Scenario types
- [ ] Scenario data
- [ ] Scenario engine
- [ ] Dialogue
- [ ] Choices

## Phase 5 - Conditions
- [ ] Flags
- [ ] Stat conditions
- [ ] Clue conditions
- [ ] Playthrough conditions

## Phase 6 - Investigation
- [ ] Interactions
- [ ] Clue discovery
- [ ] Evidence viewer
- [ ] Locked content

## Phase 7 - Horror
- [ ] Horror levels
- [ ] CRT effect
- [ ] Glitches
- [ ] Screen shake
- [ ] Jumpscare system

## Phase 8 - Audio
- [ ] Audio manager
- [ ] Music
- [ ] Ambient
- [ ] SFX
- [ ] Settings

## Phase 9 - Content
- [ ] Chapter 0
- [ ] Chapter 1
- [ ] Chapter 2
- [ ] Chapter 3
- [ ] Chapter 4
- [ ] Chapter 5
- [ ] Endings

## Phase 10 - Responsive Testing
- [ ] Mobile
- [ ] Tablet
- [ ] Laptop
- [ ] Desktop

## Phase 11 - Polish
- [ ] Performance
- [ ] Accessibility
- [ ] Save migration
- [ ] Error handling
- [ ] Final testing

## Phase 12 - Deployment
- [ ] Production build
- [ ] Test deployment
- [ ] Deploy
- [ ] Test on real devices

---

# Document: testing.md

# Testing Guide

## Functional Testing

### Game
- [ ] New Game works
- [ ] Continue works
- [ ] Scenario loads
- [ ] Dialogue works
- [ ] Choices work

### State
- [ ] Stats update
- [ ] Flags update
- [ ] Clues unlock
- [ ] Events trigger

### Story
- [ ] Next scenario exists
- [ ] Conditions work
- [ ] Locked choices remain locked
- [ ] Secret paths unlock correctly

### Horror
- [ ] Jumpscare triggers correctly
- [ ] Audio works
- [ ] Screen effects clear
- [ ] Game resumes

### Save
- [ ] Refresh retains progress
- [ ] Browser reopen retains progress
- [ ] New Game resets run
- [ ] Full Reset deletes save

## Device Testing

### Mobile
- [ ] Touch
- [ ] Swipe
- [ ] Portrait
- [ ] Landscape

### Tablet
- [ ] Touch
- [ ] Layout

### Desktop
- [ ] Mouse
- [ ] Keyboard
- [ ] Different screen sizes

## Accessibility
- [ ] Reduced motion
- [ ] Reduced flashing
- [ ] Audio controls
- [ ] Readable text

## Performance
- [ ] Large scenes load efficiently
- [ ] No excessive re-rendering
- [ ] Audio does not leak
- [ ] Mobile remains responsive

---

# Document: implementation-plan.md

# Implementation Plan

## Vertical Slice First

Build only:

```text
Main Menu
↓
New Game
↓
Chapter 1
↓
Dialogue
↓
Investigation
↓
Choice
↓
Save
↓
Chapter End
```

Do not build all chapters before the core loop works.

## AI Coding Workflow

1. Read `AI_CONTEXT.md`.
2. Read the relevant documentation.
3. Inspect the existing implementation.
4. Identify the smallest required change.
5. Implement without unnecessary rewrites.
6. Check TypeScript.
7. Check responsive behavior.
8. Update docs if architecture changes.

## Hard Rules
- No database without explicit approval.
- No authentication without explicit approval.
- Do not put complex game logic inside JSX.
- Do not hardcode story branches into UI.
- Do not add dependencies without justification.
