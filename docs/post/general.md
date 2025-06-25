---
title: "General Information"
summary: "General information in regards to PCSX2 features"
draft: false
toc: true
sidebar_position: 1
---

General information in regards to PCSX2 features.

:::danger
**Do not run untrusted programs in PCSX2. It is not a sandbox and cannot protect your computer from malicious software.**
:::

## Renderer options

:::caution
**When in doubt, use the automatic renderer option.**
:::

### Automatic

Automatic will figure out out what renderer works for what GPU architectures, and it is set up to pick the best option for you. Priority goes first to stability, then accuracy. **Always use this option if you are unsure.**

### Software mode

Renders on your CPU for maximum accuracy. Does not use your GPU.
Requires a strong, multi-core CPU.

### Hardware mode

#### Vulkan

- Fully featured, very accurate on all platforms.
- Fast on all platforms, but unstable on Intel iGPUs.
- Requires up-to-date GPU drivers.

#### OpenGL

- Fully featured, very accurate on all platforms.
- Okay on Nvidia, fast but unstable on Intel, slow on AMD.
- Slower than Vulkan in all scenarios.

#### Direct3D12

- Least accurate, cannot emulate some blending effects.
- No major differences across GPU vendors.
- Requires a Direct3D12 capable GPU.

#### Direct3D11

- Same accuracy as Direct3D12, slightly slower.
- No major differences across GPU vendors.

## Per-game settings

Per-game settings allows you to set different configuration for specific games. Useful when a certain game needs a specific setting to fix graphical issues.

It can be accessed one of two ways, depending on if a game is running or not.

### If no game is running

Right click the game in your games list, then hit `Properties`

### If a game is running

Go to `Settings > Game Properties`

## Portable mode

### What is Portable mode?

Portable mode allows you to confine all of PCSX2's related data and configuration into its own folder instead of using the user's Documents folder, essentially making it "Portable".

- To enable portable mode, simply create an empty `portable.txt` or `portable.ini` file in the root directory of your PCSX2 folder
- You can also pass in `-portable` as a launch argument to force PCSX2 to run in portable mode

## Save States

### What are Save States?

Save states are copies of PCSX2's machine state. Loading a state allows PCSX2 to "jump" back to the copied machine state. Save states are NOT game saves, and are NOT suitable replacement for memory cards.

### Good uses of save states

- "Bookmarking" your location in a game so you can retry something quickly
- Temporarily saving your progress in games which limit saving

### Things to avoid with save states

Do not use them to permanently save your game. Save your games normally to your memory cards.

### Cautions about save states

Cheats and any patches will burn in to a savestate, and cannot be removed after burning in.
Errors in a game (e.g. memory leaks) will burn in to a savestate.
Save states are NOT guaranteed to be compatible across any PCSX2 versions.

### Save state compatibility

Save state are **NOT** guaranteed to be compatible across different PCSX2 versions. Savestate version bump tends to happen from time to time, and for this very reason that you should not rely on save states as your main game saving method.

:::tip
Always use your memory card for long-term game saves storage.
:::

PCSX2 will throw an error if you try to load a savestate that is incompatible with the current running version:

<Image src={require("./img/sstates.webp").default} />

If this happens to you, there are only 2 ways to remedy the problem:

#### Option #1

1. Download the exact PCSX2 version that are mentioned on the error dialog.
2. Open up the game and load your save state.
3. Save your game to the memory card.
4. Go back to your current PCSX2 version, and just load from Memory Card.

#### Option #2

You can delete your incompatible savestate and just load the game normally without save state.

### I've been using save states to store progress, how can I fix this?

1. Boot your game
2. Load your save state
3. Save your game using the game's normal save function

### Game specific issues

#### Gran Turismo 4 - Rewind Condition

Loading a savestate captured before your most recent memory card save will result in the hash in RAM no longer matching the memory card contents. The data on your memory card is now from the future.

#### What is the game doing?

Gran Turismo 4 only keeps partial information about your garage in RAM at any time. The rest is kept on the memory card for permanent storage. To ensure data consistency, the game stores a hash of your memory card in RAM and uses that to verify that the currently inserted memory card is not changed.

#### How do I fix this?

If you encounter a rewind condition and the game no longer recognizes your memory card, you have no choice but to boot the game again. Do not load a savestate. Let the game boot and load normally from your memory card.
