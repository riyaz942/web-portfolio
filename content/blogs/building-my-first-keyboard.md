---
title: "Building a split keyboard from scratch"
slug: building-my-first-keyboard
description: "How I hand-wired a wireless split keyboard in a 3D-printed case, and what I did when one half's Bluetooth turned out to be dead."
publishedAt: "2026-11-01"
updatedAt: ""
tags: [hardware, keyboards]
coverImage: "/images/blogs/building-my-first-keyboard/image-11.webp"
coverAlt: "The finished split keyboard, painted green with Lord of the Rings artwork"
draft: false
---

I'd been typing on the same Anne Pro 2 for about five years, with the same keycaps and switches (the mechanical part under each key) the whole time. I wasn't deep into the keyboard hobby. But building one from scratch was on my checklist.

I was hesitant at first. I watched a lot of videos, read some blogs and references, and then got a little ambitious and went for a wireless split keyboard (two separate halves, one for each hand). I'd done a bit of soldering before, when I modded my Anne Pro 2 to make it hot-swappable, meaning you can pull the switches out and swap them without desoldering anything. That was fun. I also burned my hand. With that much experience behind me, I pulled the trigger.

This isn't a full build guide. It's the important stuff and how it went. The full parts list is at the end.

## Getting started

My first order was the 3D-printed case, the hot-swap sockets, enameled copper wire and the microcontroller.

For the case, Ryan has a site, [ryanis.cool/dactyl](https://ryanis.cool/dactyl/), where you design the keyboard by adjusting things like the curve, the height and the number of keys, then download the STL file (the 3D model). You can send that STL file off to be 3D printed.

## How it works

The microcontroller is the brain of the keyboard. It's a small board that the USB cable plugs into, with contact points (pins) along its edges. Connect two of those pins with a wire and the microcontroller treats it as a keypress. Using the pin layout below, connecting P0.24 to P1.15 could register as A, and P0.24 to P1.13 as B, if that's how you've configured it. You could make them Z and X instead. The configuration part comes later.

You can use any of the programmable pins in the P0.\* or P1.\* groups. Check the pin layout for the exact board you buy. Mine was a nice!nano v2 clone, and its layout was the same as the original.

![nice!nano v2 pin layout](/images/blogs/building-my-first-keyboard/image-01.webp "The nice!nano v2 pin layout. Check the one for your exact board.")

The keys are wired in a matrix, which is a grid of rows and columns. Each switch sits where a row and a column cross, and pressing it connects that row to that column. The nice!nano scans the grid to work out which key was pressed, and the firmware maps that position to a key. A 5 × 5 grid gives you up to 25 keys per half and only needs 10 pins. Mine is a 4x5 Dactyl Manuform. In its standard layout that's 23 keys per half: three full rows of 5, 2 keys on the bottom row and 6 thumb keys. For the wiring I treated each half as a 5 × 5 grid, so it uses 23 of those 25 positions.

![Wiring for one half, showing the row and column wires running into the microcontroller](/images/blogs/building-my-first-keyboard/image-02.webp "One half: 5 rows and 5 columns into the microcontroller")

Every switch also needs a diode. A diode only lets current flow in one direction. Without them, pressing certain key combinations can create extra electrical paths through the grid, and the keyboard registers keys you never pressed. That's called ghosting. A diode on each switch blocks those paths, so several keys pressed together all read correctly.

## Putting it together

Since I was using hot-swap sockets, I wired the rows and columns to the sockets instead of the switches. First I glued the sockets into the 3D print with Fevikwik (superglue). I slotted some of them in wrong. Some I glued in backwards and had to pry back out. It was a mess. Plan everything before you glue anything down.

![Hot-swap sockets glued into the 3D-printed case, with switches plugged into them](/images/blogs/building-my-first-keyboard/image-03.webp "Hot-swap sockets glued into the case. Plan before you glue.")

Then came the soldering. I used enameled copper wire for the connections, and I didn't know it has a thin insulating coating. I found out after I'd finished, when I tested the connections with a multimeter (a meter that, among other things, tells you whether two points are connected) and some of the circuits weren't complete. That one was on me. You have to burn or scrape the coating off where you make a connection. Solder onto a coated part and the connection just doesn't work. I redid some of them, connecting the wire at the cut ends where the copper was exposed.

The enameled wire was harder to work with, so I only used it for the columns, which don't have diodes. For the rows, which connect through the diodes, I used normal wire. Once everything was connected I checked every circuit with the multimeter again. Even with all that, it was one of the fun bits.

> [!WARNING]
> Enameled copper wire has a thin insulating coating. Burn or scrape it off wherever you solder, or the connection won't conduct. Some coatings, like polyester, don't burn off at normal soldering temperatures, so scraping or sanding is more reliable.

![The row and column grid wired across the sockets inside the case](/images/blogs/building-my-first-keyboard/image-04.webp "Rows run through the diodes in normal wire; columns are enameled wire")

> [!WARNING]
> Be careful with the soldering iron. I burned myself with it a couple of times.

Next, the 5 rows and 5 columns go to the microcontroller. Before that you solder pin headers onto it (rows of metal pins that wires can plug onto), which is another fun part.

> [!TIP]
> I'd strongly recommend keeping the whole setup plug-and-play with jumper wires (wires with plug ends). Get male-to-male, female-to-female and male-to-female, then cut them up and attach them to your wiring. If one of the pins on your microcontroller isn't working, you just pull the wire off and move it to a pin that is.

Boards like this have a reset pin. Shorting it to ground twice puts the board into a mode where you can install firmware. I wired those two pins to a tactile switch (a small push button), so I can just press it twice. You'll need this to install the ZMK firmware.

Then the battery. One pin is for positive and one is for ground. Use jumper cables here too, in case you want to swap the battery later. I put a switch on the positive wire so I can turn the keyboard on and off.

To mount everything in the case, I hot-glued around the USB sockets, the reset switch and the power switch. The battery and microcontroller are stuck down with double-sided tape, since hot glue isn't secure enough for them. The Fevikwik was only for the hot-swap sockets.

The wiring looks something like this. I used AI to draw the diagram from an existing one, so the ground, reset and power pins on your board will be in different places. Check your microcontroller's manual for those and wire the reset button and battery to match.

![Full wiring diagram showing the reset button, the battery connection and the row and column wiring](/images/blogs/building-my-first-keyboard/image-05.webp "The ground, reset and power pins on your board will differ. Check its manual.")

Here's one half done on the hardware side.

![The finished wiring inside one half of the keyboard](/images/blogs/building-my-first-keyboard/image-06.webp "One half, hardware done")

Do the same for the other half. The last hardware step is the screw inserts. They're heat-set, so you heat up the soldering iron and push each insert into its slot in the print. It melts the plastic around itself and sets there, ready for the screws later.

![Both halves open, showing their wiring and internal components](/images/blogs/building-my-first-keyboard/image-07.webp "Both halves wired up")

## Firmware

Firmware is the software that runs on the microcontroller and decides what each key does. I used ZMK, because QMK (the other big option) can't officially run on the nice!nano due to licensing issues with Nordic's Bluetooth stack. The [ZMK user setup guide](https://zmk.dev/docs/user-setup) has a CLI that clones the repo so you can start on your keymap.

There are two parts of that repo you need to understand yourself, because they depend on your hardware and how you want to customize it. A coding AI can easily handle the rest of the setup.

- The `.dtsi` file maps out your rows and columns, if they're the same on both halves. If the two halves use different pins, you specify those in an `.overlay` file.
- The `.keymap` file is where you set what each key does.

Logging for debugging is turned on and off in `config/dactyl_manuform.conf`.

My config is at [github.com/riyaz942/zmk-dactyl](https://github.com/riyaz942/zmk-dactyl). I'm using home row mods, where the home row keys act as modifiers like Shift or Ctrl when you hold them down. So far it's going well.

One nice thing about ZMK is that you don't have to build anything locally. You push your changes and the CI/CD pipeline builds the firmware for you. You download two UF2 files (the firmware files), one for each half, plus a `settings_reset` file you only need if the halves stop pairing.

To install one, connect the microcontroller to your computer over USB and double-press the reset button. The board goes into bootloader mode and shows up as a drive. Drag the UF2 file onto that drive. It installs and exits on its own. Unplug it, plug it back in and press some keys to check it works.

That only works for testing the left half. In ZMK one half is the central, which talks to the computer, and the other is the peripheral, which sends its keypresses to the central over Bluetooth (BLE). My left half is the central. To test the right half, you connect the left half and turn on the right half's battery.

## The right half wouldn't talk

With both halves flashed, you turn the keyboard on with the battery switch and connect it to your computer over Bluetooth. If you've enabled a passkey in your config, you'll be asked for one.

For me, the left half worked. The right half only registered keypresses (in the logs) when I plugged it straight into my laptop over USB. It wasn't talking to the left half at all.

For quite a while I was sure my config was wrong. I tried a lot of variations: making the right half the central and the left the peripheral, turning on several experimental modes, and so on. No luck. The two halves just wouldn't talk to each other.

So I turned on debug logging. On the central, everything looked fine, including it listening for the peripheral. On the right half, keypresses were fine too, but it errored out every time it tried to connect to the central. My conclusion was that the right microcontroller's Bluetooth didn't work. Apparently that happens with clone nRF52 boards. I didn't know that going in.

I couldn't return or exchange it, because I'd soldered the pin headers on, and the seller's terms say they don't accept soldered microcontrollers. So I ordered a new one, and with it some debugging gear: a breadboard (a board you plug parts and wires into without soldering), a few buttons and some wires for testing. I'd never used a breadboard, so that was new.

> [!WARNING]
> Clone nRF52840 boards can arrive with dead Bluetooth or dead pins, and sellers often won't take back a board once it's soldered. Test a new board before you solder anything onto it.

![The new microcontroller on a breadboard during testing](/images/blogs/building-my-first-keyboard/image-08.webp "The replacement board on a breadboard, testing pins two at a time")

When the new board arrived, I installed the right-half UF2 file straight onto it and checked the logs. It connected to the left half. Bluetooth worked.

Then I tested the pins one by one, shorting two at a time and checking whether the keystroke registered. Without pin headers in place, it's awkward to touch a wire or the multimeter to two of the board's pin holes at once. So I put the pin headers into the breadboard, connected the board to them, and used wires to connect its pins. I could have managed without the breadboard, but it made this easier. I think it'll be worth it for future projects too.

I also went over the wiring with the multimeter, touching both ends of each row and column to make sure the connection went all the way through.

Some of the pins I'd wired the right half to didn't work. Clone board, again. Since I'd learned my lesson and hadn't soldered it this time, I could have replaced it. But I didn't want to wait again, so I worked out which pins were dead, moved those jumper wires to working pins, and updated the pin config in ZMK to match. Then I checked everything again. Thankfully, it all works now.

Then I soldered the pin headers onto the new board. Since everything was wired with jumper cables, it was easy to plug it all in and get going.

## Painting it

Once it worked, I experimented with some timings and config and was quite happy with it. That left the looks. I'd ordered the case in white on purpose so I could paint it.

![The finished keyboard, still unpainted white](/images/blogs/building-my-first-keyboard/image-09.webp "Working, but still white")

I already had a Lord of the Rings theme going with Elvish keycaps, so I asked my wife to paint the case green and draw Lord of the Rings references on it.

Here's how it turned out.

![The finished keyboard painted green with Lord of the Rings artwork](/images/blogs/building-my-first-keyboard/image-10.webp "Painted green, with Lord of the Rings references")

![Another side of the painted keyboard](/images/blogs/building-my-first-keyboard/image-11.webp "The other side")

## A year later

I'm writing this about a year after the build, so I may have missed some details and some of the resources I used for inspiration or reference.

I usually tinker with software. This was my first hardware project, and I loved it: the soldering, the debugging, and building something physical instead of software. I might take on a few more.

Typing on it was slow for the first week or so. After a week or two I was back to the speed I had on a normal keyboard. The halves are tented at around 30 degrees (tilted up toward the middle), so I don't have to twist my arms to type. Each arm rests comfortably on a chair armrest, and I can put the halves wherever I want.

The one nuisance is layers. With fewer keys, some of them live on a second layer. Letters are on the base layer and numbers are on another one, so typing a number means holding the layer key and pressing the number. That's two keys instead of one, which isn't really a problem.

Using it with one hand is harder. To reach everything with one hand I'd need layer keys on each half, and with this few keys that's tricky. But I don't usually type with one hand, so I've just gotten used to it.

When I built this, AI coding tools were just taking off, and I was typing on it a lot. These days most of what I write is prompts and messages, and I mostly dictate those with voice-to-text. I still use the keyboard when I'm in a meeting and doing something on the side, or when I'm not in the mood to talk and just want to listen and work things out. Then I type.

Even so, building it was a lot of fun. There's the cool factor, and it's an awesome feeling to use something I built myself.

## Key takeaways

- Wire the matrix to the microcontroller with jumper cables. When a pin or a whole board turns out dead, you move a wire instead of desoldering.
- Enameled wire is coated. Burn the coating off where you solder, and check every circuit with a multimeter.
- Clone nRF52840 boards can have dead Bluetooth or dead pins. Test a new board before you solder pin headers onto it.
- Plan the socket layout before you glue anything down.
- With ZMK, CI builds the firmware for you. The parts you need to understand yourself are the `.dtsi`/`.overlay` pin mapping and the `.keymap`.

## Parts list

Most of the parts came from [robu.in](http://robu.in/), which seemed to have everything I needed. I already had a soldering kit with the iron, solder, a desoldering pump and wire cutters. The switches and keycaps came from my old keyboard, so they're not listed.

| Part | Notes |
|---|---|
| 3D-printed case | [3ding.in](https://3ding.in/), 1700 INR to print one side |
| [Hot-swap sockets (CPG151101S11)](https://www.amazon.in/Hot-swap-CPG151101S11-Mechanical-Keyboard-Accessories/dp/B0BVH6M5FP) | |
| [nice!nano v2 clone](https://robu.in/product/promicro-nrf52840-development-board/) | The microcontroller, one per half |
| [Diodes](https://robu.in/product/1n4148-1w-zener-diode-pack-of-50) | One per switch |
| [Enameled copper wire](https://roboticsdna.in/product/30-swg-polyester-enameled-copper-winding-wire-2-meters/) | For the columns |
| [Male-to-male jumper wires](https://robu.in/product/male-to-male-jumper-wires-40pcs-20cm/) | |
| [Female-to-female jumper wires](https://robu.in/product/20cm-dupont-wire-color-jumper-cable-2-54mm-1p-1p-female-female-40pcs/) | |
| [Male-to-female jumper wires](https://roboticsdna.in/product/male-to-female-jumper-wire/) | |
| [Tactile buttons](https://robu.in/product/6x6x8mm-tactile-push-button-switch-pack-of-20/) | Reset button |
| [Slide switches](https://roboticsdna.in/product/4mm-spdt-1p2t-slide-switch-pack-of-10/) | Power switch |
| [Batteries](https://robu.in/product/wly394058-1000mah-3-7v-single-cell-rechargeable-lipo-battery/) | |
| [Heat-set screw inserts](https://roboticsdna.in/product/insert-nut-m3-x-4mm-brass-heat-set-threaded-round-25-pcs/) | |
| [Screws](https://roboticsdna.in/product/m3-x-8mm-bolt-ss-304-csk-countersunk-philips-head-25-pcs/) | |
| [Glue gun](https://robu.in/product/40-watt-hot-melt-glue-gun-with-on-off-switch-5-glue-sticks/) | |
| [Desoldering wick](https://robu.in/product/best-quality-solder-desoldering-wire-de-soldering-wick/) | For cleaning up mistakes |
| [Multimeter](https://robu.in/product/digital-multimeter-small-yellow-color-lcd-ac-dc-measuring-voltage-current/) | For debugging |
| MB102 830-point solderless breadboard | For debugging |
| [LEDs](https://robu.in/product/3mm-single-hole-led-light-holder-with-red-led-light-pack-of-10/) | Bought for "debugging" and never used |
