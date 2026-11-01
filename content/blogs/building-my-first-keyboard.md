---
title: "Building a split keyboard from scratch"
slug: building-my-first-keyboard
description: "TODO: write a 1-2 sentence description for cards, meta tags and RSS."
publishedAt: "2026-11-01"
updatedAt: ""
tags: [hardware, keyboards]
coverImage: ""
coverAlt: ""
draft: true
---

So I wasn't too deep into the keyboard hobby, I had my trusty old anne pro 2 that I been rocking for around 5 years, with the same set of key caps and switches.   
So building a keyboard from scratch was one of my checklist.   
Building from scratch was interesting, though initially hesitant. I had watched a lot of videos read some blogs and references. And i was a little ambitious and targeted to build the wireless split keyboard.   
I had some experience with soldering (this was fun\! I did burn my hand though),i modded my existing keyboard annepro 2 make it hot swappable. So with that i pulled the trigger to get it started. I don't want it to be a full, in-depth blog, so I'm just trying to really cover the important stuff. And also share my experience with it. So here goes

## Chapter 1, to get the ball rolling:

I written down the list and links of components that i ordered at the end of the page. So to get things started i first ordered the 3d print, the hotswappable sockets, Enameled Copper Wire, and the micro-controller. 

Also for the stl file for the 3d model, this awesome person Ryan has a website where you can design the keyboard with variables for each of the areas, like curve, height, number of keys and then download the STL file [https\://ryanis.cool/dactyl/](https://ryanis.cool/dactyl/) you can then share the stl file for 3dprinting   
   
Ok so before starting anything, how does the whole thing work ? So just to keep it simple, the micro controller is the brains of the keyboard you plug in the usb in it and then You complete a circuit (Connect the 2 points using a wire) from one of the bottom left contact points to the bottom right of the contact right of the contact point, and when you do connect a point, the micro controller considers that as a keypress, so from the below example, with the pin layout, so for example if you connect P0.24 to P1.15 it registers as A and connecting P0.24 \-\> P1.13 would register as B, if you have configured your board like that, you can switch it to Z, X but the configuration part would be explained later.

So if you are making a split keyboard with 25 keys on one side so it would be 5 rows and 5 columns, you would just need 10 pinouts. And you can pick any of the programmable pins from the P0.\* or from P1.\* but do refer the pin layout for the board that you buy, since i bought a nice nano v2 clone the pin layout was the same   

![](/images/blogs/building-my-first-keyboard/image-01.webp)

Ok now moving on the next bit of hard technicality,you would need to create a matrix, and its size depends on the keyboard we're building. A traditional keyboard might have more rows and columns, but for our split keyboard, we're going with a 5 × 5 grid, giving us up to 25 key positions on each half. My keyboard is a 4x5 Dactyl Manuform (4 rows and 5 columns of finger keys, plus the thumb keys), so it uses 23 of those positions per half.

As shown in the image, each switch is wired to sit at the intersection of a row and a column. When you press a key, it completes a circuit between that row and column. The nice\!nano scans the matrix to figure out which key was pressed, and the firmware takes care of mapping that position to the correct key. We'll cover the software side of things later.

There's one more important component we need: a **diode for every switch**. A diode allows current to flow in only one direction. Without diodes, pressing certain combinations of keys can create unintended electrical paths, causing the keyboard to register keys you didn't actually press. This is called *ghosting*. Adding a diode to each switch prevents these unwanted paths and allows multiple keys to be detected reliably.

**In short:** The matrix helps the microcontroller identify each key using shared row and column wires, while diodes prevent ghosting when multiple keys are pressed together.

![](/images/blogs/building-my-first-keyboard/image-02.webp)

## Chapter two: putting it together the fun part

For my specific scenario, I'm using a hot-swappable socket, so I'm basically connecting the rows with the hot-swappable sockets rather than the switches. So then I started gluing the hot-swappable sockets onto the 3D-printed model with feviquick. And the thing is, for some of the parts I slotted incorrectly but on some of the sockets I reversed or glued it in an opposite direction so I had to pry it open. Basically it was a mess. So just learning from this is to plan everything in advance before applying anything permanent. 

![](/images/blogs/building-my-first-keyboard/image-03.webp)

Now for the fun part: soldering the wire onto the grid I used an enameled copper wire for the connection I didn't initially know that it has a layer of covering over it. It was mostly in the end, after I completed my soldering, that I understood, "Okay this copper wire is something different." But when I tested my connections with the multimeter, some of the circuit wasn't completed. I think that was mostly on me because I didn't understand how the enameled copper wire works. I needed to burn off the coating at the connection ends. If you do it improperly and solder on the parts where it has that covering, the whole connection doesn't work. I had to redo some of it and connect the wire at the end where I cut off the copper wire so the copper is kind of exposed. But all in all this was one of the fun bits. The enameled copper wire was a little harder to work with I just did the columns that didn't have the diode with the copper wire and then for the rows which needed to be connected with the diode, I used a normal wire for that. I connected everything with the diode and tested my connection with the multimeter to ensure that each of the ends was working and completing the circuit properly.   

![](/images/blogs/building-my-first-keyboard/image-04.webp)

Just be careful with the soldering iron. I burned myself with it a couple of times.  
Now we need to connect the 5 rows and 5 columns to our microcontroller, but before that, we need to attach the pin header to the microcontroller. That's one of the fun parts as well. Also, ideally, you would want to use an easy plug-and-play type of scenario for this whole setup, so I highly advise using jumper wires, male to male, female to female and male to female  So you can cut them up and attach it with your setup. For example, if one of the pins in your microcontroller is not working, you can just remove the jumper wire and attach it to someplace else where the header pin is working for the microcontroller.  
Also, with microcontrollers like this, There should be a reset pin, so you need to short the reset pin with the ground pin twice in order to install something there. Ideally, you can connect those two pin headers and connect it to a switch, basically a tactile switch, so you can press twice to short it out. This would be helpful in order to install the zmk firmware. And then you need to connect the battery. One pin would be for the positive, and one pin should be for the ground. Make sure to use a jumper cable for this as well, just in case I want to switch the batteries or do anything with it. Connect those up with the battery, and between the ground or even the power wires, connect a switch in between them so you can turn on or off your keyboard. To mount the parts on the 3D-printed frame, I used the glue gun to stick the components in place: around the USB sockets, the reset switch and the battery on/off switch. The battery and the microcontroller are attached to the frame with two-way tape instead, since hot glue isn't secure enough for them. The Feviquick was only used for the hot-swap sockets.

A diagram of this would look something like this. I used AI to draw the wiring diagram, but refer to your microcontroller manual for where the power and ground pins are, and connect the reset and battery wiring accordingly. This is just a representation from one of the existing diagrams, so the ground, reset pin, as well as the power pins would be in a different place than what's shown in the diagram.

![](/images/blogs/building-my-first-keyboard/image-05.webp)

Here is one part of the keyboard completed on the hardware side. 

![](/images/blogs/building-my-first-keyboard/image-06.webp)

And do the same thing on the other end, and you have a keyboard setup done for the hardware side.  
And the last step is adding the screw inserts in the gap that is provided for it in the 3D-printed hardware. It is heat set, so you just have to heat up your soldering iron and push it so it will melt the plastic on your 3D print and set the inserts there for the screws to go into later.  

![](/images/blogs/building-my-first-keyboard/image-07.webp)

## Chapter 3 firmware setup

Now we set up the software for this so you can customise the keyboard as you wish. I'm using ZMK for this setup because QMK can’t officially run on the nice\!nano because of licensing issues with Nordic’s nRF52 SDK. You can get started here [https\://zmk.dev/docs/user-setup](https://zmk.dev/docs/user-setup) there is a cli to clone the repo and get started with the keymapping changes.  
In the repo, you just have to focus on two things Mostly because it kind of relies on you for customization and connecting the pins with the hardware, you just have to be a little bit aware of these two parts. The other parts, the AI, like one of the coding AIs, can handle it easily to set you up. 

\- .dtsi file for mapping out your rows and columns if they are the same for both keyboards, else if you have different column or row pin mapping then you can use .overlay file to specify there  
\- .keymap file to customize your key mapping

You can check out my config in the following GitHub repo.  [https\://github.com/riyaz942/zmk-dactyl](https://github.com/riyaz942/zmk-dactyl) I'm using a home row setup. So far, it's going well for me.

And also Enabling/Disabling logging from here config/dactyl\_manuform.conf (For debugging)

After configuring ZMK, ZMK has this cool trick where You don’t *have* to build locally. You just have to push, and the CI/CD pipeline basically generates the build for you. So you'll get two uf2 files for you to download from the ci/cd, each for one side of your keyboard, plus a settings\_reset file that you only need if the two halves stop pairing. 

Okay, now to put your UF2 files onto the microcontroller, First, connect your microcontroller with USB to your laptop/desktop and Assuming you connected the reset switch correctly In the microcontroller, when you double-press on the reset button, it will go into The bootloader mode, You would be able to see Drive showing up for you. What you just need to do now is drag and drop the UF2 file onto the drive that you're seeing connected. This will basically install the UF2 file on the microcontroller, and it will exit out. Now it's good to go to test it out, so disconnect the usb And then connect back again and try to press any keys. Check if it is working. Note: this only works for the central left keyboard, for the peripheral right keyboard you need to connect your central left keyboard and turn on the battery for the right keyboard the right keyboard would work via BLE. This step is basically just to check if things are working correctly or not.

## Chapter 4 despair and debugging

Okay, after installing the two separate files for their respective keyboards, you should be able to use the keyboard now. Try turning on the keyboard using the battery. Then try connecting on your laptop/desktop via bluetooth, you’ll get passcode to connect to your keyboard if you have enabled passcode in your config.

Now, for me, what was happening was the left side was working. The right side was only registering keypresses (in the logs) when I connected directly via USB to my laptop but it wasn’t communicating with the left keyboard. Now, how this works is that one of the keyboards is the central, and the other one is the peripheral. What's happening is the peripheral communicates or sends the keystrokes and information to the central, and then the central sends the information to the computer. And for quite some time, I was thinking my configuration was incorrect or something like that, so I tried multiple variations and multiple settings Like setting my right side as central and the left side as peripheral, enabling multiple experimental modes, etc just to see if it would make things work. But no luck. The two separate devices weren't communicating for some reason.

Then I started looking into debugging it. I enabled the debug mode, and then I checked the logs on the central keyboard: I noticed that it seems to be working correctly. The keystrokes are basically trying to listen to the peripheral keyboard as well. All of that was working correctly. Then I connected my right-side keyboard, and I noticed that the keystrokes and everything were working correctly, but it's basically erroring out when it's trying to connect to the central keyboard. From this, I came to the conclusion that the microcontroller on the right keyboard doesn't have a functioning Bluetooth. And usually that happens with clone nRF52 board, I didn't know that, but looking at it, it seems like that was the conclusion. Now, the thing is, I couldn't return this or exchange this because I soldered the pin headers onto the microcontroller. Looking at the terms and conditions, it seems that they don't accept any soldered microcontrollers. I had to order a new one, and with that, I also ordered some debugging tools, like a breadboard. I was researching it, and it seems like it would be a new experience for me in this. Also, a few buttons And wires for testing things.  

![](/images/blogs/building-my-first-keyboard/image-08.webp)

Okay, now after getting the new microcontroller, I directly just installed the UF2 file, the right-side UF2 file controller, and checked: is it connecting to the left controller now? The logs were showing it correctly, It seemed fine Bluetooth was working now for the new one., then I started checking each pin. I configured the pin, so I was just checking the keystrokes: is it registering the keystrokes or not? I was just shorting the two pins and checking each of the pins one by one, With the Multimeter, Now I noticed that some of the pins on the right side of this microcontroller weren't working. As mentioned before, since this is a clone nRF52 board , One thing or the other might not work, but now, since I learned my lesson and didn't solder it, I had a chance to replace it. I still didn't want to go through the hassle of waiting, and I just saw which of the key pins were not working. I basically just reconfigured the pins on the ZMK, and then I checked out if everything was working or not. Thankfully, it's working now. Although I got the breadboard, ideally, I could have done it without it, but it was still a little harder to connect the two-pin sockets. I think for future projects, it would be worth it, but I think for this one, it might not have been required. But I was still playing around with it.

Then I started soldering the pin headers on the microcontroller. And my whole setup was attached with a jumper cable, so it was easy to plug things in and get it moving. 

## Chapter 5 finishing touches

Now that my keyboard is functioning, I just experimented with a few things with timings and configuration to check it out, and I was quite happy with it. There was a matter of looks. I intentionally ordered a white 3D-printed model so I can paint on it.  

![](/images/blogs/building-my-first-keyboard/image-09.webp)

And since I already had a theme going with Lord of the Rings with the Elvish keycaps. I asked my wife to paint the keyboard green and basically draw Lord of the Rings references onto it.

And here is how it looks.

![](/images/blogs/building-my-first-keyboard/image-10.webp)

![](/images/blogs/building-my-first-keyboard/image-11.webp)

## Finishing notes, conclusion:

I usually love tinkering with things using software, but this was the first time that I was doing something with hardware and going with this. I might take on a few other projects building with hardware. I loved enjoying soldering, debugging, and building things that are coming to life in reality, like a physical thing rather than software. It was a really fun and exciting experience.   
And I'm actually writing this blog, sharing my experience after about one year, so I might have missed some of the details and resources that I took for inspiration or for reference. Initially, for a week or so, it was really a tad bit slow for me to catch on to typing on this. After that initial 1 or 2 weeks, I was caught up with my initial typing speed on a normal keyboard. Now, with the added cool factor to the split keyboard, I have a little ergonomics with it. Since it's around 30 degree tenting I didn't have to twist my arms now to type. And each of my arms is resting on one of the chair handrests comfortably, and I can adjust how and where I'm using it.   
I guess the only nuisance with this is because of the smaller number of keys There are layers for Accessing a certain key. For example, the number keys are basically laid out in one layer, and normal alphabets are in one layer. That is on the top layer. If I want to access the second layer where the number key resides, I have to press the layer key (and whichever layer I have configured it to), and press the number. I have to press two keys, but that's not really a problem.

If I wanted to access it with just one hand, ideally I would need to configure the layers on both keys. Since, again, the problem is with the smaller number of keys, it's a little bit problematic. Using it with one hand is an issue. But I usually don't use my keyboard with one hand, so I'm basically getting accustomed to it.

## Acquiring parts:

So majorly, for acquiring building materials [robu.in](http://robu.in/) was the default for anything it seemed to have everything I needed, the board, buttons, wires, soldering materials, etc. 

Here is the full list of items that i bought for this project. I already have a few other items before this, like the soldering iron, soldering wire, desoldering sucker, wirecutter, etc. it all came with a kit. The switches and keycaps aren't listed because I reused them from my existing keyboard.

Hot-swappable socket: [https\://www\.amazon.in/Hot-swap-CPG151101S11-Mechanical-Keyboard-Accessories/dp/B0BVH6M5FP](https://www.amazon.in/Hot-swap-CPG151101S11-Mechanical-Keyboard-Accessories/dp/B0BVH6M5FP)

[https\://3ding.in/](https://3ding.in/) \- one side printing 1700 inr

\- nice\!nano v2 clone [https\://robu.in/product/promicro-nrf52840-development-board/](https://robu.in/product/promicro-nrf52840-development-board/)  
 \- jumper wires [https\://robu.in/product/male-to-male-jumper-wires-40pcs-20cm/](https://robu.in/product/male-to-male-jumper-wires-40pcs-20cm/)  
\- de soldering wick to remove any mess ? [https\://robu.in/product/best-quality-solder-desoldering-wire-de-soldering-wick/](https://robu.in/product/best-quality-solder-desoldering-wire-de-soldering-wick/)  
\- for debugging MB102 830 Points Solderless Prototype PCB Breadboard High Quality  
\- lights for "debugging" it wasnt used [https\://robu.in/product/3mm-single-hole-led-light-holder-with-red-led-light-pack-of-10/](https://robu.in/product/3mm-single-hole-led-light-holder-with-red-led-light-pack-of-10/)  
\- batteries [https\://robu.in/product/wly394058-1000mah-3-7v-single-cell-rechargeable-lipo-battery/](https://robu.in/product/wly394058-1000mah-3-7v-single-cell-rechargeable-lipo-battery/)  
\- Glue gun [https\://robu.in/product/40-watt-hot-melt-glue-gun-with-on-off-switch-5-glue-sticks/](https://robu.in/product/40-watt-hot-melt-glue-gun-with-on-off-switch-5-glue-sticks/)  
\- Diode [https\://robu.in/product/1n4148-1w-zener-diode-pack-of-50](https://robu.in/product/1n4148-1w-zener-diode-pack-of-50)  
\- Tactile button [https\://robu.in/product/6x6x8mm-tactile-push-button-switch-pack-of-20/](https://robu.in/product/6x6x8mm-tactile-push-button-switch-pack-of-20/)  
\- Female to female jumper cable [https\://robu.in/product/20cm-dupont-wire-color-jumper-cable-2-54mm-1p-1p-female-female-40pcs/](https://robu.in/product/20cm-dupont-wire-color-jumper-cable-2-54mm-1p-1p-female-female-40pcs/)  
\- multimeter For debugging [https\://robu.in/product/digital-multimeter-small-yellow-color-lcd-ac-dc-measuring-voltage-current/](https://robu.in/product/digital-multimeter-small-yellow-color-lcd-ac-dc-measuring-voltage-current/)

Screw inserts \-   
[https\://roboticsdna.in/product/insert-nut-m3-x-4mm-brass-heat-set-threaded-round-25-pcs/](https://roboticsdna.in/product/insert-nut-m3-x-4mm-brass-heat-set-threaded-round-25-pcs/)

Screws \-  
[https\://roboticsdna.in/product/m3-x-8mm-bolt-ss-304-csk-countersunk-philips-head-25-pcs/](https://roboticsdna.in/product/m3-x-8mm-bolt-ss-304-csk-countersunk-philips-head-25-pcs/)  
Slide switches \-   
[https\://roboticsdna.in/product/4mm-spdt-1p2t-slide-switch-pack-of-10/](https://roboticsdna.in/product/4mm-spdt-1p2t-slide-switch-pack-of-10/)

Enameled copper wire \-   
[https\://roboticsdna.in/product/30-swg-polyester-enameled-copper-winding-wire-2-meters/](https://roboticsdna.in/product/30-swg-polyester-enameled-copper-winding-wire-2-meters/)

Male to female jumper cable \-   
[https\://roboticsdna.in/product/male-to-female-jumper-wire/](https://roboticsdna.in/product/male-to-female-jumper-wire/)  
